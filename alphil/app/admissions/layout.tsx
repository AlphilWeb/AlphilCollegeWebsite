'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiFileText, FiDollarSign, FiCheckCircle, FiHome } from 'react-icons/fi';

const AdmissionsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items with icons
  const navItems = [
    {
      path: '/admissions',
      name: 'Overview',
      icon: <FiHome className="mr-2" />,
      isActive: pathname === '/admissions'
    },
    {
      path: '/admissions/requirements',
      name: 'Requirements',
      icon: <FiCheckCircle className="mr-2" />,
      isActive: pathname === '/admissions/requirements'
    },
    {
      path: '/admissions/payment-options',
      name: 'Payment Options',
      icon: <FiDollarSign className="mr-2" />,
      isActive: pathname === '/admissions/payment-options'
    },
    {
      path: '/admissions/forms',
      name: 'Admission Form',
      icon: <FiFileText className="mr-2" />,
      isActive: pathname === '/admissions/forms'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-[#013220] text-white rounded-full shadow-lg hover:bg-[#013220]/90 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        w-full md:w-64 p-6 border-r bg-white fixed md:static h-full z-40 shadow-md md:shadow-none`}
      >
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-[#013220] font-['Playfair_Display']">
            Admissions
          </h2>
        </div>
        
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  item.isActive 
                    ? 'bg-[#013220]/10 text-[#013220] font-medium border-l-4 border-[#FF338B]'
                    : 'hover:bg-[#013220]/5 text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={`${item.isActive ? 'text-[#FF338B]' : 'text-[#013220]/70'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 mt-16 md:mt-0 bg-white md:rounded-tl-lg shadow-inner">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AdmissionsLayout;