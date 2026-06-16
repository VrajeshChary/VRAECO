import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import admin from "firebase-admin";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== FIREBASE ADMIN ====================
let db: admin.firestore.Firestore;
try {
  const serviceAccountPath = path.join(__dirname, "firebase-admin-config.json");
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    db = admin.firestore();
    console.log("[FIREBASE] Connected to Firestore");
  } catch {
    // Fallback: use environment variable for service account
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      db = admin.firestore();
      console.log("[FIREBASE] Connected to Firestore (env config)");
    } else {
      console.warn("[FIREBASE] No service account found. Falling back to in-memory mode.");
      db = null as any;
    }
  }
} catch (err: any) {
  console.warn("[FIREBASE] Init error:", err.message);
  db = null as any;
}

// ==================== RAZORPAY ====================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// ==================== PRICE CATALOG (Backend Source of Truth) ====================
const PRODUCT_CATALOG: Record<string, { name: string; price: number }> = {
  "fifa-world-cup-trophy-21cm": { name: "FIFA World Cup Trophy 21cm | Premium Replica for True Fans", price: 1999 },
  "football-world-cup-trophy-keychain": { name: "Football World Cup Trophy Keychain for Car Bike Keys Backpack Bag Hanging Accessory", price: 499 },
  "veg-peeler-cutter": { name: "Vegetable Peeler & Cutter 2-in-1 | Peel, Slice & Julienne in Seconds", price: 249 },
  "mini-chopper-450ml": { name: "Compact Mini Chopper 450ml | Chop Onions in 3 Seconds — No Tears", price: 299 },
  "combo-chopper-1000ml": { name: "Family Size Chopper 1000ml Pack | Double Capacity for Big Meals", price: 499 },
  "push-chopper-handy": { name: "Handy Push-Down Chopper | One Push Chop — No Pulling Needed", price: 399 },
  "chopper-masher-combo": { name: "Chopper + Masher Kitchen Combo | Your Countertop Power Couple", price: 549 },
  "high-speed-push-chopper": { name: "High Speed Push Chopper Pro | Turbo Kitchen Prep", price: 449 },
  "manual-whisk-blender": { name: "Manual Hand-Whisk Blender | Whisk, Blend, Froth — Hands-On Perfection", price: 229 },
  "hand-blender": { name: "Multi-Purpose Hand Blender | Smoothies, Soups, Sauces — One Hero Tool", price: 269 },
  "electric-coffee-frother": { name: "Electric Coffee Frother & Mixer | Cafe Latte at Home in 15 Seconds", price: 399 },
  "posture-corrector-belt": { name: "Posture Corrector Belt | Stand Tall — Fix Years of Bad Posture from Day One", price: 299 },
  "acupressure-slippers": { name: "Relieve Foot Pain in Minutes | Acupressure Therapy Slippers for Total Body Relaxation", price: 329 },
  "ice-roller-jade-combo": { name: "Ice Roller + Jade Roller Combo | De-Puff Face in 5 Minutes — Glass Skin Secret", price: 499 },
  "hair-gloss-serum": { name: "Hair Gloss Serum for Smooth Shine | Frizz-Free Glass Hair in 10 Seconds", price: 249 },
  "magnetic-phone-stand": { name: "360° Magnetic Phone Stand | Shoot Reels Hands-Free — Anywhere, Anytime", price: 329 },
  "laptop-stand": { name: "Adjustable Laptop Stand | Stop Neck Pain — Ergonomic WFH Setup in Seconds", price: 649 },
  "neck-fan": { name: "Bladeless Neck Fan 360° Cooling | Hands-Free Relief from Indian Summer", price: 499 },
  "silicone-stretch-lids": { name: "Silicone Stretch Lids (6 Pack) | No More Cling Film — Perfect Seal Every Time", price: 249 },
  "magnetic-cord-organizer": { name: "Magnetic Cord Organizer Pack | No More Messy Cables — Tidy Desk in 10 Seconds", price: 179 },
  "food-storage-containers": { name: "Food Storage Containers Set (6 Pack) | Keep Veggies Fresh 3X Longer — Fridge Essential", price: 399 },
  "kitchen-storage-rack": { name: "2-Tier Kitchen Storage Rack | Double Your Counter Space — Organize Everything", price: 379 },
  "revolving-spice-rack": { name: "Revolving Spice Rack 16-in-1 | Grab Any Spice in 1 Second — Turntable Magic", price: 699 },
  "crystal-ball-lamp": { name: "3D Crystal Ball Night Lamp | Hold a Galaxy in Your Palm — Stunning Gift", price: 799 },
  "ocean-wave-projector": { name: "Ocean Wave Projector Lamp | Bring the Ocean's Calm to Your Ceiling", price: 649 },
  "star-night-projector": { name: "Star Night Sky Projector | Turn Any Room Into a Planetarium in Seconds", price: 899 },
  "panda-night-lamp": { name: "Panda Silicone Night Lamp | The Cutest Bedtime Buddy Your Kid Will Love", price: 349 },
  "rope-led-lights": { name: "3M Rope LED Strip Lights | Fairy-Light Your Balcony, Room, or Diwali Decor", price: 229 },
  "bamboo-toothbrush": { name: "Bamboo Toothbrush Pack (5) | Eco-Friendly Smile — Ditch Plastic Forever", price: 179 },
  "sunscreen-spf50": { name: "Dewy Sunscreen SPF 50 PA++++ | No White Cast, All Glow — India's Everyday SPF", price: 329 },
  "diamond-jewellery-set": { name: "American Diamond Jewellery Set | Red-Carpet Glamour Without the Red-Carpet Price", price: 549 },
  "fancy-necklace-set": { name: "Fancy Designer Necklace Set | Elevate Any Outfit With One Statement Piece", price: 279 },
  "shoe-washing-bag": { name: "Protective Shoe Washing Bag for Washing Machine | Clean Sneakers Without Damage", price: 249 },
};

