import { useState } from 'react';

export default function ReviewPhotoGrid({ photos }: { photos: { url: string; alt: string }[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!photos.length) return null;

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {photos.slice(0, 8).map((photo, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
              expanded === i ? 'border-gold scale-110' : 'border-edge hover:border-gold/30'
            }`}
          >
            <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {expanded !== null && (
        <div className="fixed inset-0 z-[9999] bg-text-main/90 backdrop-blur-md flex items-center justify-center" onClick={() => setExpanded(null)}>
          <img src={photos[expanded].url} alt={photos[expanded].alt} className="max-w-[90vw] max-h-[90vh] object-contain" />
        </div>
      )}
    </>
  );
}
