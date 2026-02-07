'use client';

import { motion } from 'framer-motion';
import ContactForm from '../../component/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center pt-28 pb-20">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact_background.jpeg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 sm:px-8 lg:px-12">

        {/* Title */}
        {/* <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 whitespace-nowrap"
        >
          Get in Touch With Us
        </motion.h1> */}

        {/* Contact Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          <ContactForm />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
