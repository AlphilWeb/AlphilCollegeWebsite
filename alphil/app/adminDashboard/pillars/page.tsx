'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

interface Pillar {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publicId: string;
}

export default function AdminPillarsPage() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPillars();
  }, []);

  const loadPillars = async () => {
    try {
      const data = await fetchAPI('/pillars', { method: 'GET' });
      setPillars(data);
    } catch (err) {
      alert('Failed to load pillars.');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || (!imageFile && editingId === null)) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) formData.append('image', imageFile);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const token = localStorage.getItem('authToken');

    try {
      setLoading(true);

      const endpoint = editingId
        ? `${baseUrl}/pillars/${editingId}`
        : `${baseUrl}/pillars/upload`;

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      await loadPillars();
      setTitle('');
      setDescription('');
      setImageFile(null);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert(`Operation failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this pillar?')) return;

    try {
      await fetchAPI(`/pillars/${id}`, { method: 'DELETE' });
      setPillars(pillars.filter((item) => item.id !== id));
    } catch (err) {
      alert(`Delete failed: ${err}`);
    }
  };

  const handleEdit = (pillar: Pillar) => {
    setTitle(pillar.title);
    setDescription(pillar.description);
    setEditingId(pillar.id);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <h1 className="text-3xl font-bold text-[#013220] mb-8">Manage Pillars</h1>

      <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#A9A9A9]/20">
        <h2 className="text-2xl font-bold text-[#013220] mb-6">
          {editingId ? 'Edit Pillar' : 'Create New Pillar'}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#013220] mb-2">Title *</label>
            <input
              type="text"
              className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#013220] mb-2">Description *</label>
            <textarea
              className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#013220] mb-2">
              {editingId ? 'New Image (optional)' : 'Image *'}
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#013220]/10 file:text-[#013220] hover:file:bg-[#013220]/20"
              ref={fileInputRef}
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required={editingId === null}
            />
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                setTitle('');
                setDescription('');
                setImageFile(null);
                setEditingId(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-6 py-2 border border-[#A9A9A9]/50 rounded-lg text-[#013220] hover:bg-[#013220]/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingId ? 'Updating...' : 'Uploading...'}
                </span>
              ) : editingId ? 'Update Pillar' : 'Upload Pillar'}
            </button>
          </div>
        </div>
      </form>

      {pillars.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No pillars available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#A9A9A9]/20 overflow-hidden group">
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#013220]/20 group-hover:bg-[#013220]/10 transition-colors"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#013220]">{item.title}</h2>
                <p className="text-[#013220]/80 mt-2">{item.description}</p>
                <div className="flex justify-end mt-6 gap-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[#013220] hover:text-[#013220]/80 font-medium flex items-center gap-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[#FF338B] hover:text-[#FF338B]/80 font-medium flex items-center gap-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
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