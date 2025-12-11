'use client';
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

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
  postal_code: string;
  town: string;
  email: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  next_next_of_kin: string;
  next_next_of_kin_phone: string;
  course_name: string;
  mode_of_study: string;
  level_of_study: string; // <--- ADDED FIELD
  intake: string;
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
    postal_code: '',
    town: '',
    email: '',
    next_of_kin: '',
    next_of_kin_phone: '',
    next_next_of_kin: '',
    next_next_of_kin_phone: '',
    course_name: '',
    mode_of_study: '',
    level_of_study: '', // <--- ADDED FIELD
    intake: '',
    financier: '',
    religion: '',
  });

  const placeholders: Record<string, string> = {
    full_name: 'Jane Doe',
    title: 'Ms',
    date_of_birth: '1990-01-01',
    nationality: 'Kenyan',
    id_number: '12345678',
    county: 'Nairobi',
    sub_county: 'Westlands',
    phone_number: '+254700000000',
    po_box: '12345',
    postal_code: '00100',
    town: 'Nairobi',
    email: 'jane.doe@example.com',
    next_of_kin: 'John Doe',
    next_of_kin_phone: '+254700000001',
    next_next_of_kin: 'Mary Doe',
    next_next_of_kin_phone: '+254700000002',
    course_name: 'Computer Science',
    mode_of_study: 'Full-time',
    level_of_study: 'Diploma', // <--- ADDED PLACEHOLDER
    intake: 'September 2024',
    financier: 'Self',
    religion: 'Christian',
  };

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [applicationId, setApplicationId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      const response = await fetchAPI('/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.success && response.data?.id) {
        setSubmissionStatus('success');
        setStatusMessage('Your application has been submitted successfully!');
        setApplicationId(response.data.id);
      } else {
        throw new Error('Unexpected response format');
      }
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

  const handleDownload = async () => {
    if (!applicationId) {
      setSubmissionStatus('error');
      setStatusMessage('Please submit the form first before downloading');
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://alphilcollegewebsite.onrender.com'}/applications/${applicationId}/download-docx`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Alphil_College_Application_${applicationId}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      setSubmissionStatus('error');
      setStatusMessage('Failed to download document. Please try again.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 text-gray-900';

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 relative">
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
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>

      <h1 className="text-4xl font-bold mb-8 text-pink-800">Admissions Application</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className={key.includes('next_next') ? 'md:col-span-2' : ''}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
            <input
              type={key.includes('date') ? 'date' : 'text'}
              name={key}
              id={key}
              value={value}
              placeholder={placeholders[key]}
              onChange={handleChange}
              required={!key.includes('next_next')}
              className={inputClass}
            />
          </div>
        ))}

        <div className="md:col-span-2 flex justify-end gap-x-4 mt-4">
          <button
            type="button"
            onClick={handleDownload}
            className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-100 transition"
          >
            Download Filled Form
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-pink-800 text-white rounded-md hover:bg-pink-900 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionsPage;