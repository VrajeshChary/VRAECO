import { useState } from 'react';
import { Star, ThumbsUp, Camera } from 'lucide-react';

export default function ReviewFilterBar({ filter, onFilter }: {
  filter: { stars: number; sort: string; photosOnly: boolean };
  onFilter: (f: { stars: number; sort: string; photosOnly: boolean }) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-6">
      {/* Star Filter */}
      <div className="flex items-center gap-1">
        {[0, 5, 4, 3, 2, 1].map((num) => (
          <button
            key={num}
            onClick={() => onFilter({ ...filter, stars: num })}
            className={`px-2.5 py-1 rounded text-[0.7rem] border transition-colors bg-transparent cursor-pointer ${
              filter.stars === num
                ? 'bg-gold/10 border-gold text-gold'
                : 'bg-surface border-edge text-text-muted hover:border-gold/50'
            }`}
          >
            {num === 0 ? 'All' : `${num}★`}
          </button>
        ))}
      </div>

      <button
        onClick={() => onFilter({ ...filter, photosOnly: !filter.photosOnly })}
        className={`flex items-center gap-1 px-2.5 py-1 rounded text-[0.7rem] border transition-colors ${
          filter.photosOnly ? 'bg-gold/10 border-gold text-gold' : 'bg-surface border-edge text-text-muted'
        }`}
      >
        <Camera size={12} /> Photos only
      </button>

      {/* Sort */}
      <select
        value={filter.sort}
        onChange={(e) => onFilter({ ...filter, sort: e.target.value })}
        className="bg-surface border border-edge text-text-main text-[0.7rem] px-3 py-1 rounded outline-none focus:border-gold cursor-pointer"
      >
        <option value="newest">Newest first</option>
        <option value="helpful">Most helpful</option>
        <option value="highest">Highest rated</option>
        <option value="lowest">Lowest rated</option>
      </select>
    </div>
  );
}