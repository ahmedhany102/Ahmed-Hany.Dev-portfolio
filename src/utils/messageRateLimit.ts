
// Enhanced rate limiting for contact form messages using advanced fingerprinting
// Stores fingerprints and message counts in localStorage with encryption

interface MessageCount {
  count: number;
  lastReset: string; // timestamp of the last day reset (as string)
}

interface FingerprintDatabase {
  [key: string]: MessageCount;
}

// Maximum messages allowed per day per user
const MAX_MESSAGES_PER_DAY = 3;

/**
 * Gets the current day as a string (YYYY-MM-DD)
 */
const getCurrentDay = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

/**
 * Encrypts a string using a simple encryption method
 * This is not secure encryption but adds a layer of obfuscation
 */
const encryptData = (data: string): string => {
  try {
    // Simple XOR encryption with a fixed key
    const key = "portfolio-security-key";
    return Array.from(data).map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
  } catch (error) {
    console.error("Encryption error:", error);
    return data;
  }
};

/**
 * Decrypts a string that was encrypted with encryptData
 */
const decryptData = (encrypted: string): string => {
  try {
    // Simple XOR decryption with the same fixed key
    const key = "portfolio-security-key";
    return Array.from(encrypted).map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
  } catch (error) {
    console.error("Decryption error:", error);
    return encrypted;
  }
};

/**
 * Gets enhanced fingerprint of the user's device
 * Collects multiple data points to create a more accurate fingerprint
 */
const getEnhancedFingerprint = async (): Promise<string> => {
  try {
    // Collect a wide range of browser and device information
    const components = [
      // Browser and OS information
      navigator.userAgent,
      navigator.language,
      navigator.languages?.join(','),
      navigator.platform,
      navigator.vendor,
      
      // Screen properties
      window.screen.colorDepth,
      window.screen.width,
      window.screen.height,
      window.screen.availWidth,
      window.screen.availHeight,
      window.devicePixelRatio,
      
      // Time zone information
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      new Date().getTimezoneOffset(),
      
      // Browser capabilities and settings
      navigator.cookieEnabled,
      navigator.doNotTrack,
      typeof navigator.hardwareConcurrency !== 'undefined' ? navigator.hardwareConcurrency : 'unknown',
      typeof navigator.maxTouchPoints !== 'undefined' ? navigator.maxTouchPoints : 'unknown',
      typeof navigator.deviceMemory !== 'undefined' ? navigator.deviceMemory : 'unknown',
      
      // Canvas fingerprinting (simplified)
      (() => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return 'no-canvas-support';
          
          // Draw something unique that varies based on the GPU/system
          canvas.width = 200;
          canvas.height = 50;
          ctx.textBaseline = "top";
          ctx.font = "14px 'Arial'";
          ctx.fillStyle = "#f60";
          ctx.fillRect(125, 1, 62, 20);
          ctx.fillStyle = "#069";
          ctx.fillText("Fingerprint", 2, 15);
          ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
          ctx.fillText("Canvas", 4, 17);
          
          return canvas.toDataURL().slice(-10); // Just use the end of the data URL to keep it short
        } catch (e) {
          return 'canvas-error';
        }
      })(),
      
      // WebGL information (simplified)
      (() => {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          if (!gl) return 'no-webgl-support';
          
          return gl.getParameter(gl.RENDERER) + gl.getParameter(gl.VENDOR);
        } catch (e) {
          return 'webgl-error';
        }
      })(),
      
      // Audio fingerprinting (simplified result only)
      (() => {
        try {
          const audioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (!audioContext) return 'no-audio-support';
          
          const context = new audioContext();
          const oscillator = context.createOscillator();
          const analyser = context.createAnalyser();
          oscillator.connect(analyser);
          analyser.fftSize = 256;
          
          return analyser.frequencyBinCount.toString();
        } catch (e) {
          return 'audio-error';
        }
      })(),
      
      // Installed fonts detection (rough estimation through width measurements)
      (() => {
        try {
          const fontTestElement = document.createElement('span');
          fontTestElement.style.position = 'absolute';
          fontTestElement.style.left = '-9999px';
          fontTestElement.style.fontSize = '72px';
          fontTestElement.innerHTML = 'mmmmmmmmmmlli'; // Text with measurably different widths in different fonts
          document.body.appendChild(fontTestElement);
          
          // Test common fonts and collect width measurements
          const fontsToTest = ['monospace', 'sans-serif', 'serif', 'Arial', 'Courier', 'Verdana'];
          const fontWidths = fontsToTest.map(font => {
            fontTestElement.style.fontFamily = font;
            return fontTestElement.offsetWidth;
          }).join(',');
          
          document.body.removeChild(fontTestElement);
          return fontWidths;
        } catch (e) {
          return 'font-error';
        }
      })()
    ];
    
    // Combine all components into a single string
    const rawFingerprint = components.join('###');
    
    // Create a hash of the fingerprint
    const encoder = new TextEncoder();
    const data = encoder.encode(rawFingerprint);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert hash to string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error("Error generating enhanced fingerprint:", error);
    // Fallback to a less reliable method
    return `${navigator.userAgent}-${Math.random().toString(36).substring(2, 15)}`;
  }
};

