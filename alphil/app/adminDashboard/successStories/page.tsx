'use client';
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

type SuccessStory = {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  publishedAt: string;
};

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: null as File | null,
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const loadStories = async () => {
      try {
        const data = await fetchAPI('/success-stories');
        const sortedStories = [...data].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        setStories(sortedStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.author) {
      alert('Title, content and author are required');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('author', formData.author);
    if (formData.image) form.append('image', formData.image);

    try {
      const newStory = await fetchAPI('/success-stories', {
        method: 'POST',
        body: form,
      });
      setStories((prev) => [newStory, ...prev]);
      setShowCreateForm(false);
      setFormData({ title: '', content: '', author: '', image: null });
    } catch (error) {
      console.error('Create failed:', error);
      alert('Failed to create story');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    try {
      await fetchAPI(`/success-stories/${id}`, { method: 'DELETE' });
      setStories(stories.filter((story) => story.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete story');
    }
  };

  const startEditing = (story: SuccessStory) => {
    setEditingId(story.id);
    setEditData({
      title: story.title,
      content: story.content,
      author: story.author,
    });
  };

  const handleEditSubmit = async () => {
    if (!editingId) return;
    try {
        const updated = await fetchAPI(`/success-stories/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editData.title,
            content: editData.content,
            author: editData.author,
          }),
        });

      setStories((prev) =>
        prev.map((story) =>
          story.id === editingId ? { ...story, ...updated } : story
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update story');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#013220] mb-4 md:mb-0">Success Stories</h1>
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
              New Story
            </>
          )}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#A9A9A9]/20">
          <h2 className="text-2xl font-bold text-[#013220] mb-6">Create Success Story</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Story Title"
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author Name"
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Success Story Content"
                rows={6}
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files?.[0] || null })
                }
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#013220]/10 file:text-[#013220] hover:file:bg-[#013220]/20"
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
                className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
        </div>
      ) : stories.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No success stories available</p>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-6 bg-[#013220] text-white px-6 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors"
            >
              Create Your First Story
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {stories.map((story) =>
            editingId === story.id ? (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-lg p-8 border border-[#A9A9A9]/20"
              >
                <h2 className="text-2xl font-bold text-[#013220] mb-6">
                  Edit Success Story
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#013220] mb-2">Title *</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      placeholder="Story Title"
                      className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#013220] mb-2">Author *</label>
                    <input
                      type="text"
                      value={editData.author}
                      onChange={(e) =>
                        setEditData({ ...editData, author: e.target.value })
                      }
                      placeholder="Author Name"
                      className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#013220] mb-2">Content *</label>
                    <textarea
                      value={editData.content}
                      onChange={(e) =>
                        setEditData({ ...editData, content: e.target.value })
                      }
                      placeholder="Story Content"
                      rows={6}
                      className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
                    />
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-6 py-2 border border-[#A9A9A9]/50 rounded-lg text-[#013220] hover:bg-[#013220]/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={story.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#A9A9A9]/20 overflow-hidden">
                {story.imageUrl && (
                  <div className="relative h-64 w-full">
                    <Image
                      src={story.imageUrl}
                      alt={story.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[#013220]/20 group-hover:bg-[#013220]/10 transition-colors"></div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-[#013220]">{story.title}</h2>
                    <span className="text-[#013220]/80 text-sm">
                      {formatDate(story.publishedAt)}
                    </span>
                  </div>
                  <p className="text-[#013220]/80 mb-4">By {story.author}</p>
                  <p className="text-[#013220] whitespace-pre-line">{story.content}</p>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => startEditing(story)}
                      className="text-[#013220] hover:text-[#013220]/80 font-medium flex items-center gap-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
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
            )
          )}
        </div>
      )}
    </div>
  );
}