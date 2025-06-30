'use client';

export default function PaymentOptions() {
  const paymentPlans = [
    {
      title: 'Full Payment',
      description: 'Complete course fee payment before commencement for a seamless learning experience.',
      icon: '💳'
    },
    {
      title: 'Flexible Installments',
      description: 'Customizable payment schedule agreed upon during admission process.',
      icon: '📅'
    },
    {
      title: 'Sponsorship Program',
      description: 'Financial assistance options available for qualified candidates.',
      icon: '🎓'
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
      icon: '🏦'
    },
    {
      method: 'M-Pesa',
      details: [
        { label: 'Business Number', value: '522533' },
        { label: 'Account Number', value: '7865257' },
        { label: 'Instructions', value: 'Enter amount then your pin and press ok' }
      ],
      icon: '📱'
    },
    {
      method: 'In-Person',
      details: [
        { label: 'Location', value: 'Main Campus Finance Office' },
        { label: 'Hours', value: 'Mon-Fri, 8:00AM - 4:00PM' },
        { label: 'Payment Types', value: 'Cash, Cheque, Debit Card' }
      ],
      icon: '🏫'
    }
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
            Education That Sets You Apart
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Flexible payment solutions to begin your transformative journey at Alphil.
          </p>
        </div>
      </section>

      {/* Payment Plans Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-50 mb-12 text-center">
          Payment Plan Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paymentPlans.map((plan, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#013220]/10"
            >
              <div className="p-8 h-full flex flex-col">
                <span className="text-4xl mb-4">{plan.icon}</span>
                <h3 className="text-2xl font-bold text-[#013220] mb-4">{plan.title}</h3>
                <p className="text-gray-700 mb-6 flex-grow">{plan.description}</p>
                <p className="text-pink-700">
                  For more information,{" "}
                  <a href="/contact" className="hover:underline hover:text-pink-800 transition-colors">
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 px-4 bg-[#013220]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-50 mb-12 text-center">
            Payment Methods
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#013220]/10"
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="text-4xl mb-4">{method.icon}</span>
                  <h3 className="text-2xl font-bold text-[#013220] mb-6">{method.method}</h3>
                  
                  <div className="space-y-3 mb-6">
                    {method.details.map((detail, i) => (
                      <div key={i} className="border-b border-[#013220]/10 pb-2">
                        <p className="text-sm font-medium text-[#013220]/70">{detail.label}</p>
                        <p className="text-gray-800 font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </div>
        
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#013220] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Assistance With Payments?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our finance team is available to guide you through the payment process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-[#013220] rounded-lg hover:bg-gray-100 transition-colors font-bold">
              <a href="/contact">Contact Finance Office</a> 
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}