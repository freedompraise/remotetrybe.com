
import React, { useState, useEffect } from 'react';
import { AspectRatio } from './ui/aspect-ratio';

interface VideoPlayerProps {
  src: string;
  title: string;
  className?: string;
  lazy?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, className = '', lazy = true }) => {
  const [loaded, setLoaded] = useState(!lazy);

  useEffect(() => {
    if (lazy) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoaded(true);
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

  // Determine if it's a YouTube or Google Drive video
  const getEmbedUrl = (url: string): string => {
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&modestbranding=1&rel=0`;
    }
    
    // Google Drive URL
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.split('file/d/')[1]?.split('/')[0];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    
    // Return the original URL if no patterns match
    return url;
  };

  const embedUrl = getEmbedUrl(src);
  const containerId = `video-container-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div id={containerId} className={`w-full rounded-2xl overflow-hidden shadow-xl ${className}`}>
      <AspectRatio ratio={16/9} className="bg-gray-200">
        {loaded ? (
          <iframe
            src={embedUrl}
            title={title}
            allowFullScreen
            className="w-full h-full absolute inset-0 border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-600">Loading {title}...</p>
          </div>
        )}
      </AspectRatio>
    </div>
  );
};

export default VideoPlayer;
