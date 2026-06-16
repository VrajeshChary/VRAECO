import { motion } from 'motion/react';
import { Truck } from 'lucide-react';

export default function FreeShippingBar() {
  return (
    <div className="bg-text-main py-1.5 text-center">
      <div className="text-[0.65rem] text-void/90 font-semibold tracking-[1px] uppercase flex items-center justify-center gap-2">
        <Truck size={12} /> Free Shipping on All Orders Across India
      </div>
    </div>
  );
}