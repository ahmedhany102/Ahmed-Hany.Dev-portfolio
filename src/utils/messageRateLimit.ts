// Enhanced backend-like rate limiting for contact form messages
// This simulates a Java backend security system with advanced fingerprinting technology

interface MessageCount {
  count: number;
  lastReset: string; // timestamp of the last day reset (as string)
  ips?: string[]; // store IPs used by this fingerprint
  locations?: string[]; // store approximate locations
  securityToken?: string; // security validation token
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
 * Simulates Java backend encryption using AES algorithm
 * This is a simplified version that mimics how a Java backend would encrypt data
 */
const encryptData = (data: string): string => {
  try {
    // Simulated Java AES encryption with XOR for client-side implementation
    const key = "java-backend-security-implementation-aes256";
    let encrypted = '';
    
    // Add salt (simulating IV in AES)
    const salt = Array.from(window.crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Basic XOR encryption with key rotation (simulating AES behavior)
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const saltChar = parseInt(salt.charAt(i % salt.length), 16);
      encrypted += String.fromCharCode(charCode ^ keyChar ^ saltChar);
    }
    
    // Append salt to encrypted data (like how IV would be handled)
    return salt + btoa(encrypted);
  } catch (error) {
    console.error("Java security encryption error:", error);
    return data;
  }
};

/**
 * Simulates Java backend decryption
 */
const decryptData = (encrypted: string): string => {
  try {
    if (encrypted.length < 16) return encrypted; // Not properly encrypted
    
    // Extract salt and encrypted data
    const salt = encrypted.substring(0, 16);
    const encData = atob(encrypted.substring(16));
    const key = "java-backend-security-implementation-aes256";
    
    let decrypted = '';
    
    // Reverse the XOR encryption
    for (let i = 0; i < encData.length; i++) {
      const encChar = encData.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const saltChar = parseInt(salt.charAt(i % salt.length), 16);
      decrypted += String.fromCharCode(encChar ^ keyChar ^ saltChar);
    }
    
    return decrypted;
  } catch (error) {
    console.error("Java security decryption error:", error);
    return encrypted;
  }
};

/**
 * Enhanced fingerprinting that mimics a Java backend's more robust approach
 */
const getEnhancedFingerprint = async (): Promise<string> => {
  try {
    // Create a comprehensive device fingerprint similar to how a Java backend would
    const components = [
      // Standard browser information
      navigator.userAgent,
      navigator.language,
      navigator.platform,
      navigator.vendor,
      
      // Screen properties
      window.screen.colorDepth,
      window.screen.width,
      window.screen.height,
      window.screen.availWidth,
      window.screen.availHeight,
      window.devicePixelRatio,
      
      // System information
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      new Date().getTimezoneOffset(),
      
      // Browser capabilities
      navigator.cookieEnabled,
      navigator.doNotTrack,
      typeof navigator.hardwareConcurrency !== 'undefined' ? navigator.hardwareConcurrency : 'unknown',
      
      // Canvas fingerprinting (simplified)
      (() => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return 'no-canvas-support';
          
          // Create a unique canvas fingerprint
          canvas.width = 220;
          canvas.height = 30;
          ctx.textBaseline = "top";
          ctx.font = "14px 'Arial'";
          ctx.fillStyle = "#F60";
          ctx.fillRect(125, 1, 62, 20);
          ctx.fillStyle = "#069";
          ctx.fillText("Java-Security-Canvas", 2, 15);
          ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
          ctx.fillText("Fingerprint", 4, 17);
          
          // Use only a hash of the canvas data to keep it short but unique
          return canvas.toDataURL().slice(-24);
        } catch (e) {
          return 'canvas-error';
        }
      })(),
      
      // WebGL information (simplified)
      (() => {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          if (!gl) return 'no-webgl';
          
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
          if (!debugInfo) return 'no-webgl-info';
          
          return (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        } catch (e) {
          return 'webgl-error';
        }
      })(),
      
      // Font detection (simplified)
      (() => {
        const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];
        const installedFonts = fonts.filter(font => {
          const div = document.createElement('div');
          div.style.fontFamily = `'${font}', monospace`;
          div.style.position = 'absolute';
          div.style.visibility = 'hidden';
          div.textContent = 'mmmmmmmmmmlli';
          document.body.appendChild(div);
          const width = div.offsetWidth;
          document.body.removeChild(div);
          
          const div2 = document.createElement('div');
          div2.style.fontFamily = 'monospace';
          div2.style.position = 'absolute';
          div2.style.visibility = 'hidden';
          div2.textContent = 'mmmmmmmmmmlli';
          document.body.appendChild(div2);
          const defaultWidth = div2.offsetWidth;
          document.body.removeChild(div2);
          
          return width !== defaultWidth;
        });
        
        return installedFonts.join(',');
      })(),
      
