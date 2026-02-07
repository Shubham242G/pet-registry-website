"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useRouter } from 'next/navigation'; // ✅ FIXED import

interface User {
  username: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    // Check localStorage for user
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    setUser(null);
    if (isMounted) {
      router.push('/');
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // ✅ Handle successful auth (called from modals)
  const handleAuthSuccess = () => {
    if (isMounted) {
      router.push('/pages/dashboard');
    }
  };

  if (!isMounted) {
    return <nav className="bg-white fixed w-full z-20 top-0 shadow-sm h-20" />;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white fixed w-full z-20 top-0 shadow-sm h-20"
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-3 py-1 h-full">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-1 -mt-2 ml-0 md:ml-2 lg:ml-[-70px]">
            <img 
              src='/images/tailio.png' 
              alt="Tailio logo" 
              className="h-60 w-60 flex-shrink-0 mt-4" 
            />
          </Link>

          {/* DESKTOP MENU + AUTH */}
          <div className="flex items-center space-x-6 md:space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <Link  href="whyTailio" onClick={(e) => handleScroll(e, 'whyTailio')}  className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors">
                Why Tailio?
              </Link>
              <Link href="/pages/blogs" className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors">
                Blogs
              </Link>
              <Link href="/pages/contact" className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors">
                Contact
              </Link>
              {user && (
                <Link 
                  href="/pages/dashboard" 
                  className="text-lg font-bold text-orange-500 bg-orange-100 px-6 py-2 rounded-xl hover:bg-orange-200 transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* AUTH BUTTONS */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <span className="font-semibold text-gray-900 hidden sm:block">
                    Hi, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 whitespace-nowrap text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-4 py-2 bg-white border border-orange-400 text-orange-500 font-medium rounded-lg hover:bg-orange-50 hover:border-orange-500 transition-all duration-200 whitespace-nowrap text-sm hidden sm:block"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 transition-all duration-200 whitespace-nowrap text-sm"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            {/* MOBILE HAMBURGER */}
            <div className="md:hidden ml-2">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-gray-800 hover:text-gray-600 text-2xl p-1"
              >
                {isOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t z-10"
              >
                <MobileMenu 
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen} 
                  user={user}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                  showRegister={showRegister}
                  setShowRegister={setShowRegister}
                  onLogout={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ✅ MODALS - NO onSuccess prop needed */}
      <AnimatePresence>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      </AnimatePresence>
    </>
  );
}

// MobileMenu unchanged
function MobileMenu({ 
  isOpen, setIsOpen, user, showLogin, setShowLogin, 
  showRegister, setShowRegister, onLogout 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
  user: User | null;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  showRegister: boolean;
  setShowRegister: (show: boolean) => void;
  onLogout: () => void;
}) {
  return (
    <ul className="font-medium flex flex-col p-4 space-y-4">
      <li><Link href="/how-it-works" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>How tailio works?</Link></li>
      <li><Link href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>About Us</Link></li>
      <li><Link href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Contact</Link></li>
      
      {user && (
        <li>
          <Link href="/pages/dashboard" className="block py-2 px-3 text-orange-600 font-bold bg-orange-100 rounded hover:bg-orange-200" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
        </li>
      )}

      {user ? (
        <>
          <li className="border-t pt-2">
            <span className="block py-2 px-3 text-gray-900 font-semibold">Hi, {user.username}</span>
          </li>
          <li>
            <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full text-left py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 font-medium">
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="border-t pt-2">
            <button onClick={() => { setShowRegister(true); setIsOpen(false); }} className="w-full text-left py-2 px-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium">
              Register
            </button>
          </li>
          <li>
            <button onClick={() => { setShowLogin(true); setIsOpen(false); }} className="w-full text-left py-2 px-3 border border-orange-400 text-orange-500 bg-orange-50 rounded hover:bg-orange-100 font-medium">
              Login
            </button>
          </li>
        </>
      )}
    </ul>
  );
}
