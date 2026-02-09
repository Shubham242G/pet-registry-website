"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ContactForm from "./component/ContactForm";


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
    name: "Milo",
    text: "Tailio helped me register my Golden Retriever in minutes. Now I have peace of mind knowing he's protected!",
    image: "/images/image6.jpeg"
  },
  {
    id: 2,
    name: "Lambo",
    text: "Perfect for my 3 fur babies! The process was so simple and the app is beautiful.",
    image: "/images/image7.jpeg"
  },
  {
    id: 3,
    name: "Cheenu", 
    text: "Lost my pug once, never again! Tailio gives me complete confidence with their registration system.",
    image: "/images/image8.jpeg"
  },
  {
    id: 4,
    name: "White one",
    text: "Registered both my Labradors easily. Great support and super user-friendly interface.",
    image: "/images/image9.jpeg"
  }
];

export default function HomePage() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'Tailio' | 'Government'>('Tailio');

  const [isSliderInView, setIsSliderInView] = useState(false);
  const sliderRef = useRef(null);

  const governmentPoints = [
    'Complex registration process',
    'Multiple forms and documents required',
    'Limited guidance and support',
    'Delayed approvals and unclear timelines',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSliderInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

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









      {/* ================= HOW IT WORKS ================= */}
      <Section>
  <div className="text-center mb-16">
    <h2 className="text-5xl md:text-6xl font-bold">
      Didn’t Register Your Pet?
    </h2>
    <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-600">
      Here’s the Not-So-Fun Part
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 justify-items-center">
      {[
        "/images/image3.png",
        "/images/image4.png",
        "/images/image5.png",
      ].map((image, i) => (
        <div
          key={i}
          className="group relative w-64 md:w-72 lg:w-80 h-64 md:h-72 lg:h-80"
        >
          <img
            src={image}
            alt="Pet"
            className="w-full h-full object-contain rounded-full transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_0_6px_#fb923c]"
          />
        </div>
      ))}
    </div>
  </div>
</Section>






<Section> 
<div className="py-10 md:py-12">
  <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      
      {/* Left Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/images/image11.png"
          alt="Dog registration mandated"
          className="w-full max-w-sm md:max-w-md object-contain"
        />
      </div>

      {/* Right Text */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-snug">
          <span className="block whitespace-nowrap">
            Supreme Court: Dog Registration Mandated by Municipal Laws,
          </span>
          <span className="block whitespace-nowrap">
            Unregistered Pets Face Pickup
          </span>
        </h2>
      </div>

    </div>
  </div>
  </div>
</Section>








<section ref={sliderRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="w-full">
    <div className="bg-[#ff7200] w-full py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-4xl sm:text-5xl font-black text-black text-center tracking-tight">
          Official records. Unofficial cuddles
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex">
          {/* First slide set */}
          <div className="flex animate-slide-optimized">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`slide1-${testimonial.id}-${index}`} className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] px-6">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-[4/5]">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-300 rounded-xl shadow-2xl border-4 border-white/40"
                    />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mt-4">
                    {testimonial.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second slide set for seamless loop */}
          <div className="flex animate-slide-optimized" aria-hidden="true">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`slide2-${testimonial.id}-${index}`} className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] px-6">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-[4/5]">
                    <img 
                      src={testimonial.image} 
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[30%] rounded-xl shadow-2xl border-4 border-white/40"
                    />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mt-4">
                    {testimonial.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#ff7200] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#ff7200] to-transparent z-10"></div>
      </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes slide-optimized {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    
    .animate-slide-optimized {
      animation: slide-optimized 25s linear infinite;
      display: flex;
    }
    
    .animate-slide-optimized {
      transform: translateZ(0);
      will-change: transform;
      backface-visibility: hidden;
    }
    
    @media (max-width: 640px) {
      .animate-slide-optimized {
        animation-duration: 20s;
      }
    }
    
    @media (hover: hover) {
      .animate-slide-optimized:hover {
        animation-play-state: paused;
      }
    }
  `}</style>
</section>


<section id="whyTailio" className="w-full  bg-white py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center">
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 tracking-wide">
    Why Tailio?
  </h2>

  {/* Tabs */}
  <div className="flex space-x-4 mb-8 border-b border-gray-200">
    <button
      onClick={() => setActiveTab('Tailio')}
      className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${
        activeTab === 'Tailio'
          ? 'text-white bg-orange-500'
          : 'text-gray-600 bg-transparent'
      } rounded-t-md`}
    >
      Tailio
    </button>
    <button
      onClick={() => setActiveTab('Government')}
      className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${
        activeTab === 'Government'
          ? 'text-white bg-orange-500'
          : 'text-gray-600 bg-transparent'
      } rounded-t-md`}
    >
      Government Facilities
    </button>
  </div>

  {/* Content */}
  <div className="w-full flex flex-col lg:flex-row items-center gap-12">
    {/* Left content */}
    <div className="flex-1">
      {activeTab === 'Tailio' ? (
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            One form for you. Everything else? On us.              
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Tailio simplifies the entire pet registration process. No complicated forms or government hurdles. Register once and let us handle the rest for you.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governmentPoints.map((point, index) => (
            <div key={index} className="text-gray-800 text-lg">
              <span className="font-bold mr-2">{index + 1}.</span>
              {point}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Right image - Dynamic based on active tab */}
    <div className="flex-1 flex justify-center items-center w-full h-64 md:h-80 lg:h-96">
      <img
        src={activeTab === 'Tailio' ? "/images/happy.png" : "/images/sad.png"}
        alt={activeTab === 'Tailio' ? "Tailio illustration" : "Government facilities illustration"}
        className="object-cover rounded-lg transition-opacity duration-300 w-full h-full"
      />
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


<div className="max-w-4xl mx-auto px-4 sm:px-6 mb-4 lg:mb-6">
  <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-10 max-w-3xl mx-auto h-auto lg:h-72">
    {/* Left: Image - Optimized size */}
    <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto lg:mx-0">
      <img 
        src="/images/image2.png" 
        className="w-full h-full object-cover rounded-xl"
        alt="Fur babies" 
      />
    </div>

    {/* Right: All text in single lines */}
    <div className="w-full flex-1 flex flex-col items-center lg:items-start justify-center">
      {/* HEADING - Ensured single line */}
      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black whitespace-nowrap text-center lg:text-left leading-tight">
        Do You Have Many Fur Babies?
      </h3>
      
      {/* SUBTEXT - Single line with small spacing */}
      <p className="text-sm sm:text-base text-black font-medium whitespace-nowrap text-center lg:text-left mt-2">
        Don't Worry, We got you covered!
      </p>
      
      {/* CTA - Single line with spacing */}
      <a 
        href="/contact" 
        className="text-orange-500 font-bold text-base sm:text-lg hover:text-orange-600 transition-colors whitespace-nowrap inline-flex items-center self-center lg:self-start mt-3"
      >
        Contact us →
      </a>
    </div>
  </div>
</div>

<div >
  <ContactForm/>
</div>
    </main>
  );
}