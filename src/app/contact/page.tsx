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
    <div className="w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1A0E]">Get in Touch</h2>
        <p className="text-[#6B3A1F] text-sm md:text-base mt-2 px-4">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#2C1A0E] mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-1 focus:ring-[#FF8C42] transition text-sm md:text-base"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#2C1A0E] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-1 focus:ring-[#FF8C42] transition text-sm md:text-base"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[#2C1A0E] mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-1 focus:ring-[#FF8C42] transition text-sm md:text-base appearance-none bg-white"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="partnership">Partnership</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#2C1A0E] mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] focus:ring-1 focus:ring-[#FF8C42] transition resize-vertical text-sm md:text-base"
            placeholder="Tell us how we can help..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FF8C42] hover:bg-[#e07a2e] text-white font-bold py-3 md:py-4 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
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
          <div className="mt-4 p-3 md:p-4 bg-green-100 text-green-700 rounded-lg text-sm text-center">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-3 md:p-4 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            Something went wrong. Please try again later.
          </div>
        )}
      </form>

      {/* Contact Info */}
      <div className="mt-8 pt-6 md:pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-center sm:text-left">
          <div>
            <div className="text-2xl mb-2">📞</div>
            <h3 className="font-bold text-[#2C1A0E] text-sm md:text-base">Phone</h3>
            <p className="text-[#6B3A1F] text-xs md:text-sm">+91 12345 67890</p>
          </div>
          <div>
            <div className="text-2xl mb-2">✉️</div>
            <h3 className="font-bold text-[#2C1A0E] text-sm md:text-base">Email</h3>
            <p className="text-[#6B3A1F] text-xs md:text-sm">hello@tailio.com</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-bold text-[#2C1A0E] text-sm md:text-base">Address</h3>
            <p className="text-[#6B3A1F] text-xs md:text-sm">Delhi NCR, India</p>
          </div>
          <div>
            <div className="text-2xl mb-2">⏰</div>
            <h3 className="font-bold text-[#2C1A0E] text-sm md:text-base">Hours</h3>
            <p className="text-[#6B3A1F] text-xs md:text-sm">Mon-Fri: 9am - 6pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;