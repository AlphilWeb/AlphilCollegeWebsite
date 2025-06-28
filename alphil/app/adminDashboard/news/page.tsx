'use client';
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

type BlogPost = {
  id: number;
  title: string;
  content: string;
  author?: string;
  imageUrl?: string;
  createdAt: string;
};

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: null as File | null,
  });

  const loadPosts = async () => {
    try {
      const data = await fetchAPI('/blogposts');
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async () => {
    if (editingId !== null) {
      // Edit Mode
      try {
        const res = await fetchAPI(`/blogposts/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            author: formData.author,
          }),
        });
        setPosts(posts.map(p => (p.id === editingId ? res : p)));
        resetForm();
      } catch (error) {
        console.error('Edit failed:', error);
      }
    } else {
      // Create Mode
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('author', formData.author);
      if (formData.image) form.append('image', formData.image);

      try {
        const newPost = await fetchAPI('/blogposts', {
          method: 'POST',
          body: form,
        });
        setPosts([newPost, ...posts]);
        resetForm();
      } catch (error) {
        console.error('Create failed:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await fetchAPI(`/blogposts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEditClick = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author || '',
      image: null,
    });
    setEditingId(post.id);
    setShowCreateForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', author: '', image: null });
    setShowCreateForm(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#013220] mb-4 md:mb-0">Blog Posts</h1>
        <button
          onClick={() => {
            resetForm();
            setShowCreateForm(!showCreateForm);
          }}
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
              New Post
            </>
          )}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#A9A9A9]/20">
          <h2 className="text-2xl font-bold text-[#013220] mb-6">
            {editingId ? 'Edit Post' : 'Create New Post'}
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Post title"
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                placeholder="Author name"
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Post content"
                rows={6}
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3"
                required
              />
            </div>
            {!editingId && (
              <div>
                <label className="block text-sm font-medium text-[#013220] mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                  className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 file:bg-[#013220]/10 file:text-[#013220] hover:file:bg-[#013220]/20"
                />
              </div>
            )}
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-[#A9A9A9]/50 rounded-lg text-[#013220] hover:bg-[#013220]/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90"
              >
                {editingId ? 'Save Changes' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No blog posts available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-md border border-[#A9A9A9]/20 overflow-hidden">
              {post.imageUrl && (
                <div className="relative h-64 w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#013220]">{post.title}</h2>
                {post.author && (
                  <p className="text-[#013220]/80 text-sm mt-1">By {post.author}</p>
                )}
                <p className="text-[#013220]/80 text-sm mt-2 mb-4">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-[#013220] whitespace-pre-line">{post.content}</p>
                <div className="flex justify-end mt-6 gap-4">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="text-[#013220] hover:text-[#013220]/80 flex items-center gap-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-[#FF338B] hover:text-[#FF338B]/80 flex items-center gap-2"
                  >
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
