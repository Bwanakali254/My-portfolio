import { ImageProps } from 'next/image';
import Image from 'next/image';

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
}

// Use fallback images with proper typing
export function CustomImage({ 
  src, 
  fallback = '/logos/placeholder-logo.png', 
  alt,
  ...props 
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt || 'Image'}
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.src = fallback;
      }}
      {...props}
    />
  );
}

// Export paths for use in other components
export { imagePaths }; 