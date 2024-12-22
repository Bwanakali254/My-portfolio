'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import MenuButton from '@/components/MenuButton';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { FooterTrigger } from '@/components/FooterTrigger';
import { SOCIAL_LINKS } from '@/lib/constants';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const shakeAnimation = {
  animate: {
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

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

const iconAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      delay: 3,
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const flipAnimation = {
  initial: { 
    rotateY: 0,
    transform: "perspective(1000px) preserve-3d"
  },
  flip: { 
    rotateY: 360,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

const techStack = [
  {
    icon: "⚛️",
    title: "React & Next.js",
    description: "Building modern, performant web applications with the latest React features and Next.js framework."
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces with Tailwind CSS and Framer Motion animations."
  },
  {
    icon: "🔧",
    title: "Backend Development",
    description: "Developing robust server-side solutions with Node.js, Express, and MongoDB."
  },
  {
    icon: "🛠️",
    title: "DevOps & Cloud",
    description: "Managing deployments and infrastructure using Git, Docker, and AWS services."
  }
];

export default function AboutPage() {
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(false);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-[200vh]">
      <FooterTrigger onTrigger={setShowFooter} />
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
          About Me
        </motion.h1>
      </motion.div>

      <motion.div 
        className="fixed top-8 right-8 z-40"
        variants={iconAnimation}
        initial="initial"
        animate="animate"
      >
        <MenuButton />
      </motion.div>

      <motion.div 
        className="fixed top-8 left-8 z-40"
        variants={iconAnimation}
        initial="initial"
        animate="animate"
      >
        <motion.button
          onClick={handleBackClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 shadow-lg flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white dark:text-gray-900" />
        </motion.button>
      </motion.div>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, ease: "easeOut" }}
        className="min-h-screen p-8 relative overflow-hidden dark:bg-gray-900"
      >
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-32 max-w-2xl mx-auto"
        >
          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-4 mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/image/image 1.jpg"
                alt="Portfolio Image 1"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/image/image 2.jpg"
                alt="Portfolio Image 2"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.8 }}
              className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/image/image 3.jpg"
                alt="Portfolio Image 3"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={item}
            className="prose prose-lg dark:prose-invert max-w-none space-y-16"
          >
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              I&apos;m a passionate full-stack developer and UI/UX designer with a love for creating beautiful, 
              functional digital experiences. My journey in tech has been driven by curiosity and a 
              constant desire to learn and innovate.
            </p>

            <div>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
                What I Do
              </h3>
              
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8"
                variants={container}
              >
                <motion.div
                  variants={item}
                  className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg col-span-2"
                >
                  <Image
                    src="/image/pexels-kevin-ku-92347-577585.jpg"
                    alt="Work Sample 1"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <motion.div
                  variants={item}
                  animate="flip"
                  initial="initial"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg transform-gpu"
                >
                  <Image
                    src="/image/pexels-pixabay-38544.jpg"
                    alt="Work Sample 2"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <motion.div
                  variants={item}
                  animate="flip"
                  initial="initial"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg transform-gpu"
                >
                  <Image
                    src="/image/pexels-pixabay-270632.jpg"
                    alt="Work Sample 3"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <motion.div
                  variants={item}
                  className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg col-span-2"
                >
                  <Image
                    src="/image/pexels-tranmautritam-326503.jpg"
                    alt="Work Sample 4"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </motion.div>

              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li>🚀 Build responsive and dynamic web applications</li>
                <li>🎨 Create intuitive and engaging user interfaces</li>
                <li>💡 Develop innovative solutions to complex problems</li>
                <li>🔧 Work with modern web technologies and frameworks</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
                Tech Stack
              </h3>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={container}
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.title}
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * index }
                    }}
                  >
                    <div className="text-3xl mb-3">{tech.icon}</div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      {tech.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge with the developer community.
            </p>
          </motion.div>

          <motion.div 
            variants={item}
            className="mt-12 flex flex-col items-center gap-8"
          >
          </motion.div>
        </motion.div>
      </motion.main>

      <Footer isVisible={showFooter} />
    </div>
  );
}