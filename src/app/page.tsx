"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

export default function HomePage() {
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
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"> {/* Increased gap */}
      {/* Left: Clean Text + Image - NO background/box */}
      <div className="space-y-8">
        <h3 className="text-3xl sm:text-3xl lg:text-3xl font-black text-black leading-tight tracking-tight">
          Love them, Register them 
        </h3>
        
        {/* Real image from /images/image1.png - NO box/background */}
        <div className="w-full max-w-md h-70 sm:h-90 bg-cover bg-center ">
          <img 
            src="/images/image1.png" 
            alt="Pet registration" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right: Signup Form - Same content, clean white */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-auto md:ml-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Join Tailio</h2>
          <p className="text-sm text-gray-600">Create account in seconds 🐾</p>
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
        
        <div className="text-center space-y-2 mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            ✔ No credit card needed • Instant access
          </p>
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
        <h2 className="text-3xl font-bold text-center mb-12">
          Why is Pet Registry important?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            "Register your pet with photo & details",
            "Get a digital Pet ID with QR tag",
            "Anyone can scan to help reunite lost pets",
          ].map((step, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow">
              <div className="text-orange-400 text-3xl font-bold mb-2">
                {i + 1}
              </div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= PARTNERS ================= */}
      <Section>
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
      </Section>

      {/* ================= BLOGS ================= */}
      <Section>
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
      </Section>

      {/* ================= NEWS ================= */}
      <Section>
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
      </Section>

      {/* ================= VERIFICATION ================= */}
      <Section>
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
      </Section>

    </main>
  );
}
