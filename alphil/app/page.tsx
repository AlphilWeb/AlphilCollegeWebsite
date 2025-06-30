import Director from "@/components/Director";
import Footer from "@/components/Footer";
import ProgramsCards from "@/components/ProgramsCards";
import Carousel from "@/components/Carousel"
import { FiAward, FiUsers, FiZap, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { FaHandsHelping, FaChalkboardTeacher } from 'react-icons/fa';
import PillarsSection from "@/components/PillarCards"
import HeroSection from "@/components/Hero";
import BlogPreview from "@/components/BlogComponent";

export default function Home() {

  return (
    <div className="bg-gradient-to-b from-green-800 to-green-900">
      {/* Hero Section */}
      <HeroSection />

      <PillarsSection />

      {/* Programs Section */}
      <div className="py-16 bg-gradient-to-b from-white to-green-50">
        <ProgramsCards />
      </div>

      {/* Who We Are */}
    <div className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
      Who We Are
    </h2>
    
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left content - will determine the height */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <p className="text-lg text-gray-700 mb-6">
          Founded in 2010, Alphil Training College has grown from a small caregiving institute to a premier vocational training center offering accredited programs in healthcare and technology. Our founder's vision was simple: create an institution where practical skills meet compassionate service.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Today, we serve over 500 students annually across our three flagship programs, with a 92% graduate employment rate. Our campuses feature modern labs, experienced instructors, and a culture that celebrates both academic achievement and personal growth.
        </p>
        <div className="mt-auto"> {/* Pushes button to bottom */}
          <button className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition flex items-center gap-2">
            Our Story <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Right content - YouTube embed */}
      <div className="w-full lg:w-1/2 flex">
        <div className="w-full h-0 pb-[56.25%] relative rounded-xl shadow-md overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/6CAt_XRDoi8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Testimonials Carousel */}
      <Carousel />

      {/* Director's Message */}
      <Director />

      {/* Blog Section */}
      <BlogPreview />

      {/* Footer */}
      <div className="bg-gray-900 text-white">
        <Footer />
      </div>
    </div>
  );
}