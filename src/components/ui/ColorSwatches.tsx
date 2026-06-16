import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface ColorSwatch {
  name: string;
  value: string;
  border: string;
}

const colorSwatches: ColorSwatch[] = [
  { name: 'Gold', value: '#c9a84c', border: '#e0c06e' },
  { name: 'Navy', value: '#0d1b3e', border: '#1b2d55' },
  { name: 'Black', value: '#1a1a2e', border: '#2d2d44' },
  { name: 'Silver', value: '#c0c0c0', border: '#d4d4d4' },
  { name: 'Rose Gold', value: '#b76e79', border: '#c98a93' },
  { name: 'White', value: '#f0f0f0', border: '#ffffff' },
];

interface ColorSwatchesProps {
  onSelect?: (colorName: string) => void;
  defaultColor?: string;
}

export default function ColorSwatches({ onSelect, defaultColor }: ColorSwatchesProps) {
  const [selected, setSelected] = useState(defaultColor || colorSwatches[0].name);

  const handleSelect = (color: ColorSwatch) => {
    setSelected(color.name);
    onSelect?.(color.name);
  };

  return (
    <div className="space-y-3">
      <div className="text-[0.75rem] text-text-muted uppercase tracking-[1px] font-display font-semibold">
        Color: <span className="text-text-main">{selected}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colorSwatches.map((color) => {
          const isSelected = selected === color.name;
          return (
            <motion.button
              key={color.name}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(color)}
              className="border-none cursor-pointer p-0 focus:outline-none"
              title={color.name}
            >
              <motion.div
                animate={isSelected ? { scale: 1.15 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="relative"
              >
                <div
                  className={`w-9 h-9 rounded-full transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-gold ring-offset-2 ring-offset-void'
                      : 'ring-1 ring-white/20 hover:ring-white/40'
                  }`}
                  style={{
                    backgroundColor: color.value,
                  }}
                />
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {color.value === '#f0f0f0' || color.value === '#c0c0c0' ? (
                        <Check className="w-4 h-4 text-gray-800" />
                      ) : (
                        <Check className="w-4 h-4 text-gold" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                className="text-center mt-1.5"
                animate={isSelected ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.6 }}
              >
                <span
                  className={`text-[0.6rem] font-display uppercase tracking-[0.5px] ${
                    isSelected ? 'text-gold font-bold' : 'text-text-dim'
                  }`}
                >
                  {color.name}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
