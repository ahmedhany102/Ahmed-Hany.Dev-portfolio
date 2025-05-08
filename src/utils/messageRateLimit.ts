
// Rate limiting for contact form messages
// Stores IP addresses and message counts in localStorage

interface MessageCount {
  count: number;
  lastReset: string; // timestamp of the last day reset (as string)
}

interface IpDatabase {
  [key: string]: MessageCount;
}

// Maximum messages allowed per day per IP
const MAX_MESSAGES_PER_DAY = 3;

/**
 * Gets the current day as a string (YYYY-MM-DD)
 */
const getCurrentDay = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

/**
 * Gets a hashed/fingerprinted representation of the user
 * This is a simple implementation - in production you might use more sophisticated methods
 */
const getUserIdentifier = async (): Promise<string> => {
  try {
    // Use available browser data to create a somewhat unique identifier
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Combine values for a simple fingerprint
    const fingerprint = `${userAgent}-${language}-${screenWidth}x${screenHeight}-${timeZone}`;
    
    // Create a hash of the fingerprint
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprint);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert hash to string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error("Error generating user identifier:", error);
    // Fallback to a less reliable method if the above fails
    return `${navigator.userAgent}-${Math.random()}`;
  }
};

/**
 * Checks if a user has exceeded their daily message limit
 * @returns {Promise<boolean>} Whether the user can send a message
 */
export const canSendMessage = async (): Promise<{allowed: boolean; remainingMessages: number}> => {
  try {
    const currentDay = getCurrentDay();
    const userId = await getUserIdentifier();
    
    // Get stored IP database from localStorage
    const storedDb = localStorage.getItem('message_rate_limits');
    const ipDb: IpDatabase = storedDb ? JSON.parse(storedDb) : {};
    
    // Check if user exists in database
    if (!ipDb[userId] || ipDb[userId].lastReset !== currentDay) {
      // First message today or new day
      ipDb[userId] = {
        count: 0,
        lastReset: currentDay
      };
    }
    
    // Check if user has exceeded limit
    if (ipDb[userId].count >= MAX_MESSAGES_PER_DAY) {
      return { 
        allowed: false,
        remainingMessages: 0
      };
    }
    
    // User can send a message
    return { 
      allowed: true,
      remainingMessages: MAX_MESSAGES_PER_DAY - ipDb[userId].count 
    };
  } catch (error) {
    console.error("Error checking message rate limit:", error);
    // Allow message on error to prevent blocking legitimate users
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
    const userId = await getUserIdentifier();
    
    // Get stored IP database
    const storedDb = localStorage.getItem('message_rate_limits');
    const ipDb: IpDatabase = storedDb ? JSON.parse(storedDb) : {};
    
    // Initialize user entry if not exists
    if (!ipDb[userId]) {
      ipDb[userId] = {
        count: 0,
        lastReset: currentDay
      };
    }
    
    // Reset count if it's a new day
    if (ipDb[userId].lastReset !== currentDay) {
      ipDb[userId] = {
        count: 1,
        lastReset: currentDay
      };
    } else {
      // Increment message count
      ipDb[userId].count += 1;
    }
    
    // Save back to localStorage
    localStorage.setItem('message_rate_limits', JSON.stringify(ipDb));
  } catch (error) {
    console.error("Error recording message sent:", error);
  }
};
