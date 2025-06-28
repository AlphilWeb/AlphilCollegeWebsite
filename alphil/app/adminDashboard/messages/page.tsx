'use client';

import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { fetchAPI } from '@/lib/api';

type Message = {
  id: string;
  name: string;
  phone?: string;
  email: string;
  message: string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await fetchAPI('/messages');
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetchAPI(`/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No messages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#A9A9A9]/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 text-[#013220]">
                    <p>
                      <span className="font-medium">Name:</span> {msg.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {msg.email}
                    </p>
                    {msg.phone && (
                      <p>
                        <span className="font-medium">Phone:</span> {msg.phone}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Message:</span> {msg.message}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {msg.created_at && !isNaN(new Date(msg.created_at).getTime())
                        ? new Date(msg.created_at).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-[#FF338B] hover:text-[#FF338B]/80 p-2 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}