"use client";

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

interface Pillar {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publicId: string;
}

export default function PillarsSection() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPillars = async () => {
      try {
        const data = await fetchAPI('/pillars', { method: 'GET' });
        setPillars(data);
      } catch (err) {
        setError('Failed to load pillars. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPillars();
  }, []);

  if (loading) return (
    <div className="text-center py-20 bg-[#013220]/5">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF338B] mx-auto"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20 bg-[#013220]/5 text-[#FF338B] font-['Inter']">
      {error}
    </div>
  );
  
  if (pillars.length === 0) return null;

  return (
    <div className="w-full py-20 bg-[#013220]/5"> {/* Light green background */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with brand styling */}
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#013220] mb-16 pl-6 border-l-4 border-[#FF338B]">
          What Sets Alphil Apart
        </h2>
        
        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div 
              key={pillar.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-[#A9A9A9]/20 hover:border-[#FF338B]/30 group"
            >
              {/* Image - Rectangular top section (40% height) */}
              <div className="relative h-48 w-full"> {/* 40% of typical card height */}
                <Image
                  src={pillar.imageUrl}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#013220]/20 group-hover:bg-[#013220]/10 transition-all duration-300"></div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-['Inter'] font-bold text-[#013220] mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[#013220]/80 font-['Inter'] flex-grow">
                  {pillar.description}
                </p>
                
                {/* Optional decorative accent */}
                <div className="mt-6 w-12 h-1 bg-[#FF338B] rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}