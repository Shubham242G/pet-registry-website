"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [displayName, setDisplayName] = useState<string>("");

  const { user, logout, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update display name when user changes
  useEffect(() => {
    if (user && user.username) {
      setDisplayName(user.username);
      console.log("Navbar - User username:", user.username); // Debug log
    } else if (user) {
      console.log("Navbar - User object:", user); // Debug log
      setDisplayName("User");
    } else {
      setDisplayName("");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (!isMounted || loading) {
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
              <Link  
                href="#whyTailio" 
                onClick={(e) => handleScroll(e, 'whyTailio')}  
                className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
              >
                Why Tailio?
              </Link>
              <Link 
                href="/pages/blogs" 
                className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
              >
                Blogs
              </Link>
              <Link 
                href="/pages/contact" 
                className="text-lg font-medium text-gray-900 hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
              {isAuthenticated && user && (
                <Link 
                  href="/pages/dashboard"
                  className="text-lg font-bold text-orange-500 bg-orange-100 px-6 py-2 rounded-xl hover:bg-orange-200 transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* AUTH BUTTONS */}
            <div className="flex items-center space-x-3">
              {isAuthenticated && user ? (
                <>
                  <span className="font-semibold text-gray-900 hidden sm:block text-sm">
                    Hi, {displayName || user.username || user.name || "User"}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 transition-all duration-200 whitespace-nowrap text-sm"
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
                className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t z-10 mobile-menu"
              >
                <MobileMenu 
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen} 
                  user={user}
                  displayName={displayName}
                  isAuthenticated={isAuthenticated}
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

      {/* MODALS */}
      <AnimatePresence>
        {showLogin && (
          <LoginModal 
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        )}
        {showRegister && (
          <RegisterModal 
            isOpen={showRegister}
            onClose={() => setShowRegister(false)}
            onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// MobileMenu - Updated with display name
function MobileMenu({ 
  isOpen, 
  setIsOpen, 
  user,
  displayName,
  isAuthenticated,
  showLogin, 
  setShowLogin, 
  showRegister, 
  setShowRegister, 
  onLogout 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
  user: any;
  displayName: string;
  isAuthenticated: boolean;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  showRegister: boolean;
  setShowRegister: (show: boolean) => void;
  onLogout: () => void;
}) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsOpen(false);
    }
  };

  return (
    <ul className="font-medium flex flex-col p-4 space-y-4">
      <li>
        <Link 
          href="#whyTailio" 
          onClick={(e) => handleScroll(e, 'whyTailio')}
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
        >
          Why Tailio?
        </Link>
      </li>
      <li>
        <Link 
          href="/pages/blogs" 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" 
          onClick={() => setIsOpen(false)}
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link 
          href="/pages/contact" 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" 
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </li>
      
      {isAuthenticated && user && (
        <li>
          <Link 
            href="/pages/dashboard" 
            className="block py-2 px-3 text-orange-600 font-bold bg-orange-100 rounded hover:bg-orange-200" 
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated && user ? (
        <>
          <li className="border-t pt-2">
            <span className="block py-2 px-3 text-gray-900 font-semibold">
              Hi, {displayName || user.username || user.name || "User"}!
            </span>
          </li>
          <li>
            <button 
              onClick={() => { onLogout(); setIsOpen(false); }} 
              className="w-full text-center py-2 px-3 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 transition-all duration-200"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="border-t pt-2">
            <button 
              onClick={() => { setShowRegister(true); setIsOpen(false); }} 
              className="w-full text-center py-2 px-3 bg-white border border-orange-400 text-orange-500 font-medium rounded-lg hover:bg-orange-50 hover:border-orange-500 transition-all duration-200"
            >
              Register
            </button>
          </li>
          <li>
            <button 
              onClick={() => { setShowLogin(true); setIsOpen(false); }} 
              className="w-full text-center py-2 px-3 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 transition-all duration-200"
            >
              Login
            </button>
          </li>
        </>
      )}
    </ul>
  );
}