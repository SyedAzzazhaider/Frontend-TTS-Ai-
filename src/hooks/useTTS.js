import { useState } from 'react';

const API_URL = 'http://127.0.0.1:5000/api/v1/pipeline';
const BACKEND_BASE_URL = 'http://127.0.0.1:5000';

export const useTTS = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [detectedLanguage, setDetectedLanguage] = useState(null);

  const generateAudio = async (input, language = 'auto') => {
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setDetectedLanguage(null);

    try {
      const formData = new FormData();
      
      if (typeof input === 'string') {
        // TEXT INPUT
        console.log('📝 Text input');
        formData.append('text', input);
        formData.append('input_type', 'text');
        
      } else {
        // FILE INPUT
        const fileType = input.type || '';
        
        console.log('📁 File upload:', {
          name: input.name,
          type: fileType,
          size: input.size
        });
        
        if (fileType.startsWith('image/')) {
          // IMAGE: Backend checks request.files["image"] (app.py line 266)
          console.log('🖼️ IMAGE → Parameter name: "image"');
          formData.append('image', input);  // ← CORRECT: matches backend!
          formData.append('input_type', 'image');
          
        } else {
          // DOCUMENT: Backend checks request.files["file"] (app.py line 254)
          console.log('📄 DOCUMENT → Parameter name: "file"');
          formData.append('file', input);  // ← CORRECT: matches backend!
          formData.append('input_type', 'file');
        }
      }
      
      formData.append('language', language);

      // Debug: Show exactly what we're sending
      console.log('📤 FormData being sent:');
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`   ${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes)`);
        } else {
          console.log(`   ${pair[0]}: ${pair[1]}`);
        }
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Server error:', data);
        throw new Error(data.error || data.message || 'Failed to generate audio');
      }

      console.log('✅ Backend response:', data);

      if (data.success) {
        // Fix audio URL - if it's relative, prepend backend URL
        let fullAudioUrl = data.audio_url;
        if (fullAudioUrl && !fullAudioUrl.startsWith('http')) {
          const cleanPath = fullAudioUrl.startsWith('/') ? fullAudioUrl.slice(1) : fullAudioUrl;
          fullAudioUrl = `${BACKEND_BASE_URL}/${cleanPath}`;
        }
        
        console.log('🎵 Audio URL:', fullAudioUrl);
        
        setAudioUrl(fullAudioUrl);
        setDetectedLanguage(data.language);
        return { success: true, audioUrl: fullAudioUrl, language: data.language };
      } else {
        throw new Error(data.error || data.message || 'Audio generation failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      console.error('❌ Error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setAudioUrl(null);
    setDetectedLanguage(null);
    setError(null);
  };

  return {
    loading,
    error,
    audioUrl,
    detectedLanguage,
    generateAudio,
    clear,
  };
};