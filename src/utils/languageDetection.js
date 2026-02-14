/**
 * Utility functions for language detection
 */

/**
 * Detect language from text content
 * @param {string} text - Text to analyze
 * @returns {'ur' | 'en' | null} - Detected language code or null if empty
 */
export const detectLanguage = (text) => {
  if (!text || text.trim().length === 0) {
    return null;
  }

  // Remove whitespace and special characters for analysis
  const cleanText = text.trim();
  
  // Urdu Unicode ranges: U+0600 to U+06FF (Arabic/Urdu script)
  const urduRegex = /[\u0600-\u06FF]/;
  
  // Check if text contains Urdu characters
  if (urduRegex.test(cleanText)) {
    return 'ur';
  }
  
  // Otherwise, assume English
  return 'en';
};

/**
 * Get language display name
 * @param {string} langCode - Language code ('en' or 'ur')
 * @returns {string} - Display name
 */
export const getLanguageName = (langCode) => {
  const names = {
    'en': 'English',
    'ur': 'اردو (Urdu)',
  };
  return names[langCode] || 'Unknown';
};

/**
 * Get language emoji/icon
 * @param {string} langCode - Language code ('en' or 'ur')
 * @returns {string} - Emoji
 */
export const getLanguageIcon = (langCode) => {
  const icons = {
    'en': '🇬🇧',
    'ur': '🇵🇰',
  };
  return icons[langCode] || '🌐';
};