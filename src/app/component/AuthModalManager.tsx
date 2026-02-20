'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthModalManager: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Close modals if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoginOpen(false);
      setIsRegisterOpen(false);
    }
  }, [isAuthenticated]);

  // Handle login button click (from navbar or elsewhere)
  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAllModals}
        onSwitchToRegister={handleRegisterClick}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeAllModals}
        onSwitchToLogin={handleLoginClick}
      />
    </>
  );
};

export default AuthModalManager;