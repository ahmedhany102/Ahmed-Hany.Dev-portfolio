
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export const useEmailStatus = () => {
  const [isEmailConfigured, setIsEmailConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkEmailConfiguration = async () => {
      try {
        const publicKey = '7vyp_uD8eGfNTLgRg';
        
        // Initialize EmailJS
        emailjs.init(publicKey);
        
        console.log('EmailJS initialized successfully with direct configuration');
        setIsEmailConfigured(true);
      } catch (error) {
        console.error('Error checking EmailJS configuration:', error);
        setIsEmailConfigured(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkEmailConfiguration();
  }, []);

  return { isEmailConfigured, isChecking };
};
