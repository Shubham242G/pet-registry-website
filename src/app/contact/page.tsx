// component/ContactForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#2C1A0E] mb-3 sm:mb-4">
          Get in Touch
        </h2>
        <p className="text-[#6B3A1F] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {/* Form Section */}
        <div className="order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-[#2C1A0E] mb-2">
                  Your Name <span className="text-[#FF8C42]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all text-sm sm:text-base bg-white"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-[#2C1A0E] mb-2">
                  Email Address <span className="text-[#FF8C42]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all text-sm sm:text-base bg-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm sm:text-base font-semibold text-[#2C1A0E] mb-2">
                Subject <span className="text-[#FF8C42]">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all text-sm sm:text-base appearance-none bg-white cursor-pointer"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-[#2C1A0E] mb-2">
                Message <span className="text-[#FF8C42]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all resize-vertical text-sm sm:text-base bg-white"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF8C42] hover:bg-[#e07a2e] active:bg-[#c96a1e] text-white font-semibold sm:font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message →'
              )}
            </button>

            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 sm:p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg text-sm sm:text-base text-center"
              >
                ✓ Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 sm:p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm sm:text-base text-center"
              >
                ✗ Something went wrong. Please try again later.
              </motion.div>
            )}
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="order-1 lg:order-2">
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E4] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#FFCCA0]/30 h-full">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C1A0E] mb-6 sm:mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl">📞</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2C1A0E] text-base sm:text-lg mb-1">Phone</h4>
                  <p className="text-[#6B3A1F] text-sm sm:text-base break-words">
                    <a href="tel:+911234567890" className="hover:text-[#FF8C42] transition-colors">
                      +91 12345 67890
                    </a>
                  </p>
                  <p className="text-[#6B3A1F] text-xs sm:text-sm mt-1 opacity-70">
                    Mon-Fri, 9am - 6pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl">✉️</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2C1A0E] text-base sm:text-lg mb-1">Email</h4>
                  <p className="text-[#6B3A1F] text-sm sm:text-base break-words">
                    <a href="mailto:hello@tailio.com" className="hover:text-[#FF8C42] transition-colors">
                      hello@tailio.com
                    </a>
                  </p>
                  <p className="text-[#6B3A1F] text-xs sm:text-sm mt-1 opacity-70">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl">📍</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2C1A0E] text-base sm:text-lg mb-1">Address</h4>
                  <p className="text-[#6B3A1F] text-sm sm:text-base leading-relaxed">
                    Delhi NCR, India
                  </p>
                  <p className="text-[#6B3A1F] text-xs sm:text-sm mt-1 opacity-70">
                    Serving pet parents across India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl">⏰</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2C1A0E] text-base sm:text-lg mb-1">Business Hours</h4>
                  <p className="text-[#6B3A1F] text-sm sm:text-base">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-[#6B3A1F] text-sm sm:text-base">
                    Saturday: 10:00 AM - 2:00 PM
                  </p>
                  <p className="text-[#6B3A1F] text-xs sm:text-sm mt-1 opacity-70">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#FFCCA0]/30">
              <h4 className="font-semibold text-[#2C1A0E] text-sm sm:text-base mb-4">Follow Us</h4>
              <div className="flex gap-3 sm:gap-4">
                {[
                  { name: 'Facebook', icon: '📘', link: '#' },
                  { name: 'Twitter', icon: '🐦', link: '#' },
                  { name: 'Instagram', icon: '📸', link: '#' },
                  { name: 'LinkedIn', icon: '🔗', link: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-xl sm:text-2xl hover:bg-[#FF8C42] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;