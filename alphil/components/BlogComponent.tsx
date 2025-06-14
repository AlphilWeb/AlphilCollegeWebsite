'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  imageUrl?: string;
  publishedAt: string;
};

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await fetchAPI('/blogposts?limit=3');
        const sortedPosts = [...data].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        ).slice(0, 3);
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
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#013220]/5 py-16">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text- white mb-4">
            Latest From Our Blog
          </h2>
          <div className="w-24 h-1 bg-[#FF338B] mx-auto rounded-full"></div>
          <p className="text-lg text-grey-100 mt-6 max-w-2xl mx-auto font-['Inter']">
            Discover insights, news, and educational resources from our institution
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-[#A9A9A9]/20">
            <p className="text-[#013220] font-['Inter']">No blog posts available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-[#A9A9A9]/20 group"
              >
                {post.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#013220]/10 group-hover:bg-[#013220]/5 transition-colors"></div>
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
                  <p className="text-[#013220] font-['Inter'] mt-2 line-clamp-3">
                    {post.excerpt  + '...'}
                  </p>
                  <Link 
                    href={`/blog#post-${post.id}`}
                    className="mt-6 text-[#FF338B] hover:text-[#FF338B]/80 font-['Poppins'] font-medium flex items-center self-start group"
                  >
                    Read more
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-[#013220] text-white px-8 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors font-['Poppins'] font-medium"
          >
            View All Blog Posts
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}