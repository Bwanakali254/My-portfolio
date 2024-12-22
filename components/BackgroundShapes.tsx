'use client';

import { useEffect, useState } from 'react';

interface Shape {
  id: number;
  left: number;
  top: number;
  delay: number;
  rotation: number;
}

export default function BackgroundShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // Generate shapes only on client-side
    const newShapes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      rotation: Math.random() * 360
    }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute w-8 h-8 rounded-lg bg-gray-200 opacity-30 animate-float"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            animationDelay: `${shape.delay}s`,
            transform: `rotate(${shape.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}