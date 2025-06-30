"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Director from '@/components/Director'
import Footer from '@/components/Footer'
import { FiArrowRight } from 'react-icons/fi'
import { fetchAPI } from '@/lib/api'
import Link from 'next/link'
import Head from 'next/head'


type SuccessStory = {
  id: number
  title: string
  content: string
  author: string
  imageUrl?: string
  publishedAt: string
}

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedStory, setExpandedStory] = useState<number | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await fetchAPI('/success-stories')
        const sortedStories = [...data].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        setStories(sortedStories)
      } catch (err) {
        console.error('Failed to fetch stories:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const toggleExpand = (id: number) => {
    setExpandedStory(expandedStory === id ? null : id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#013220]/5">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF338B]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#013220]/5">
      <Head>
  <title>Success Stories | Alphil College</title>
  <meta name="description" content="Inspiring stories of Alphil College alumni and their career achievements in healthcare, IT, and business fields." />
  <meta property="og:title" content="Success Stories | Alphil College" />
  <meta property="og:description" content="See how our graduates are making an impact in Kenya's workforce." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://alphilcollege.co.ke/success-stories" />
  <meta name="keywords" content="Alphil College success stories, graduate testimonials, alumni achievements, vocational training success Kenya" />
</Head>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold mb-6 leading-tight">
            Transforming Lives Through Education
          </h1>
          <p className="text-xl md:text-2xl font-['Inter'] max-w-3xl mx-auto opacity-90">
            Discover how Alphil has empowered our students to achieve remarkable success
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Story */}
        {stories.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#013220]">
                Featured Success Story
              </h2>
              <div className="ml-6 h-0.5 flex-1 bg-[#FF338B]"></div>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#A9A9A9]/20">
              {stories[0].imageUrl && (
                <div className="relative h-80 md:h-96 w-full">
                  <Image
                    src={stories[0].imageUrl}
                    alt={stories[0].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#013220]/20"></div>
                </div>
              )}
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <h3 className="text-2xl md:text-3xl font-['Inter'] font-bold text-[#013220]">
                    {stories[0].title}
                  </h3>
                  <span className="text-sm font-['Inter'] text-[#013220]/80">
                    {formatDate(stories[0].publishedAt)}
                  </span>
                </div>
                <p className="text-[#013220]/80 font-['Inter'] mb-4">By {stories[0].author}</p>
                <div className="prose max-w-none text-[#013220] font-['Inter'] text-lg">
                  {stories[0].content}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.slice(1).map((story) => (
            <div
              key={story.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-[#A9A9A9]/20 group ${
                expandedStory === story.id ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {story.imageUrl && (
                <div className="relative h-56 w-full">
                  <Image
                    src={story.imageUrl}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#013220]/20 group-hover:bg-[#013220]/10 transition-all duration-500"></div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start mb-3 gap-2">
                  <h3 className="text-xl font-['Inter'] font-bold text-[#013220] line-clamp-2">
                    {story.title}
                  </h3>
                  <span className="text-xs font-['Inter'] text-[#013220]/80 whitespace-nowrap">
                    {formatDate(story.publishedAt)}
                  </span>
                </div>
                <p className="text-[#013220]/80 font-['Inter'] text-sm mb-4">By {story.author}</p>
                <div className={`transition-all duration-300 ${
                  expandedStory === story.id ? 'w-full' : 'w-full line-clamp-3'
                }`}>
                  <p className="font-['Inter'] text-[#013220]">
                    {story.content}
                  </p>
                </div>
                <button
                  onClick={() => toggleExpand(story.id)}
                  className="mt-6 text-[#FF338B] hover:text-[#FF338B]/80 font-['Inter'] font-medium flex items-center self-start group"
                >
                  {expandedStory === story.id ? 'Show less' : 'Read more'}
                  <FiArrowRight
                    className={`ml-2 transition-transform ${
                      expandedStory === story.id ? 'rotate-90' : ''
                    } group-hover:translate-x-1`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#013220] rounded-xl p-12 text-center text-white relative overflow-hidden mt-[1rem]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')]"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg font-['Inter'] mb-8 max-w-2xl mx-auto">
              Join Alphil today and take the first step toward your brighter future
            </p>
                  <Link 
                        href="/admissions/forms" 
                        className="flex items-center px-6 py-3 bg-[#FF338B] text-white rounded-md hover:bg-[#FF338B]/90 transition-all duration-300 font-['Poppins'] font-medium shadow-sm hover:shadow-[#FF338B]/40"
                      >
                        Apply Now <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
          </div>
        </div>
      </div>

      <Director />
      <Footer />
    </div>
  )
}

export default SuccessStoriesPage