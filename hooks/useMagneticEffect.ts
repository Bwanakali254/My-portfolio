'use client';

import { useState, useCallback, RefObject, useEffect } from 'react';

interface MagneticOptions {
  strength?: number;
  ease?: number;
  activationDistance?: number;
}

export function useMagneticEffect(
  ref: RefObject<HTMLElement>,
  options: MagneticOptions = {}
) {
  const {
    strength = 20,
    ease = 0.15,
    activationDistance = 100
  } = options;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;

      const bounds = ref.current.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < activationDistance) {
        const pull = 1 - Math.min(distance, activationDistance) / activationDistance;
        const moveX = (distanceX / distance) * strength * pull;
        const moveY = (distanceY / distance) * strength * pull;
        setPosition({ x: moveX || 0, y: moveY || 0 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [ref, strength, activationDistance, isHovered]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return {
    position,
    isHovered
  };
} 