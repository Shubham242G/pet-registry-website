'use client';
import React, { useRef, useState, useEffect, FormEvent } from 'react';

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>('Send Message');
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('Sending...');

    try {
      const formData = new FormData(formRef.current);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('Sent! 🐾');
        alert('Message sent successfully!');
        formRef.current.reset();
        setTimeout(() => setStatus('Send Message'), 2000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Form error:', error);
      setStatus('Send Message');
      alert('Please try again or email us at info@tailio.com');
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto w-full space-y-8 p-8 md:p-12 h-screen flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="h-12 bg-gray-200 rounded-xl mx-auto mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="h-16 bg-gray-200 rounded-xl"></div>
            <div className="h-16 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="h-16 bg-gray-200 rounded-xl max-w-2xl mx-auto mt-8"></div>
          <div className="h-32 bg-gray-200 rounded-xl max-w-2xl mx-auto mt-6"></div>
          <div className="h-16 bg-orange-500 rounded-xl max-w-xl mx-auto mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      className="max-w-6xl mx-auto w-full space-y-12 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative"
    >
      {/* Title */}
      <div className="text-center flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-500 tracking-wider mb-4 uppercase">
          Get In Touch
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl leading-relaxed mt-6">
          We're here to help every step of the way
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Your Name *
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full h-16 md:h-20 bg-transparent border-0 border-b-[6px] border-gray-300 focus:border-orange-500 focus:outline-none text-xl md:text-2xl placeholder-gray-500 pb-4 transition-all duration-300 hover:border-gray-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              name="user_phone"
              className="w-full h-16 md:h-20 bg-transparent border-0 border-b-[6px] border-gray-300 focus:border-orange-500 focus:outline-none text-xl md:text-2xl placeholder-gray-500 pb-4 transition-all duration-300 hover:border-gray-400"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
            Email Address *
          </label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full h-16 md:h-20 bg-transparent border-0 border-b-[6px] border-gray-300 focus:border-orange-500 focus:outline-none text-xl md:text-2xl placeholder-gray-500 pb-4 transition-all duration-300 hover:border-gray-400"
            placeholder="petlover@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
            About Your Pet *
          </label>
          <textarea
            name="message"
            rows={6}
            required
            className="w-full bg-transparent border-0 border-b-[6px] border-gray-300 focus:border-orange-500 focus:outline-none text-xl placeholder-gray-500 pb-4 resize-none transition-all duration-300 hover:border-gray-400 min-h-[200px]"
            placeholder="Tell us about your furry friend - breed, name, age, questions..."
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={status === 'Sending...'}
            className="w-full px-6 py-3 text-white font-medium border border-orange-400 rounded-lg bg-orange-400 hover:bg-orange-500 hover:border-orange-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status}
          </button>
        </div>
      </div>

      {/* Decorations */}
      <div className="absolute top-12 right-12 w-20 h-20 border-4 border-dashed border-orange-400/40 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-12 w-16 h-16 bg-orange-400/30 rounded-2xl rotate-[-20deg] opacity-60"></div>
    </form>
  );
};

export default ContactForm;
