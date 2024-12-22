import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loading({ size = 'md', className }: LoadingProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-t-2 border-primary',
        {
          'h-4 w-4 border-2': size === 'sm',
          'h-8 w-8 border-4': size === 'md',
          'h-12 w-12 border-4': size === 'lg',
        },
        className
      )}
    />
  );
} 