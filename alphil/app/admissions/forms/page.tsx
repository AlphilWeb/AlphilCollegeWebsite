'use client';
import { fetchAPI } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import {
  FiBookOpen,
  FiCheckCircle,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiHome,
  FiSend,
  FiUser,
  FiXCircle
} from 'react-icons/fi';

type ApplicationForm = {
  full_name: string;
  title: string;
  date_of_birth: string;
  nationality: string;
  id_number: string;
  county: string;
  sub_county: string;
  phone_number: string;
  po_box: string;
  town: string;
  email: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  course_name: string;
  mode_of_study: string;
  level_of_study: string;
  financier: string;
  religion: string;
};

const AdmissionsPage = () => {
  const [formData, setFormData] = useState<ApplicationForm>({
    full_name: '',
    title: '',
    date_of_birth: '',
    nationality: '',
    id_number: '',
    county: '',
    sub_county: '',
    phone_number: '',
    po_box: '',
    town: '',
    email: '',
    next_of_kin: '',
    next_of_kin_phone: '',
    course_name: '',
    mode_of_study: '',
    level_of_study: '',
    financier: '',
    religion: '',
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
        // Reset form after successful submission
        setFormData({
          full_name: '',
          title: '',
          date_of_birth: '',
          nationality: '',
          id_number: '',
          county: '',
          sub_county: '',
          phone_number: '',
          po_box: '',
          town: '',
          email: '',
          next_of_kin: '',
          next_of_kin_phone: '',
          course_name: '',
          mode_of_study: '',
          level_of_study: '',
          financier: '',
          religion: '',
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
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
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Download failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Alphil_College_Application_${applicationId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-black">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-in">
          <div className={`flex items-center p-4 rounded-lg shadow-xl border-l-4 bg-white ${submissionStatus === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            {submissionStatus === 'success' ? (
              <FiCheckCircle className="text-green-500 mr-3 text-xl" />
            ) : (
              <FiXCircle className="text-red-500 mr-3 text-xl" />
            )}
            <div>
              <p className="text-gray-700 font-medium">
                {submissionStatus === 'success' ? 'Application Submitted Successfully!' : 'Submission Failed'}
              </p>
              {submissionStatus === 'success' && applicationId && (
                <p className="text-sm text-gray-500 mt-1">Your Application ID: {applicationId}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-pink-800 to-pink-700 p-8 text-white text-center">
            <h1 className="text-3xl font-bold uppercase tracking-tight">Alphil College Admission Application</h1>
            <p className="mt-2 opacity-90 text-sm">Complete all fields below to submit your application</p>

          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* SECTION 1: PERSONAL DETAILS */}
            <SectionTitle icon={FiUser} title="Personal Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title*</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr.</option>
                  <option value="Ms">Ms.</option>
                  <option value="Mrs">Mrs.</option>
                </select>
              </div>
              
              <div className="lg:col-span-3">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name*</label>
                <input
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full legal name"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date of Birth*</label>
                <input
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nationality*</label>
                <input
                  name="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Kenyan"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ID/Passport Number*</label>
                <input
                  name="id_number"
                  type="text"
                  value={formData.id_number}
                  onChange={handleChange}
                  required
                  placeholder="National ID or Passport"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Religion</label>
                <input
                  name="religion"
                  type="text"
                  value={formData.religion}
                  onChange={handleChange}
                  placeholder="e.g., Christian, Muslim"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* SECTION 2: CONTACT & LOCATION */}
            <SectionTitle icon={FiHome} title="Contact & Location Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address*</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number*</label>
                <input
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  placeholder="07XX XXX XXX"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">County*</label>
                <input
                  name="county"
                  type="text"
                  value={formData.county}
                  onChange={handleChange}
                  required
                  placeholder="County of Residence"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sub-County*</label>
                <input
                  name="sub_county"
                  type="text"
                  value={formData.sub_county}
                  onChange={handleChange}
                  required
                  placeholder="Sub-County"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">P.O. Box*</label>
                <input
                  name="po_box"
                  type="text"
                  value={formData.po_box}
                  onChange={handleChange}
                  required
                  placeholder="P.O. Box Number"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Town*</label>
                <input
                  name="town"
                  type="text"
                  value={formData.town}
                  onChange={handleChange}
                  required
                  placeholder="Town/City"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* SECTION 3: ACADEMICS & NEXT OF KIN */}
            <SectionTitle icon={FiBookOpen} title="Academic & Next of Kin Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Course Name*</label>
                <input
                  name="course_name"
                  type="text"
                  value={formData.course_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Caregiving"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Level of Study*</label>
                <select
                  name="level_of_study"
                  value={formData.level_of_study}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                >
                  <option value="">Select Level</option>
                  <option value="Certificate">Level 1</option>
                  <option value="Diploma">Level 2</option>
                  <option value="Degree">Level 3</option>
                  <option value="Postgraduate">Level 4</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mode of Study*</label>
                <select
                  name="mode_of_study"
                  value={formData.mode_of_study}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                >
                  <option value="">Select Mode</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Distance">Distance Learning</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Next of Kin Name*</label>
                <input
                  name="next_of_kin"
                  type="text"
                  value={formData.next_of_kin}
                  onChange={handleChange}
                  required
                  placeholder="Full name of next of kin"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Next of Kin Phone*</label>
                <input
                  name="next_of_kin_phone"
                  type="tel"
                  value={formData.next_of_kin_phone}
                  onChange={handleChange}
                  required
                  placeholder="07XX XXX XXX"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* SECTION 4: FINANCING */}
            <SectionTitle icon={FiCreditCard} title="Financing Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Financier/Sponsor*</label>
                <input
                  name="financier"
                  type="text"
                  value={formData.financier}
                  onChange={handleChange}
                  required
                  placeholder="Who will fund your studies? (e.g., Self, Parents, Scholarship, HELB)"
                  className="w-full border-gray-300 border p-3 rounded-lg bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* FORM SUBMISSION & ACTIONS */}
            <div className="pt-8 border-t border-gray-200">
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <div className="flex items-start">
                  <FiFileText className="text-pink-700 mt-1 mr-3 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Important Notes</h3>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      <li>• All fields marked with * are required</li>
                      <li>• Ensure all information is accurate before submission</li>
                      <li>• You can download your completed application after submission</li>
                      <li>• You will receive a confirmation email once processed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-gradient-to-r from-pink-800 to-pink-700 text-white py-4 rounded-xl font-bold hover:from-pink-900 hover:to-pink-800 transition duration-300 flex items-center justify-center space-x-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>

                {applicationId && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={loading}
                    className="flex-1 border-2 border-pink-800 text-pink-800 py-4 rounded-xl font-bold hover:bg-pink-50 transition duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiDownload />
                    <span>Download DOCX</span>
                  </button>
                )}
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                By submitting this form, you agree to our Terms and Conditions
              </p>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Alphil College. All rights reserved.</p>
          <p className="mt-1">Need help? Contact admissions@alphilcollege.ac.ke or call +254 700 000 000</p>
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