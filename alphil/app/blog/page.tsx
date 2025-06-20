"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchAPI } from '@/lib/api';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';

type BlogPost = {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  publishedAt: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await fetchAPI('/blogposts');
        const sortedPosts = [...data].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#013220]/5">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF338B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#013220]/5">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-6">Alphil Insights</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-['Inter']">
            Discover the latest news, updates, and educational resources from our institution
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#013220] mb-8 pb-2 border-b-2 border-[#FF338B]">
              Featured Post
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#A9A9A9]/20">
              {posts[0].imageUrl && (
                <div className="relative h-80 md:h-96 w-full">
                  <Image
                    src={posts[0].imageUrl}
                    alt={posts[0].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#013220]/20"></div>
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl md:text-3xl font-['Inter'] font-bold text-[#013220]">
                    {posts[0].title}
                  </h3>
                  <span className="text-sm text-[#013220]/80 flex items-center font-['Inter']">
                    <FiCalendar className="mr-2 text-[#FF338B]" /> {formatDate(posts[0].publishedAt)}
                  </span>
                </div>
                <p className="text-[#013220]/80 mb-4 flex items-center font-['Inter']">
                  <FiUser className="mr-2 text-[#FF338B]" /> By {posts[0].author}
                </p>
                <p className="text-[#013220] font-['Inter'] text-lg mt-4 whitespace-pre-line">
                  {posts[0].content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#013220] mb-8 pb-2 border-b-2 border-[#FF338B]">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-[#A9A9A9]/20"
              >
                {post.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#013220]/10"></div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                    <h3 className="text-xl font-['Inter'] font-bold text-[#013220] line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="text-xs text-[#013220]/80 flex items-center whitespace-nowrap font-['Inter']">
                      <FiCalendar className="mr-1 text-[#FF338B]" size={14} />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <p className="text-[#013220]/80 text-sm mb-2 flex items-center font-['Inter']">
                    <FiUser className="mr-1 text-[#FF338B]" size={14} /> By {post.author}
                  </p>
                  <p
                    className={`text-[#013220] font-['Inter'] mt-2 ${
                      expandedPost === post.id ? '' : 'line-clamp-3'
                    }`}
                  >
                    {post.content}
                  </p>
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="mt-4 text-[#FF338B] hover:text-[#FF338B]/80 font-['Inter'] font-medium flex items-center self-start group"
                  >
                    {expandedPost === post.id ? 'Show less' : 'Read more'}
                    <FiArrowRight
                      className={`ml-2 transition-transform ${
                        expandedPost === post.id ? 'rotate-90' : ''
                      } group-hover:translate-x-1`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-[#013220] rounded-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold mb-4">
            Stay Updated With Alphil
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto font-['Inter']">
            Subscribe to our newsletter for the latest blog posts and announcements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-[#013220] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#FF338B]"
            />
            <button className="bg-[#FF338B] text-white px-6 py-3 rounded-lg font-['Poppins'] font-bold hover:bg-[#FF338B]/90 transition-all duration-300 shadow-sm hover:shadow-[#FF338B]/40">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}