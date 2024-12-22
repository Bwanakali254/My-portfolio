'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type MotionButtonProps = HTMLMotionProps<"button">;
type HTMLButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type MagneticButtonProps = Omit<HTMLButtonProps, keyof MotionButtonProps> & 
  MotionButtonProps & {
    strength?: number;
    className?: string;
    children: React.ReactNode;
  };

export function MagneticButton({
  strength = 20,
  className,
  children,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { position, isHovered } = useMagneticEffect(buttonRef, { strength });

  return (
    <motion.button
      ref={buttonRef}
      className={cn("relative transition-colors", className)}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
} 