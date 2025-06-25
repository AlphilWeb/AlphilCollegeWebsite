'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';


const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-6 border-r">
        <h2 className="text-2xl font-bold mb-4">Admin Dashoard</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/adminDashboard" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard' ? 'font-bold' : ''}`}>Analytics</Link>
          </li>
          <li>
            <Link href="/adminDashboard/users" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/users' ? 'font-bold' : ''}`}>Users</Link>
          </li>
          <li>
            <Link href="/adminDashboard/applications" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/applications' ? 'font-bold' : ''}`}>Applications</Link>
          </li>
          <li>
            <Link href="/adminDashboard/messages" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/messages' ? 'font-bold' : ''}`}>Messages</Link>
          </li>
          <li>
            <Link href="/adminDashboard/hero" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/hero' ? 'font-bold' : ''}`}>Cover Images</Link>
          </li>
          <li>
            <Link href="/adminDashboard/pillars" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/pillars' ? 'font-bold' : ''}`}>Pillars</Link>
          </li>
          <li>
            <Link href="/adminDashboard/news" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/news' ? 'font-bold' : ''}`}>News & Events</Link>
          </li>
          <li>
            <Link href="/adminDashboard/courses" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/courses' ? 'font-bold' : ''}`}>Courses</Link>
          </li>
          <li>
            <Link href="/adminDashboard/successStories" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/successStories' ? 'font-bold' : ''}`}>Success Stories</Link>
          </li>
          <li>
            <Link href="/adminDashboard/gallery" className={`block p-2 rounded hover:underline ${pathname === '/adminDashboard/gallery' ? 'font-bold' : ''}`}>Gallery</Link>
          </li>
          
        </ul>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