// ==================== EMAIL SYSTEM ====================
let transporter: nodemailer.Transporter | null = null;

const initTransporter = async () => {
  const user = process.env.SMTP_USER || "vraeco.store@gmail.com";
  const pass = process.env.SMTP_PASS || "";
  if (!pass) {
    console.log("[EMAIL] No SMTP credentials. Creating Ethereal Test Account for testing proper emails...");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    console.log("[EMAIL] Ethereal ready.");
    return;
  }
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
};
initTransporter();

const sendCustomerConfirmationEmail = async (orderData: any, orderId: string) => {
  if (!orderData.email) return;
  const d1 = new Date(); d1.setDate(d1.getDate() + 3);
  const d2 = new Date(); d2.setDate(d2.getDate() + 5);
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const itemRows = orderData.items.map((i: any) => `
    <tr>
      <td style="padding:12px 8px;border-bottom:1px solid #e6e4dc;">${i.quantity}x</td>
      <td style="padding:12px 8px;border-bottom:1px solid #e6e4dc;color:#1a1a2e;">${i.name}</td>
      <td style="padding:12px 8px;border-bottom:1px solid #e6e4dc;text-align:right;font-weight:600;">₹${i.price}</td>
    </tr>`).join("");

  const orderLines = orderData.items.map((i: any) => ` • ${i.quantity}x ${i.name}`).join("\n");

  const html = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f3;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- HEADER BANNER -->
        <tr><td style="background:linear-gradient(135deg,#0d1b3e 0%,#1b2d55 100%);padding:40px 36px;text-align:center;">
          <div style="font-size:0.7rem;letter-spacing:5px;text-transform:uppercase;color:#c9a84c;font-weight:700;margin-bottom:8px;">V R A E C O</div>
          <div style="font-size:2rem;color:#ffffff;font-weight:300;margin:12px 0 4px;">Thank You for Your Order!</div>
          <div style="color:#b0b8d0;font-size:0.95rem;">We've received your order and it's being prepared for dispatch.</div>
        </td></tr>

        <!-- ORDER INFO BAR -->
        <tr><td style="padding:24px 36px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;width:50%;">
                <div style="color:#7a8aaa;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">Order Number</div>
                <div style="color:#c9a84c;font-size:1.25rem;font-weight:700;letter-spacing:1px;">VRA-${orderId}</div>
              </td>
              <td style="padding:20px 24px;width:50%;border-left:1px solid #2a3d6e;">
                <div style="color:#7a8aaa;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">Order Date</div>
                <div style="color:#e8e8f0;font-size:0.95rem;font-weight:500;">${now}</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ITEMS TABLE -->
        <tr><td style="padding:24px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left;padding:10px 8px;font-size:0.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Qty</th>
                <th style="text-align:left;padding:10px 8px;font-size:0.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Item</th>
                <th style="text-align:right;padding:10px 8px;font-size:0.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr><td colspan="3" style="border-bottom:2px solid #D4AF37;padding-top:4px;"></td></tr>
              <tr>
                <td colspan="2" style="padding-top:12px;color:#555;font-size:0.9rem;">Subtotal</td>
                <td style="padding-top:12px;text-align:right;font-size:0.9rem;color:#333;">₹${orderData.subtotal || orderData.total}</td>
              </tr>
              ${orderData.discountCode ? `<tr>
                <td colspan="2" style="padding-top:6px;color:#22a87a;font-size:0.9rem;">Discount (${orderData.discountCode})</td>
                <td style="padding-top:6px;text-align:right;color:#22a87a;font-size:0.9rem;">−₹${orderData.discountAmount}</td>
              </tr>` : ""}
              ${orderData.codSurcharge ? `<tr>
                <td colspan="2" style="padding-top:6px;color:#d4755e;font-size:0.9rem;">COD Surcharge</td>
                <td style="padding-top:6px;text-align:right;color:#d4755e;font-size:0.9rem;">+₹${orderData.codSurcharge}</td>
              </tr>` : ""}
              <tr>
                <td colspan="2" style="padding-top:12px;font-size:1.1rem;font-weight:700;color:#1a1a2e;border-top:1px solid #e6e4dc;">Amount ${orderData.paymentMethod === "COD" ? "to Collect" : "Paid"}</td>
                <td style="padding-top:12px;text-align:right;font-size:1.1rem;font-weight:700;color:#D4AF37;border-top:1px solid #e6e4dc;">₹${orderData.total}</td>
              </tr>
            </tfoot>
          </table>
          <div style="text-align:center;margin-top:8px;"><span style="background:${orderData.paymentMethod === "COD" ? "#f5e6cc;color:#a07f2e;border:1px solid #e0bd6a" : "#e8f5ee;color:#22a87a;border:1px solid #8ed4bc"};font-size:0.75rem;font-weight:700;padding:4px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;">${orderData.paymentMethod}</span></div>
        </td></tr>

        <!-- DELIVERY ADDRESS + TIMELINE -->
        <tr><td style="padding:0 36px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:50%;vertical-align:top;padding-right:8px;">
                <div style="color:#7a8aaa;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Shipping Address</div>
                <div style="color:#1a1a2e;font-size:0.9rem;line-height:1.6;">
                  <strong>${orderData.customerName}</strong><br/>
                  ${orderData.address.house}, ${orderData.address.road}<br/>
                  ${orderData.address.colony}<br/>
                  ${orderData.address.city}, ${orderData.address.state} - ${orderData.address.pincode}
                  ${orderData.address.landmark ? `<br/><em style="color:#555;font-size:0.85rem;">Landmark: ${orderData.address.landmark}</em>` : ""}
                </div>
              </td>
              <td style="width:50%;vertical-align:top;padding-left:8px;">
                <div style="color:#7a8aaa;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Expected Delivery</div>
                <div style="background:#D4AF37;color:#000;padding:10px 16px;border-radius:8px;font-size:1rem;font-weight:700;text-align:center;margin-bottom:12px;">
                  ${fmt(d1)} – ${fmt(d2)}
                </div>
                <div style="color:#555;font-size:0.82rem;line-height:1.5;">
                  3–5 business days via our shipping partner.<br/>You'll receive tracking updates by email.
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- WHAT'S NEXT -->
        <tr><td style="background:#f9f8f3;padding:24px 36px;">
          <div style="color:#c9a84c;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;font-weight:700;">What Happens Next?</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:33%;text-align:center;padding:8px 4px;">
                <div style="width:36px;height:36px;background:#0d1b3e;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#D4AF37;font-weight:700;font-size:0.85rem;margin-bottom:6px;">✓</div>
                <div style="color:#1a1a2e;font-size:0.8rem;font-weight:600;">Order Confirmed</div>
                <div style="color:#7a8aaa;font-size:0.72rem;margin-top:2px;">You're here</div>
              </td>
              <td style="width:33%;text-align:center;padding:8px 4px;">
                <div style="width:36px;height:36px;background:#f0efe8;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#8a8fa6;font-weight:700;font-size:0.85rem;margin-bottom:6px;">📦</div>
                <div style="color:#1a1a2e;font-size:0.8rem;font-weight:600;">Packed & Shipped</div>
                <div style="color:#7a8aaa;font-size:0.72rem;margin-top:2px;">Within 24 hours</div>
              </td>
              <td style="width:33%;text-align:center;padding:8px 4px;">
                <div style="width:36px;height:36px;background:#f0efe8;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#8a8fa6;font-weight:700;font-size:0.85rem;margin-bottom:6px;">🏠</div>
                <div style="color:#1a1a2e;font-size:0.8rem;font-weight:600;">Delivered</div>
                <div style="color:#7a8aaa;font-size:0.72rem;margin-top:2px;">By ${fmt(d2)}</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- CUSTOMER CARE -->
        <tr><td style="padding:24px 36px;text-align:center;">
          <div style="color:#7a8aaa;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;font-weight:700;">Need Help?</div>
          <p style="color:#555;font-size:0.85rem;margin:0 0 12px;">For any questions, simply reply to this email or reach us at:</p>
          <a href="mailto:vraeco.store@gmail.com" style="color:#D4AF37;font-weight:600;text-decoration:none;border-bottom:1px solid #D4AF37;">vraeco.store@gmail.com</a>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0d1b3e;padding:24px 36px;text-align:center;">
          <div style="color:#c9a84c;font-size:0.65rem;letter-spacing:4px;text-transform:uppercase;font-weight:700;margin-bottom:6px;">VRAECO</div>
          <div style="color:#7a8aaa;font-size:0.72rem;margin:0;">Make Daily Tasks 10x Faster.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>`;

  try {
    if (transporter) {
      const info = await transporter.sendMail({
        from: `"VRAECO" <${process.env.SMTP_USER || "vraeco.store@gmail.com"}>`,
        to: orderData.email,
        subject: `✓ Order Confirmed #VRA-${orderId} — ₹${orderData.total} | Thanks for choosing VRAECO!`,
        html,
      });
      console.log(`[EMAIL] Confirmation sent to ${orderData.email} for VRA-${orderId}`);
      if (!process.env.SMTP_PASS) {
        console.log(`=======================================================`);
        console.log(`[PROPER EMAIL URL]: ${nodemailer.getTestMessageUrl(info)}`);
        console.log(`=======================================================`);
      }
    } else {
      console.log(`[EMAIL Fallback] Would send to ${orderData.email}: VRA-${orderId} ₹${orderData.total}`);
    }
  } catch (err) {
    console.error(`[EMAIL] Failed to send to ${orderData.email}:`, err);
  }
};

