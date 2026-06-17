import { motion } from 'motion/react';

export default function PressMentions() {
  const mentions = [
    { name: 'YourStory', quote: 'VRAECO is democratizing access to quality home products for middle India.' },
    { name: 'Inc42', quote: 'The next unicorn from India\'s D2C revolution.' },
    { name: 'Economic Times', quote: 'Redefining impulse buying with purpose-driven products.' },
  ];

  return (
    <section className="py-16 bg-deep relative z-[2] border-y border-edge/30">
      <div className="section-inner">
        <div className="text-center mb-10">
          <div className="text-[0.65rem] uppercase tracking-[3px] text-text-dim mb-2">As Featured In</div>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {mentions.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center max-w-[200px]"
              >
                <div className="text-[0.9rem] text-gold font-display font-bold tracking-[2px] mb-1">{m.name}</div>
                <p className="text-[0.68rem] text-text-dim italic">"{m.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
