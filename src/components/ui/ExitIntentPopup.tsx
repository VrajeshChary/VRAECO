import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import confetti from 'canvas-confetti';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [localDiscount, setLocalDiscount] = useState<number | null>(null);
  const [suspenseText, setSuspenseText] = useState('');
  
  const [isExitIntent, setIsExitIntent] = useState(false);
  
  const hasSpun = useStore((state) => state.hasSpun);
  const setHasSpun = useStore((state) => state.setHasSpun);
  const setDiscountStore = useStore((state) => state.setDiscount);
  const currentDiscount = useStore((state) => state.discount);

  // 8 slices: 5, 10, 5, 15, 5, 25, 5, 50
  const actualSlices = [5, 10, 5, 15, 5, 25, 5, 50];
  const sliceAngle = 360 / actualSlices.length;

  useEffect(() => {
    if (hasSpun && currentDiscount) {
      setHasShown(true);
      return;
    }

    // Show on entry after 15 seconds
    const entryTimer = setTimeout(() => {
      if (!hasShown && !hasSpun) {
        setHasShown(true);
        setIsExitIntent(false);
        setShow(true);
      }
    }, 15000);

    // Show on exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5 && !hasShown && !hasSpun) {
        setHasShown(true);
        setIsExitIntent(true);
        setShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(entryTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, hasSpun, currentDiscount]);

  const sessionId = useStore((state) => state.sessionId);

  const spinWheel = async () => {
    if (hasSpun || spinning || !sessionId) return;
    setSpinning(true);
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
      
      // Add a small delay to simulate calculation for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      setSuspenseText('Try again later');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-text-main/80 backdrop-blur-xl z-[500] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-surface border border-gold/20 max-w-[900px] w-full p-8 md:p-12 relative shadow-[0_0_80px_rgba(201,169,110,0.2)] rounded-3xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        
        <button 
          onClick={() => setShow(false)}
          className="absolute top-6 right-6 bg-transparent border-none text-text-dim text-[1.5rem] cursor-pointer transition-colors hover:text-gold z-[10]"
        >
          ✕
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="font-serif text-[2.5rem] md:text-[3rem] font-light leading-[1.1] mb-4">
              {isExitIntent ? (
                <>Wait! Take <em className="italic text-gold">15% OFF</em><br/>Or Spin to Win!</>
              ) : (
                <>Spin to <em className="italic text-gold">Unlock</em><br/>Your Discount</>
              )}
            </h2>
            <p className="text-[0.9rem] text-text-muted mb-8 leading-[1.6]">
              {isExitIntent 
                ? "We don't want you to leave empty-handed! Use code VRAE15 for 15% off, or spin the wheel for a chance to win up to 50% OFF your entire order."
                : "Don't miss out! Spin the wheel for a chance to win up to 50% OFF your entire order. Every spin is a winner!"
              }
            </p>
            
            {!hasSpun ? (
              <div className="flex flex-col gap-4 max-w-[320px] mx-auto md:mx-0">
                {isExitIntent && (
                  <div className="bg-gold/10 border border-gold/30 p-4 rounded-xl mb-2 text-center">
                    <div className="text-[0.6rem] uppercase tracking-[2px] text-gold mb-1">Instant Offer</div>
                    <div className="font-display text-[1.2rem] text-gold tracking-[4px]">VRAE15</div>
                    <div className="text-[0.6rem] text-text-dim mt-1">15% OFF · VALID FOR 10 MINS</div>
                  </div>
                )}
                
                <AnimatePresence mode="wait">
                  {spinning && (
                    <motion.div
                      key="suspense"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[0.75rem] text-gold tracking-[2px] uppercase font-bold text-center h-5"
                    >
                      {suspenseText}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={spinWheel}
                  disabled={spinning || !sessionId}
                  className={`w-full bg-gold text-void border-none py-5 font-display text-[0.75rem] font-bold tracking-[3px] uppercase cursor-pointer transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] rounded-xl flex items-center justify-center gap-3 ${spinning || !sessionId ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_15px_40px_rgba(201,169,110,0.5)]'}`}
                >
                  {spinning ? (
                    <>
                      <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin"></span>
                      SPINNING...
                    </>
                  ) : !sessionId ? 'INITIALIZING...' : 'CLICK TO SPIN'}
                </motion.button>
                <button 
                  onClick={() => {
                    if (isExitIntent) {
                      setDiscountStore({ code: 'VRAE15', percentage: 15, expiresAt: Date.now() + 600000 });
                      setHasSpun(true);
                      setLocalDiscount(15);
                    } else {
                      setShow(false);
                    }
                  }}
                  className="bg-transparent border-none text-[0.72rem] text-text-dim cursor-pointer underline underline-offset-4 mt-2 hover:text-text-main"
                >
                  {isExitIntent ? "I'll take the 15% OFF" : "No thanks, I'll pay full price"}
                </button>
              </div>
            ) : (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-raised border border-gold/20 p-8 text-center rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
                <div className="relative z-10">
                  <div className={`font-serif text-[4rem] font-bold leading-none mb-2 ${localDiscount === 50 ? 'text-gold animate-bounce' : 'text-text-main'}`}>
                    {localDiscount}% OFF
                  </div>
                  <div className="text-[0.9rem] text-text-muted mb-6">Congratulations! You unlocked a {localDiscount}% discount.</div>
                  <div className="font-display text-[1rem] tracking-[4px] text-gold border-2 border-dashed border-gold/40 px-6 py-3 inline-block bg-gold/10 rounded-lg group-hover:scale-110 transition-transform duration-500">
                    {currentDiscount?.code}
                  </div>
                  <p className="text-[0.65rem] text-jade mt-4 font-semibold uppercase tracking-[1px] flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-jade rounded-full animate-pulse"></span>
                    Auto-applied at checkout (Expires in 10m)
                  </p>
                  <button 
                    onClick={() => setShow(false)}
                    className="w-full bg-gold text-void mt-6 py-4 font-display text-[0.7rem] font-bold tracking-[2px] uppercase rounded-full hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-gold drop-shadow-[0_4px_10px_rgba(201,169,110,0.6)] z-[20]"></div>
              
              <div 
                className="w-full h-full rounded-full border-[6px] border-gold-dim relative overflow-hidden shadow-[0_0_60px_rgba(201,169,110,0.3)] bg-text-main"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                }}
              >
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
                
                {/* 50% Jackpot Slice Highlight & Glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom w-[45deg] bg-gradient-to-t from-gold/40 to-gold shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                    style={{ 
                      transform: `rotate(315deg)`,
                      clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
                    }}
                  ></div>
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom w-[45deg] bg-gold/20 animate-pulse"
                    style={{ 
                      transform: `rotate(315deg)`,
                      clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
                    }}
                  ></div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  {actualSlices.map((slice, i) => {
                    const angle = i * sliceAngle;
                    // Keep text readable: flip if in the bottom half (90 to 270)
                    const needsFlip = angle > 90 && angle < 270;
                    return (
                      <div 
                        key={i} 
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom flex items-start justify-center pt-6"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        <div 
                          className={`font-display text-[1rem] sm:text-[1.2rem] font-black tracking-tighter flex flex-col items-center ${slice === 50 ? 'text-void' : 'text-gold/90'}`}
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-void rounded-full border-[4px] border-gold flex items-center justify-center font-display text-[0.6rem] tracking-[2px] text-gold z-[10] shadow-[0_0_20px_rgba(201,169,110,0.5)]">
                  VRAECO
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