/**
 * Retrieves the stored database from localStorage with decryption
 */
const getStoredDatabase = (): FingerprintDatabase => {
  try {
    const encrypted = localStorage.getItem('message_rate_limits');
    if (!encrypted) return {};
    
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Error retrieving stored database:", error);
    return {};
  }
};

/**
 * Stores the database in localStorage with encryption
 */
const storeDatabase = (db: FingerprintDatabase): void => {
  try {
    const serialized = JSON.stringify(db);
    const encrypted = encryptData(serialized);
    localStorage.setItem('message_rate_limits', encrypted);
  } catch (error) {
    console.error("Error storing database:", error);
  }
};

/**
 * Checks if a user has exceeded their daily message limit
 * @returns {Promise<{allowed: boolean; remainingMessages: number}>}
 */
export const canSendMessage = async (): Promise<{allowed: boolean; remainingMessages: number}> => {
  try {
    const currentDay = getCurrentDay();
    const fingerprint = await getEnhancedFingerprint();
    
    // Get stored database from localStorage
    const fingerprintDb = getStoredDatabase();
    
    // Check if user exists in database
    if (!fingerprintDb[fingerprint] || fingerprintDb[fingerprint].lastReset !== currentDay) {
      // First message today or new day
      fingerprintDb[fingerprint] = {
        count: 0,
        lastReset: currentDay
      };
    }
    
    // Check if user has exceeded limit
    if (fingerprintDb[fingerprint].count >= MAX_MESSAGES_PER_DAY) {
      return { 
        allowed: false,
        remainingMessages: 0
      };
    }
    
    // User can send a message
    return { 
      allowed: true,
      remainingMessages: MAX_MESSAGES_PER_DAY - fingerprintDb[fingerprint].count 
    };
  } catch (error) {
    console.error("Error checking message rate limit:", error);
    // Be more restrictive on error - only allow 1 message
    return { allowed: true, remainingMessages: 1 };
  }
};

/**
 * Records that a user has sent a message
 * @returns {Promise<void>}
 */
export const recordMessageSent = async (): Promise<void> => {
  try {
    const currentDay = getCurrentDay();
    const fingerprint = await getEnhancedFingerprint();
    
    // Get stored database
    const fingerprintDb = getStoredDatabase();
    
    // Initialize user entry if not exists
    if (!fingerprintDb[fingerprint]) {
      fingerprintDb[fingerprint] = {
        count: 0,
        lastReset: currentDay
      };
    }
    
    // Reset count if it's a new day
    if (fingerprintDb[fingerprint].lastReset !== currentDay) {
      fingerprintDb[fingerprint] = {
        count: 1,
        lastReset: currentDay
      };
    } else {
      // Increment message count
      fingerprintDb[fingerprint].count += 1;
    }
    
    // Save back to localStorage with encryption
    storeDatabase(fingerprintDb);
  } catch (error) {
    console.error("Error recording message sent:", error);
  }
};
