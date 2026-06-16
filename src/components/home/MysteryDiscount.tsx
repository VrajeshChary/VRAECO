import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import confetti from 'canvas-confetti';

export default function MysteryDiscount() {
  const hasSpun = useStore((state) => state.hasSpun);
  const setHasSpun = useStore((state) => state.setHasSpun);
  const setDiscountStore = useStore((state) => state.setDiscount);
  const currentDiscount = useStore((state) => state.discount);
  
  const sessionId = useStore((state) => state.sessionId);
  
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [localDiscount, setLocalDiscount] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [suspenseText, setSuspenseText] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 8 slices: 5, 10, 5, 15, 5, 25, 5, 50
  const actualSlices = [5, 10, 5, 15, 5, 25, 5, 50];
  const sliceAngle = 360 / actualSlices.length;

  useEffect(() => {
    if (hasSpun && currentDiscount) {
      setLocalDiscount(currentDiscount.percentage);
      setShowResult(true);
    }
  }, [hasSpun, currentDiscount]);

  const spinWheel = async () => {
    if (hasSpun || spinning || !sessionId) return;
    setSpinning(true);
    setShowResult(false);
    setSuspenseText('Calculating your fate...');
    
    try {
      const response = await fetch('/api/spin/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      
      if (!response.ok) throw new Error('Failed to fetch spin result');
      
      const { code, percentage, expiresAt } = await response.json();
      const result = percentage;
      
      const matchingIndices = actualSlices.map((val, idx) => val === result ? idx : -1).filter(idx => idx !== -1);
      const targetIdx = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];
      
      const fullRotations = 8 + Math.floor(Math.random() * 5);
      const randomOffset = (Math.random() * (sliceAngle - 10)) - ((sliceAngle - 10) / 2);
      const targetRotation = (fullRotations * 360) + (360 - (targetIdx * sliceAngle)) + randomOffset;
      
      setRotation(targetRotation);
      
      setTimeout(() => setSuspenseText('Almost there...'), 1500);
      setTimeout(() => setSuspenseText('Wait for it...'), 3000);
      
      setTimeout(() => {
        setLocalDiscount(result);
        setHasSpun(true);
        setDiscountStore({
          code,
          percentage: result,
          expiresAt
        });
        setSpinning(false);
        setShowResult(true);
        setSuspenseText('');

        if (result >= 25) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#c9a96e', '#ffffff', '#ff4500']
          });
        }
      }, 4500);
    } catch {
      setSpinning(false);
      setSuspenseText('Failed to calculate discount');
    }
  };

  return (
    <section className="py-20 bg-deep overflow-hidden relative z-[2]" id="mystery">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,169,110,0.05)_0%,transparent_70%)]"></div>
      
      <div className="section-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-label"
            >
              Exclusive Offer
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] mb-3"
            >
              Spin to <em className="italic text-gold">Unlock</em><br/>Your Discount
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-sub mb-6"
            >
              Every spin wins something. Most people get 5–15%. Legends get 50%. One spin per email — no tricks, just rewards.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="list-none mt-6 space-y-0"
            >
              {[
                { text: <>Minimum guaranteed discount: <strong className="text-text-main">5%</strong></> },
                { text: 'Most users receive between 5% and 15%' },
                { text: <>Rare jackpot exists: <strong className="text-text-main">50% OFF</strong> (Legendary)</> },
                { text: 'Discount applied automatically at checkout' },
                { text: 'Valid on your next order · Expires in 10 minutes' }
              ].map((item, i) => (
                <li key={i} className="text-[0.88rem] text-text-muted py-2 border-b border-edge flex items-center gap-3">
                  <span className="text-gold text-[0.5rem] shrink-0">◆</span>
                  {item.text}
                </li>
              ))}
            </motion.ul>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[440px] md:h-[440px]">
              {/* Pointer */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] sm:border-l-[20px] border-l-transparent border-r-[15px] sm:border-r-[20px] border-r-transparent border-t-[30px] sm:border-t-[40px] border-t-gold drop-shadow-[0_10px_20px_rgba(212,175,55,0.6)] z-[30] animate-bounce"></div>
              
              {/* Rim Dots */}
              <div className="absolute inset-[-15px] rounded-full border-[2px] border-gold/20 pointer-events-none z-10">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-gold/40 rounded-full [--rim-radius:-155px] sm:[--rim-radius:-185px] md:[--rim-radius:-235px]"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 15}deg) translateY(var(--rim-radius))`,
                      transformOrigin: '0 0',
                    }}
                  ></div>
                ))}
              </div>

              <div 
                className="w-full h-full rounded-full border-[10px] border-void relative overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] bg-void"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                }}
              >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full border-[2px] border-gold/30 animate-pulse"></div>
                
                {/* Wheel Background Slices */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: `conic-gradient(
                    from -22.5deg,
                    #e8e8e8 0deg 45deg,
                    #f5f5f5 45deg 90deg,
                    #e8e8e8 90deg 135deg,
                    #f5f5f5 135deg 180deg,
                    #e8e8e8 180deg 225deg,
                    #f5f5f5 225deg 270deg,
                    #e8e8e8 270deg 315deg,
                    #d4af37 315deg 360deg
                  )`
                }}></div>

                {/* Slice Borders */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-gold/10 origin-bottom"
                      style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}
                    ></div>
                  ))}
                </div>
                
                {/* 50% Jackpot Slice Highlight */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom w-[45deg] bg-gradient-to-t from-gold/40 to-gold/60 animate-pulse"
                    style={{ transform: `rotate(315deg)`, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  ></div>
                </div>
                
                {/* Wheel Numbers */}
                <div className="absolute inset-0 pointer-events-none">
                  {actualSlices.map((slice, i) => {
                    const angle = i * sliceAngle;
                    // Keep text readable: flip if in the bottom half (90 to 270)
                    const needsFlip = angle > 90 && angle < 270;
                    return (
                      <div 
                        key={i} 
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom flex items-start justify-center pt-6 sm:pt-8 md:pt-10"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        <div 
                          className={`font-display text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] font-black tracking-tighter flex flex-col items-center ${slice === 50 ? 'text-void' : 'text-gold/90'}`}
                          style={{ 
                            transform: needsFlip ? 'rotate(180deg) translateY(10px)' : 'rotate(0deg)',
                            textShadow: slice === 50 ? 'none' : '0 2px 4px rgba(0,0,0,0.5)'
                          }}
                        >
                          <span>{slice}</span>
                          <span className="text-[0.6em] -mt-1">%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-void rounded-full border-[4px] border-gold flex flex-col items-center justify-center z-[20] shadow-[0_0_40px_rgba(212,175,55,0.5)]">
                  <div className="text-[0.45rem] sm:text-[0.55rem] tracking-[2px] sm:tracking-[3px] text-gold font-bold mb-0.5">VRAECO</div>
                  <div className="w-4 sm:w-6 h-[1px] bg-gold/30"></div>
                  <div className="text-[0.35rem] sm:text-[0.45rem] tracking-[1px] text-gold/60 mt-0.5 uppercase">Insiders</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-6 w-full max-w-[340px]">
              <AnimatePresence mode="wait">
                {spinning && (
                  <motion.div
                    key="suspense"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-[0.9rem] text-gold tracking-[4px] uppercase font-black text-center h-8 flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-gold rounded-full animate-ping"></span>
                    {suspenseText}
                    <span className="w-2 h-2 bg-gold rounded-full animate-ping"></span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={spinWheel}
                disabled={hasSpun || spinning}
                className={`w-full bg-gold text-void border-none py-5 font-display text-[0.75rem] font-black tracking-[4px] uppercase cursor-pointer transition-all shadow-[0_15px_40px_rgba(212,175,55,0.3)] rounded-xl flex items-center justify-center gap-3 ${hasSpun || spinning ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
              >
                {spinning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin"></span>
                    SPINNING...
                  </>
                ) : hasSpun ? 'DISCOUNT UNLOCKED' : 'CLICK TO SPIN'}
              </motion.button>

              {!hasSpun && !spinning && (
                <button 
                  onClick={() => setHasSpun(true)}
                  className="text-[0.7rem] text-text-dim hover:text-gold transition-colors underline underline-offset-4 bg-transparent border-none cursor-pointer uppercase tracking-widest"
                >
                  No thanks, I'll pay full price
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {showResult && currentDiscount && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="text-center p-8 bg-raised border border-gold/20 mt-4 rounded-2xl relative overflow-hidden group w-full max-w-[320px]"
                >
                  <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="text-[0.7rem] uppercase tracking-[3px] text-text-dim mb-2">You Won</div>
                    <div className={`font-serif text-[4rem] font-bold leading-none mb-2 ${localDiscount === 50 ? 'text-gold animate-bounce' : 'text-text-main'}`}>
                      {localDiscount}%
                    </div>
                    <div className="text-[0.8rem] text-text-muted mb-4">OFF your next order!</div>
                    <p className="text-[0.75rem] text-jade font-semibold">Your exclusive discount is unlocked!</p>
                    <p className="text-[0.6rem] text-text-dim mt-2 uppercase tracking-[1px]">Auto-applied at checkout · Expires in 10 mins</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
