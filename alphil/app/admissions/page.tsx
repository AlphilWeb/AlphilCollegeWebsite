'use client';
import Head from 'next/head';
import Link from 'next/link';
import { FiArrowRight, FiAward, FiCalendar, FiCheckCircle, FiCreditCard, FiDollarSign, FiFileText, FiShield, FiUser } from 'react-icons/fi';

export default function AdmissionsOverview() {
  // Requirements Data
  const requirements = [
    {
      title: "Academic Qualifications",
      items: [
        "KCSE Grade D- (Minus) and above",
        "Form 4 Leaving Certificate",
        "KCSE Certificate or Result Slip"
      ],
      icon: <FiAward className="text-2xl" />,
      color: "text-[#013220]"
    },
    {
      title: "Identification Documents",
      items: [
        "National ID (Original and Copy)",
        "Passport (for international students)",
        "Birth Certificate (for minors)"
      ],
      icon: <FiUser className="text-2xl" />,
      color: "text-[#FF338B]"
    },
    {
      title: "Character Certification",
      items: [
        "Current Good Conduct Certificate",
        "Endorsement Letter from Area Chief",
        "2 Recent Passport Photos"
      ],
      icon: <FiShield className="text-2xl" />,
      color: "text-[#013220]"
    },
    {
      title: "Application Process",
      items: [
        "Completed Application Form",
        "Application Fee Receipt",
        "Medical Examination Report"
      ],
      icon: <FiFileText className="text-2xl" />,
      color: "text-[#FF338B]"
    }
  ];

  // Payment Plans Data
  const paymentPlans = [
    {
      title: 'Full Payment',
      description: 'Complete course fee payment before commencement for a seamless learning experience.',
      icon: <FiDollarSign className="text-2xl" />,
      color: "text-[#013220]"
    },
    {
      title: 'Flexible Installments',
      description: 'Customizable payment schedule agreed upon during admission process.',
      icon: <FiCalendar className="text-2xl" />,
      color: "text-[#FF338B]"
    },
    {
      title: 'Sponsorship Program',
      description: 'Financial assistance options available for qualified candidates.',
      icon: <FiCreditCard className="text-2xl" />,
      color: "text-[#013220]"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Head>
        <title>Admissions Overview | Alphil College</title>
        <meta name="description" content="How to apply for diploma and certificate programs at Alphil College - Requirements, deadlines, and fees" />
        <meta property="og:title" content="Admissions Process" />
        <meta property="og:description" content="Start your vocational training journey at Alphil College" />
        <meta property="og:url" content="https://alphilcollege.co.ke/admissions" />
        <meta name="keywords" content="apply to Alphil College, admission requirements, vocational training application Kenya" />
      </Head>
      
      {/* Elegant Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-[#013220]"></div>
              <span className="text-sm font-medium text-gray-600 tracking-wide">ADMISSIONS</span>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
              Begin Your Academic<br />
              <span className="font-normal text-[#013220]">Journey With Us</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              A comprehensive guide to the admission requirements, payment options, and application process at Alphil College.
            </p>
          </div>
          
          {/* Navigation Context Element */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Application Timeline</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#013220]"></div>
                    <span className="text-sm text-gray-700">Step 1: Review Requirements</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#013220]/30"></div>
                    <span className="text-sm text-gray-500">Step 2: Prepare Documents</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#013220]/30"></div>
                    <span className="text-sm text-gray-500">Step 3: Submit Application</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">Estimated Time</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-gray-700 font-medium">2-3 Weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elegant Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="absolute left-1/2 -translate-x-1/2 -top-3">
                <div className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                  <FiArrowRight className="text-gray-400 transform rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section - Elegant Minimal Design */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Admission Requirements
            </h2>
            <div className="h-px w-24 bg-[#013220] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prepare the following documents for your application
            </p>
          </div>
          
          {/* Elegant Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {requirements.map((requirement, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-lg border border-gray-200 hover:border-[#013220]/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#013220] to-[#FF338B]"></div>
                <div className="p-8 pl-12">
                  <div className="flex items-start gap-6">
                    <div className={`p-3 rounded-lg ${requirement.color === 'text-[#FF338B]' ? 'bg-[#FF338B]/10' : 'bg-[#013220]/10'}`}>
                      <div className={requirement.color}>
                        {requirement.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-gray-900 mb-4">
                        {requirement.title}
                      </h3>
                      <ul className="space-y-3">
                        {requirement.items.map((item, i) => (
                          <li key={i} className="flex items-start text-gray-600">
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <FiCheckCircle className={`${requirement.color}`} />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checklist - Minimal Design */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-grow bg-gray-200"></div>
              <h3 className="text-2xl font-light text-gray-900 whitespace-nowrap">
                Essential Checklist
              </h3>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded bg-[#013220]/10">
                    <FiAward className="text-[#013220]" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Academic Documents</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#013220] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#013220]"></div>
                    </div>
                    <span>Original KCSE certificate + 2 copies</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#013220] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#013220]"></div>
                    </div>
                    <span>Form 4 leaving certificate</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded bg-[#FF338B]/10">
                    <FiUser className="text-[#FF338B]" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Personal Documents</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#FF338B] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF338B]"></div>
                    </div>
                    <span>National ID/Passport + copies</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#FF338B] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF338B]"></div>
                    </div>
                    <span>Good Conduct Certificate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options - Elegant Design */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Payment Options
            </h2>
            <div className="h-px w-24 bg-[#FF338B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flexible payment plans designed for your convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentPlans.map((plan, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-center mb-8">
                    <div className={`p-4 rounded-full ${plan.color === 'text-[#FF338B]' ? 'bg-[#FF338B]/10' : 'bg-[#013220]/10'}`}>
                      <div className={plan.color}>
                        {plan.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 text-center">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 mb-8 flex-grow text-center">
                    {plan.description}
                  </p>
                  <a 
                    href="/contact" 
                    className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg border text-sm font-medium transition-all duration-300 ${
                      plan.color === 'text-[#FF338B]' 
                        ? 'border-[#FF338B] text-[#FF338B] hover:bg-[#FF338B] hover:text-white' 
                        : 'border-[#013220] text-[#013220] hover:bg-[#013220] hover:text-white'
                    }`}
                  >
                    Contact Finance Office
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#013220] to-[#013220]/90 rounded-xl p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-light text-white mb-6">
                Ready to Begin Your Application?
              </h2>
              <p className="text-white/90 mb-10 text-lg">
                Start your journey towards professional excellence today. Our admissions team is here to guide you through every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/admissions/forms"
                  className="px-8 py-3 bg-white text-[#013220] rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Start Application
                  <FiArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border border-white/50 text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  Request Information
                </Link>
              </div>
              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-white/70 text-sm">
                  Need assistance? Contact admissions office: 
                  <a href="mailto:admissions@alphilcollege.co.ke" className="text-white hover:underline ml-2">
                    admissions@alphilcollege.co.ke
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}