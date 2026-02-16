import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  DocumentTextIcon, 
  PhotoIcon, 
  XMarkIcon,
  CloudArrowUpIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { detectLanguage, getLanguageName, getLanguageIcon } from '../utils/languageDetection';

const InputSection = ({ onTextChange, onFileUpload, textValue, uploadedFile, onClearFile }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [detectedLanguage, setDetectedLanguage] = useState(null);

  // Real-time language detection
  useEffect(() => {
    if (activeTab === 'text' && textValue) {
      const detected = detectLanguage(textValue);
      setDetectedLanguage(detected);
    } else {
      setDetectedLanguage(null);
    }
  }, [textValue, activeTab]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Check file size (2MB limit)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('File too large! Maximum 2MB allowed. Please use a smaller file.');
        return;
      }
      
      // Block image uploads
      if (file.type.startsWith('image/')) {
        alert('Image upload is not available (requires heavy ML dependencies). Please use text or PDF input instead.');
        return;
      }
      
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    maxFiles: 1,
    multiple: false
  });

  const getFileIcon = (file) => {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return <PhotoIcon className="w-6 h-6 text-white" />;
    }
    return <DocumentTextIcon className="w-6 h-6 text-white" />;
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-6 sm:p-8 shadow-2xl animate-scale-in">
          {/* Tab switcher */}
          <div className="flex gap-2 mb-6 glass p-1.5 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'text'
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'file'
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              File Upload
            </button>
          </div>

          {/* Text Input Tab */}
          {activeTab === 'text' && (
            <div className="space-y-4 animate-fade-in">
              <label className="block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Enter your text
                  </span>
                  {/* Real-time language detection badge */}
                  {detectedLanguage && (
                    <div className="animate-scale-in">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-400 text-xs font-bold">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>{getLanguageIcon(detectedLanguage)}</span>
                        <span>{getLanguageName(detectedLanguage)} Detected</span>
                      </div>
                    </div>
                  )}
                </div>
                <textarea
                  value={textValue}
                  onChange={(e) => onTextChange(e.target.value)}
                  placeholder="یہاں اپنا متن لکھیں یا کوئی انگریزی ٹیکسٹ... (Type your text in Urdu or English...)"
                  rows={8}
                  className="input-field w-full resize-none font-body"
                  dir="auto"
                />
              </label>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                  Smart language detection
                </span>
                <span>•</span>
                <span>Supports English & Urdu</span>
              </div>
            </div>
          )}

          {/* File Upload Tab */}
          {activeTab === 'file' && (
            <div className="space-y-4 animate-fade-in">
              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`dropzone p-16 text-center ${
                    isDragActive ? 'dropzone-active' : ''
                  }`}
                >
                  <input {...getInputProps({ accept: '.pdf,.docx,.doc,.txt' })} />
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <CloudArrowUpIcon className="w-20 h-20 mx-auto text-primary-500 dark:text-primary-400 opacity-80" />
                  </div>
                  
                  {/* Main text */}
                  <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">
                    {isDragActive ? 'Drop your file here' : 'Upload a file'}
                  </p>
                  
                  {/* Subtext */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Drag and drop, or click to browse
                  </p>
                  
                  {/* Supported formats - subtle */}
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Supports PDF, DOCX, TXT files (max 2MB)
                  </p>
                </div>
              ) : (
                <div className="glass p-6 rounded-xl animate-scale-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                        {getFileIcon(uploadedFile)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClearFile}
                      className="glass-strong p-3 rounded-lg hover:bg-error-50 dark:hover:bg-error-950/30 text-error-600 dark:text-error-400 transition-all hover:scale-110 flex-shrink-0 ml-4"
                      aria-label="Remove file"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InputSection;