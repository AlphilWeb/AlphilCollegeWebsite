// components/HistoryCard.tsx
import React from 'react';

const HistoryCard = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-3">
      <h2 className="text-2xl font-['Inter'] font-bold text-[#013220] mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#A9A9A9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Our History
      </h2>
      <p className="text-[#013220]/80 font-['Inter'] text-lg leading-relaxed">
        Alphil Medical Centre founded in 2013 has successfully served the community and we can proudly say we have been a pillar in the health sector
         in Nakuru County. Alphil Training College was birthed inspired by the success of Alphil Medical Centre and its commitment to healthcare 
         excellence. The college trains the next generation of healthcare professionals by combining rigorous academics with hands-on experience. 
         From the start Alphil quickly gained recognition for offering top-tier education in caregiving, certified medical assistant and Information 
         Technology. Students from across the country are drawn to its state-of-the-art facilities and experienced instructors making Alphil a leader 
         in healthcare education. As Alphil Training College grows, it forms strong partnerships with hospitals and clinics nationwide. 
         These collaborations provide students with valuable practical experience and job opportunities after graduation. Today Alphil Training College 
         continues to produce compassionate skilled professionals who are dedicated to improving healthcare standards in their communities standing as a
          symbol of hope and progress in the field of education.
      </p>
    </div>
  );
};

export default HistoryCard;