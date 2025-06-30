import Director from '@/components/Director'
import Footer from '@/components/Footer'
import ProgramsCards from '@/components/ProgramsCards'
import React from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Head from 'next/head'


const page = () => {
  return (
    <div>
      <Head>
        <title>Our Courses</title>
        <meta name="description" content="Industry-relevant diploma and certificate programs in healthcare, IT, and business at Alphil College" />
        <meta property="og:title" content="Courses at Alphil College" />
        <meta property="og:description" content="Get certified for high-demand careers in Kenya" />
        <meta property="og:url" content="https://alphilcollege.co.ke/courses" />
        <meta name="keywords" content="diploma courses Kenya, healthcare training, IT certification Nairobi, business courses" />
      </Head>
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