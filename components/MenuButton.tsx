'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Menu Button */}
      <MagneticButton
        className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 shadow-lg"
        strength={15}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5 text-white dark:text-gray-900" />
      </MagneticButton>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 bg-gray-900 dark:bg-gray-100 rounded-2xl shadow-lg py-3 min-w-[180px] z-50"
          >
            <div className="flex flex-col">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 px-6 py-2 text-gray-100 dark:text-gray-900 transition-colors",
                  pathname === "/" ? "bg-gray-800 dark:bg-gray-200" : "hover:bg-gray-800 dark:hover:bg-gray-200"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span className="text-base">home</span>
              </Link>
              <Link
                href="/about"
                className={cn(
                  "flex items-center gap-2 px-6 py-2 text-gray-100 dark:text-gray-900 transition-colors",
                  pathname === "/about" ? "bg-gray-800 dark:bg-gray-200" : "hover:bg-gray-800 dark:hover:bg-gray-200"
                )}
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                <span className="text-base">about</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
