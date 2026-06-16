export default function TrustBar() {
  return (
    <div className="bg-cream border-y border-gold/15 py-8 px-5 md:px-10 relative z-[2] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.05)_0%,transparent_70%)]"></div>
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
        {[
          { icon: '🚚', title: 'Free Shipping', desc: 'On all orders' },
          { icon: '🔄', title: 'Easy Returns', desc: '7-day hassle-free' },
          { icon: '💳', title: 'COD Available', desc: 'Pay on delivery' },
          { icon: '🔒', title: 'Secure Checkout', desc: 'SSL Encrypted' },
          { icon: '⭐', title: '4.8/5 Rating', desc: '3,200+ Reviews' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center group w-[140px] sm:w-[160px] md:w-auto">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-[1.5rem] mb-3 border border-edge group-hover:border-gold/30 transition-all duration-300 group-hover:scale-110 shadow-xl">
              {item.icon}
            </div>
            <div className="text-[0.78rem]">
              <strong className="block text-text-main text-[0.85rem] font-bold tracking-[0.5px] mb-0.5">{item.title}</strong>
              <span className="text-text-dim text-[0.7rem] uppercase tracking-[1px]">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
