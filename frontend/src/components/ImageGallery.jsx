// components/ImageGallery.jsx
// Large gallery for the Property Details page - one big image with
// a thumbnail strip below it.

import React, { useState } from 'react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=60';

const ImageGallery = ({ images = [] }) => {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : [{ image_url: PLACEHOLDER }];

  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl overflow-hidden bg-surface-800 h-72 md:h-[420px]">
        <img
          src={list[active].image_url}
          alt={`Property image ${active + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {list.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {list.map((img, idx) => (
            <button
              key={img._id || idx}
              onClick={() => setActive(idx)}
              className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                idx === active ? 'border-primary-400' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img.image_url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
