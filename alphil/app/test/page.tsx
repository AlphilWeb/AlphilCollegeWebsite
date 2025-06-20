'use client'; 


import { fetchAPI } from '@/lib/api'; 

export default function TestPage() {
  const testConnection = async () => {
    try {
      const data = await fetchAPI('/health');
      console.log('API Connection Successful:', data);
      alert(`API Connected: ${data}`);
    } catch (error) {
      console.error('Connection Failed:', error);
      alert('Connection Failed');
    }
  };

  return (
    <div className="p-8">
      <button 
        onClick={testConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test API Connection
      </button>
    </div>
  );
}