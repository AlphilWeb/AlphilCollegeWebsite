"use client";
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

type HeroImage = {
  id: number;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  publicId: string;
  createdAt: string;
};

export default function HeroImagesAdminPage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: null as File | null
  });
  const [uploading, setUploading] = useState(false);

  // Fetch hero images
  useEffect(() => {
    const loadHeroImages = async () => {
      try {
        const data = await fetchAPI('/hero-images');
        setHeroImages(data);
      } catch (error) {
        console.error('Failed to load hero images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHeroImages();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title || !formData.image) {
      alert('Title and image are required');
      return;
    }

    try {
      setUploading(true);
      const form = new FormData();
      form.append('title', formData.title);
      form.append('subtitle', formData.subtitle);
      form.append('image', formData.image);

      const newHeroImage = await fetchAPI('/hero-images/upload', {
        method: 'POST',
        body: form,
      });

      setHeroImages(prev => [newHeroImage, ...prev]);
      setShowCreateForm(false);
      setFormData({ title: '', subtitle: '', image: null });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload hero image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this hero image?')) return;
    try {
      await fetchAPI(`/hero-images/${id}`, { method: 'DELETE' });
      setHeroImages(heroImages.filter(image => image.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete hero image');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#013220] mb-4 md:mb-0">Manage Hero Images</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 bg-[#013220] text-white px-6 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors"
        >
          {showCreateForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Upload New
            </>
          )}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#A9A9A9]/20">
          <h2 className="text-2xl font-bold text-[#013220] mb-6">Upload Hero Image</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Image title"
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                placeholder="Optional subtitle"
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#013220]/10 file:text-[#013220] hover:file:bg-[#013220]/20"
                required
              />
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-[#A9A9A9]/50 rounded-lg text-[#013220] hover:bg-[#013220]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
        </div>
      ) : heroImages.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No hero images available</p>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-6 bg-[#013220] text-white px-6 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors"
            >
              Upload Your First Hero Image
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heroImages.map((image) => (
            <div key={image.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#A9A9A9]/20 overflow-hidden group">
              <div className="relative h-64 w-full">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#013220]/20 group-hover:bg-[#013220]/10 transition-colors"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#013220]">{image.title}</h3>
                {image.subtitle && (
                  <p className="text-[#013220]/80 mt-2">{image.subtitle}</p>
                )}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => handleDelete(image.id)}
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