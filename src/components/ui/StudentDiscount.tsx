import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Tag, Percent, Users, Calendar, Gift } from 'lucide-react';

export default function StudentDiscount() {
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-[0.8rem] text-gold hover:underline bg-transparent border-none cursor-pointer">
        Student? Get 15% OFF
      </button>

      {open && (
        <div className="fixed inset-0 z-[10000] bg-text-main/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-surface border border-edge rounded-2xl p-8 max-w-[420px] w-full text-center relative">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-text-dim bg-transparent border-none cursor-pointer"><X size={20} /></button>

            <Tag size={32} className="text-gold mx-auto mb-4" />
            <h2 className="font-serif text-[1.8rem] mb-2">Student Discount</h2>
            <p className="text-[0.85rem] text-text-muted mb-6">Verify your student status and get 15% OFF every order.</p>

            {!verified ? (
              <div className="space-y-3">
                <input type="email" placeholder="Your college email (.edu)" className="w-full bg-raised border border-edge rounded-lg px-4 py-3 text-[0.85rem] text-text-main outline-none focus:border-gold" />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setVerified(true)} className="w-full bg-gold text-void py-3 rounded-xl font-bold text-[0.8rem] border-none cursor-pointer">
                  Verify & Get 15% OFF
                </motion.button>
                <p className="text-[0.65rem] text-text-dim">We'll send a verification link to your college email</p>
              </div>
            ) : (
              <div className="bg-jade/10 border border-jade/20 rounded-xl p-4">
                <p className="text-[1.2rem] text-jade font-bold">Verified!</p>
                <p className="text-[0.8rem] text-text-muted mt-1">Code: <strong className="text-gold">STUDENT15</strong> — applied at checkout</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
