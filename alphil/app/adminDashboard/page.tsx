'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const AdminDashboard = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-black">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl mt-2">0</p>
        </div>
        {/* Add more cards here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
