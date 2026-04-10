import React, { useState, useEffect, useId, useCallback } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface VideoPlayerProps {
  src: string;
  title: string;
  className?: string;
  lazy?: boolean;
  thumbnail?: string;
  /** Hint for LCP when this player is above the fold */
  thumbnailFetchPriority?: "high" | "low" | "auto";
  /**
   * Above-the-fold: start loading media immediately (no intersection delay),
   * use eager iframe / aggressive video preload, and prefer fast paths.
   */
  priority?: boolean;
  /**
   * Direct MP4/WebM URL (e.g. `/videos/clip.mp4`). Uses native &lt;video&gt; with preload
   * for much faster first frame than Drive; `src` is still used as embed fallback if the file fails.
   */
  directSrc?: string;
}

const DIRECT_VIDEO_RE = /\.(mp4|webm|ogg)(\?|#|$)/i;

function getYoutubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m?.[1] ?? null;
}

function getDriveFileId(url: string): string | null {
  if (!url.includes("drive.google.com/file/d/")) return null;
  return url.split("file/d/")[1]?.split("/")[0] ?? null;
}

function getEmbedUrl(url: string): string {
  const yt = getYoutubeId(url);
  if (yt) {
    const q = new URLSearchParams({
      autoplay: "0",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });
    return `https://www.youtube-nocookie.com/embed/${yt}?${q.toString()}`;
  }

  const driveId = getDriveFileId(url);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  return url;
}

function useNativeFirst(
  src: string,
  directSrc: string | undefined
): { nativeUrl: string | null; embedSrc: string } {
  if (directSrc) {
    return { nativeUrl: directSrc, embedSrc: src };
  }
  if (DIRECT_VIDEO_RE.test(src)) {
    return { nativeUrl: src, embedSrc: src };
  }
  return { nativeUrl: null, embedSrc: src };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  className = "",
  lazy = true,
  thumbnail,
  thumbnailFetchPriority = "auto",
  priority = false,
  directSrc,
}) => {
  const reactId = useId().replace(/:/g, "");
  const containerId = `video-container-${reactId}`;

  const { nativeUrl, embedSrc } = useNativeFirst(src, directSrc);
  const embedUrl = getEmbedUrl(embedSrc);

  const loadImmediately = priority || !lazy;
  const [shouldLoadMedia, setShouldLoadMedia] = useState(loadImmediately);
  const [useIframeFallback, setUseIframeFallback] = useState(!nativeUrl);
  const [mediaReady, setMediaReady] = useState(false);

  useEffect(() => {
    if (loadImmediately) return;

    const el = document.getElementById(containerId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMedia(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerId, loadImmediately]);

  const onVideoError = useCallback(() => {
    setUseIframeFallback(true);
    setMediaReady(false);
  }, []);

  const onVideoLoaded = useCallback(() => {
    setMediaReady(true);
  }, []);

  const onIframeLoad = useCallback(() => {
    setMediaReady(true);
  }, []);

  /** Drive preview often fires onLoad very late; avoid trapping users on a poster forever. */
  useEffect(() => {
    if (!shouldLoadMedia) return;
    if (nativeUrl && !useIframeFallback) return;
    if (getDriveFileId(embedSrc) == null) return;

    const t = window.setTimeout(() => {
      setMediaReady((r) => r || true);
    }, 4500);
    return () => clearTimeout(t);
  }, [shouldLoadMedia, nativeUrl, useIframeFallback, embedSrc]);

  const showPoster =
    Boolean(thumbnail) && (!shouldLoadMedia || !mediaReady);

  const iframeLoading = priority ? "eager" : "lazy";
  const videoPreload = priority ? "auto" : "metadata";

  return (
    <div
      id={containerId}
      className={`w-full rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      <AspectRatio ratio={16 / 9} className="relative bg-muted">
        {/* Media layer (below poster) */}
        {shouldLoadMedia && nativeUrl && !useIframeFallback && (
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src={nativeUrl}
            poster={thumbnail}
            preload={videoPreload}
            playsInline
            controls
            title={title}
            onLoadedData={onVideoLoaded}
            onCanPlay={onVideoLoaded}
            onError={onVideoError}
          />
        )}

        {shouldLoadMedia && useIframeFallback && (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 z-0 h-full w-full border-0"
            loading={iframeLoading}
            onLoad={onIframeLoad}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}

        {/* Poster sits above media so a blank iframe never hides it; clicks pass through to the player */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            width={1280}
            height={720}
            decoding="async"
            aria-hidden
            {...(thumbnailFetchPriority !== "auto"
              ? ({ fetchpriority: thumbnailFetchPriority } as Record<string, string>)
              : {})}
            className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 ease-out ${
              showPoster ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </AspectRatio>
    </div>
  );
};

export default VideoPlayer;