      // Storage check
      'localStorage:' + ((() => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return 'yes';
        } catch (e) {
          return 'no';
        }
      })()),
      
      // Additional entropy
      Date.now().toString().slice(-6),
      Math.random().toString(36).substring(2, 7)
    ];
    
    // Combine all components into a single string
    const rawFingerprint = components.join('###');
    
    // Create a SHA-256 hash of the fingerprint (simulating what Java would do)
    const encoder = new TextEncoder();
    const data = encoder.encode(rawFingerprint);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert hash to string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error("Error generating Java-backed fingerprint:", error);
    // Fallback to a less reliable method
    return `${navigator.userAgent}-${Math.random().toString(36).substring(2, 15)}`;
  }
};

/**
 * Gets user's approximate location
 */
const getUserLocation = async (): Promise<string> => {
  try {
    // Try to get IP-based location from a third-party API
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    if (data && data.city && data.country) {
      return `${data.city}, ${data.country}`;
    }
    return 'Unknown';
  } catch (error) {
    console.error("Error getting location:", error);
    return 'Location Unavailable';
  }
};

/**
 * Gets user's IP address (or attempts to)
 */
const getUserIP = async (): Promise<string> => {
  try {
    // Use a free service to get IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'Unknown';
  } catch (error) {
    console.error("Error getting IP:", error);
    return 'IP Unavailable';
  }
};

/**
 * Retrieves the stored database with Java-like decryption
 */
const getStoredDatabase = (): FingerprintDatabase => {
  try {
    // Get encrypted database
    const encrypted = localStorage.getItem('message_rate_limits_java');
    if (!encrypted) return {};
    
    // Decrypt database
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Error retrieving stored database:", error);
    return {};
  }
};

/**
 * Stores the database with Java-like encryption
 */
const storeDatabase = (db: FingerprintDatabase): void => {
  try {
    const serialized = JSON.stringify(db);
    const encrypted = encryptData(serialized);
    localStorage.setItem('message_rate_limits_java', encrypted);
    
    // Create a secure validation token (simulating what a Java backend would do)
    const validationToken = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Store validation with timestamp (simulating a Java session token)
    sessionStorage.setItem('security_validation_token', encryptData(JSON.stringify({
      token: validationToken,
      timestamp: Date.now(),
      database_version: Object.keys(db).length,
      level: "backend_secured"
    })));
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
      // First message today or new day - simulate Java backend session creation
      const securityToken = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      fingerprintDb[fingerprint] = {
        count: 0,
        lastReset: currentDay,
        ips: [],
        locations: [],
        securityToken
      };
      
      // Store the updated database
      storeDatabase(fingerprintDb);
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
    // Be more restrictive on error - don't allow any messages
    return { allowed: false, remainingMessages: 0 };
  }
};

/**
 * Records that a user has sent a message with enhanced security
 * @returns {Promise<void>}
 */
export const recordMessageSent = async (): Promise<void> => {
  try {
    const currentDay = getCurrentDay();
    const fingerprint = await getEnhancedFingerprint();
    const userIP = await getUserIP();
    const userLocation = await getUserLocation();
    
    // Get stored database
    const fingerprintDb = getStoredDatabase();
    
    // Create a new security token each time (simulating Java session management)
    const securityToken = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Initialize user entry if not exists
    if (!fingerprintDb[fingerprint]) {
      fingerprintDb[fingerprint] = {
        count: 0,
        lastReset: currentDay,
        ips: [],
        locations: [],
        securityToken
      };
    }
    
    // Reset count if it's a new day
    if (fingerprintDb[fingerprint].lastReset !== currentDay) {
      fingerprintDb[fingerprint] = {
        count: 1,
        lastReset: currentDay,
        ips: [userIP],
        locations: [userLocation],
        securityToken
      };
    } else {
      // Increment message count
      fingerprintDb[fingerprint].count += 1;
      fingerprintDb[fingerprint].securityToken = securityToken;
      
      // Store IP if not already stored
      if (!fingerprintDb[fingerprint].ips) {
        fingerprintDb[fingerprint].ips = [];
      }
      if (!fingerprintDb[fingerprint].ips.includes(userIP)) {
        fingerprintDb[fingerprint].ips.push(userIP);
      }
      
      // Store location if not already stored
      if (!fingerprintDb[fingerprint].locations) {
        fingerprintDb[fingerprint].locations = [];
      }
      if (!fingerprintDb[fingerprint].locations.includes(userLocation)) {
        fingerprintDb[fingerprint].locations.push(userLocation);
      }
    }
    
    // Create additional security check record (simulating Java backend logging)
    sessionStorage.setItem('message_sent_record', encryptData(JSON.stringify({
      id: securityToken,
      fingerprint: fingerprint.substring(0, 8) + '...',
      timestamp: Date.now(),
      ipAddress: userIP,
      location: userLocation,
      messageCount: fingerprintDb[fingerprint].count,
      validation: Array.from(window.crypto.getRandomValues(new Uint8Array(4)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    })));
    
    // Save back to localStorage with encryption
    storeDatabase(fingerprintDb);
  } catch (error) {
    console.error("Error recording message sent:", error);
  }
};
