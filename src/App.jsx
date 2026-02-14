// import { useState } from 'react';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { useTTS } from './hooks/useTTS';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import InputSection from './components/InputSection';
// import LanguageControls from './components/LanguageControls';
// import ActionButtons from './components/ActionButtons';
// import AudioPlayer from './components/AudioPlayer';
// import EmptyState from './components/Emptystate';
// import LoadingSkeleton from './components/Loadingskeleton';
// import FeedbackToast from './components/FeedbackToast';
// import Footer from './components/Footer';

// function App() {
//   const [textInput, setTextInput] = useState('');
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [toast, setToast] = useState(null);

//   const { loading, error, audioUrl, detectedLanguage, generateAudio, clear } = useTTS();

//   const handleGenerate = async () => {
//     // Validation
//     if (!textInput.trim() && !uploadedFile) {
//       setToast({ message: 'Please enter text or upload a file', type: 'error' });
//       return;
//     }

//     const input = uploadedFile || textInput;
//     // Always use 'auto' for language detection
//     const result = await generateAudio(input, 'auto');

//     if (result.success) {
//       setToast({ message: 'Audio generated successfully!', type: 'success' });
//     } else {
//       setToast({ message: result.error || 'Failed to generate audio', type: 'error' });
//     }
//   };

//   const handleClear = () => {
//     setTextInput('');
//     setUploadedFile(null);
//     clear();
//     setToast({ message: 'All fields cleared', type: 'success' });
//   };

//   const handleClearFile = () => {
//     setUploadedFile(null);
//   };

//   const isGenerateDisabled = !textInput.trim() && !uploadedFile;

//   return (
//     <ThemeProvider>
//       <div className="min-h-screen relative overflow-hidden">
//         {/* Animated background */}
//         <div className="fixed inset-0 -z-10 animated-gradient opacity-50"></div>

//         {/* Main content */}
//         <div className="relative z-10">
//           <Header />
//           <Hero />
          
//           <main className="pb-12">
//             <InputSection
//               textValue={textInput}
//               onTextChange={setTextInput}
//               uploadedFile={uploadedFile}
//               onFileUpload={setUploadedFile}
//               onClearFile={handleClearFile}
//             />

//             <ActionButtons
//               onGenerate={handleGenerate}
//               onClear={handleClear}
//               loading={loading}
//               disabled={isGenerateDisabled}
//             />

//             {/* Show detected language badge after generation */}
//             {detectedLanguage && <LanguageControls detectedLanguage={detectedLanguage} />}

//             {/* Content States */}
//             {loading && <LoadingSkeleton />}
//             {!loading && !audioUrl && !error && <EmptyState />}
//             {!loading && audioUrl && <AudioPlayer audioUrl={audioUrl} />}
//           </main>

//           <Footer />
//         </div>

//         {/* Toast notifications */}
//         {toast && (
//           <FeedbackToast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;


/*
FRONTEND FIX - src/App.jsx
Integration of ErrorDisplay component
*/

import React, { useState } from 'react';
import { useTTS } from './hooks/useTTS';
import InputSection from './components/InputSection';
import AudioPlayer from './components/AudioPlayer';
import LanguageControls from './components/LanguageControls';
import ErrorDisplay from './components/ErrorDisplay'; // NEW IMPORT

function App() {
  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [language, setLanguage] = useState('auto');
  const [theme, setTheme] = useState('dark');

  // Use the updated useTTS hook
  const { 
    generateAudio, 
    loading, 
    audioUrl, 
    error, 
    clearError, // NEW: clearError function
    detectedLanguage 
  } = useTTS();

  const handleGenerate = async () => {
    try {
      // Determine input type
      if (uploadedFile) {
        await generateAudio({
          type: 'file',
          file: uploadedFile,
          language: language
        });
      } else if (inputText.trim()) {
        await generateAudio({
          type: 'text',
          text: inputText,
          language: language
        });
      } else {
        // Show validation error
        alert('Please enter text or upload a file');
      }
    } catch (err) {
      // Error is already handled by useTTS hook
      // Error display will show automatically
      console.error('Generation failed:', err);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* ERROR DISPLAY - PERSISTENT, DISMISSIBLE */}
      <ErrorDisplay 
        error={error} 
        onDismiss={clearError} 
      />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🎙️ VoiceFlow</h1>
            <p className="text-blue-100 text-sm">Professional AI Text-to-Speech</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Language Controls */}
        <LanguageControls
          language={language}
          setLanguage={setLanguage}
          detectedLanguage={detectedLanguage}
          theme={theme}
        />

        {/* Input Section */}
        <InputSection
          inputText={inputText}
          setInputText={setInputText}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          theme={theme}
        />

        {/* Generate Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleGenerate}
            disabled={loading || (!inputText.trim() && !uploadedFile)}
            className={`
              px-8 py-4 rounded-lg font-semibold text-lg
              transform transition-all duration-200
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105 shadow-lg'
              }
              text-white
              disabled:opacity-50
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              '🎵 Generate Audio'
            )}
          </button>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <AudioPlayer 
            audioUrl={audioUrl} 
            theme={theme}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-16 py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} text-center`}>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Built with ❤️ by Syed Azzaz Haider Rizvi | VoiceFlow TTS © 2026
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Free Tier: Text & Documents up to 2MB | 
          <a href="mailto:support@voiceflow.com?subject=Premium%20Upgrade" className="text-blue-500 hover:underline ml-1">
            Upgrade to Premium
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;