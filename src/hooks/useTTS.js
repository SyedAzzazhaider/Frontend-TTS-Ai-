// import { useState } from 'react';

// const API_URL = 'https://voiceflow-backend-pu41.onrender.com/api/v1/pipeline';
// const BACKEND_BASE_URL = 'https://voiceflow-backend-pu41.onrender.com';

// export const useTTS = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [detectedLanguage, setDetectedLanguage] = useState(null);

//   const generateAudio = async (input, language = 'auto') => {
//     setLoading(true);
//     setError(null);
//     setAudioUrl(null);
//     setDetectedLanguage(null);

//     try {
//       const formData = new FormData();
      
//       if (typeof input === 'string') {
//         // TEXT INPUT
//         console.log('📝 Text input');
//         formData.append('text', input);
//         formData.append('input_type', 'text');
        
//       } else {
//         // FILE INPUT
//         const fileType = input.type || '';
        
//         console.log('📁 File upload:', {
//           name: input.name,
//           type: fileType,
//           size: input.size
//         });
        
//         if (fileType.startsWith('image/')) {
//           // IMAGE: Backend checks request.files["image"] (app.py line 266)
//           console.log('🖼️ IMAGE → Parameter name: "image"');
//           formData.append('image', input);  // ← CORRECT: matches backend!
//           formData.append('input_type', 'image');
          
//         } else {
//           // DOCUMENT: Backend checks request.files["file"] (app.py line 254)
//           console.log('📄 DOCUMENT → Parameter name: "file"');
//           formData.append('file', input);  // ← CORRECT: matches backend!
//           formData.append('input_type', 'file');
//         }
//       }
      
//       formData.append('language', language);

//       // Debug: Show exactly what we're sending
//       console.log('📤 FormData being sent:');
//       for (let pair of formData.entries()) {
//         if (pair[1] instanceof File) {
//           console.log(`   ${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes)`);
//         } else {
//           console.log(`   ${pair[0]}: ${pair[1]}`);
//         }
//       }

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         console.error('❌ Server error:', data);
//         throw new Error(data.error || data.message || 'Failed to generate audio');
//       }

//       console.log('✅ Backend response:', data);

//       if (data.success) {
//         // Fix audio URL - if it's relative, prepend backend URL
//         let fullAudioUrl = data.audio_url;
//         if (fullAudioUrl && !fullAudioUrl.startsWith('http')) {
//           const cleanPath = fullAudioUrl.startsWith('/') ? fullAudioUrl.slice(1) : fullAudioUrl;
//           fullAudioUrl = `${BACKEND_BASE_URL}/${cleanPath}`;
//         }
        
//         console.log('🎵 Audio URL:', fullAudioUrl);
        
//         setAudioUrl(fullAudioUrl);
//         setDetectedLanguage(data.language);
//         return { success: true, audioUrl: fullAudioUrl, language: data.language };
//       } else {
//         throw new Error(data.error || data.message || 'Audio generation failed');
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('❌ Error:', err);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clear = () => {
//     setAudioUrl(null);
//     setDetectedLanguage(null);
//     setError(null);
//   };

//   return {
//     loading,
//     error,
//     audioUrl,
//     detectedLanguage,
//     generateAudio,
//     clear,
//   };
// };
/*
FRONTEND FIX - src/hooks/useTTS.js
Updated hook with professional error handling
*/

import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://voiceflow-backend-pu41.onrender.com';

export const useTTS = () => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null); // This now persists until dismissed
  const [detectedLanguage, setDetectedLanguage] = useState(null);

  const generateAudio = async (inputData) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      setAudioUrl(null); // Clear previous audio

      const formData = new FormData();

      // Handle different input types
      if (inputData.type === 'text') {
        console.log('📝 Text input');
        formData.append('text', inputData.text);
        formData.append('input_type', 'text');
      } else if (inputData.type === 'file') {
        console.log('📁 File upload:', inputData.file);
        
        // Determine file type and parameter name
        const fileType = inputData.file.type;
        const fileName = inputData.file.name.toLowerCase();
        
        if (fileName.endsWith('.pdf')) {
          console.log('📄 PDF → Parameter name: "file"');
          formData.append('file', inputData.file);
          formData.append('input_type', 'file');
        } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
          console.log('📄 DOCUMENT → Parameter name: "file"');
          formData.append('file', inputData.file);
          formData.append('input_type', 'file');
        } else if (fileType.startsWith('image/')) {
          console.log('🖼️ IMAGE → Parameter name: "image"');
          formData.append('image', inputData.file);
          formData.append('input_type', 'image');
        } else {
          console.log('📄 DEFAULT → Parameter name: "file"');
          formData.append('file', inputData.file);
          formData.append('input_type', 'file');
        }
      }

      formData.append('language', inputData.language || 'auto');

      // Debug: Log FormData contents
      console.log('📤 FormData being sent:');
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`   ${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes)`);
        } else {
          console.log(`   ${pair[0]}: ${pair[1]}`);
        }
      }

      // Make API request
      const response = await axios.post(`${API_URL}/api/v1/pipeline`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout
      });

      // Success
      if (response.data.audio_url) {
        setAudioUrl(response.data.audio_url);
        setDetectedLanguage(response.data.detected_language);
      }

      setLoading(false);
      return response.data;

    } catch (err) {
      console.error('❌ Error:', err);
      setLoading(false);

      // Professional error handling
      if (err.response) {
        // Backend returned an error response
        const errorData = err.response.data;
        
        // Set the full error object (includes message, details, suggestions)
        setError({
          response: {
            status: err.response.status,
            data: errorData
          }
        });

        // Log for debugging
        console.error('Backend error:', {
          status: err.response.status,
          error: errorData.error,
          message: errorData.message,
          details: errorData.details
        });

      } else if (err.request) {
        // Network error - no response received
        setError({
          response: {
            status: 503,
            data: {
              error: 'Network Error',
              message: 'Could not reach the server. Please check your internet connection.',
              suggestions: [
                'Check your internet connection',
                'The backend may be waking up (takes ~30 seconds on free tier)',
                'Try again in a moment'
              ]
            }
          }
        });
      } else {
        // Something else went wrong
        setError({
          response: {
            status: 500,
            data: {
              error: 'Request Failed',
              message: err.message || 'An unexpected error occurred',
              suggestions: [
                'Please try again',
                'If the problem persists, contact support'
              ]
            }
          }
        });
      }

      throw err;
    }
  };

  // Function to clear error (called by ErrorDisplay dismiss button)
  const clearError = () => {
    setError(null);
  };

  return {
    generateAudio,
    loading,
    audioUrl,
    error,
    clearError, // Export clearError function
    detectedLanguage,
  };
};