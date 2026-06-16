import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Ruler, X, Info, Shirt } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const toDisplay = (value: number) => {
    return unit === 'inches' ? value : Math.round(value * 2.54);
  };

  const unitLabel = unit === 'inches' ? '"' : ' cm';

  const sizes = [
    { label: 'XS', bust: toDisplay(32), waist: toDisplay(26), hip: toDisplay(35) },
    { label: 'S', bust: toDisplay(34), waist: toDisplay(28), hip: toDisplay(37) },
    { label: 'M', bust: toDisplay(36), waist: toDisplay(30), hip: toDisplay(39) },
    { label: 'L', bust: toDisplay(38), waist: toDisplay(32), hip: toDisplay(41) },
    { label: 'XL', bust: toDisplay(40), waist: toDisplay(34), hip: toDisplay(43) },
    { label: 'XXL', bust: toDisplay(42), waist: toDisplay(36), hip: toDisplay(45) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-main/70 backdrop-blur-sm z-[500]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-[501] max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-surface border border-gold/20 rounded-2xl p-6 md:p-8 glass-card shadow-2xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-raised border border-edge rounded-full flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-colors border-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-serif text-[1.4rem] text-text-main">
                  Size Guide
                </h2>
              </div>

              <div className="bg-raised/50 border border-gold/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[0.82rem] text-text-main font-medium mb-0.5">
                    Measure yourself for best fit
                  </p>
                  <p className="text-[0.72rem] text-text-muted leading-relaxed">
                    Use a soft tape measure. For the most accurate fit, measure over light clothing.
                    If you are between sizes, we recommend going with the larger size for a comfortable fit.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-5">
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-4 py-1.5 rounded-full text-[0.72rem] font-bold font-display transition-all border-none cursor-pointer ${
                    unit === 'inches'
                      ? 'bg-gold text-void'
                      : 'bg-raised text-text-muted border border-edge hover:text-gold'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-4 py-1.5 rounded-full text-[0.72rem] font-bold font-display transition-all border-none cursor-pointer ${
                    unit === 'cm'
                      ? 'bg-gold text-void'
                      : 'bg-raised text-text-muted border border-edge hover:text-gold'
                  }`}
                >
                  Centimeters
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gold/30">
                      <th className="text-left py-3 px-4 text-[0.68rem] uppercase tracking-[1.5px] text-gold font-display font-bold">
                        <div className="flex items-center gap-1.5">
                          <Shirt className="w-3.5 h-3.5" />
                          Size
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 text-[0.68rem] uppercase tracking-[1.5px] text-gold font-display font-bold">
                        Bust
                      </th>
                      <th className="text-center py-3 px-4 text-[0.68rem] uppercase tracking-[1.5px] text-gold font-display font-bold">
                        Waist
                      </th>
                      <th className="text-center py-3 px-4 text-[0.68rem] uppercase tracking-[1.5px] text-gold font-display font-bold">
                        Hip
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, index) => (
                      <motion.tr
                        key={size.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-edge/50 hover:bg-gold/5 transition-colors ${
                          index === 0 ? 'border-t border-edge/50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <span className="bg-raised border border-edge text-text-main font-bold text-[0.75rem] px-3 py-0.5 rounded-md font-display inline-block min-w-[36px] text-center">
                            {size.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-[0.85rem] text-text-main">
                          {size.bust}{unitLabel}
                        </td>
                        <td className="py-3 px-4 text-center text-[0.85rem] text-text-main">
                          {size.waist}{unitLabel}
                        </td>
                        <td className="py-3 px-4 text-center text-[0.85rem] text-text-main">
                          {size.hip}{unitLabel}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[0.72rem] text-text-dim">
                  All measurements are approximate. Please allow ±1-2{unitLabel.split(" ")[0]} variance.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
