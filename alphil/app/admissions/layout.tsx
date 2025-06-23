'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';

const AdmissionsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r sticky">
        <h2 className="text-2xl font-bold mb-4">Admissions</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admissions/requirements" className={`block p-2 rounded hover:underline ${pathname === '/admissions/requirements' ? 'font-bold' : ''}`}>Requirements</Link>
          </li>

          <li>
            <Link href="/admissions/payment-options" className={`block p-2 rounded hover:underline ${pathname === '/admissions/payment-options' ? 'font-bold' : ''}`}>Payment Options</Link>
          </li>
          <li>
            <Link href="/admissions/forms" className={`block p-2 rounded hover:underline ${pathname === '/admissions/form' ? 'font-bold' : ''}`}>Admission Form</Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default AdmissionsLayout;
