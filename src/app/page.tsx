"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-16 px-4 md:px-12"
  >
    {children}
  </motion.section>
);

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Tailio helped me register my Golden Retriever in minutes. Now I have peace of mind knowing he's protected!",
    image: "/images/image6.jpeg"
  },
  {
    id: 2,
    name: "Mike Chen",
    text: "Perfect for my 3 fur babies! The process was so simple and the app is beautiful.",
    image: "/images/image7.jpeg"
  },
  {
    id: 3,
    name: "Emma Davis", 
    text: "Lost my pug once, never again! Tailio gives me complete confidence with their registration system.",
    image: "/images/image8.jpeg"
  },
  {
    id: 4,
    name: "Raj Patel",
    text: "Registered both my Labradors easily. Great support and super user-friendly interface.",
    image: "/images/image9.jpeg"
  }
];

export default function HomePage() {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Auto slide every 4 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="bg-white text-gray-900">

      {/* Your Banner - Keep as is */}
      <section className="relative h-[65vh] px-8 md:px-16 flex items-center justify-center">
  <div className="w-[85vw] max-w-7xl mt-10 h-full relative border-2 border-black">
    {/* Remove overflow-hidden to prevent clipping */}
    <div 
      className="absolute inset-0 w-full h-full bg-no-repeat bg-center"
      style={{ 
        backgroundImage: "url(/images/Banner.jpeg)",
        backgroundSize: "cover",  // Keep cover, but control with padding
        backgroundPosition: "center"
      }}
    />
    {/* Text overlay with higher z-index and padding buffer */}
    <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 text-right max-w-lg z-10 px-4 md:px-8 py-4 bg-white/90 backdrop-blur-sm rounded-lg">
      {/* Your commented text here - now won't get cut */}
    </div>
  </div>
</section>



      {/* ================= PET ID CHECK ================= */}
      <Section>
  <div className="max-w-5xl mt-10 mx-auto px-4 sm:px-6 ">
    <div className="grid md:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-stretch"> {/* More gap */}
      {/* Left: Big bold heading + Smaller image - Matches right height */}
      <div className="flex flex-col justify-between h-[420px] p-4 sm:p-6"> {/* Fixed height to match right */}
        <div className="flex-1 flex flex-col items-start justify-center">
  <h3 className="text-4xl sm:text-4xl lg:text-4xl font-black text-black leading-tight tracking-tight mb-4">
    <span>Love them,</span>
    <br />
    <span>Register them!</span>
  </h3>
  
  {/* Small subtext below main heading */}
  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-md">
    Love means never losing them. Register your pet and give yourself peace of mind.
  </p>
</div>
        
        {/* Smaller image - No cropping, full visibility */}
        <div className="w-full max-w-sm h-48 sm:h-56 lg:h-64 flex-shrink-0 ">
          <img 
            src="/images/image1.png" 
            alt="Pet registration" 
            className="w-full h-full object-contain"  
          />
        </div>
      </div>

      {/* Right: Signup Form - Fixed height */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 max-w-md mx-auto md:ml-auto h-[420px] flex flex-col justify-between">
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Join Tailio</h2>
            <p className="text-sm text-gray-600">Create account in seconds </p>
          </div>
          
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100/50 transition-all duration-200 hover:border-orange-300 bg-white shadow-sm"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100/50 transition-all duration-200 hover:border-orange-300 bg-white shadow-sm"
            />
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
              Sign Up Free
            </button>
          </div>
        </div>
        
        <div className="text-center space-y-2 pt-6 border-t border-gray-100">
          <p className="text-xs text-orange-500 font-medium">
            Already registered? <span className="underline hover:text-orange-600 cursor-pointer">Login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</Section>

<div className="max-w-4xl mx-auto sm:px-6 sm:mb-30">
  <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-2xl flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 max-w-3xl mx-auto h-80 lg:h-72">
    {/* Left: Image */}
    <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto lg:mx-0">
      <img 
        src="/images/image2.png" 
        className="w-full h-full object-cover rounded-xl"
        alt="Fur babies" 
      />
    </div>

    {/* Right: Perfect 3-line stack - ONE LINE heading, ONE LINE subtext, CTA */}
    <div className="w-full flex-1 flex flex-col items-center lg:items-start justify-center space-y-2">
      {/* HEADING - SINGLE LINE */}
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-black whitespace-nowrap">
        Do You Have Many Fur Babies?
      </h3>
      
      {/* SUBTEXT - SINGLE LINE */}
      <p className="text-xs sm:text-sm lg:text-base text-black font-medium text-center lg:text-left max-w-xs">
        Don't Worry, We got you covered !
      </p>
      
      {/* CTA BELOW */}
      <a 
        href="/contact" 
        className="text-orange-400 font-bold text-xs sm:text-sm lg:text-base hover:text-orange-500 transition-colors inline-flex items-center self-center lg:self-start"
      >
        Contact us →
      </a>
    </div>
  </div>
</div>








      {/* ================= HOW IT WORKS ================= */}
      <Section>
  <h2 className="text-3xl font-bold text-center mb-12">
    Why is Pet Registry important?
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 px-4 md:px-0">
    {[
      "/images/image3.png",
      "/images/image4.png",
      "/images/image5.png", 
      "/images/image6.png"
    ].map((image, i) => (
      <div key={i} className="group relative w-56 sm:w-64 lg:w-72 xl:w-80 h-56 sm:h-64 lg:h-72 xl:h-80 mx-auto">
        {/* Image with orange outline on hover */}
        <img 
          src={image} 
          alt="Pet" 
          className="w-full h-full object-contain rounded-full group-hover:scale-105 transition-all duration-300 group-hover:drop-shadow-[0_0_0_4px_#fb923c] group-hover:[filter:drop-shadow(0_0_0_4px_#fb923c)]"
        />
      </div>
    ))}
  </div>
</Section>








  <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black text-black text-center mb-20 tracking-tight"
        >
          Happy Pets
        </motion.h2>

        {/* Continuous sliding slider */}
        <div className="overflow-hidden relative py-8 -mx-4 lg:-mx-8">
  <div 
    className="flex animate-slide"
    style={{ 
      animationDuration: '18s',  // Faster: 30s → 18s
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear'
    }}
  >
    {/* 12 slides for perfect infinite loop - 3 visible x 4 cycles */}
    {Array.from({ length: 12 }, (_, i) => testimonials[i % 4]).map((testimonial, index) => (
      <motion.div
        key={`slide-${index}`}
        className="w-[33.333%] flex-shrink-0 px-4 lg:px-8"
        whileHover={{ scale: 1.02 }}
      >
        <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm mx-auto text-center h-[420px] flex flex-col justify-between">
          {/* BIG uncropped circular images */}
          <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 mx-auto mb-8 rounded-full overflow-hidden">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-contain rounded-full grayscale-[65%] hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-end space-y-4 px-2">
            <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 italic leading-tight line-clamp-3">
              "{testimonial.text}"
            </p>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight">
              {testimonial.name}
            </h4>
          </div>

          {/* Doodle accents */}
          <div className="absolute top-4 right-4 w-4 h-4 bg-orange-400/50 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-2 h-10 border-l-2 border-black/20 -rotate-12"></div>
        </div>
      </motion.div>
    ))}
  </div>

  <style jsx>{`
    @keyframes slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-25%); }
    }
    .animate-slide {
      animation: slide 18s linear infinite;
    }
  `}</style>
</div>


      </div>
    </section>

      {/* ================= PARTNERS ================= */}
      {/* <Section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-lg flex items-center justify-center"
            >
              Logo
            </div>
          ))}
        </div>
      </Section> */}

      {/* ================= BLOGS ================= */}
      {/* <Section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Pet Registry Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "If Your Pet Goes Missing",
            "Why Every Pet Needs a Digital ID",
            "Pet Adoption Checklist",
          ].map((title, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-6">
              <div className="h-32 bg-gray-100 mb-4 rounded">Image</div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <button className="text-emerald-600 font-medium">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </Section> */}

      {/* ================= NEWS ================= */}
      {/* <Section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Media and News
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                Pet Registry Featured in National Media
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                How digital pet IDs are helping reunite thousands of pets with
                families across the country.
              </p>
              <button className="text-emerald-600 font-medium">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </Section> */}

      {/* ================= VERIFICATION ================= */}
      {/* <Section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Verified Pet Registry & Resolution
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
            Image Placeholder
          </div>
          <ul className="space-y-4">
            <li>✔ Verify pet ownership</li>
            <li>✔ Report lost or found pets</li>
            <li>✔ Check vaccination records</li>
            <li>✔ View adoption or shelter status</li>
          </ul>
        </div>
      </Section> */}

    </main>
  );
}
