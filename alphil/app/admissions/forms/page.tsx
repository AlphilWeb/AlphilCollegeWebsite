'use client';
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

type ApplicationForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  education: string;
  other: string;
};

const AdmissionsPage = () => {
  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    education: '',
    other: '',
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);
    setStatusMessage('');
    setShowToast(false);

    try {
      await fetchAPI('/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmissionStatus('success');
      setStatusMessage('Your application has been submitted successfully!');
    } catch (err) {
      console.error(err);
      setSubmissionStatus('error');
      setStatusMessage('Failed to submit your application. Please try again later.');
    } finally {
      setLoading(false);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/forms/application_form.pdf';
    link.download = 'application-form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 relative">
      {/* Toast */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div
            className={`relative z-50 max-w-sm w-full mx-auto rounded-2xl p-6 shadow-2xl border-2 flex items-center space-x-4 animate-fade-in ${
              submissionStatus === 'success' ? 'border-green-600 bg-white' : 'border-red-600 bg-white'
            }`}
          >
            {submissionStatus === 'success' ? (
              <FiCheckCircle className="text-3xl text-green-600" />
            ) : (
              <FiXCircle className="text-3xl text-red-600" />
            )}
            <div
              className={`font-semibold ${
                submissionStatus === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {statusMessage}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      <h1 className="text-4xl font-bold mb-8 text-pink-800">Admissions Application</h1>

      <div className="bg-white rounded-xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            />
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              name="course"
              id="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            >
              <option value="">Select a course</option>
              <option value="certified-medical-assistant">Certified Medical Assistant</option>
              <option value="care-giving">Care Giving</option>
              <option value="information-technology">Information Technology</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
              Highest Education
            </label>
            <select
              name="education"
              id="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            >
              <option value="">Select your education level</option>
              <option value="high-school">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          {/* Additional Info */}
          <div className="md:col-span-2">
            <label htmlFor="other" className="block text-sm font-medium text-gray-700 mb-1">
              Any Other Relevant Information
            </label>
            <textarea
              name="other"
              id="other"
              value={formData.other}
              onChange={handleChange}
              rows={4}
              placeholder="Add anything else you'd like us to know..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900"
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={handleDownload}
              className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-100 transition"
            >
              Download Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-pink-800 text-white rounded-md hover:bg-pink-900 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

          {/* Info about returning the form */}
          <div className="md:col-span-2 mt-4 text-sm text-gray-600 italic">
            <p>
              Duly filled application forms should be returned to the college for registration.
              Application fee of Kshs. 1500 is payable at the reception on submission of the form.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionsPage;
