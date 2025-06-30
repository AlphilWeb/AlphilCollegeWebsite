"use client";
import React, { useState } from 'react';
import { FiMail, FiPhone, FiTwitter, FiLinkedin, FiInstagram, FiX } from 'react-icons/fi';
import Footer from '../../components/Footer';
import { fetchAPI } from '@/lib/api';

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  message: string;
};


const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);
    setStatusMessage('');
    setShowModal(false);

    try {
      await fetchAPI('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Properly stringify the form data
      });
      
      setSubmissionStatus('success');
      setStatusMessage('Your message has been sent successfully!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setSubmissionStatus('error');
      setStatusMessage(err instanceof Error ? err.message : 'Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmissionStatus(null);
    setStatusMessage('');
  };

  return (
    <div className="min-h-screen bg-[#013220]/5">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#013220] to-[#013220]/90 text-white py-12 px-0">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold mb-4 leading-tight">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl font-['Inter'] max-w-3xl mx-auto opacity-90">
            We'd love to hear from you. Reach out for inquiries, partnerships, or just to say hello.
          </p>
        </div>
      </div>

      {/* Spacer between Hero and Content */}
      <div className="h-12"></div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Email Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A9A9A9]/20">
            <div className="bg-[#FF338B]/10 p-4 rounded-full mb-6 w-max mx-auto">
              <FiMail className="text-[#FF338B] text-2xl" />
            </div>
            <h3 className="text-xl font-['Inter'] font-bold text-[#013220] mb-3 text-center">Email Us</h3>
            <div className="text-center space-y-1">
              <p className="text-[#013220]/80 font-['Inter']">alphilcollege@gmail.com</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A9A9A9]/20">
            <div className="bg-[#013220]/10 p-4 rounded-full mb-6 w-max mx-auto">
              <FiPhone className="text-[#013220] text-2xl" />
            </div>
            <h3 className="text-xl font-['Inter'] font-bold text-[#013220] mb-3 text-center">Call Us</h3>
            <div className="text-center space-y-1">
              <p className="text-[#013220]/80 font-['Inter']">+254 712 345 678</p>
              <p className="text-[#013220]/80 font-['Inter']">Mon-Fri: 8am-5pm</p>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A9A9A9]/20">
            <div className="bg-[#A9A9A9]/10 p-4 rounded-full mb-6 w-max mx-auto">
              <div className="flex space-x-3">
                <FiTwitter className="text-[#013220] text-xl hover:text-[#FF338B] transition-colors" />
                <FiLinkedin className="text-[#013220] text-xl hover:text-[#FF338B] transition-colors" />
                <FiInstagram className="text-[#013220] text-xl hover:text-[#FF338B] transition-colors" />
              </div>
            </div>
            <h3 className="text-xl font-['Inter'] font-bold text-[#013220] mb-3 text-center">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-[#013220]/80 font-['Inter'] hover:text-[#FF338B] transition-colors">Twitter</a>
              <a href="#" className="text-[#013220]/80 font-['Inter'] hover:text-[#FF338B] transition-colors">LinkedIn</a>
              <a href="#" className="text-[#013220]/80 font-['Inter'] hover:text-[#FF338B] transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl p-12 shadow-xl mb-16 border border-[#A9A9A9]/20">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#013220] mb-8 text-center">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-['Inter'] font-medium text-[#013220] mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent font-['Inter']"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-['Inter'] font-medium text-[#013220] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent font-['Inter']"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-['Inter'] font-medium text-[#013220] mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-black w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent font-['Inter']"
                  placeholder="Your Phone"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-['Inter'] font-medium text-[#013220] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="text-black w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent font-['Inter']"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-[#FF338B] text-white rounded-lg font-['Poppins'] font-bold hover:bg-[#FF338B]/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Call to Action */}
        <div className="bg-[#013220] rounded-xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')]"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg font-['Inter'] mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our programs and how we can help you achieve your goals
            </p>
            <button className="bg-[#FF338B] hover:bg-[#FF338B]/90 text-white px-8 py-4 rounded-lg font-['Poppins'] font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#FF338B]/30">
              <a href="/admissions/forms">Apply Now</a> 
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`relative bg-white rounded-xl p-8 max-w-md w-full shadow-2xl ${
            submissionStatus === 'success' ? 'border-t-4 border-[#013220]' : 'border-t-4 border-[#FF338B]'
          }`}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#A9A9A9] hover:text-[#013220] transition-colors"
            >
              <FiX size={24} />
            </button>
            
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
                submissionStatus === 'success' ? 'bg-[#013220]/10' : 'bg-[#FF338B]/10'
              } mb-6`}>
                {submissionStatus === 'success' ? (
                  <svg className="h-8 w-8 text-[#013220]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-[#FF338B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#013220] mb-3">
                {submissionStatus === 'success' ? 'Message Sent!' : 'Error Occurred!'}
              </h3>
              <p className="text-[#013220]/80 font-['Inter'] mb-6">
                {statusMessage}
              </p>
              <button
                onClick={closeModal}
                className={`px-6 py-2 rounded-lg font-['Poppins'] font-medium ${
                  submissionStatus === 'success' 
                    ? 'bg-[#013220] text-white hover:bg-[#013220]/90' 
                    : 'bg-[#FF338B] text-white hover:bg-[#FF338B]/90'
                } transition-all duration-300`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ContactPage;