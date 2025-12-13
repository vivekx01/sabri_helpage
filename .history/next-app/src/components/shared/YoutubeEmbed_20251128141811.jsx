import React from 'react';

const YoutubeEmbed = ({ videoId, title }) => (
  <div className="space-y-3">
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
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

export default YoutubeEmbed;
