import { Helmet } from '../components/Helmet';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function ReturnsRefunds() {
  const steps = [
    {
      title: "Initiate Return",
      desc: "Contact us via email or our contact form within 7 days of receiving your order. Provide your order ID and the reason for return.",
      icon: "📧"
    },
    {
      title: "Pack Item",
      desc: "Ensure the item is in its original packaging, unused, and with all tags attached. Include the original invoice.",
      icon: "📦"
    },
    {
      title: "Ship Back",
      desc: "Ship the item back to our warehouse. We recommend using a trackable shipping service. You are responsible for return shipping costs.",
      icon: "🚚"
    },
    {
      title: "Inspection & Refund",
      desc: "Once we receive and inspect the item, we'll process your refund within 3-5 business days. You'll receive a confirmation email.",
      icon: "💰"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Returns & Refunds | VRAECO — Easy 7-Day Returns Process</title>
        <meta name="description" content="Learn how to return your VRAECO order in 4 simple steps. 7-day hassle-free returns, full refund within 3-5 business days. Contact support for help." />
        <link rel="canonical" href="https://vraeco.com/returns-refunds" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
      <div className="section-inner max-w-[900px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-[3rem] mb-4 text-gold">Returns & Refunds</h1>
          <p className="text-text-muted max-w-[600px] mx-auto">We want you to be 100% satisfied with your purchase. If things aren't quite right, here's how we handle returns.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface border border-edge p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 text-[3rem] opacity-10 group-hover:opacity-20 transition-opacity">
                {step.icon}
              </div>
              <div className="text-gold font-serif text-[2rem] mb-4 opacity-30">0{idx + 1}</div>
              <h3 className="font-serif text-[1.4rem] mb-3 text-text-main">{step.title}</h3>
              <p className="text-text-muted text-[0.9rem] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-raised border border-edge p-10 text-center">
          <h2 className="font-serif text-[1.8rem] mb-6">Need help with a return?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-gold text-void px-8 py-3 font-display text-[0.7rem] font-bold tracking-[2px] uppercase transition-all hover:shadow-[0_0_20px_rgba(201,169,110,0.3)]"
            >
              Contact Support
            </Link>
            <a 
              href="mailto:vraeco.store@gmail.com" 
              className="w-full sm:w-auto bg-transparent border border-edge text-text-main px-8 py-3 font-display text-[0.7rem] font-bold tracking-[2px] uppercase transition-all hover:border-gold hover:text-gold"
            >
              Email Us
            </a>
          </div>
          <p className="mt-6 text-[0.75rem] text-text-dim italic">Please read our full <Link to="/refund-policy" className="text-gold underline">Refund Policy</Link> for more details.</p>
        </div>
      </div>
    </main>
    </>
  );
}
