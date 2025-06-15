// components/GallerySlider.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  publicId: string;
}

const GallerySlider = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/gallery`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setGallery(data.slice(0, 5)); // Only take first 5 images for the slider
      } catch (err) {
        console.error('Error loading gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (gallery.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [gallery.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#013220]/5 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
      </div>
    );
  }

  if (gallery.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#013220]/5 rounded-xl">
        <p className="text-[#013220]/80">No gallery images found</p>
      </div>
    );
  }

  return (
    <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
      {gallery.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-['Inter'] font-medium">{item.title}</h3>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {gallery.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#FF338B]' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;