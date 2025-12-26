'use client';
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { FiCheckCircle, FiXCircle, FiDownload, FiSend, FiUser, FiHome, FiBookOpen, FiCreditCard } from 'react-icons/fi';

type ApplicationForm = {
  full_name: string; title: string; date_of_birth: string; nationality: string;
  id_number: string; county: string; sub_county: string; phone_number: string;
  po_box: string; town: string; email: string; next_of_kin: string;
  next_of_kin_phone: string; course_name: string; mode_of_study: string;
  level_of_study: string; financier: string; religion: string;
};

const AdmissionsPage = () => {
  const [formData, setFormData] = useState<ApplicationForm>({
    full_name: '', title: '', date_of_birth: '', nationality: '',
    id_number: '', county: '', sub_county: '', phone_number: '',
    po_box: '', town: '', email: '', next_of_kin: '',
    next_of_kin_phone: '', course_name: '', mode_of_study: '',
    level_of_study: '', financier: '', religion: '',
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchAPI('/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.success) {
        setSubmissionStatus('success');
        setApplicationId(response.data.id);
        setShowToast(true);
      }
    } catch (err) {
      setSubmissionStatus('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!applicationId) return;
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/applications/${applicationId}/download-docx`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Application_${applicationId}.docx`;
      a.click();
    } catch (error) {
      setSubmissionStatus('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center space-x-2 border-b border-gray-100 pb-2 mb-4 mt-6">
      <Icon className="text-pink-800 text-xl" />
      <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-in">
          <div className={`flex items-center p-4 rounded-lg shadow-xl border-l-4 bg-white ${submissionStatus === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            {submissionStatus === 'success' ? <FiCheckCircle className="text-green-500 mr-3 text-xl" /> : <FiXCircle className="text-red-500 mr-3 text-xl" />}
            <p className="text-gray-700 font-medium">
              {submissionStatus === 'success' ? 'Application Submitted!' : 'Submission Failed'}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-pink-800 p-8 text-white text-center">
            <h1 className="text-3xl font-bold uppercase tracking-tight">Admission Application Form</h1>
            <p className="mt-2 opacity-90 text-sm italic">Join our community. Complete all fields below.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {/* PERSONAL DETAILS */}
            <SectionTitle icon={FiUser} title="Personal Details" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                <select name="title" value={formData.title} onChange={handleChange} required className="w-full border-gray-200 border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-800/20">
                  <option value="">Select...</option>
                  <option value="Mr">Mr.</option>
                  <option value="Ms">Ms.</option>
                  <option value="Mrs">Mrs.</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input name="full_name" type="text" onChange={handleChange} required placeholder="Full Legal Name" className="w-full border-gray-200 border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-800/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-3">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Religion</label>
                    <input name="religion" type="text" placeholder="e.g. Christian, Muslim" onChange={handleChange} required className="w-full border-gray-200 border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-800/20" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Date of Birth</label>
                    <input name="date_of_birth" type="date" onChange={handleChange} required className="w-full border-gray-200 border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-800/20" />
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <SectionTitle icon={FiHome} title="Contact & Location" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
              <input name="phone_number" type="tel" placeholder="Phone Number" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
              <div className="grid grid-cols-2 gap-2">
                <input name="county" type="text" placeholder="County" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
                <input name="sub_county" type="text" placeholder="Sub-County" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input name="po_box" type="text" placeholder="P.O. Box" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
                <input name="town" type="text" placeholder="Town" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
              </div>
            </div>

            {/* ACADEMICS */}
            <SectionTitle icon={FiBookOpen} title="Academics & Kin" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="course_name" type="text" placeholder="Course Name" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
              <div className="grid grid-cols-2 gap-2">
                <select name="level_of_study" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none">
                    <option value="">Level...</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                </select>
                <select name="mode_of_study" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none">
                    <option value="">Mode...</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Distance">Distance</option>
                </select>
              </div>
              <input name="next_of_kin" type="text" placeholder="Next of Kin Name" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
              <input name="next_of_kin_phone" type="tel" placeholder="Next of Kin Phone" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
            </div>

            {/* FINANCING */}
            <SectionTitle icon={FiCreditCard} title="Financing" />
            <div className="grid grid-cols-1">
              <input name="financier" type="text" placeholder="Who will fund your studies? (e.g. Self, Parent, Sponsor)" onChange={handleChange} required className="border p-2.5 rounded-lg bg-gray-50 focus:bg-white outline-none" />
            </div>

            {/* BUTTONS */}
            <div className="pt-8 flex flex-col md:flex-row gap-4">
              <button type="submit" disabled={loading} className="flex-[2] bg-pink-800 text-white py-3.5 rounded-xl font-bold hover:bg-pink-900 transition flex items-center justify-center space-x-2 shadow-lg shadow-pink-800/30">
                <FiSend /> <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
              </button>
              
              {applicationId && (
                <button type="button" onClick={handleDownload} className="flex-1 border-2 border-pink-800 text-pink-800 py-3.5 rounded-xl font-bold hover:bg-pink-50 transition flex items-center justify-center space-x-2">
                  <FiDownload /> <span>Download DOCX</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.9); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
};

export default AdmissionsPage;