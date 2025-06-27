'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { fetchAPI } from '@/lib/api';

const AdminAnalyticsPage = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const [analytics, setAnalytics] = useState<{
    users: number;
    applications: number;
    courses: number;
    messages: number;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const data = await fetchAPI('/analytics/overview');
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  if (!analytics) {
    return <p className="p-8">Loading analytics...</p>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Analytics</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-black">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl mt-2">{analytics.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-black">
          <h3 className="text-xl font-semibold">Total Applications</h3>
          <p className="text-3xl mt-2">{analytics.applications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-black">
          <h3 className="text-xl font-semibold">Total Courses</h3>
          <p className="text-3xl mt-2">{analytics.courses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-black">
          <h3 className="text-xl font-semibold">Total Messages</h3>
          <p className="text-3xl mt-2">{analytics.messages}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
