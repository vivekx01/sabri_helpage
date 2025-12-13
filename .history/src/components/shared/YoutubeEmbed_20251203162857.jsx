import React, { useState } from 'react';

const YoutubeEmbed = ({ videoId, title }) => {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="space-y-3">
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: '56.25%' }}>
        {loaded ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="absolute inset-0 w-full h-full group"
            onClick={() => setLoaded(true)}
            aria-label="Play video"
          >
            <img src={thumb} alt={title} className="w-full h-full object-cover" />
            <span className="absolute inset-0 bg-black/35 transition group-hover:bg-black/30" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-red-600 text-white grid place-items-center shadow-lg group-hover:scale-105 transition">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
            </span>
          </button>
        )}
      </div>

      <a
        href="https://www.youtube.com/@sabrihelpage167"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-700 transition"
      >
        YouTube
      </a>
    </div>
  );
};

export default YoutubeEmbed;
