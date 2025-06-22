import React, { useState, useEffect } from 'react';
import { AspectRatio } from './ui/aspect-ratio';

interface VideoPlayerProps {
  src: string;
  title: string;
  className?: string;
  lazy?: boolean;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, className = '', lazy = true, thumbnail }) => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(!lazy);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (lazy) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoadIframe(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      const element = document.getElementById(`video-container-${title.replace(/\s+/g, '-').toLowerCase()}`);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [lazy, title]);

  const getEmbedUrl = (url: string): string => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&modestbranding=1&rel=0`;
    }
    
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.split('file/d/')[1]?.split('/')[0];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }

    return url;
  };

  const embedUrl = getEmbedUrl(src);
  const containerId = `video-container-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div id={containerId} className={`w-full rounded-2xl overflow-hidden shadow-xl ${className}`}>
      <AspectRatio ratio={16 / 9} className="bg-gray-200 relative">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
              iframeLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {shouldLoadIframe && (
          <iframe
            src={embedUrl}
            title={title}

            sandbox='allow-scripts allow-same-origin'
            className="w-full h-full absolute inset-0 border-0"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </AspectRatio>
    </div>
  );
};

export default VideoPlayer;
