'use client';
import { FiCheckCircle, FiFileText, FiAward, FiUser, FiShield, FiArrowRight, FiDollarSign, FiCalendar, FiCreditCard } from 'react-icons/fi';
import Link from 'next/link';

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
      icon: <FiAward className="text-4xl text-[#013220]" />,
      bgColor: "bg-[#013220]/10"
    },
    {
      title: "Identification Documents",
      items: [
        "National ID (Original and Copy)",
        "Passport (for international students)",
        "Birth Certificate (for minors)"
      ],
      icon: <FiUser className="text-4xl text-[#FF338B]" />,
      bgColor: "bg-[#FF338B]/10"
    },
    {
      title: "Character Certification",
      items: [
        "Current Good Conduct Certificate",
        "Endorsement Letter from Area Chief",
        "2 Recent Passport Photos"
      ],
      icon: <FiShield className="text-4xl text-[#013220]" />,
      bgColor: "bg-[#013220]/10"
    },
    {
      title: "Application Process",
      items: [
        "Completed Application Form",
        "Application Fee Receipt",
        "Medical Examination Report"
      ],
      icon: <FiFileText className="text-4xl text-[#FF338B]" />,
      bgColor: "bg-[#FF338B]/10"
    }
  ];

  // Payment Plans Data
  const paymentPlans = [
    {
      title: 'Full Payment',
      description: 'Complete course fee payment before commencement for a seamless learning experience.',
      icon: <FiDollarSign className="text-4xl text-[#013220]" />,
      bgColor: "bg-[#013220]/10"
    },
    {
      title: 'Flexible Installments',
      description: 'Customizable payment schedule agreed upon during admission process.',
      icon: <FiCalendar className="text-4xl text-[#FF338B]" />,
      bgColor: "bg-[#FF338B]/10"
    },
    {
      title: 'Sponsorship Program',
      description: 'Financial assistance options available for qualified candidates.',
      icon: <FiCreditCard className="text-4xl text-[#013220]" />,
      bgColor: "bg-[#013220]/10"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#013220] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <span className="text-lg font-medium opacity-80">Admissions</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            Start Your Educational Journey
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Everything you need to join Alphil College - requirements, payment options, and application process.
          </p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#013220] mb-12 text-center">
          Admission Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {requirements.map((requirement, index) => (
            <div 
              key={index}
              className={`${requirement.bgColor} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  {requirement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {requirement.title}
                </h3>
                <ul className="space-y-3">
                  {requirement.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-[#013220] mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Checklist */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-[#013220]/10">
          <h3 className="text-2xl font-bold text-[#013220] mb-6">Complete Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center text-[#013220]">
                <FiAward className="mr-2" /> Academic Documents
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#013220] mt-1 mr-2" />
                  <span>Original KCSE certificate + 2 copies</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#013220] mt-1 mr-2" />
                  <span>Form 4 leaving certificate</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center text-[#FF338B]">
                <FiUser className="mr-2" /> Personal Documents
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#FF338B] mt-1 mr-2" />
                  <span>National ID/Passport + copies</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#FF338B] mt-1 mr-2" />
                  <span>Good Conduct Certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-16 px-4 bg-[#013220]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#013220] mb-12 text-center">
            Payment Options
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {paymentPlans.map((plan, index) => (
              <div 
                key={index}
                className={`${plan.bgColor} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#013220]/10`}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{plan.title}</h3>
                  <p className="text-gray-700 mb-6 flex-grow">{plan.description}</p>
                  <p className="text-pink-700">
                    <a href="/contact" className="hover:underline hover:text-pink-800 transition-colors">
                      Contact finance office →
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#013220] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Begin your application process today and take the first step toward your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions/apply"
              className="px-8 py-3 bg-white text-[#013220] rounded-lg hover:bg-gray-100 transition-colors font-bold flex items-center justify-center"
            >
              Start Application <FiArrowRight className="ml-2" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}