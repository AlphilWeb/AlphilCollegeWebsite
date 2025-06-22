"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  publicId: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/gallery`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setGallery(data);
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError('Failed to load gallery.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#013220]/5">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF338B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#013220]/5">
        <p className="text-xl font-['Inter'] text-[#FF338B] p-8 text-center max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#013220]/5">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#013220] to-[#013220]/90 z-10 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-white mb-4">
              Alphil Gallery
            </h1>
            <p className="text-xl md:text-2xl font-['Inter'] text-white/90 max-w-2xl mx-auto">
              Explore our vibrant campus life through these moments
            </p>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#013220]/20 group-hover:bg-[#013220]/10 transition-all duration-500"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-xl font-['Inter'] font-bold text-white">
                  {item.title}
                </h2>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#FF338B] text-white px-6 py-2 rounded-full font-['Poppins'] font-medium">
                  View
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-[#FF338B] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
              <h3 className="text-xl font-['Inter'] font-bold text-white text-center">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}