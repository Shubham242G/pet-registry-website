'use client';

import { useState } from 'react';

export default function WapbizWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '1234567890'; // Replace with your WhatsApp number

  const handleChat = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#4DC247',
          color: 'white',
          border: 'none',
          padding: '10px 18px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <img 
          src="https://img.icons8.com/?size=100&id=QkXeKixybttw&format=png&color=000000" 
          alt="WhatsApp"
          style={{ width: '30px', height: '30px' }}
        />
        <span>Chat with us</span>
      </button>

      {/* Widget Popup */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            zIndex: 9998,
            width: '380px',
            maxWidth: 'calc(100vw - 24px)',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ background: '#075E54', color: 'white', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="https://ui-avatars.com/api/?name=Tailio&background=E8600A&color=white&rounded=true&size=40" 
                alt="Avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>Tailio</div>
                <div style={{ fontSize: '12px', color: '#DCF8C6' }}>Online</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px' }}
            >
              ×
            </button>
          </div>

          {/* Message */}
          <div style={{ height: '140px', padding: '15px', background: '#ECE5DD', display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ maxWidth: '80%', background: 'white', padding: '10px', borderRadius: '10px' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#075E54' }}>Tailio</div>
              <div style={{ fontSize: '14px', color: 'black' }}>Hi, how can I help you?</div>
            </div>
          </div>

          {/* Button */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <button 
              onClick={handleChat}
              style={{
                width: '90%',
                height: '40px',
                background: '#4DC247',
                borderRadius: '30px',
                color: 'white',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Start Chat
            </button>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#666', paddingBottom: '12px' }}>
            Powered by <a href="https://wapbiz.com/" target="_blank" style={{ color: '#4DC247', textDecoration: 'none' }}>Wapbiz</a>
          </div>
        </div>
      )}
    </>
  );
}