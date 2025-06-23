'use client';
import { FiCheckCircle, FiFileText, FiAward, FiUser, FiShield, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const RequirementsPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#013220] mb-4">
            Admission Requirements
          </h1>
          <div className="w-24 h-1.5 bg-[#FF338B] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to begin your journey at Alphil Training College
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {requirements.map((requirement, index) => (
            <div 
              key={index}
              className={`${requirement.bgColor} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  {requirement.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {requirement.title}
                </h2>
                <ul className="space-y-3 flex-grow">
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

        {/* Detailed Requirements Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#013220] mb-6">
              Complete Admission Checklist
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Academic Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiAward className="mr-2 text-[#013220]" /> Academic Documents
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-[#013220] mt-1 mr-2" />
                    <span className="text-[#013220]">Original and copies of KCSE Certificate or Result Slip</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-[#013220] mt-1 mr-2" />
                    <span className="text-[#013220]">Form 4 Leaving Certificate (Original and copy)</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-[#013220] mt-1 mr-2" />
                    <span className="text-[#013220]">Minimum Grade: KCSE D- (Minus) or equivalent</span>
                  </li>
                </ul>
              </div>

              {/* Personal Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiUser className="mr-2 text-[#FF338B]" /> Personal Documents
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-[#FF338B] mt-1 mr-2" />
                    <span className="text-[#FF338B]">National ID/Passport/Birth Certificate (Original + 2 copies)</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-[#FF338B] mt-1 mr-2" />
                    <span className="text-[#FF338B]">Current Good Conduct Certificate (Not older than 6 months)</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-[#FF338B] mt-1 mr-2" />
                    <span className="text-[#FF338B]">2 Recent colored passport-size photos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#013220] mb-6">
            Ready to Apply?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ensure you have all the required documents before beginning your application process.
          </p>
          <Link
            href="/admissions/forms"
            className="inline-flex items-center px-8 py-3 bg-[#013220] text-white rounded-lg hover:bg-[#013220]/90 transition-colors font-medium text-lg"
          >
            Begin Application
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequirementsPage;