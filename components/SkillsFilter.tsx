'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { useRef, useState } from 'react';
import { Image as ImageComponent } from '@/components/ui/Image';

// Define the skill categories and their items
const skillsData = {
  'Frontend': [
    { 
      name: 'React', 
      level: 'Advanced', 
      years: 3.0, 
      description: 'Expertise in building modern web applications with React and Next.js, focusing on performance and user experience.',
      icon: '/logos/react.png'
    },
    { 
      name: 'Next.js', 
      level: 'Advanced', 
      years: 3.0, 
      description: 'Strong experience with server-side rendering, API routes, and full-stack development using Next.js.',
      icon: '/logos/nextjs.png'
    },
    { 
      name: 'TypeScript', 
      level: 'Advanced', 
      years: 3.0, 
      description: 'Proficient in type-safe development and building scalable applications.',
      icon: '/logos/typescript.png'
    },
    { 
      name: 'Vite', 
      level: 'Advanced', 
      years: 2.0, 
      description: 'Experienced in using Vite for fast development and optimized production builds.',
      icon: '/logos/vite.jpg'
    },
  ],
  'Backend': [
    { 
      name: 'Node.js', 
      level: 'Advanced', 
      years: 3.0, 
      description: 'Skilled in building scalable backend services and REST APIs with Node.js.',
      icon: '/logos/nodejs.png'
    },
    { 
      name: 'Firebase', 
      level: 'Advanced', 
      years: 2.5, 
      description: 'Experienced in utilizing Firebase services for authentication and cloud functions.',
      icon: '/logos/firbase.png'
    },
    { 
      name: 'Sanity', 
      level: 'Intermediate', 
      years: 1.5, 
      description: 'Proficient in content management and structured data using Sanity.io.',
      icon: '/logos/sanity.png'
    },
  ],
  'Database': [
    { 
      name: 'Firebase', 
      level: 'Advanced', 
      years: 2.5, 
      description: 'Expert in NoSQL database design and real-time data synchronization with Firestore.',
      icon: '/logos/firbase.png'
    }
  ],
  'DevOps & Cloud': [
    { 
      name: 'Version Control (Git)', 
      level: 'Advanced', 
      years: 3.0, 
      description: 'Proficient in Git workflow, collaboration, and project management.',
      icon: '/logos/git.png'
    },
  ],
  'AI Tools': [
    { 
      name: 'Windsurf', 
      level: 'Intermediate', 
      years: 1.0, 
      description: 'Leveraging AI-powered development tools for enhanced productivity and code quality.',
      icon: '/logos/windsurf.jpg'
    },
    { 
      name: 'Cursor', 
      level: 'Intermediate', 
      years: 1.0, 
      description: 'Utilizing AI assistance for intelligent code completion, refactoring, and development workflow optimization.',
      icon: '/logos/cursor.jpg'
    },
  ]
};

type FilterOption = 'All' | keyof typeof skillsData;

interface SkillsFilterProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  title: string;
  subtitle: string;
}

const tabVariants = {
  initial: { 
    rotateX: -15,
    opacity: 0,
    scale: 0.95
  },
  animate: { 
    rotateX: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    rotateX: 15,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const categoryColors = {
  'All': 'bg-gray-800/10 dark:bg-gray-800/20',
  'Frontend': 'bg-gray-800/10 dark:bg-gray-800/20',
  'Backend': 'bg-gray-800/10 dark:bg-gray-800/20',
  'Database': 'bg-gray-800/10 dark:bg-gray-800/20',
  'DevOps & Cloud': 'bg-gray-800/10 dark:bg-gray-800/20',
  'AI Tools': 'bg-gray-800/10 dark:bg-gray-800/20'
};

const cardAnimation = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.4, 0, 0.2, 1],
      opacity: { duration: 0.5 },
      y: { 
        type: "spring",
        damping: 20,
        stiffness: 100
      },
      scale: { 
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 400
    }
  },
  magnetic: (position: { x: number, y: number }) => ({
    x: position.x,
    y: position.y,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      mass: 0.5
    }
  })
};

type AnimateType = {
  x: number;
  y: number;
  transition: {
    type: string;
    stiffness: number;
    damping: number;
    mass: number;
  };
};

export default function SkillsFilter({ 
  activeFilter, 
  onFilterChange,
  title,
  subtitle 
}: SkillsFilterProps) {
  const filters: FilterOption[] = ['All', ...Object.keys(skillsData) as (keyof typeof skillsData)[]];
  
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!cardRefs.current[index]) return;

    const card = cardRefs.current[index];
    const rect = card?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const maxDistance = 100;
    const magneticPull = 15;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const pull = Math.min(distance, maxDistance) / maxDistance;
    
    const moveX = (distanceX / distance) * magneticPull * (1 - pull);
    const moveY = (distanceY / distance) * magneticPull * (1 - pull);

    const newPositions = [...positions];
    newPositions[index] = { x: moveX || 0, y: moveY || 0 };
    setPositions(newPositions);
  };

  const handleMouseLeave = (index: number) => {
    const newPositions = [...positions];
    newPositions[index] = { x: 0, y: 0 };
    setPositions(newPositions);
  };

  return (
    <div className="space-y-12 w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] relative">
      <div className="relative px-4 md:px-8 lg:px-16 max-w-[2000px] mx-auto">
        <motion.div
          className={cn(
            "absolute inset-0 -z-10 rounded-3xl",
            categoryColors[activeFilter]
          )}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <div className="space-y-16 py-12">
          <div className="text-center space-y-4">
            <motion.h2
              className="text-5xl font-bold text-black dark:text-white"
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              custom={0}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-black/80 dark:text-gray-400 text-lg max-w-2xl mx-auto"
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              custom={1}
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={cn(
                  'px-4 py-2 rounded-full',
                  'text-sm',
                  activeFilter === filter 
                    ? 'text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                    : 'text-gray-600 dark:text-gray-400 bg-gray-200/10 dark:bg-gray-700/10 hover:bg-gray-300/20 dark:hover:bg-gray-600/20'
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative"
          >
            {Object.entries(skillsData)
              .filter(([category]) => activeFilter === 'All' || category === activeFilter)
              .map(([category, skills]) => (
                skills.map((skill, index) => (
                  <motion.div
                    ref={(el) => {
                      if (el) cardRefs.current[index] = el;
                    }}
                    key={skill.name}
                    className="relative overflow-hidden rounded-xl shadow-lg"
                    variants={cardAnimation}
                    initial="initial"
                    animate={{
                      ...cardAnimation.animate(index),
                      x: positions[index]?.x || 0,
                      y: positions[index]?.y || 0,
                      transition: {
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.1
                      }
                    }}
                    whileHover="hover"
                    custom={index}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                    />
                    
                    <div className="relative bg-gray-800/90 backdrop-blur-sm p-6 h-full hover:bg-gray-800/95 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 bg-gray-700/50 rounded-lg w-12 h-12 flex items-center justify-center">
                            <ImageComponent
                              src={skill.icon}
                              alt={`${skill.name} logo`}
                              width={32}
                              height={32}
                              className="object-contain w-auto h-auto"
                              fallback="/logos/placeholder-logo.png"
                            />
                          </div>
                        </div>
                        <div className="flex-1 -mt-1">
                          <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-purple-500 text-white text-sm font-medium rounded-full">
                              {skill.level}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {skill.years} years
                            </span>
                          </div>
                          <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
} 