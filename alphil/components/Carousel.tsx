'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  publicId: string;
}

export default function Carousel() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gallery items from API
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await fetchAPI('/gallery', { method: 'GET' });
        setGalleryItems(data);
      } catch (err) {
        console.error('Failed to load gallery:', err);
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  // Auto-rotate slideshow if there are multiple images
  useEffect(() => {
    if (galleryItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [galleryItems.length]);

  // Handle manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      (prev - 1 + galleryItems.length) % galleryItems.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-200">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-200">
        <p>No gallery images available</p>
      </div>
    );
  }

  return (
    <div className="carousel w-full h-[400px] relative group">
      {galleryItems.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-item absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Navigation arrows */}
          {galleryItems.length > 1 && (
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                onClick={goToPrevious}
                className="btn btn-circle bg-white/80 hover:bg-white text-black"
              >
                ❮
              </button>
              <button
                onClick={goToNext}
                className="btn btn-circle bg-white/80 hover:bg-white text-black"
              >
                ❯
              </button>
            </div>
          )}

          {/* View Gallery Button on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
            <Link
              href="/gallery"
              className="bg-pink-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-pink-800 transition"
            >
              View Gallery
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      {galleryItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-pink-500' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}