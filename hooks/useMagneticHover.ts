'use client';

import { useState, useCallback, RefObject } from 'react';

export function useMagneticHover(ref: RefObject<HTMLElement>, strength: number = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const maxDistance = 100;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const pull = Math.min(distance, maxDistance) / maxDistance;

      const moveX = (distanceX / distance) * strength * (1 - pull);
      const moveY = (distanceY / distance) * strength * (1 - pull);

      setPosition({ x: moveX || 0, y: moveY || 0 });
    },
    [ref, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    position,
    handleMouseMove,
    handleMouseLeave,
  };
} 