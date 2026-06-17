import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductImageCardProps {
  image: string;
  name: string;
  aspectRatio?: string;
  className?: string;
  onZoom?: () => void;
}

export default function ProductImageCard({ image, name, className = '', onZoom }: ProductImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-cream via-white to-cream rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full">
        {image.endsWith('.svg') || image.startsWith('/') ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl drop-shadow-[0_0_30px_rgba(201,169,110,0.3)]">
            {image}
          </div>
        )}

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none" />

        {/* Zoom button on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && onZoom ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={onZoom}
            className="absolute bottom-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm border border-gold/30 rounded-full flex items-center justify-center cursor-pointer hover:bg-gold/20 transition-colors"
          >
            <ZoomIn size={14} className="text-gold" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
