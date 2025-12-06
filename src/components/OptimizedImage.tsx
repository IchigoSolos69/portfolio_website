import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

// WebP support detection (cached)
let webpSupported: boolean | null = null;

const supportsWebP = (): Promise<boolean> => {
  if (webpSupported !== null) {
    return Promise.resolve(webpSupported);
  }

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      webpSupported = webP.height === 2;
      resolve(webpSupported);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Convert image URL to WebP format
const convertToWebP = (src: string): string => {
  // Handle different image formats
  if (src.includes('unsplash.com') || src.includes('placeholder')) {
    // For external URLs, try to add format parameter if supported
    return src;
  }
  return src.replace(/\.(jpg|jpeg|png)/i, '.webp');
};

const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  loading = "lazy"
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Detect WebP support and set appropriate image source
  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      try {
        const webpSupported = await supportsWebP();
        if (cancelled || !isMountedRef.current) return;

        if (webpSupported) {
          const webpSrc = convertToWebP(src);
          // Test if WebP version exists
          const testImg = new Image();
          testImg.onload = () => {
            if (!cancelled && isMountedRef.current) {
              setImageSrc(webpSrc);
            }
          };
          testImg.onerror = () => {
            if (!cancelled && isMountedRef.current) {
              setImageSrc(src);
            }
          };
          testImg.src = webpSrc;
        } else {
          setImageSrc(src);
        }
      } catch (error) {
        if (!cancelled && isMountedRef.current) {
          setImageSrc(src);
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [src]);

  // Generate srcset for responsive images
  const generateSrcSet = useCallback(() => {
    if (!imageSrc || hasError) return '';
    
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => {
        const url = new URL(imageSrc, window.location.origin);
        url.searchParams.set('w', size.toString());
        return `${url.toString()} ${size}w`;
      })
      .join(', ');
  }, [imageSrc, hasError]);

  const handleLoad = useCallback(() => {
    if (isMountedRef.current) {
      setIsLoaded(true);
      setHasError(false);
    }
  }, []);

  const handleError = useCallback(() => {
    if (isMountedRef.current) {
      setHasError(true);
      setImageSrc(src); // Fallback to original source
    }
  }, [src]);

  const srcSet = useMemo(() => generateSrcSet(), [generateSrcSet]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={srcSet}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      style={{
        willChange: 'opacity',
        contain: 'layout style',
      }}
    />
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
