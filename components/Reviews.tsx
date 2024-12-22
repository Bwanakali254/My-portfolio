'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ReviewForm } from './ReviewForm';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Project Manager',
      company: 'Tech Solutions Inc.',
      avatar: '/avatars/client1.jpg',
      rating: 5,
      review: 'Hamisi delivered exceptional work on our web application. His attention to detail and technical expertise made our project a success.',
      date: '2024-02-15'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      role: 'CEO',
      company: 'Digital Innovations',
      avatar: '/avatars/client2.jpg',
      rating: 5,
      review: 'Outstanding developer who consistently delivers high-quality code. Great communication and problem-solving skills.',
      date: '2024-02-10'
    },
    // Add more reviews as needed
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [averageRating, setAverageRating] = useState(4.9);

  const handleSubmitReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...reviewData
    };

    // Add new review to the list
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
    // Update average rating
    const newAverage = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    setAverageRating(Number(newAverage.toFixed(1)));

    // Close form and show success message
    setIsFormOpen(false);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Client Reviews</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          What clients say about my work and collaboration
        </p>
      </div>

      {/* Overall Rating */}
      <div className="flex items-center justify-center gap-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-500">4.9</div>
          <div className="flex items-center gap-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Average Rating
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{reviews.length}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Reviews
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 dark:text-gray-700" />
            
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {review.role} at {review.company}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="mt-4 text-gray-600 dark:text-gray-300">
              &ldquo;{review.review}&rdquo;
            </blockquote>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leave a Review CTA */}
      <motion.div
        className="text-center p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-bold text-white mb-2">
          Had a great experience working with me?
        </h3>
        <p className="text-white/90 mb-4">
          Share your feedback and help others make informed decisions
        </p>
        <button
          className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
          onClick={() => setIsFormOpen(true)}
        >
          Leave a Review
        </button>
      </motion.div>

      <ReviewForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
} 