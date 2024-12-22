import { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

// Define image paths type
type ImagePaths = {
  client1: string;
  client2: string;
  git: string;
  placeholder: string;
};

// Update image paths to use public directory
const imagePaths: ImagePaths = {
  client1: '/image/avatar.jpg',
  client2: '/image/avatar.jpg',
  git: '/logos/git.png',
  placeholder: '/logos/placeholder-logo.png'
} as const;

// Define props interface
interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
  width?: number;
  height?: number;
}

// Use fallback images with proper typing
export function CustomImage({ 
  src, 
  fallback = '/logos/placeholder-logo.png', 
  alt,
  width = 500,
  height = 300,
  ...props 
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        loading="lazy"
        onLoadingComplete={() => setIsLoading(false)}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.src = fallback;
        }}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
}

// Export paths for use in other components
export { imagePaths }; 