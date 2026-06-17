import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Category } from '../../data/products';
import { categoryLabels } from '../../data/products';

const specTemplates: Record<Category, { label: string; value: (product: any) => string }[]> = {
  'kitchen-essentials': [
    { label: 'Material', value: () => 'Food-grade ABS plastic + Stainless Steel blades' },
    { label: 'Weight', value: () => '150g - 500g (varies by product)' },
    { label: 'Dimensions', value: () => 'Compact — fits in standard kitchen drawer' },
    { label: 'Care', value: () => 'Hand wash recommended; top-rack dishwasher safe' },
    { label: 'What\'s in the Box', value: (p) => `1x ${p.name.split(' | ')[0]} unit` },
  ],
  'health-wellness': [
    { label: 'Material', value: () => 'Medical-grade silicone ABS plastic + natural jade stone' },
    { label: 'Weight', value: () => '80g - 300g (varies by product)' },
    { label: 'Usage', value: () => '15-30 minutes daily recommended' },
    { label: 'Care', value: () => 'Wipe clean with damp cloth after each use' },
    { label: 'What\'s in the Box', value: (p) => `1x ${p.name.split(' | ')[0]} unit + care instructions` },
  ],
  'tech-productivity': [
    { label: 'Material', value: () => 'Aircraft-grade aluminum Alloy + ABS plastic' },
    { label: 'Weight', value: () => '250g - 800g (varies by product)' },
    { label: 'Compatibility', value: () => 'Universal — fits most laptops/phones 10-17 inches' },
    { label: 'Care', value: () => 'Wipe with microfiber cloth; avoid moisture on electronic parts' },
    { label: 'What\'s in the Box', value: (p) => `1x ${p.name.split(' | ')[0]} unit + user manual` },
  ],
  'home-decor': [
    { label: 'Material', value: () => 'Premium acrylic resin + metal base' },
    { label: 'Weight', value: () => '200g - 1kg (varies by product)' },
    { label: 'Power', value: () => 'USB-C or battery operated (product-specific)' },
    { label: 'Care', value: () => 'Dust regularly with soft cloth; avoid direct sunlight' },
    { label: 'What\'s in the Box', value: (p) => `1x ${p.name.split(' | ')[0]} unit + power cable/adapter` },
  ],
  'personal-care': [
    { label: 'Material', value: () => 'BPA-free food-grade ABS plastic + stainless steel' },
    { label: 'Weight', value: () => '50g - 200g (varies by product)' },
    { label: 'Shelf Life', value: () => 'N/A — reusable product' },
    { label: 'Care', value: () => 'Rinse after use; store in dry place' },
    { label: 'What\'s in the Box', value: (p) => `1x ${p.name.split(' | ')[0]} unit` },
  ],
  fashion: [
    { label: 'Material', value: () => 'American diamond alloy + plated metal' },
    { label: 'Weight', value: () => '30g - 150g (varies by product)' },
    { label: 'Size', value: () => 'One size fits most (adjustable)' },
    { label: 'Care', value: () => 'Store in jewelry box; avoid water and perfume contact' },
    { label: 'What\'s in the Box', value: (p) => `1x ${p.name.split(' | ')[0]} set in gift box` },
  ],
};

export default function ProductSpecs({ product }: { product: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const specs = specTemplates[product.category] || [];

  return (
    <div className="bg-surface border border-edge rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-transparent border-none cursor-pointer"
      >
        <h3 className="font-serif text-[1.1rem] text-text-main">Product Specifications</h3>
        <ChevronDown
          size={20}
          className={`text-text-dim transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="border-t border-edge"
        >
          <table className="w-full text-[0.82rem]">
            <tbody>
              <tr className="border-b border-edge">
                <td className="py-3 px-4 text-text-dim font-medium w-[40%]">Brand</td>
                <td className="py-3 px-4 text-text-main">VRAECO</td>
              </tr>
              <tr className="border-b border-edge">
                <td className="py-3 px-4 text-text-dim font-medium">SKU</td>
                <td className="py-3 px-4 text-text-main font-mono text-[0.75rem]">{product.sku}</td>
              </tr>
              <tr className="border-b border-edge">
                <td className="py-3 px-4 text-text-dim font-medium">Category</td>
                <td className="py-3 px-4 text-text-main">{categoryLabels[product.category]}</td>
              </tr>
              {specs.map((spec, i) => (
                <tr key={i} className={i === specs.length - 1 ? '' : 'border-b border-edge'}>
                  <td className="py-3 px-4 text-text-dim font-medium">{spec.label}</td>
                  <td className="py-3 px-4 text-text-main">{spec.value(product)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
