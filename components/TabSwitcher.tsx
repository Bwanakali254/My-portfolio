'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabSwitcherProps {
  onTabChange: (tab: 'work' | 'skills') => void;
  activeTab: 'work' | 'skills';
}

export default function TabSwitcher({ onTabChange, activeTab }: TabSwitcherProps) {
  return (
    <motion.div 
      className="relative inline-flex rounded-full bg-gray-900 dark:bg-white p-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="absolute top-1 bottom-1 bg-white dark:bg-black rounded-full w-[88px]"
        layoutId="tab-background"
        initial={false}
        animate={{
          x: activeTab === 'work' ? 4 : 92,
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
      {['work', 'skills'].map((tab) => (
        <motion.button
          key={tab}
          onClick={() => onTabChange(tab as 'work' | 'skills')}
          className={cn(
            'relative z-10 px-6 py-2 rounded-full transition-colors',
            activeTab === tab 
              ? 'text-gray-900 dark:text-white' 
              : 'text-gray-100 dark:text-gray-600 hover:text-white dark:hover:text-gray-400'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab}
        </motion.button>
      ))}
    </motion.div>
  );
}