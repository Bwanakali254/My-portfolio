'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const roles = [
  { text: 'web designer', color: 'from-blue-500 to-cyan-500' },
  { text: 'web developer', color: 'from-purple-500 to-pink-500' },
  { text: 'ui/ux designer', color: 'from-green-500 to-teal-500' }
];

export default function RoleText() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
      <span>a</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`font-medium bg-gradient-to-r ${roles[roleIndex].color} bg-clip-text text-transparent`}
        >
          {roles[roleIndex].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}