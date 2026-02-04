'use client';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiCreditCard, FiDollarSign, FiMail, FiSmartphone } from 'react-icons/fi';

export default function PaymentOptions() {
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

  const paymentMethods = [
    {
      method: 'Bank Transfer',
      details: [
        { label: 'Bank Name', value: 'KCB Bank' },
        { label: 'Account Name', value: 'Alphil Training College' },
        { label: 'Account Number', value: '1325838810' },
        { label: 'Branch', value: 'Any KCB Branch/ KCB mtaani agent' }
      ],
      icon: <FiMail className="text-2xl" />,
      color: "text-[#013220]"
    },
    {
      method: 'M-Pesa',
      details: [
        { label: 'Business Number', value: '522533' },
        { label: 'Account Number', value: '7865257' },
        { label: 'Instructions', value: 'Enter amount then your pin and press ok' }
      ],
      icon: <FiSmartphone className="text-2xl" />,
      color: "text-[#FF338B]"
    },
    {
      method: 'In-Person',
      details: [
        { label: 'Location', value: 'Main Campus Finance Office' },
        { label: 'Hours', value: 'Mon-Fri, 8:00AM - 4:00PM' },
        { label: 'Payment Types', value: 'Cash, Cheque, Debit Card' }
      ],
      icon: <FiCreditCard className="text-2xl" />,
      color: "text-[#013220]"
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
              <span className="text-sm font-medium text-gray-600 tracking-wide">PAYMENT OPTIONS</span>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
              Flexible Financial<br />
              <span className="font-normal text-[#013220]">Solutions</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Multiple payment plans and methods designed to make your educational investment accessible.
            </p>
          </div>
          
          {/* Context Navigation Element */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Payment Process</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF338B]"></div>
                    <span className="text-sm text-gray-700">Select Payment Plan</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF338B]/30"></div>
                    <span className="text-sm text-gray-500">Choose Payment Method</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF338B]/30"></div>
                    <span className="text-sm text-gray-500">Complete Payment</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">Finance Office Hours</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-gray-700 font-medium">Mon-Fri: 8AM-4PM</span>
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

      {/* Payment Plans Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Payment Plan Options
            </h2>
            <div className="h-px w-24 bg-[#013220] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the payment structure that best fits your financial situation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {paymentPlans.map((plan, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-lg border border-gray-200 hover:border-[#013220]/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#013220] to-[#FF338B]"></div>
                <div className="p-8 pl-12 h-full flex flex-col">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`p-3 rounded-lg ${plan.color === 'text-[#FF338B]' ? 'bg-[#FF338B]/10' : 'bg-[#013220]/10'}`}>
                      <div className={plan.color}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">
                      {plan.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-8 flex-grow">
                    {plan.description}
                  </p>
                  <a 
                    href="/contact" 
                    className={`inline-flex items-center gap-2 text-sm font-medium ${plan.color === 'text-[#FF338B]' ? 'text-[#FF338B] hover:text-[#FF338B]/80' : 'text-[#013220] hover:text-[#013220]/80'}`}
                  >
                    Contact for details
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods Section */}
          <div className="mb-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Available Payment Methods
              </h2>
              <div className="h-px w-24 bg-[#FF338B] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Multiple convenient ways to complete your tuition payment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-lg border border-gray-200 hover:border-[#013220]/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#013220] to-[#FF338B]"></div>
                  <div className="p-8 pl-12 h-full flex flex-col">
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`p-3 rounded-lg ${method.color === 'text-[#FF338B]' ? 'bg-[#FF338B]/10' : 'bg-[#013220]/10'}`}>
                        <div className={method.color}>
                          {method.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {method.method}
                      </h3>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-grow">
                      {method.details.map((detail, i) => (
                        <div key={i} className="pb-3 border-b border-gray-100 last:border-0">
                          <p className="text-sm font-medium text-gray-500 mb-1">{detail.label}</p>
                          <p className="text-gray-800">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Need Assistance With Payment?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our finance team is available to guide you through the payment process and answer any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 bg-[#013220] text-white rounded-lg hover:bg-[#013220]/90 transition-colors font-medium"
                >
                  Contact Finance Office
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/admissions/requirements"
                  className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Review Requirements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}