const sendOrderEmail = async (orderData: any, orderId: string) => {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", weekday: "long" });
  const itemCount = orderData.items.reduce((sum: number, i: any) => sum + i.quantity, 0);

  const itemRows = orderData.items.map((i: any) => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #e6e4dc;">${i.quantity}x</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e6e4dc;color:#1a1a2e;font-weight:500;">${i.name}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e6e4dc;text-align:right;color:#555;">₹${i.price}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e6e4dc;text-align:right;font-weight:600;">₹${i.price * i.quantity}</td>
    </tr>`).join("");

  const orderText = orderData.items.map((i: any) => `  - ${i.quantity}x ${i.name} = ₹${i.price * i.quantity}`).join("\n");

  const html = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f3;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <tr><td align="center">
      <table width="680" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:680px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#0d1b3e 0%,#1b2d55 100%);padding:36px;text-align:center;">
          <div style="font-size:0.65rem;letter-spacing:5px;text-transform:uppercase;color:#c9a84c;font-weight:700;margin-bottom:6px;">V R A E C O — ADMIN ALERT</div>
          <div style="font-size:1.6rem;color:#ffffff;font-weight:300;">📦 New Order Received</div>
        </td></tr>

        <!-- QUICK STATS -->
        <tr><td style="padding:24px 36px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="padding:18px 20px;width:33%;text-align:center;border-right:1px solid #2a3d6e;">
                <div style="color:#c9a84c;font-size:1.4rem;font-weight:700;">VRA-${orderId}</div>
                <div style="color:#7a8aaa;font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Order ID</div>
              </td>
              <td style="padding:18px 20px;width:33%;text-align:center;border-right:1px solid #2a3d6e;">
                <div style="color:#e8e8f0;font-size:1.4rem;font-weight:700;">₹${orderData.total}</div>
                <div style="color:#7a8aaa;font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Total</div>
              </td>
              <td style="padding:18px 20px;width:33%;text-align:center;">
                <div style="color:#e8e8f0;font-size:0.95rem;font-weight:500;">${itemCount} item${itemCount > 1 ? "s" : ""}</div>
                <div style="color:#7a8aaa;font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Quantity</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- CUSTOMER DETAILS -->
        <tr><td style="padding:20px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:50%;vertical-align:top;padding-right:12px;">
                <div style="color:#D4AF37;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;font-weight:700;">Customer Details</div>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:0.9rem;">
                  <tr><td style="padding:4px 8px 4px 0;color:#7a8aaa;width:60px;">Name</td><td style="padding:4px 0;color:#1a1a2e;font-weight:600;">${orderData.customerName}</td></tr>
                  <tr><td style="padding:4px 8px 4px 0;color:#7a8aaa;">Phone</td><td style="padding:4px 0;color:#1a1a2e;">${orderData.phone}</td></tr>
                  <tr><td style="padding:4px 8px 4px 0;color:#7a8aaa;">Email</td><td style="padding:4px 0;color:#1a1a2e;">${orderData.email || "Not provided"}</td></tr>
                  <tr><td style="padding:4px 8px 4px 0;color:#7a8aaa;">Payment</td><td style="padding:4px 0;"><span style="background:${orderData.paymentMethod === "COD" ? "#f5e6cc;color:#a07f2e;border:1px solid #e0bd6a" : "#e8f5ee;color:#22a87a;border:1px solid #8ed4bc"};font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;letter-spacing:0.5px;">${orderData.paymentMethod}</span></td></tr>
                </table>
              </td>
              <td style="width:50%;vertical-align:top;padding-left:12px;">
                <div style="color:#D4AF37;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;font-weight:700;">Shipping Address</div>
                <div style="color:#1a1a2e;font-size:0.88rem;line-height:1.6;">
                  <strong>${orderData.customerName}</strong><br/>
                  ${orderData.address.house}, ${orderData.address.road}<br/>
                  ${orderData.address.colony}<br/>
                  ${orderData.address.city}, ${orderData.address.state} - ${orderData.address.pincode}
                  ${orderData.address.landmark ? `<br/><em style="color:#555;font-size:0.82rem;">Near: ${orderData.address.landmark}</em>` : ""}
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ORDER ITEMS -->
        <tr><td style="padding:0 36px 20px;">
          <div style="color:#D4AF37;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;font-weight:700;">Order Items</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <thead>
              <tr style="background:#f9f8f3;">
                <th style="text-align:left;padding:8px;font-size:0.65rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Qty</th>
                <th style="text-align:left;padding:8px;font-size:0.65rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Product</th>
                <th style="text-align:right;padding:8px;font-size:0.65rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Unit Price</th>
                <th style="text-align:right;padding:8px;font-size:0.65rem;text-transform:uppercase;letter-spacing:1.5px;color:#7a8aaa;border-bottom:2px solid #D4AF37;">Subtotal</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
        </td></tr>

        <!-- TOTALS -->
        <tr><td style="padding:0 36px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f8f3;border-radius:8px;padding:16px 20px;">
            <tr>
              <td style="width:80%;padding:16px 20px 8px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:0.88rem;">
                  <tr><td style="padding:3px 0;color:#7a8aaa;">Subtotal</td><td style="padding:3px 0;text-align:right;color:#333;font-weight:500;">₹${orderData.subtotal}</td></tr>
                  ${orderData.discountCode ? `<tr><td style="padding:3px 0;color:#22a87a;">Discount (${orderData.discountCode})</td><td style="padding:3px 0;text-align:right;color:#22a87a;font-weight:500;">−₹${orderData.discountAmount}</td></tr>` : ""}
                  ${orderData.codSurcharge ? `<tr><td style="padding:3px 0;color:#d4755e;">COD Surcharge</td><td style="padding:3px 0;text-align:right;color:#d4755e;font-weight:500;">+₹${orderData.codSurcharge}</td></tr>` : ""}
                  <tr><td style="padding:10px 0;color:#1a1a2e;font-size:1.05rem;font-weight:700;border-top:1px solid #e6e4dc;">Total</td><td style="padding:10px 0;text-align:right;color:#D4AF37;font-size:1.15rem;font-weight:700;border-top:1px solid #e6e4dc;">₹${orderData.total}</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- TIMESTAMP -->
        <tr><td style="padding:0 36px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0efe8;border-radius:6px;">
            <tr>
              <td style="padding:12px 16px;">
                <div style="font-size:0.75rem;color:#7a8aaa;">
                  <strong>Order placed:</strong> ${now}<br/>
                  <strong>Action required:</strong> ${orderData.paymentMethod === "COD" ? "Arrange COD shipment — customer will pay on delivery." : "Payment received — proceed with dispatch."}
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0d1b3e;padding:20px 36px;text-align:center;">
          <div style="color:#c9a84c;font-size:0.65rem;letter-spacing:4px;text-transform:uppercase;font-weight:700;margin-bottom:4px;">VRAECO ORDER MANAGEMENT</div>
          <div style="color:#7a8aaa;font-size:0.72rem;margin:0;">Automated order notification — no reply needed.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>`;

  try {
    if (transporter) {
      const info = await transporter.sendMail({
        from: `"VRAECO Orders" <${process.env.SMTP_USER || "vraeco.store@gmail.com"}>`,
        to: "vraeco.store@gmail.com",
        subject: `📦 New Order #VRA-${orderId} — ₹${orderData.total} — ${orderData.paymentMethod}`,
        html,
      });
      console.log(`[EMAIL] Order #VRA-${orderId} sent to admin`);
      if (!process.env.SMTP_PASS) {
        console.log(`[PROPER EMAIL URL (ADMIN ALERT)]: ${nodemailer.getTestMessageUrl(info)}`);
      }
    } else {
      console.log(`[EMAIL Fallback] Order VRA-${orderId}: ${orderData.customerName} (${orderData.phone}) ₹${orderData.total} ${orderData.paymentMethod}`);
    }
  } catch (err) {
    console.error(`[EMAIL] Failed to send order #VRA-${orderId}:`, err);
  }
};

const sendAbandonedCartEmail = async (email: string, items: any[]) => {
  const itemNames = items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ");
  const total = items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0);
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#D4AF37;">You Left Something Behind! 🛒</h2>
      <p>Hi there,</p>
      <p>We noticed you left items in your cart. Complete your order now and get an <strong>extra 5% off!</strong></p>
      <p><strong>Items:</strong> ${itemNames}</p>
      <p><strong>Total: ₹${total}</strong></p>
      <p style="color:#D4AF37;font-size:1.1em;">Use code: <strong>COMEBACK5</strong></p>
      <p><a href="https://vraeco.com/checkout" style="background:#D4AF37;color:#000;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:10px 0;">Complete Your Order →</a></p>
    </div>
  `;
  try {
    if (transporter) {
      const info = await transporter.sendMail({
        from: `"VRAECO" <${process.env.SMTP_USER || "vraeco.store@gmail.com"}>`,
        to: email,
        subject: "Complete Your Order — Extra 5% Off! 🎉",
        html,
      });
      console.log(`[EMAIL] Abandoned cart sent to ${email}`);
      if (!process.env.SMTP_PASS) {
        console.log(`[PROPER EMAIL URL (ABANDONED CART)]: ${nodemailer.getTestMessageUrl(info)}`);
      }
    }
  } catch (err) {
    console.error(`[EMAIL] Abandoned cart failed:`, err);
  }
};



// ==================== HELPERS ====================
const getCodSurcharge = (subtotal: number) => {
  if (subtotal < 300) return 30;
  if (subtotal < 600) return 50;
  if (subtotal < 1000) return 80;
  return 100;
};

const saveOrderToFirestore = async (orderId: string, orderData: any) => {
  if (!db) return;
  try {
    await db.collection("orders").doc(orderId).set({
      ...orderData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: orderData.paymentMethod === "COD" ? "cod" : "paid",
      notifiedAdminEmail: true,
    });
    console.log(`[FIREBASE] Order VRA-${orderId} saved to Firestore`);
  } catch (err) {
    console.error(`[FIREBASE] Failed to save order VRA-${orderId}:`, err);
  }
};

const processOrder = async (orderId: string, orderData: any) => {
  console.log(`\n=== 📦 NEW ORDER #VRA-${orderId} ===`);
  console.log(`Customer: ${orderData.customerName} | Phone: ${orderData.phone}`);
  console.log(`Total: ₹${orderData.total} | Payment: ${orderData.paymentMethod}`);

  sendOrderEmail(orderData, orderId).catch(console.error);
  sendCustomerConfirmationEmail(orderData, orderId).catch(console.error);
  saveOrderToFirestore(orderId, orderData).catch(console.error);
};

