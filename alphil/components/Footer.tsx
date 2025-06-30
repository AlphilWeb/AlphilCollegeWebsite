import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '@/public/Images/Logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-[#013220] text-white pt-12 pb-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info and Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Alphil College Logo" 
                className="w-16 h-auto"
              />
              <h3 className="text-xl font-bold font-['Playfair_Display']">
                Alphil <br /> Training College
              </h3>
            </div>
            
            <p className="text-white/80">
              Empowering futures through practical healthcare education.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#FF338B]" />
                <div>
                  <h4 className="font-bold">OUR LOCATION</h4>
                  <p className="text-white/80">
                    Kiratina Estate, Menengai Ward <br />
                    Nakuru East Sub-County, Kenya
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaClock className="mt-1 text-[#FF338B]" />
                <div>
                  <h4 className="font-bold">HOURS</h4>
                  <p className="text-white/80">
                    Weekdays: 8AM - 5PM <br />
                    Saturdays: 8AM - 1PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-[#FF338B] pb-2 inline-block">
              Contact Us
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#FF338B]" />
                <div>
                  <a href="tel:+254782179498" className="hover:text-[#FF338B] transition">
                    +254 782 179 498
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#FF338B]" />
                <div>
                  <a href="mailto:alphilcollege@gmail.com" className="hover:text-[#FF338B] transition">
                    alphilcollege@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#FF338B]" />
                <div>
                  <p>P.O Box 19246 - 20100</p>
                  <p>Nakuru, Kenya</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h5 className="font-bold mb-2">Medical Centers</h5>
              <p className="text-white/80">
                4 centers nationwide for student attachments
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-[#FF338B] pb-2 inline-block">
              Quick Links
            </h4>
            
            <nav className="space-y-2">
              <a href="/about" className="block hover:text-[#FF338B] transition">About Us</a>
              <a href="/courses" className="block hover:text-[#FF338B] transition">Our Courses</a>
              <a href="/admissions" className="block hover:text-[#FF338B] transition">Admissions</a>
              <a href="/successStories" className="block hover:text-[#FF338B] transition">Success Stories</a>
              <a href="/contact" className="block hover:text-[#FF338B] transition">Contact</a>
            </nav>
          </div>

          {/* Social Media and Map */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-[#FF338B] pb-2 inline-block">
              Follow Us
            </h4>
            
            <div className="flex gap-4 text-2xl mb-6">
              <a href="https://facebook.com/alphilcollege" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF338B] transition">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/alphilcollege" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF338B] transition">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/alphilcollege" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF338B] transition">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/alphilcollege" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF338B] transition">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com/alphilcollege" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF338B] transition">
                <FaYoutube />
              </a>
            </div>
            
            <div className="relative pb-[100%]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.770131681689!2d36.12427267580669!3d-0.28160083535501335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829933342f6b183%3A0x540bdc83f3c7cc45!2sALPHIL%20TRAINING%20COLLEGE!5e0!3m2!1sen!2ske!4v1751032236900!5m2!1sen!2ske"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md border border-[#A9A9A9]/20"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alphil Training College Location"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
          <div className="border-t border-[#FF338B]/30 mt-8 pt-6 text-center text-white/70">
            <p>&copy; {new Date().getFullYear()} Alphil Training College. All rights reserved.</p>
            <p className="mt-2">Developed by <a href="https://iwebx.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF338B] transition-colors">iWebX</a></p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;