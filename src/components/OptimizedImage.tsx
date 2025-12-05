import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  loading = "lazy"
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Convert to WebP if possible
    const webpSrc = src.replace(/\.(jpg|jpeg|png)/i, '.webp');
    
    // Create image to test WebP support
    const img = new Image();
    img.onload = () => setImageSrc(webpSrc);
    img.onerror = () => setImageSrc(src); // Fallback to original
    img.src = webpSrc;
  }, [src]);

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!imageSrc) return '';
    
    const sizes = [400, 800, 1200];
    return sizes.map(size => `${imageSrc}?w=${size} ${size}w`).join(', ');
  };

  return (
    <img
      src={imageSrc || src}
      srcSet={generateSrcSet()}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        // Fallback to original image if WebP fails
        if (imageSrc !== src) {
          (e.target as HTMLImageElement).src = src;
        }
      }}
    />
  );
};

export default OptimizedImage;
