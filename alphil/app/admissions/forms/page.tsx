'use client';
import React, { useState } from 'react';
import { fetchAPI } from '@/lib/api'; // ✅ Adjust path if needed

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
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);

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
      setShowModal(true);
    }
  };

  const handleDownload = () => {
    // This will download the form from the public/forms directory
    const link = document.createElement('a');
    link.href = '/forms/application_form.pdf'; // Make sure this file exists in your public/forms folder
    link.download = 'application-form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmissionStatus(null);
    setStatusMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-pink-800">Admissions Application</h1>

      <div className="bg-white rounded-xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form fields remain the same */}
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
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
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
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
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
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
              <option value="care-giving">Care Giving </option>
              <option value="information-technology">Information Technology</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Highest Education</label>
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
            <label htmlFor="other" className="block text-sm font-medium text-gray-700 mb-1">Any Other Relevant Information</label>
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

          {/* Added message about returning the form */}
          <div className="md:col-span-2 mt-4 text-sm text-gray-600 italic">
            <p>Duly filled application forms should be returned to the college for registration. Application fee of Kshs. 1500 is payable at the reception on submission of the form.</p>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 min-w-[300px] text-white shadow-xl transition-all ${
            submissionStatus === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}>
            <h3 className="text-xl font-bold mb-3">
              {submissionStatus === 'success' ? 'Success!' : 'Error'}
            </h3>
            <p className="mb-4">{statusMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsPage;