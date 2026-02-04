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
      <section className="relative h-[65vh] py-12 px-8 md:px-16 flex items-center justify-center">
        <div className="w-[85vw] max-w-7xl mx-auto h-full relative border-2 border-black overflow-hidden ">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat object-cover"
            style={{ backgroundImage: "url(/images/banner.png)", backgroundPosition: "center 69%" }}
          />
          <div className="absolute right-12 md:right-20 top-1/2 -translate-y-1/2 text-right max-w-lg ml-auto pr-8">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-0">
                <div className="text-orange-400 mb-[-0.5rem]">#Own</div>
                <div className="text-orange-400 mb-[-0.5rem]">Your</div>
                <div className="text-orange-400 ">Pets</div>
              </h1>
            </motion.div>
            {/* <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="flex-1 bg-black text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-bold text-lg border-2 border-black transition-all duration-300 shadow-lg hover:shadow-black/25 hover:-translate-y-1 whitespace-nowrap">
                Register Pet
              </Link>
              <Link href="/login" className="flex-1 bg-white text-black hover:bg-black hover:text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-black transition-all duration-300 shadow-lg hover:shadow-black/25 hover:-translate-y-1 whitespace-nowrap">
                Login
              </Link>
            </motion.div> */}
          </div>
        </div>
      </section>


      {/* ================= PET ID CHECK ================= */}
      <Section>
  <div className="max-w-6xl mx-auto px-6 py-20">
    <div className="grid md:grid-cols-2 gap-12 items-stretch">
      {/* Left: Text + Picture Space */}
      <div className="flex flex-col h-96 p-8 justify-between bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="flex-1 flex items-center justify-center text-center">
          <h3 className="text-4xl font-black text-orange-400 leading-tight tracking-tight">
            Love them,<br/>Own them
          </h3>
        </div>
        
        {/* Picture Space */}
        <div className="flex-1 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mt-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-lg shadow flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🐕</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Picture space</p>
          </div>
          {/* Add your image: <Image src="/your-pet.jpg" alt="Pet" className="w-full h-full object-cover rounded-xl" /> */}
        </div>
      </div>

      {/* Right: Simple Sober Form */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 h-96 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Enter Pet ID</h2>
        
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          <input
            type="text"
            placeholder="Enter 12-digit Pet ID / Microchip ID"
            maxLength={12}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Check Pet Details
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          ✔ No login required
        </p>
      </div>
    </div>
  </div>
</Section>


      {/* ================= HOW IT WORKS ================= */}
      <Section>
        <h2 className="text-3xl font-bold text-center mb-12">
          How Pet Registry Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            "Register your pet with photo & details",
            "Get a digital Pet ID with QR tag",
            "Anyone can scan to help reunite lost pets",
          ].map((step, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow">
              <div className="text-emerald-600 text-3xl font-bold mb-2">
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
