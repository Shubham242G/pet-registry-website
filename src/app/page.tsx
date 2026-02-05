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
      <section className="relative h-[65vh]  px-8 md:px-16 flex items-center justify-center">
        <div className="w-[85vw] max-w-7xl mx-auto h-full relative border-2 border-black overflow-hidden ">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat object-cover"
            style={{ backgroundImage: "url(/images/Banner.png)", backgroundPosition: "center 69%" }}
          />
          <div className="absolute right-12 md:right-20 top-1/2 -translate-y-1/2 text-right max-w-lg ml-auto pr-8">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
              <h1 className="mr-25 text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-0">
                <div className="text-orange-400 mb-[-0.5rem]">#Own</div>
                <div className="text-orange-400 mb-[-0.5rem]">Your</div>
                <div className="text-orange-400 ">Pet</div>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ================= PET ID CHECK ================= */}
      <Section>
  <div className="max-w-5xl mx-auto px-4 sm:px-6"> {/* Smaller container */}
    <div className="grid md:grid-cols-2 gap-8 items-stretch"> {/* Reduced gap-12→gap-8 */}
      {/* Left: Hero Text + Pet Image Space */}
      <div className="flex flex-col h-80 p-6 justify-between bg-gradient-to-br from-orange-50/90 to-yellow-50/90 backdrop-blur-sm rounded-xl shadow-2xl border border-orange-100/50"> {/* Smaller h-96→h-80, attractive gradient */}
        <div className="flex-1 flex items-center justify-center text-center">
          <h3 className="text-3xl sm:text-4xl font-black text-orange-500 leading-tight tracking-tight drop-shadow-sm">
            Love them,<br/>Register them 🐾
          </h3>
        </div>
        
        {/* Pet Image Space */}
        <div className="flex-1 bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-dashed border-orange-200 flex items-center justify-center mt-4 shadow-inner">
          <div className="text-center p-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3 border-4 border-white drop-shadow-md">
              <span className="text-3xl">🐕</span>
            </div>
            <p className="text-xs font-semibold text-gray-600 tracking-wide">Upload Pet Photo</p>
          </div>
          {/* <Image src="/your-pet.jpg" alt="Pet" className="w-full h-full object-cover rounded-lg" /> */}
        </div>
      </div>

      {/* Right: Attractive Signup Form */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-orange-100/50 h-80 flex flex-col justify-between">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">Join Pet Registry</h2>
          <p className="text-sm text-gray-600">Create account in seconds 🐾</p>
        </div>
        
        <div className="space-y-3 flex-1 flex flex-col justify-center"> {/* space-y-4→space-y-3 */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100/50 transition-all duration-200 hover:border-orange-300 bg-gradient-to-r from-white to-gray-50 shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100/50 transition-all duration-200 hover:border-orange-300 bg-gradient-to-r from-white to-gray-50 shadow-sm"
          />
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
            Sign Up Free
          </button>
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-xs text-gray-500">
            ✔ No credit card needed • Instant access
          </p>
          <p className="text-xs text-orange-500 font-medium">Already registered? <span className="underline hover:text-orange-600 cursor-pointer">Login</span></p>
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
