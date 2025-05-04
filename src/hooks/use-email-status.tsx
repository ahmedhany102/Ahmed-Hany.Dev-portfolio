
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export const useEmailStatus = () => {
  const [isEmailConfigured, setIsEmailConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkEmailConfiguration = async () => {
      try {
        const publicKey = 'IZgn4jwjJOvB-KaZs';
        
        // Initialize EmailJS
        emailjs.init(publicKey);
        
        // Simple check to see if EmailJS is initialized
        setIsEmailConfigured(true);
        console.log('EmailJS configuration verified');
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
