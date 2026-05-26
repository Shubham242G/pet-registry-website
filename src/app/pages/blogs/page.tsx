"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "Why Every Pet Owner Needs a Pet Registry",
      excerpt:
        "From medical history to emergency contacts, a pet registry keeps everything safe and accessible anytime, anywhere.",
      category: "Pet Safety",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Lost Pet? How a Digital Registry Can Help",
      excerpt:
        "Microchips are great. But combining them with an online registry increases recovery chances drastically.",
      category: "Rescue",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "The Future of Pet Identity in 2026",
      excerpt:
        "Smart tags, QR codes, cloud records — pet identity management is evolving fast.",
      category: "Technology",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-['Nunito'] overflow-x-hidden">
      {/* Hero Section with Image on Right */}
      <section className="relative min-h-[40vh] md:h-[50vh] px-4 md:px-6 border-b-4 border-black overflow-hidden py-12 md:py-0">
        <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Side - Heading Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight"
            >
              <span className="text-[#f88013]">Blogs</span>
            </motion.h1>

            {/* Doodle underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "7rem" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 flex justify-center md:justify-start"
            >
              <div className="w-28 h-2.5 bg-[#f88013] rounded-full rotate-2"></div>
            </motion.div>
          </div>

          {/* Right Side - Image/Illustration */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <Image
                src="/images/blogPage.png"
                alt="Pet registry blog illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 md:px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-4 border-black rounded-2xl md:rounded-3xl p-5 md:p-6 hover:-rotate-1 hover:shadow-[8px_8px_0px_black] transition-all duration-300 bg-white"
            >
              <div className="mb-4">
                <span className="bg-[#f88013] text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide inline-block">
                  {blog.category}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug">
                {blog.title}
              </h2>

              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="flex justify-between items-center text-sm flex-wrap gap-3">
                <span className="text-gray-500">{blog.readTime}</span>

                <Link
                  href={`/blog/${blog.id}`}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-[#f88013] transition-all inline-block text-center"
                >
                  Read →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-16 md:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black">
            Stay Updated on Pet Safety
          </h2>

          <p className="mt-4 text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Get weekly tips about pet registry, recovery methods, and new
            technology in pet identification.
          </p>

          <div className="mt-8 flex justify-center flex-col sm:flex-row gap-4 max-w-md mx-auto px-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full text-black w-full focus:outline-none focus:ring-2 focus:ring-[#f88013]"
            />
            <button className="bg-[#f88013] hover:bg-[#e06a0a] transition px-6 py-3 rounded-full font-semibold w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 text-center border-t-4 border-black bg-white px-4">
        <p className="text-xs md:text-sm text-gray-600">
          © 2026 Pet Registry. Built with 🧡 for pet parents.
        </p>
      </footer>
    </div>
  );
}