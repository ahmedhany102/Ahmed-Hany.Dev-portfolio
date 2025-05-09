
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export const useEmailStatus = () => {
  const [isEmailConfigured, setIsEmailConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkEmailConfiguration = async () => {
      try {
        const publicKey = 'IvJbg5_jvl0_jd4I7'; // Updated public key
        
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
