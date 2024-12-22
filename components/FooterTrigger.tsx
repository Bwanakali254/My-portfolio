'use client';

import { useEffect, useRef } from 'react';

interface FooterTriggerProps {
  onTrigger: (shouldShow: boolean) => void;
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function FooterTrigger({ onTrigger }: FooterTriggerProps) {
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isAtBottomRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the bottom with a larger threshold
      const threshold = 10;
      const atBottom = Math.abs((windowHeight + currentScrollY) - documentHeight) < threshold;
      
      // If scrolling up, hide footer immediately
      if (currentScrollY < lastScrollY.current) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        isAtBottomRef.current = false;
        onTrigger(false);
      } 
      // If scrolling down and at bottom
      else if (atBottom && !isAtBottomRef.current) {
        // Only trigger if we weren't already at bottom
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          isAtBottomRef.current = true;
          onTrigger(true);
        }, 800); // Increased delay for more resistance
      }
      // If scrolling down but not at bottom
      else if (!atBottom) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        isAtBottomRef.current = false;
        onTrigger(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Use a longer debounce for scroll down
    const debouncedHandleScroll = debounce(handleScroll, 150);

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onTrigger]);

  return null;
} 