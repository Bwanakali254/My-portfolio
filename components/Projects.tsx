'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProjectStatus = 'recent' | 'ongoing' | 'past';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  technologies: string[];
  demoLink: string;
  githubLink: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Project Bolt',
    description: 'A modern web application built with Next.js and TypeScript, featuring real-time updates and AI integration.',
    image: '/image/myproject.png',
    status: 'ongoing',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project'
  },
  // Add more projects...
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>('recent');

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <p className="text-gray-600 dark:text-gray-400">
          A showcase of my recent work and ongoing projects
        </p>
      </div>

      {/* Project Filters */}
      <div className="flex justify-center gap-4">
        {['recent', 'ongoing', 'past'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as ProjectStatus)}
            className={cn(
              'px-4 py-2 rounded-full',
              'text-sm',
              activeFilter === filter 
                ? 'text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                : 'text-gray-600 dark:text-gray-400 bg-gray-200/10 dark:bg-gray-700/10 hover:bg-gray-300/20 dark:hover:bg-gray-600/20'
            )}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {projects
          .filter(project => project.status === activeFilter)
          .map(project => (
            <motion.div
              key={project.id}
              layoutId={project.id}
              className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/placeholder.jpg'; // Add a placeholder image
                  }}
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
} 