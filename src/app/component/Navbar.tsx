"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", stiffness: 100 }}
  className="bg-white fixed w-full z-20 top-0 shadow-sm h-20"
>
  <div className="max-w-screen-xl flex items-center justify-between mx-auto px-3 py-1 h-full">
    {/* LOGO - FAR LEFT */}
    <Link href="/" className="flex items-center space-x-1 -mt-2 ml-0 md:ml-2 lg:ml-[-70px]">
      <img 
        src='/images/tailio.png' 
        alt="Tailio logo" 
        className="h-60 w-60 flex-shrink-0 mt-4" 
      />
    </Link>

    {/* RIGHT SIDE - Menu items + Register button together */}
    <div className="flex items-center space-x-6 md:space-x-8">
      {/* Menu items */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/how-it-works" className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors">
          How Tailio Works?
        </Link>
        <Link href="/about" className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors">
          Contact
        </Link>
      </div>

      {/* Register button */}
      <Link 
        href="/register"
        className="px-6 py-2 text-white font-medium border border-gray-300 rounded-lg bg-orange-400 hover:bg-orange-150 hover:text-white hover:border-orange-500 transition-all duration-200 whitespace-nowrap"
      >
        Register
      </Link>

      {/* Mobile hamburger - always visible on mobile */}
      <div className="md:hidden ml-2">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-gray-800 hover:text-gray-600 text-2xl p-1"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t z-10"
        >
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</motion.nav>
  );
}

function MobileMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <ul className="font-medium flex flex-col p-4 space-y-4">
      <li><Link href="/how-it-works" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>How tailio works?</Link></li>
      <li><Link href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>About Us</Link></li>
      <li><Link href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Contact</Link></li>
      <li><Link href="/register" className="block py-2 px-3 text-white bg-orange-500 rounded hover:bg-orange-600 px-4" onClick={() => setIsOpen(false)}>Register</Link></li>
    </ul>
  );
}
