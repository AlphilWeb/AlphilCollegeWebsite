"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiDollarSign, FiAward, FiBook, FiArrowRight } from 'react-icons/fi';
import { fetchAPI } from '@/lib/api'; 

type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  fee: number;
  minGrade: string | null;
  others: string | null;
  imageUrl: string;
  publicId: string;
};

const ProgramsCards = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchAPI('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Failed to load programs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  return (
    <div className="w-full px-4 py-20 bg-[#013220]/5"> {/* Brand background */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#013220] mb-4">
            Our Academic Programs
          </h1>
          <div className="w-24 h-1 bg-[#FF338B] mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF338B]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-[#FF338B]/10 rounded-lg">
            <p className="text-xl text-[#FF338B] font-['Inter']">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-[#A9A9A9]/10 rounded-lg">
            <p className="text-xl text-[#013220] font-['Inter']">No programs available at the moment</p>
          </div>
        ) : (
          <div className="space-y-8">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#A9A9A9]/20 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="md:flex h-full">
                  {/* Course Image - Branded frame */}
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <div className="absolute inset-0 bg-[#013220]/10 group-hover:bg-[#013220]/5 transition-all duration-300 z-10"></div>
                    {course.imageUrl ? (
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="bg-[#A9A9A9]/20 flex items-center justify-center h-full w-full text-[#013220] font-['Inter']">
                        Course Image
                      </div>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="md:w-2/3 p-8 flex flex-col">
                    <div className="flex-grow">
                      <h2 className="text-2xl font-['Inter'] font-bold text-[#013220] mb-4 flex items-center">
                        <FiBook className="mr-3 text-[#FF338B]" /> 
                        {course.title}
                      </h2>
                      
                      <p className="text-[#013220]/80 font-['Inter'] mb-6">{course.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <FiClock className="text-[#FF338B] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-['Inter'] font-semibold text-[#013220]">Duration</h4>
                            <p className="text-[#013220]/80 font-['Inter']">{course.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FiDollarSign className="text-[#FF338B] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-['Inter'] font-semibold text-[#013220]">Tuition Fee</h4>
                            <p className="text-[#013220]/80 font-['Inter']">KSH{course.fee.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {course.minGrade && (
                          <div className="flex items-start">
                            <FiAward className="text-[#FF338B] mt-1 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-['Inter'] font-semibold text-[#013220]">Minimum Grade</h4>
                              <p className="text-[#013220]/80 font-['Inter']">{course.minGrade}</p>
                            </div>
                          </div>
                        )}
                        
                        {course.others && (
                          <div className="flex items-start md:col-span-2">
                            <div className="text-[#FF338B] mt-1 mr-3">ℹ️</div>
                            <div>
                              <h4 className="font-['Inter'] font-semibold text-[#013220]">Additional Requirements</h4>
                              <p className="text-[#013220]/80 font-['Inter']">{course.others}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enroll Now Button */}
                    <div className="mt-8 flex justify-end">
                      <Link 
                        href="/admissions/forms" 
                        className="flex items-center px-6 py-3 bg-[#FF338B] text-white rounded-md hover:bg-[#FF338B]/90 transition-all duration-300 font-['Poppins'] font-medium shadow-sm hover:shadow-[#FF338B]/40"
                      >
                        Enroll Now <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsCards;