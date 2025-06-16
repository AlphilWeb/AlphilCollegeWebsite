"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { fetchAPI } from '@/lib/api';

type HeroImage = {
  id: number;
  imageUrl: string;
};

export default function HeroSection() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch hero images
  useEffect(() => {
    const loadHeroImages = async () => {
      try {
        const data = await fetchAPI('/hero-images');
        setHeroImages(data);
      } catch (error) {
        console.error('Failed to load hero images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHeroImages();
  }, []);

  // Auto-rotate images if multiple exist
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[35rem] bg-[#A9A9A9]/20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF338B]"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row h-[35rem] w-full items-center justify-center p-4 md:p-8 bg-[#013220]">
      {/* Font imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      {/* Hero Image Slideshow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {heroImages.length > 0 ? (
          <>
            {heroImages.map((image, index) => (
              <div 
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-50' : 'opacity-0'}`}
              >
                <Image
                  src={image.imageUrl}
                  alt="Alphil students learning"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[#013220]/20"></div>
              </div>
            ))}
          </>
        ) : (
          <div className="absolute inset-0 bg-[#013220] flex items-center justify-center">
            <p className="text-white font-['Inter']">No hero images available</p>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center space-y-6 z-10">
        {/* Pre-heading */}
        <h1 className="text-lg font-['Inter'] font-semibold text-[#FF338B] tracking-[0.2em] uppercase">
          ALPHIL TRAINING COLLEGE
        </h1>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-['Playfair_Display'] font-bold leading-tight">
          <span className="text-[#FF338B]">Not Just a College</span><br />
          A Launchpad for Life
        </h2>

        {/* Subheading */}
        <p className="text-xl md:text-2xl font-['Inter'] font-medium text-[#A9A9A9] max-w-2xl">
          Be Inspired. Be Empowered. Be Alphil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link 
            href="/admissions" 
            className="px-8 py-4 bg-[#FF338B] hover:bg-[#FF338B]/90 text-white rounded-md transition-all duration-300 flex items-center justify-center gap-2 font-['Poppins'] font-bold text-lg shadow-lg hover:shadow-[#FF338B]/40"
          >
            Enroll Now <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link 
            href="/courses" 
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#013220] rounded-md transition-all duration-300 font-['Poppins'] font-medium text-lg"
          >
            Explore Courses
          </Link>
        </div>
      </div>

      {/* Navigation dots if multiple images */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-4 h-4 rounded-full transition-all ${index === currentImageIndex ? 'bg-[#FF338B] w-6' : 'bg-white/50 hover:bg-white/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}