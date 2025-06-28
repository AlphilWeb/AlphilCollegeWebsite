"use client";
import { useEffect, useState, useRef } from 'react';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  publicId: string;
}

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await fetchAPI('/gallery', { method: 'GET' });
      setGallery(data);
    } catch (err) {
      alert('Failed to load gallery.');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !title) {
      alert('Please provide a title and image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${baseUrl}/gallery/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(await res.text());
      await loadGallery();

      setTitle('');
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert(`Upload failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await fetchAPI(`/gallery/${id}`, { method: 'DELETE' });
      setGallery(gallery.filter(item => item.id !== id));
    } catch (err) {
      alert(`Delete failed: ${err}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <h1 className="text-3xl font-bold text-white mb-8">Gallery Management</h1>

      <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#A9A9A9]/20">
        <h2 className="text-xl font-bold text-[#013220] mb-6">Upload New Image</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#013220] mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#013220] mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#013220]/10 file:text-[#013220] hover:file:bg-[#013220]/20"
              ref={fileInputRef}
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </form>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Gallery Images</h2>
        <div className="h-1 w-20 bg-[#FF338B] rounded-full mt-2"></div>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-lg text-[#013220]">No gallery images yet</p>
          <p className="text-sm text-[#013220]/60 mt-2">Upload your first image above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#A9A9A9]/20 relative group">
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-medium text-[#013220]">{item.title}</h2>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 bg-white/90 text-[#FF338B] p-2 rounded-full hover:bg-[#FF338B] hover:text-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
                aria-label="Delete image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}