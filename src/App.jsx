import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTTS } from './hooks/useTTS';
import Header from './components/Header';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import LanguageControls from './components/LanguageControls';
import ActionButtons from './components/ActionButtons';
import AudioPlayer from './components/AudioPlayer';
import EmptyState from './components/Emptystate';
import LoadingSkeleton from './components/Loadingskeleton';
import FeedbackToast from './components/FeedbackToast';
import Footer from './components/Footer';

function App() {
  const [textInput, setTextInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [toast, setToast] = useState(null);

  const { loading, error, audioUrl, detectedLanguage, generateAudio, clear } = useTTS();

  const handleGenerate = async () => {
    // Validation
    if (!textInput.trim() && !uploadedFile) {
      setToast({ message: 'Please enter text or upload a file', type: 'error' });
      return;
    }

    const input = uploadedFile || textInput;
    // Always use 'auto' for language detection
    const result = await generateAudio(input, 'auto');

    if (result.success) {
      setToast({ message: 'Audio generated successfully!', type: 'success' });
    } else {
      setToast({ message: result.error || 'Failed to generate audio', type: 'error' });
    }
  };

  const handleClear = () => {
    setTextInput('');
    setUploadedFile(null);
    clear();
    setToast({ message: 'All fields cleared', type: 'success' });
  };

  const handleClearFile = () => {
    setUploadedFile(null);
  };

  const isGenerateDisabled = !textInput.trim() && !uploadedFile;

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10 animated-gradient opacity-50"></div>

        {/* Main content */}
        <div className="relative z-10">
          <Header />
          <Hero />
          
          <main className="pb-12">
            <InputSection
              textValue={textInput}
              onTextChange={setTextInput}
              uploadedFile={uploadedFile}
              onFileUpload={setUploadedFile}
              onClearFile={handleClearFile}
            />

            <ActionButtons
              onGenerate={handleGenerate}
              onClear={handleClear}
              loading={loading}
              disabled={isGenerateDisabled}
            />

            {/* Show detected language badge after generation */}
            {detectedLanguage && <LanguageControls detectedLanguage={detectedLanguage} />}

            {/* Content States */}
            {loading && <LoadingSkeleton />}
            {!loading && !audioUrl && !error && <EmptyState />}
            {!loading && audioUrl && <AudioPlayer audioUrl={audioUrl} />}
          </main>

          <Footer />
        </div>

        {/* Toast notifications */}
        {toast && (
          <FeedbackToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;