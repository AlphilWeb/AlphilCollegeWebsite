'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiFileText, FiDollarSign, FiCheckCircle, FiHome } from 'react-icons/fi';

const AdmissionsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Navigation items with icons
  const navItems = [
    {
      path: '/admissions',
      name: 'Overview',
      icon: <FiHome className="md:mr-2" />,
      isActive: pathname === '/admissions'
    },
    {
      path: '/admissions/requirements',
      name: 'Requirements',
      icon: <FiCheckCircle className="md:mr-2" />,
      isActive: pathname === '/admissions/requirements'
    },
    {
      path: '/admissions/payment-options',
      name: 'Payment Options',
      icon: <FiDollarSign className="md:mr-2" />,
      isActive: pathname === '/admissions/payment-options'
    },
    {
      path: '/admissions/forms',
      name: 'Admission Form',
      icon: <FiFileText className="md:mr-2" />,
      isActive: pathname === '/admissions/forms'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation for mobile, Sidebar for desktop */}
      <div className="md:flex">
        {/* Mobile Top Nav */}
      <nav className="md:hidden w-full bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <ul className="flex overflow-x-auto py-3 space-x-4">
            {navItems.map((item) => (
              <li key={item.path} className="flex-shrink-0">
                <Link href={item.path} passHref>
                  <a
                    className={`flex flex-col items-center px-3 py-2 rounded-lg text-sm ${
                      item.isActive
                        ? 'bg-[#013220]/10 text-[#013220] font-medium'
                        : 'text-gray-700 hover:bg-[#013220]/5'
                    }`}
                  >
                    <span className={`${item.isActive ? 'text-[#FF338B]' : 'text-[#013220]/70'}`}>
                      {item.icon}
                    </span>
                    <span className="mt-1">{item.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>


        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 p-6 border-r bg-white h-full shadow-md">
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

        {/* Main content */}
        <main className="flex-1 p-6 bg-white md:rounded-tl-lg shadow-inner bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdmissionsLayout;