'use client';

import { motion, useScroll } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SOCIAL_LINKS } from '@/lib/constants';
import { ContactPopup } from './ContactPopup';

interface FooterProps {
  isVisible?: boolean;
}

export default function Footer({ isVisible = false }: FooterProps) {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [shouldShow, setShouldShow] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Africa/Nairobi',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setShouldShow(latest > 0.9);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate the center of the button
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    // Calculate the distance between the mouse and button center
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    
    // Calculate the magnetic pull (stronger when closer)
    const maxDistance = 100; // Maximum distance for the magnetic effect
    const magneticPull = 20; // Maximum pixels the button can move
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const pull = Math.min(distance, maxDistance) / maxDistance;
    
    // Calculate the new position
    const moveX = (distanceX / distance) * magneticPull * (1 - pull);
    const moveY = (distanceY / distance) * magneticPull * (1 - pull);
    
    setMousePosition({ x: moveX || 0, y: moveY || 0 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <>
      <motion.footer
        ref={footerRef}
        className="fixed inset-0 bg-[#111111] text-white z-50"
        initial={{ y: '100%' }}
        animate={{ y: isVisible ? 0 : '100%' }}
        transition={{ 
          type: "spring",
          stiffness: 70,
          damping: 20,
          mass: 1.2,
          duration: 0.8
        }}
      >
        <div className="max-w-[90%] mx-auto relative min-h-screen flex flex-col pt-20">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-600">
                  <Image
                    src="/image/avatar.jpg"
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full w-auto h-auto object-cover"
                    priority
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/images/default-avatar.jpg';
                    }}
                  />
                </div>
                <h2 className="text-6xl font-light">
                  Let&apos;s work<br />together
                </h2>
              </div>
            </div>

            {/* Divider line with button overlay */}
            <div className="relative mb-4">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-[#222222]" />
              
              <div 
                className="absolute right-[10%] top-1/2 -translate-y-1/2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <MagneticButton
                  className="w-40 h-40 bg-[#4B4DFF] rounded-full flex items-center justify-center text-base font-medium hover:bg-[#3E3FCC]"
                  strength={30}
                  onClick={() => setIsContactOpen(true)}
                >
                  Get in touch
                </MagneticButton>
              </div>

              <div className="h-40" />
            </div>

            {/* Contact Links */}
            <motion.div 
              className="flex gap-4 mb-16 -mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <motion.a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="block w-fit text-base py-3 px-6 rounded-full border border-[#222222] hover:bg-[#222222] transition-colors"
                whileHover={{ x: 10 }}
              >
                {SOCIAL_LINKS.email}
              </motion.a>
              <motion.a
                href="tel:+254796530452"
                className="block w-fit text-base py-3 px-6 rounded-full border border-[#222222] hover:bg-[#222222] transition-colors"
                whileHover={{ x: 10 }}
              >
                +254796530452
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Footer Info */}
          <motion.div 
            className="pt-6 mt-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6,
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex gap-12">
                  <span className="text-gray-500 uppercase text-[10px]">Version</span>
                  <span className="text-gray-500 uppercase text-[10px]">Local time</span>
                </div>
                <div className="flex gap-12">
                  <span className="text-xs">2024 © Edition</span>
                  <span className="text-xs">{localTime} EAT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Add Contact Popup */}
      <ContactPopup 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
} 