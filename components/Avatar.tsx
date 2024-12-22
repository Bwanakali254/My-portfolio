'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Avatar() {
  return (
    <motion.div 
      className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
    >
      <Image
        src="/image/avatar.jpg"
        alt="Profile"
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}