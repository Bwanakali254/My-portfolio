'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import TabSwitcher from '@/components/TabSwitcher';
import RoleText from '@/components/RoleText';
import MenuButton from '@/components/MenuButton';
import ThemeToggle from '@/components/ThemeToggle';
import SkillsFilter from '@/components/SkillsFilter';
import Footer from '@/components/Footer';
import { FooterTrigger } from '@/components/FooterTrigger';
import { Projects } from '@/components/Projects';
import { Metrics } from '@/components/Metrics';
import { Reviews } from '@/components/Reviews';

// Animation variants (matching About page)
const revealAnimation = {
  initial: {
    y: 0,
  },
  animate: {
    y: "-100%",
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      delay: 2
    }
  }
};

const textAnimation = {
  initial: { 
    opacity: 0,
    scale: 0.5
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

type FilterOption = 'All' | 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'AI Tools';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'work' | 'skills'>('work');
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [showFooter, setShowFooter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we're coming from the about page
    if (document.referrer.includes('/about')) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const content = {
    work: {
      text: "currently working on innovative web solutions and creative digital experiences.",
      gradient: "from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500"
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Here are the technologies and tools I work with. I'm constantly learning and adding new skills to my repertoire.",
      gradient: "from-blue-400 via-purple-400 to-pink-400"
    }
  };

  return (
    <div className="min-h-[200vh]">
      <FooterTrigger onTrigger={setShowFooter} />
      {/* Welcome animation overlay */}
      <motion.div 
        className="h-screen flex items-center justify-center fixed inset-0 bg-black z-50"
        variants={revealAnimation}
        initial="initial"
        animate="animate"
      >
        <motion.h1 
          className="text-8xl font-bold text-white"
          variants={textAnimation}
          initial="initial"
          animate="animate"
        >
          Welcome Home
        </motion.h1>
      </motion.div>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, ease: "easeOut" }}
        className="min-h-screen relative overflow-x-hidden dark:bg-gray-900"
      >
        {/* Fixed navigation header with enhanced glass effect */}
        <motion.div 
          className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 2.6
          }}
        >
          <div className="flex justify-between items-start max-w-4xl mx-auto px-8 py-8">
            <Avatar />
            <TabSwitcher onTabChange={setActiveTab} activeTab={activeTab} />
            <div className="flex gap-4">
              <ThemeToggle />
              <MenuButton />
            </div>
          </div>
        </motion.div>

        {/* Scrollable content with padding for fixed header */}
        <div className="pt-32"> {/* Increased padding-top to account for fixed header */}
          <motion.div 
            className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.h1 
              className={`text-6xl font-bold mb-6 bg-gradient-to-r ${content[activeTab].gradient} bg-clip-text text-transparent`}
            >
              hi, i&apos;m Hamisi Bwanakali
            </motion.h1>
            
            <div className="mb-8">
              <RoleText />
            </div>

            <motion.div 
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
            >
              {activeTab === 'work' ? (
                <div className="space-y-24">
                  <div>
                    <div>{content.work.text}</div>
                  </div>

                  {/* Projects Section */}
                  <Projects />

                  {/* Metrics Section */}
                  <Metrics />

                  {/* Reviews Section */}
                  <Reviews />
                </div>
              ) : (
                <div className="space-y-8">
                  <SkillsFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    title={content.skills.title}
                    subtitle={content.skills.subtitle}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer will always be present but only visible based on scroll */}
      <Footer isVisible={showFooter} />
    </div>
  );
}