'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiChevronDown, FiX, FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import logo from '@/public/Images/Logo.jpg';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAdmissionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and College Name - Now always visible */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-14 w-14 relative">
              <Image 
                src={logo} 
                alt="Alphil Training College Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <a href="/" className="ml-3 hover:text-[#013220]/90">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-[#013220] font-['Playfair_Display']">Alphil</span>
                <span className="text-lg font-medium text-[#013220] mt-0.5 font-['Playfair_Display']">College</span>
              </div>
            </a>
          </div>

          {/* Mobile menu button - Moved to the right */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#013220] hover:text-[#FF338B] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <a 
                href="/" 
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                Home
              </a>
              
              {/* ... rest of your desktop navigation items ... */}
              <a 
                href="/about" 
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                About Us
              </a>

              <a 
                href="/courses" 
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                Our Courses
              </a>

              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setAdmissionsOpen(!admissionsOpen)}
                  onMouseEnter={() => setAdmissionsOpen(true)}
                  className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium flex items-center transition-colors duration-200 font-['Inter']"
                >
                  Admissions <FiChevronDown className={`ml-1 transition-transform ${admissionsOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-[#A9A9A9]/20 ${admissionsOpen ? 'block' : 'hidden'}`}
                  onMouseLeave={() => setAdmissionsOpen(false)}
                >
                  <a href="/admissions" className="block px-4 py-2 text-sm text-[#013220] hover:bg-[#FF338B]/10 hover:text-[#FF338B] font-['Inter']">Admissions Overview</a>
                  <a href="/admissions/requirements" className="block px-4 py-2 text-sm text-[#013220] hover:bg-[#FF338B]/10 hover:text-[#FF338B] font-['Inter']">Requirements</a>
                  <a href="/admissions/forms" className="block px-4 py-2 text-sm text-[#013220] hover:bg-[#FF338B]/10 hover:text-[#FF338B] font-['Inter']">Application Form</a>
                  <a href="/admissions/payment-options" className="block px-4 py-2 text-sm text-[#013220] hover:bg-[#FF338B]/10 hover:text-[#FF338B] font-['Inter']">Payment Options</a>
                </div>
              </div>

              <a 
                href="/successStories" 
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                Success Stories
              </a>

              <a 
                href="/blog" 
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                News & Events
              </a>

              <a 
                href="/galleryRead"
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                Gallery
              </a>
              <a 
                href="/contact" 
                className="text-[#013220] hover:text-[#FF338B] px-4 py-3 text-sm font-medium transition-colors duration-200 font-['Inter']"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Login Button - Accent Element */}
          <div className="hidden md:block">
            <a
              href="/login"
              className="ml-4 px-5 py-2.5 rounded-md text-sm font-medium text-white bg-[#FF338B] hover:bg-[#FF338B]/90 transition-all duration-200 flex items-center shadow-sm hover:shadow-[#FF338B]/30 font-['Poppins']"
            >
              <FiUser className="mr-2" /> Log in
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white shadow-xl">
          {/* ... rest of your mobile menu items ... */}
          <a href="/" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Home</a>
          <a href="/about" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">About Us</a>
          <a href="/courses" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Our Courses</a>
          
          <div className="relative">
            <button 
              onClick={() => setAdmissionsOpen(!admissionsOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']"
            >
              Admissions <FiChevronDown className={`ml-1 transition-transform ${admissionsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`pl-5 ${admissionsOpen ? 'block' : 'hidden'}`}>
              <a href="/admissions" className="block px-4 py-2 text-sm font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Overview</a>
              <a href="/admissions/requirements" className="block px-4 py-2 text-sm font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Requirements</a>
              <a href="/admissions/forms" className="block px-4 py-2 text-sm font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Application</a>
              <a href="/admissions/fee-structure" className="block px-4 py-2 text-sm font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Fees</a>
              <a href="/admissions/payment-options" className="block px-4 py-2 text-sm font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Payments</a>
            </div>
          </div>

          <a href="/successStories" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Success Stories</a>
          <a href="/blog" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">News & Events</a>
          <a href="/galleryRead" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Gallery</a>
          <a href="/contact" className="block px-4 py-3 text-base font-medium text-[#013220] hover:text-[#FF338B] hover:bg-[#FF338B]/10 rounded-md font-['Inter']">Contact Us</a>
          <a href="/login" className="block px-4 py-3 text-base font-medium text-white bg-[#FF338B] hover:bg-[#FF338B]/90 rounded-md text-center mt-2 font-['Poppins']">
            <span className="flex items-center justify-center">
              <FiUser className="mr-2" /> Log in
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;