"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", stiffness: 100 }}
  className="bg-white fixed w-full z-20 top-0 shadow-sm h-20 overflow-hidden" // Fixed 80px height, clip logo
>
  <div className="max-w-screen-xl flex items-center justify-between mx-auto px-3 py-1 h-full"> {/* py-1 + flex center */}
    <Link href="/" className="flex items-center space-x-1 -mt-2 mr-20"> {/* Negative margin pulls logo up */}
      <img 
        src='/images/tailio.png' 
        alt="Tailio logo" 
        className="h-70 w-70 flex-shrink-0" // YOUR EXACT SIZE - 200px
      />
    </Link>


        
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-800 hover:text-gray-600 text-2xl p-1"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

          <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t z-10" // top-20 = 80px
        >
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </motion.div>
      )}
    </AnimatePresence>


        <div className="hidden md:block md:w-auto">
          <DesktopMenu />
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <ul className="font-medium flex flex-col p-4 space-y-4">
      <li><Link href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Home</Link></li>
      <li><Link href="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Register Pet</Link></li>
      <li><Link href="/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
      <li><Link href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>About</Link></li>
      <li><Link href="/contact" className="block py-2 px-3 text-white bg-blue-700 rounded hover:bg-blue-800 px-4" onClick={() => setIsOpen(false)}>Contact</Link></li>
    </ul>
  );
}

function DesktopMenu() {
  return (
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:items-center">
      <li><Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0">Home</Link></li>
      <li><Link href="/register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0">Register Pet</Link></li>
      <li><Link href="/dashboard" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0">Dashboard</Link></li>
      <li><Link href="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:text-blue-700 md:p-0">About</Link></li>
      <li>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/contact" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded hover:bg-blue-800 md:bg-transparent md:text-blue-700 md:p-0 md:hover:bg-blue-50 px-4 py-2 rounded-lg">
            Contact
          </Link>
        </motion.div>
      </li>
    </ul>
  );
}
