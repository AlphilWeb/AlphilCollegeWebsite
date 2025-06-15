// components/FeaturedSuccessStory.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { fetchAPI } from '@/lib/api';

type SuccessStory = {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  publishedAt: string;
};

const FeaturedSuccessStory = () => {
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await fetchAPI('/success-stories');
        const latestStory = [...data].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )[0];
        setStory(latestStory);
      } catch (err) {
        console.error('Failed to fetch story:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#013220]/5 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#013220]/5 rounded-xl">
        <p className="text-[#013220]/80">No success stories found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#A9A9A9]/20">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#013220]">
          Success Stories
        </h2>
        <div className="ml-6 h-0.5 flex-1 bg-[#FF338B]"></div>
      </div>
      
      {story.imageUrl && (
        <div className="relative h-64 w-full">
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#013220]/20"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
          <h3 className="text-xl md:text-2xl font-['Inter'] font-bold text-[#013220]">
            {story.title}
          </h3>
          <span className="text-sm font-['Inter'] text-[#013220]/80">
            {formatDate(story.publishedAt)}
          </span>
        </div>
        <p className="text-[#013220]/80 font-['Inter'] mb-4">By {story.author}</p>
        <div className="prose max-w-none text-[#013220] font-['Inter'] mb-6 line-clamp-3">
          {story.content}
        </div>
        <Link 
          href="/success-stories" 
          className="inline-flex items-center text-[#FF338B] hover:text-[#FF338B]/80 font-['Inter'] font-medium group"
        >
          Read more success stories
          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSuccessStory;