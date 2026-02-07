"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center border-b-4 border-black">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          Pet Registry <span className="text-orange-500">Blog</span>
        </motion.h1>

        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-700">
          Stories, guides, and ideas about keeping your pets safe, registered,
          and always protected.
        </p>

        {/* Doodle underline */}
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-2 bg-orange-500 rounded-full rotate-2"></div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-4 border-black rounded-3xl p-6 hover:-rotate-1 hover:shadow-[8px_8px_0px_black] transition-all duration-300 bg-white"
            >
              <div className="mb-4">
                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide">
                  {blog.category}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3 leading-snug">
                {blog.title}
              </h2>

              <p className="text-gray-700 mb-4 text-sm">
                {blog.excerpt}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{blog.readTime}</span>

                <Link
                  href={`/blog/${blog.id}`}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-orange-500 transition-all"
                >
                  Read →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold">
          Stay Updated on Pet Safety 🐶
        </h2>

        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Get weekly tips about pet registry, recovery methods, and new
          technology in pet identification.
        </p>

        <div className="mt-8 flex justify-center flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full text-black w-full focus:outline-none"
          />
          <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full font-semibold">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t-4 border-black bg-white">
        <p className="text-sm text-gray-600">
          © 2026 Pet Registry. Built with 🧡 for pet parents.
        </p>
      </footer>
    </div>
  );
}
