'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Upload, Camera, Loader2 } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    name: string;
    role: string;
    company: string;
    rating: number;
    review: string;
    avatar: string;
  }) => void;
}

export function ReviewForm({ isOpen, onClose, onSubmit }: ReviewFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    review: ''
  });

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setError(null);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error uploading image');
    }
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.role.trim()) return 'Role is required';
    if (!formData.company.trim()) return 'Company is required';
    if (!formData.review.trim()) return 'Review is required';
    if (formData.review.length < 10) return 'Review should be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formData,
        rating,
        avatar: avatar || ''
      });
      // Reset form
      setFormData({ name: '', role: '', company: '', review: '' });
      setAvatar(null);
      setRating(5);
      onClose();
    } catch (err) {
      setError('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Add a function to render stars with proper styling
  const renderStar = (value: number) => {
    const isFilled = (hoverRating || rating) >= value;
    
    return (
      <button
        key={value}
        type="button"
        onClick={() => setRating(value)}
        onMouseEnter={() => setHoverRating(value)}
        onMouseLeave={() => setHoverRating(0)}
        className="p-1 transition-transform hover:scale-110"
      >
        <Star
          className={`w-6 h-6 transition-colors ${
            isFilled 
              ? 'text-yellow-500 fill-current' 
              : 'text-yellow-500 stroke-current'
          }`}
          strokeWidth={isFilled ? 1 : 2}
        />
      </button>
    );
  };

  // Add proper error boundaries
  useEffect(() => {
    const currentFileInput = fileInputRef.current;
    
    return () => {
      // Cleanup on unmount using the captured value
      if (currentFileInput) {
        currentFileInput.value = '';
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-xl mx-4 my-4"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-xl">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white pr-6">
                  Leave a Review
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-[auto_1fr] gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20 group">
                        <div className={`w-full h-full rounded-full overflow-hidden border-2 ${avatar ? 'border-blue-500' : 'border-dashed border-gray-300 dark:border-gray-600'}`}>
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt="Profile preview"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                              <Camera className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-5 h-5 text-white" />
                        </motion.div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Upload photo
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((value) => renderStar(value))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Company
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Review
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Review'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 