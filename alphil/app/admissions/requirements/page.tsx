'use client';
import Link from 'next/link';
import { FiArrowRight, FiAward, FiCalendar, FiCheckCircle, FiFileText, FiShield, FiUser } from 'react-icons/fi';

const RequirementsPage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Context */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-[#013220]"></div>
              <span className="text-sm font-medium text-gray-600 tracking-wide">ADMISSIONS REQUIREMENTS</span>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
              Complete Admission<br />
              <span className="font-normal text-[#013220]">Requirements</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              All necessary documents and qualifications needed for a successful application to Alphil College.
            </p>
          </div>
          
          {/* Context Navigation Element */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Document Checklist Progress</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF338B]"></div>
                    <span className="text-sm text-gray-700">Academic Documents</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF338B]/30"></div>
                    <span className="text-sm text-gray-500">Personal Documents</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF338B]/30"></div>
                    <span className="text-sm text-gray-500">Additional Requirements</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">Estimated Preparation Time</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-gray-700 font-medium">1-2 Weeks</span>
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

      {/* Requirements Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Essential Requirements
            </h2>
            <div className="h-px w-24 bg-[#013220] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prepare these four key categories of documents for your application
            </p>
          </div>
          
          {/* Elegant Requirements Grid */}
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

          {/* Detailed Checklist */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-grow bg-gray-200"></div>
              <h3 className="text-2xl font-light text-gray-900 whitespace-nowrap">
                Complete Document Checklist
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
                    <span>Original KCSE Certificate + 2 copies</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#013220] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#013220]"></div>
                    </div>
                    <span>Form 4 Leaving Certificate (Original and copy)</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#013220] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#013220]"></div>
                    </div>
                    <span>Minimum Grade: KCSE D- (Minus) or equivalent</span>
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
                    <span>National ID/Passport/Birth Certificate (Original + 2 copies)</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#FF338B] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF338B]"></div>
                    </div>
                    <span>Current Good Conduct Certificate (Not older than 6 months)</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-6 h-6 rounded-full border border-[#FF338B] flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF338B]"></div>
                    </div>
                    <span>2 Recent colored passport-size photos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Ready to Submit Your Documents?
              </h3>
              <p className="text-gray-600 mb-8">
                Ensure you have all the required documents prepared before beginning your application process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admissions/forms"
                  className="inline-flex items-center px-8 py-3 bg-[#013220] text-white rounded-lg hover:bg-[#013220]/90 transition-colors font-medium"
                >
                  Begin Application
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/admissions/overview"
                  className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Review Overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequirementsPage;