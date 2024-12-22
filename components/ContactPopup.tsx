'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { SOCIAL_LINKS } from '@/lib/constants';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[90%] max-w-2xl bg-gray-900 text-white rounded-2xl p-8 relative"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="space-y-6 mt-2">
              <motion.h2 
                className="text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Get in Touch
              </motion.h2>
              <motion.p 
                className="text-gray-300 text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                I&apos;m currently available for freelance work and exciting opportunities. 
                Let&apos;s discuss how we can work together!
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information Card */}
                <motion.div
                  className="bg-gray-800/50 rounded-xl p-6 space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      {SOCIAL_LINKS.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span>📞</span>
                      +254 796530452
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span>📍</span>
                      Mombasa, Kenya
                    </div>
                  </div>
                </motion.div>

                {/* Connect Card */}
                <motion.div
                  className="bg-gray-800/50 rounded-xl p-6 space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold">Connect with Me</h3>
                  
                  {/* Social Icons */}
                  <div className="flex gap-4">
                    {[
                      { icon: Github, href: SOCIAL_LINKS.github },
                      { icon: Twitter, href: SOCIAL_LINKS.twitter },
                      { icon: Linkedin, href: SOCIAL_LINKS.linkedin },
                      { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}` }
                    ].map((social, index) => (
                      <MagneticButton
                        key={index}
                        onClick={() => window.open(social.href, '_blank')}
                        className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                        strength={15}
                      >
                        <social.icon className="w-5 h-5" />
                      </MagneticButton>
                    ))}
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-gray-300 text-sm">
                      Preferred contact method: <span className="text-blue-400">email</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 