import Director from '@/components/Director'
import Footer from '@/components/Footer'
import ProgramsCards from '@/components/ProgramsCards'
import React from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore Alphil College’s industry-aligned programs in [fields]. Gain certifications for high-demand careers.",
  keywords: ["courses", "diplomas", "certifications"], // Add specific fields
  openGraph: {
    title: "Courses | Alphil College",
    description: "Enroll in programs designed for career success.",
    images: [{ url: '/images/courses-og.jpg' }],
  },
};

const page = () => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white py-16 px-0">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold mb-6 leading-tight">
            Transform Your Future
          </h1>
          <p className="text-xl md:text-2xl font-['Inter'] max-w-3xl mx-auto opacity-90 mb-8">
            Join our industry-leading courses and gain the skills to excel in your career. 
            Enroll today and start your journey.
          </p>
          <Link href="/admissions">
            <button className="flex items-center justify-center gap-2 bg-[#FF338B] text-white px-8 py-3 rounded-lg hover:bg-[#FF338B]/90 transition-colors font-['Poppins'] font-medium whitespace-nowrap mx-auto">
              Enroll Now <FiArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>

       <ProgramsCards />
       <section>
        <Director />
       </section>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default page