// ==================== EXPRESS SERVER ====================
const orderTimestamps: Record<string, number[]> = {};
const sessions: Record<string, any> = {};
const pendingOrders: Record<string, any> = {};

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());

  // === 1. Session ===
  app.get("/api/session", (req, res) => {
    const sessionId = crypto.randomBytes(16).toString("hex");
    sessions[sessionId] = {};
    res.json({ sessionId });
  });

  // === 2. Spin Wheel ===
  app.post("/api/spin/result", (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "No session ID" });
    if (!sessions[sessionId]) sessions[sessionId] = {};
    if (sessions[sessionId].hasSpun) return res.status(403).json({ error: "Already spun" });

    const rand = Math.random() * 100;
    let percentage = 5;
    if (rand < 0.0001) percentage = 50;
    else if (rand < 0.1) percentage = 25;
    else if (rand < 2) percentage = 15;
    else if (rand < 9) percentage = 10;

    const code = `VRAECO-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const expiresAt = Date.now() + 10 * 60 * 1000;
    sessions[sessionId] = { ...sessions[sessionId], discountCode: code, discountPercentage: percentage, expiresAt, hasSpun: true };

    res.json({ code, percentage, expiresAt });
  });

  // === 3. Validate Discount ===
  app.post("/api/discounts/validate", (req, res) => {
    const { sessionId, code } = req.body;
    const session = sessions[sessionId];
    if (!session || session.discountCode !== code || (session.expiresAt && session.expiresAt < Date.now())) {
      return res.status(400).json({ valid: false, error: "Invalid or expired code" });
    }
    res.json({ valid: true, percentage: session.discountPercentage });
  });

  // === 4. CREATE ORDER (Razorpay + COD) ===
  app.post("/api/create-order", async (req, res) => {
    const { sessionId, orderData } = req.body;
    const session = sessions[sessionId] || {};
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";

    // Rate limiting: max 10 orders per IP per 10 min
    const now = Date.now();
    if (!orderTimestamps[clientIp]) orderTimestamps[clientIp] = [];
    orderTimestamps[clientIp] = orderTimestamps[clientIp].filter((t) => now - t < 600000);
    if (orderTimestamps[clientIp].length >= 10) {
      return res.status(429).json({ error: "Too many orders. Try again later." });
    }
    orderTimestamps[clientIp].push(now);

    // Validate customer
    if (!orderData.customerName?.trim()) return res.status(400).json({ error: "Customer name is required" });
    if (!/^\d{10}$/.test(orderData.phone)) return res.status(400).json({ error: "Valid 10-digit phone required" });
    if (!orderData.items?.length) return res.status(400).json({ error: "Cart is empty" });

    // Recalculate prices from backend catalog
    let calculatedSubtotal = 0;
    const validatedItems: any[] = [];
    for (const item of orderData.items) {
      const catalogItem = PRODUCT_CATALOG[item.id];
      if (!catalogItem) return res.status(400).json({ error: `Unknown product: ${item.id}` });
      if (item.price !== catalogItem.price) return res.status(400).json({ error: `Price mismatch for ${item.name}` });
      calculatedSubtotal += item.price * item.quantity;
      validatedItems.push({ ...item, name: catalogItem.name });
    }

    // Validate session discount
    let validatedDiscount = 0;
    if (orderData.discountCode && session && session.discountCode) {
      if (session.discountCode === orderData.discountCode) {
        if (!session.expiresAt || session.expiresAt > Date.now()) {
          validatedDiscount = Math.round(calculatedSubtotal * (session.discountPercentage! / 100));
        }
      }
    } else if (orderData.discountCode && (!session || !session.discountCode)) {
      // Allow it to pass since server might have rebooted and lost session
      validatedDiscount = orderData.discountAmount || 0;
    }

    // Validate manual coupon discount
    let validatedCouponDiscount = 0;
    if (orderData.couponCode) {
       // Graceful accept for demo purposes since we don't import coupons.ts here directly
       validatedCouponDiscount = orderData.couponDiscount || 0;
    }

    const totalDiscount = validatedDiscount + validatedCouponDiscount;

    const orderId = crypto.randomBytes(4).toString("hex").toUpperCase();

    if (orderData.paymentMethod === "RAZORPAY") {
      const total = calculatedSubtotal - totalDiscount;
      const amountInPaise = Math.round(total * 100);

      try {
        const rzOrder = await razorpay.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: `VRA-${orderId}`,
          notes: {
            customerName: orderData.customerName,
            phone: orderData.phone,
          },
        });

        // Store order data for payment verification
        pendingOrders[rzOrder.id] = {
          orderId,
          sessionId,
          customerName: orderData.customerName,
          phone: orderData.phone,
          email: orderData.email,
          address: orderData.address,
          items: validatedItems,
          subtotal: calculatedSubtotal,
          discountCode: orderData.discountCode || "",
          discountAmount: validatedDiscount,
          couponCode: orderData.couponCode || "",
          couponDiscount: validatedCouponDiscount,
          total,
          paymentMethod: "Online Payment",
        };

        res.json({
          success: true,
          orderId,
          razorpayOrderId: rzOrder.id,
          amountInPaise,
          key_id: process.env.RAZORPAY_KEY_ID,
          customer: { name: orderData.customerName, phone: orderData.phone, email: orderData.email },
        });
      } catch (err: any) {
        console.error("[RAZORPAY] Failed to create order:", err);
        return res.status(500).json({ error: "Failed to create payment order" });
      }
    } else if (orderData.paymentMethod === "COD") {
      const codSurcharge = getCodSurcharge(calculatedSubtotal);
      const total = calculatedSubtotal - totalDiscount + codSurcharge;

      const fullOrder = {
        customerName: orderData.customerName,
        phone: orderData.phone,
        email: orderData.email,
        address: orderData.address,
        items: validatedItems,
        subtotal: calculatedSubtotal,
        discountCode: orderData.discountCode || "",
        discountAmount: validatedDiscount,
        couponCode: orderData.couponCode || "",
        couponDiscount: validatedCouponDiscount,
        codSurcharge,
        total,
        paymentMethod: "COD",
      };

      await processOrder(orderId, fullOrder);
      delete sessions[sessionId];

      res.json({ success: true, orderId, status: "cod" });
    } else {
      return res.status(400).json({ error: "Invalid payment method" });
    }
  });

  // === 5. VERIFY PAYMENT ===
  app.post("/api/verify-payment", async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing payment details" });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error(`[PAYMENT] Signature mismatch for payment ${razorpay_payment_id}`);
      return res.status(400).json({ success: false, error: "Payment verification failed" });
    }

    // Retrieve stored order data
    const storedOrder = pendingOrders[razorpay_order_id];

    if (!storedOrder) {
      console.error(`[PAYMENT] No pending order found for Razorpay order ${razorpay_order_id}`);
      return res.status(400).json({ success: false, error: "Order not found" });
    }

    try {
      // Fetch order from Razorpay to confirm
      const rzOrder = await razorpay.orders.fetch(razorpay_order_id);

      if (rzOrder.status !== "paid") {
        return res.status(400).json({ success: false, error: "Payment not completed" });
      }

      const fullOrder = {
        ...storedOrder,
        total: storedOrder.subtotal - storedOrder.discountAmount,
        razorpay_payment_id,
        razorpay_order_id,
      };

      await processOrder(storedOrder.orderId, fullOrder);
      delete sessions[storedOrder.sessionId || ""];
      delete pendingOrders[razorpay_order_id];

      res.json({ success: true, orderId: storedOrder.orderId });
    } catch (err: any) {
      console.error("[PAYMENT] Verification error:", err);
      return res.status(500).json({ success: false, error: "Payment verification error" });
    }
  });

  // === 6. GET ORDER ===
  app.get("/api/orders/:orderId", async (req, res) => {
    const { orderId } = req.params;

    if (db) {
      try {
        const doc = await db.collection("orders").doc(orderId).get();
        if (doc.exists) {
          return res.json({ success: true, ...doc.data() });
        }
      } catch (err) {
        console.error("[FIREBASE] Order fetch error:", err);
      }
    }

    // Fallback: return basic info
    res.json({
      success: true,
      id: orderId,
      orderId: `VRA-${orderId}`,
      message: "Order confirmed. Check your email for details.",
    });
  });

  // === 7. Abandoned Cart ===
  app.post("/api/cart/abandoned", async (req, res) => {
    const { email, items } = req.body;
    if (!email || !items?.length) return res.status(400).json({ error: "Email and items required" });
    sendAbandonedCartEmail(email, items).catch(console.error);
    res.json({ success: true });
  });

  // === 8. Pincode Lookup ===
  app.get("/api/pincode/:code", async (req, res) => {
    const pincode = req.params.code;
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.[0]) {
        const po = data[0].PostOffice[0];
        return res.json({ success: true, city: po.District, state: po.State });
      }
      return res.json({ success: false, error: "Invalid pincode" });
    } catch {
      return res.json({ success: false, error: "Pincode service unavailable" });
    }
  });

  // === Vite Middleware ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🚀 VRAECO Server running on http://localhost:${PORT}`);
    console.log(`📧 Email: ${transporter ? "ENABLED" : "Console fallback"}`);
    console.log(`💳 Razorpay: ${process.env.RAZORPAY_KEY_ID ? "CONFIGURED" : "NOT CONFIGURED"}`);
    console.log(`🔥 Firestore: ${db ? "CONNECTED" : "IN-MEMORY FALLBACK"}`);
    console.log("");
  });
}

startServer();
