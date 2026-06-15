'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';

export default function WapbizWidget() {
  const injected = useRef(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is authenticated, don't inject the widget
    if (isAuthenticated) {
      // Clean up any existing widget elements if they exist
      const existingBtn = document.getElementById('wapbiz-btn');
      const existingWidget = document.getElementById('wapbiz-widget');
      const existingStyle = document.getElementById('wapbiz-styles');
      if (existingBtn) existingBtn.remove();
      if (existingWidget) existingWidget.remove();
      if (existingStyle) existingStyle.remove();
      injected.current = false;
      return;
    }
    
    // If already injected, skip
    if (injected.current) return;
    injected.current = true;

    // Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Styles
    const style = document.createElement('style');
    style.id = 'wapbiz-styles';
    style.textContent = `
      #wapbiz-btn {
        position: fixed;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #25D366;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 30px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 14px;
        bottom: 20px;
        right: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: transform 0.2s;
      }
      #wapbiz-btn:hover { transform: scale(1.05); }
      #wapbiz-widget {
        position: fixed;
        z-index: 9998;
        width: 380px;
        max-width: calc(100vw - 24px);
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        overflow: hidden;
        bottom: 100px;
        right: 20px;
        font-family: 'Poppins', sans-serif;
      }
      @media (max-width: 480px) {
        #wapbiz-widget {
          width: calc(100vw - 32px);
          left: 16px;
          right: 16px;
          bottom: 80px;
        }
      }
    `;
    document.head.appendChild(style);

    // Button
    const button = document.createElement('button');
    button.id = 'wapbiz-btn';

    const icon = document.createElement('img');
    icon.src = '/images/whhtsapp-icon.png';
    icon.style.width = '30px';
    icon.style.height = '30px';

    const buttonText = document.createElement('span');
    buttonText.textContent = 'Chat with us';

    button.appendChild(icon);
    button.appendChild(buttonText);

    // Widget
    const widget = document.createElement('div');
    widget.id = 'wapbiz-widget';

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'background: #075E54; color: white; padding: 15px; display: flex; align-items: center; justify-content: space-between;';

    const headerLeft = document.createElement('div');
    headerLeft.style.cssText = 'display: flex; align-items: center; gap: 10px;';

    const avatar = document.createElement('img');
    avatar.src = 'https://ui-avatars.com/api/?name=Tailio&background=E8600A&color=white&rounded=true&size=40';
    avatar.style.cssText = 'width: 40px; height: 40px; border-radius: 50%; object-fit: cover;';

    const headerInfo = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = 'Tailio';
    title.style.cssText = 'font-size: 16px; font-weight: 500;';
    const status = document.createElement('div');
    status.textContent = 'Online';
    status.style.cssText = 'font-size: 12px; color: #DCF8C6;';
    headerInfo.appendChild(title);
    headerInfo.appendChild(status);

    headerLeft.appendChild(avatar);
    headerLeft.appendChild(headerInfo);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'color: white; background: transparent; border: none; cursor: pointer; font-size: 24px;';

    header.appendChild(headerLeft);
    header.appendChild(closeBtn);

    // Message area
    const messageArea = document.createElement('div');
    messageArea.style.cssText = 'height: 140px; padding: 15px; background: #ECE5DD; display: flex; align-items: flex-start;';

    const messageBubble = document.createElement('div');
    messageBubble.style.cssText = 'max-width: 80%; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);';

    const sender = document.createElement('div');
    sender.textContent = 'Tailio';
    sender.style.cssText = 'font-size: 15px; font-weight: 500; color: #075E54;';

    const message = document.createElement('div');
    message.textContent = 'Hi, how can I help you?';
    message.style.cssText = 'font-size: 14px; color: black;';

    messageBubble.appendChild(sender);
    messageBubble.appendChild(message);
    messageArea.appendChild(messageBubble);

    // Button area
    const buttonArea = document.createElement('div');
    buttonArea.style.cssText = 'display: flex; justify-content: center; padding: 20px;';

    const chatBtn = document.createElement('button');
    chatBtn.textContent = 'Start Chat';
    chatBtn.style.cssText = 'width: 90%; height: 40px; background: #25D366; border-radius: 30px; color: white; font-size: 15px; font-weight: 500; cursor: pointer; border: none;';

    buttonArea.appendChild(chatBtn);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = 'text-align: center; font-size: 11px; color: #999; padding-bottom: 12px;';
    footer.innerHTML = 'Powered by <a href="https://wapbiz.com/" target="_blank" style="color: #25D366; text-decoration: none;">Wapbiz</a>';

    // Assemble
    widget.appendChild(header);
    widget.appendChild(messageArea);
    widget.appendChild(buttonArea);
    widget.appendChild(footer);

    // Events
    let isOpen = false;
    button.onclick = () => {
      isOpen = !isOpen;
      widget.style.display = isOpen ? 'flex' : 'none';
    };
    closeBtn.onclick = () => {
      widget.style.display = 'none';
      isOpen = false;
    };
    
    // Replace with your actual WhatsApp number
    const phoneNumber = '918796440840'; // Your WhatsApp number without +
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    chatBtn.onclick = () => {
      window.open(whatsappUrl, '_blank');
    };

    document.body.appendChild(button);
    document.body.appendChild(widget);

    // Cleanup function
    return () => {
      injected.current = false;
      const btn = document.getElementById('wapbiz-btn');
      const wgt = document.getElementById('wapbiz-widget');
      const sty = document.getElementById('wapbiz-styles');
      if (btn) btn.remove();
      if (wgt) wgt.remove();
      if (sty) sty.remove();
    };
  }, [isAuthenticated]); // Re-run when authentication state changes

  return null;
}