'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi';
import directorImage from '@/public/Images/1749027761240.jpg';

const Director = () => {
  return (
    <div className="bg-[#013220]/5">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      {/* Call to Action Banner */}
      <div className="w-full bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 md:mb-0 md:w-[70%] border-l-4 border-[#FF338B] pl-6">
            Ready to join the revolution? Invest in your future today
          </h2>
            <Link href="/admissions">
              <button className="flex items-center justify-center gap-2 bg-[#FF338B] text-white px-8 py-3 rounded-lg hover:bg-[#FF338B]/90 transition-colors font-['Poppins'] font-medium whitespace-nowrap">
                Enroll Now <FiArrowRight className="ml-2" />
              </button>
            </Link>
        </div>
      </div>

      {/* Director's Message Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#A9A9A9]/20">
          <div className="flex flex-col lg:flex-row">
            {/* Optional Image Section - Shown only on larger screens */}
            <div className="hidden lg:block lg:w-2/5 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#013220]/20 to-[#013220]/10"></div>
              <Image
                src={directorImage}
                alt="Principal Ezekiel Musungu"
                fill
                className="object-cover"
                placeholder="blur" // Optional blur-up loading effect
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xl font-['Inter'] font-medium">EZEKIEL MUSUNGU</p>
                <p className="text-[#FF338B] font-['Poppins']">PRINCIPAL</p>
              </div>
            </div>

            {/* Message Content */}
            <div className="w-full lg:w-3/5 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#013220] pb-6 mb-6 border-b-2 border-[#FF338B]/50">
                A Message From The principal's Desk
              </h1>
              <div className="space-y-6 text-[#013220] font-['Inter'] text-lg leading-relaxed">
                <p>
                  We believe that education is the cornerstone of personal and professional growth. Our mission is to empower each student with the skills, knowledge and confidence to excel in their chosen fields.
                </p>
                <p>
                  Together we shape the future by nurturing talent, fostering innovation, and embracing the spirit of lifelong learning.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-[#A9A9A9]/30">
                <p className="text-2xl font-['Playfair_Display'] font-bold text-[#013220]">EZEKIEL MUSUNGU</p>
                <p className="text-[#FF338B] font-['Poppins'] font-medium">PRINCIPAL</p>
              </div>

              {/* Mobile Image - Shown only on smaller screens */}
              <div className="lg:hidden mt-8 relative h-64 w-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#013220]/20 to-[#013220]/10"></div>
                <Image
                  src={directorImage}
                  alt="Principal Ezekiel Musungu"
                  fill
                  className="object-cover"
                  placeholder="blur"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-['Inter'] font-medium">EZEKIEL MUSUNGU</p>
                  <p className="text-[#FF338B] text-sm font-['Poppins']">PRINCIPAL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Director;