'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  FiMenu, 
  FiX, 
  FiBarChart2, 
  FiUsers, 
  FiFileText, 
  FiMail, 
  FiImage,
  FiColumns,
  FiCalendar,
  FiBook,
  FiAward,
  FiCamera
} from 'react-icons/fi';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items with icons
  const navItems = [
    {
      path: '/adminDashboard',
      name: 'Analytics',
      icon: <FiBarChart2 className="mr-3" />,
      isActive: pathname === '/adminDashboard'
    },
    {
      path: '/adminDashboard/users',
      name: 'Users',
      icon: <FiUsers className="mr-3" />,
      isActive: pathname === '/adminDashboard/users'
    },
    {
      path: '/adminDashboard/applications',
      name: 'Applications',
      icon: <FiFileText className="mr-3" />,
      isActive: pathname === '/adminDashboard/applications'
    },
    {
      path: '/adminDashboard/messages',
      name: 'Messages',
      icon: <FiMail className="mr-3" />,
      isActive: pathname === '/adminDashboard/messages'
    },
    {
      path: '/adminDashboard/hero',
      name: 'Cover Images',
      icon: <FiImage className="mr-3" />,
      isActive: pathname === '/adminDashboard/hero'
    },
    {
      path: '/adminDashboard/pillars',
      name: 'Pillars',
      icon: <FiColumns className="mr-3" />,
      isActive: pathname === '/adminDashboard/pillars'
    },
    {
      path: '/adminDashboard/news',
      name: 'News & Events',
      icon: <FiCalendar className="mr-3" />,
      isActive: pathname === '/adminDashboard/news'
    },
    {
      path: '/adminDashboard/courses',
      name: 'Courses',
      icon: <FiBook className="mr-3" />,
      isActive: pathname === '/adminDashboard/courses'
    },
    {
      path: '/adminDashboard/successStories',
      name: 'Success Stories',
      icon: <FiAward className="mr-3" />,
      isActive: pathname === '/adminDashboard/successStories'
    },
    {
      path: '/adminDashboard/gallery',
      name: 'Gallery',
      icon: <FiCamera className="mr-3" />,
      isActive: pathname === '/adminDashboard/gallery'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
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
        w-72 p-6 border-r bg-white fixed md:static h-full z-40 shadow-lg md:shadow-none overflow-y-auto`}
      >
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-[#013220] font-['Playfair_Display']">
            Admin Dashboard
          </h2>
        </div>
        
        <ul className="space-y-1">
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
      <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0 bg-gradient-to-r from-[#013220] to-[#013220]/90 md:rounded-tl-lg shadow-inner min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;