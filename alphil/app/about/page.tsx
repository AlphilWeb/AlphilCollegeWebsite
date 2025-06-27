// app/about/page.tsx
"use client";
import { FiHeart, FiShield, FiUsers, FiAward } from 'react-icons/fi';
import { FaHandsHelping, FaLaptopCode, FaUserNurse } from 'react-icons/fa';
import Footer from '@/components/Footer';
import HistoryCard from '@/components/HistoryCard';
import GallerySlider from '@/components/GallerySlider';
import FeaturedSuccessStory from '@/components/FeaturedSuccessStory';

const AboutPage = () => {
  const coreValues = [
    {
      title: "Compassion",
      description: "We cultivate empathy and kindness in all our students, essential qualities for caregiving professions.",
      icon: <FiHeart className="text-4xl text-[#FF338B]" />,
      bgColor: "bg-[#FF338B]/10"
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in training and education across all our programs.",
      icon: <FiAward className="text-4xl text-[#013220]" />,
      bgColor: "bg-[#013220]/10"
    },
    {
      title: "Integrity",
      description: "We uphold ethical practices and honesty in all aspects of our institution.",
      icon: <FiShield className="text-4xl text-[#A9A9A9]" />,
      bgColor: "bg-[#A9A9A9]/10"
    },
    {
      title: "Community",
      description: "We foster a supportive learning environment that values collaboration and mutual respect.",
      icon: <FiUsers className="text-4xl text-[#013220]" />,
      bgColor: "bg-[#013220]/10"
    }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
        `}</style>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold mb-6 leading-tight">
              About Alphil Training College
            </h1>
            <p className="text-xl md:text-2xl font-['Inter'] max-w-3xl mx-auto opacity-90">
              Empowering futures through exceptional vocational training in healthcare and technology since 2010.
            </p>
          </div>
        </div>

        {/* Mission, Vision, History Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#FF338B] hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-['Inter'] font-bold text-[#013220] mb-4 flex items-center">
              <FaHandsHelping className="mr-3 text-[#FF338B]" /> Our Mission
            </h2>
            <p className="text-[#013220]/80 font-['Inter']">
              To provide transformative vocational education that equips students with practical skills, 
              professional ethics, and the confidence to excel in caregiving, medical assisting, and 
              information technology careers. We are committed to creating pathways to meaningful 
              employment while serving the growing needs of our community's healthcare and tech sectors.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#013220] hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-['Inter'] font-bold text-[#013220] mb-4 flex items-center">
              <FaLaptopCode className="mr-3 text-[#013220]" /> Our Vision
            </h2>
            <p className="text-[#013220]/80 font-['Inter']">
              To be the premier vocational training institution recognized for producing highly skilled, 
              compassionate professionals who elevate standards in patient care and technology services. 
              We envision a future where every Alpha graduate is a catalyst for positive change in their 
              workplace and community.
            </p>
          </div>

          {/* History - Now replaced with HistoryCard component */}
          <HistoryCard />
        </div>

        {/* Gallery Slider Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="h-0.5 flex-1 bg-[#FF338B]"></div>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#013220] px-6 text-center">
              Our Campus Life
            </h2>
            <div className="h-0.5 flex-1 bg-[#FF338B]"></div>
          </div>
          <GallerySlider />
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="h-0.5 flex-1 bg-[#FF338B]"></div>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#013220] px-6 text-center">
              Our Core Values
            </h2>
            <div className="h-0.5 flex-1 bg-[#FF338B]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className={`${value.bgColor} p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center`}
              >
                <div className="mb-6 p-4 bg-white rounded-full shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-xl font-['Inter'] font-bold text-[#013220] mb-3 text-center">{value.title}</h3>
                <p className="text-[#013220]/80 font-['Inter'] text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Success Story */}
        <div className="mb-20">
          <FeaturedSuccessStory />
        </div>

        {/* Programs Overview */}
        <div className="bg-gradient-to-r from-[#013220]/5 to-[#FF338B]/5 p-12 rounded-xl border border-[#A9A9A9]/20">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-center text-[#013220] mb-12">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#FF338B]">
              <h3 className="text-xl font-['Inter'] font-bold text-[#FF338B] mb-4">Caregiving</h3>
              <p className="text-[#013220]/80 font-['Inter']">
                Comprehensive training in patient care, home health assistance, and elderly support with 
                hands-on clinical experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#013220]">
              <h3 className="text-xl font-['Inter'] font-bold text-[#013220] mb-4">Certified Medical Assistant</h3>
              <p className="text-[#013220]/80 font-['Inter']">
                Prepares students for clinical and administrative roles in healthcare settings with 
                certification upon completion.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#A9A9A9]">
              <h3 className="text-xl font-['Inter'] font-bold text-[#013220] mb-4">Information Technology</h3>
              <p className="text-[#013220]/80 font-['Inter']">
                Practical IT skills training including networking, system administration, and technical 
                support fundamentals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;