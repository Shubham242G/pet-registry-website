'use client';
import { motion } from 'framer-motion';
import ContactForm from '../../component/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <main className="mt-25 min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-20 mb-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">


        {/* Contact Form - full content visible */}
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
