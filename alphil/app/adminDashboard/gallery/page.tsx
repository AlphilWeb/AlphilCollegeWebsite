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
  const [bulkTitle, setBulkTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

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
      alert('Image uploaded successfully!');
    } catch (err) {
      alert(`Upload failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bulkFiles.length === 0 || !bulkTitle) {
      alert('Please provide a title and select at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', bulkTitle);
    bulkFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      setBulkLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${baseUrl}/gallery/upload/bulk`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(await res.text());
      await loadGallery();

      setBulkTitle('');
      setBulkFiles([]);
      if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
      alert(`Successfully uploaded ${bulkFiles.length} images!`);
    } catch (err) {
      alert(`Bulk upload failed: ${err}`);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setBulkFiles(files);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await fetchAPI(`/gallery/${id}`, { method: 'DELETE' });
      setGallery(gallery.filter(item => item.id !== id));
      alert('Image deleted successfully!');
    } catch (err) {
      alert(`Delete failed: ${err}`);
    }
  };

  const removeBulkFile = (index: number) => {
    setBulkFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, isBulk: boolean) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      if (isBulk) {
        setBulkFiles(prev => [...prev, ...files]);
      } else {
        setImageFile(files[0]);
      }
    }
  };

  const triggerFileInput = (isBulk: boolean) => {
    if (isBulk) {
      bulkFileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Gallery Management</h1>
        <p className="text-gray-300">Upload and manage your gallery images</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-600 mb-8">
        <button
          onClick={() => setActiveTab('single')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'single'
              ? 'text-[#FF338B] border-b-2 border-[#FF338B]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Single Upload
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'bulk'
              ? 'text-[#FF338B] border-b-2 border-[#FF338B]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Bulk Upload
        </button>
      </div>

      {/* Single Upload Form */}
      {activeTab === 'single' && (
        <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-xl font-bold text-[#013220] mb-6">Upload Single Image</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter image title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Image</label>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-[#FF338B] bg-[#FF338B]/10' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, false)}
                onClick={() => triggerFileInput(false)}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required
                />
                
                <div className="flex flex-col items-center justify-center space-y-3">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-[#FF338B]">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 10MB)</p>
                  </div>
                </div>
              </div>
              
              {imageFile && (
                <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-md p-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 truncate">{imageFile.name}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setImageFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !imageFile || !title}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#FF338B] to-[#FF6B9C] text-white rounded-lg hover:from-[#FF338B]/90 hover:to-[#FF6B9C]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload Image'
              )}
            </button>
          </div>
        </form>
      )}

      {/* Bulk Upload Form */}
      {activeTab === 'bulk' && (
        <form onSubmit={handleBulkUpload} className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-xl font-bold text-[#013220] mb-6">Bulk Upload Images</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Title for All Images</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                value={bulkTitle}
                onChange={(e) => setBulkTitle(e.target.value)}
                required
                placeholder="Enter title for all images"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Select Images</label>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-[#013220] bg-[#013220]/10' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, true)}
                onClick={() => triggerFileInput(true)}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={bulkFileInputRef}
                  onChange={handleBulkFileSelect}
                  required
                />
                
                <div className="flex flex-col items-center justify-center space-y-3">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-[#013220]">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 10MB each)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Files Preview */}
            {bulkFiles.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-[#013220] mb-3">Selected Files ({bulkFiles.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {bulkFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-md px-3 py-2 border">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBulkFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={bulkLoading || bulkFiles.length === 0 || !bulkTitle}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#013220] to-[#015235] text-white rounded-lg hover:from-[#013220]/90 hover:to-[#015235]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
            >
              {bulkLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading {bulkFiles.length} images...
                </span>
              ) : (
                `Upload ${bulkFiles.length} Images`
              )}
            </button>
          </div>
        </form>
      )}

      {/* Gallery Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Gallery Images</h2>
        <p className="text-gray-300">Total: {gallery.length} images</p>
        <div className="h-1 w-20 bg-[#FF338B] rounded-full mt-2"></div>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-white/5 rounded-xl py-16 text-center border border-gray-600">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg text-gray-300">No gallery images yet</p>
          <p className="text-sm text-gray-400 mt-2">Upload your first image above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 relative group overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-[#013220] truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 truncate">{item.imageUrl.split('/').pop()}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                aria-label="Delete image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}