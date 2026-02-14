/*
FRONTEND FIX - src/components/ErrorDisplay.jsx
Professional Error Display Component with Persistent Messages
*/

import React from 'react';

const ErrorDisplay = ({ error, onDismiss }) => {
  if (!error) return null;

  // Parse error from backend
  const errorData = error.response?.data || error;
  const errorType = errorData.error || 'Error';
  const message = errorData.message || 'An error occurred';
  const details = errorData.details || {};
  const suggestions = errorData.alternatives || errorData.suggestions || [];
  const statusCode = errorData.status_code || error.response?.status;

  // Determine error severity and styling
  const getErrorStyle = (code) => {
    if (code === 403) return 'warning'; // Feature not available
    if (code === 413) return 'warning'; // File too large
    if (code === 507) return 'error';   // Out of memory
    return 'error'; // Default
  };

  const errorStyle = getErrorStyle(statusCode);

  return (
    <div className="fixed top-4 right-4 max-w-md z-50 animate-slide-in">
      <div className={`
        rounded-lg shadow-2xl p-6 backdrop-blur-lg
        ${errorStyle === 'warning' 
          ? 'bg-yellow-50 border-2 border-yellow-400' 
          : 'bg-red-50 border-2 border-red-400'
        }
      `}>
        {/* Header with dismiss button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {errorStyle === 'warning' ? (
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <h3 className={`font-bold text-lg ${errorStyle === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>
              {errorType}
            </h3>
          </div>
          
          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className={`
              p-1 rounded-full transition-colors
              ${errorStyle === 'warning' 
                ? 'hover:bg-yellow-200 text-yellow-600' 
                : 'hover:bg-red-200 text-red-600'
              }
            `}
            aria-label="Dismiss error"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main message */}
        <p className={`mb-3 ${errorStyle === 'warning' ? 'text-yellow-900' : 'text-red-900'}`}>
          {message}
        </p>

        {/* Details section */}
        {Object.keys(details).length > 0 && (
          <div className={`
            rounded p-3 mb-3 text-sm
            ${errorStyle === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}
          `}>
            <p className={`font-semibold mb-2 ${errorStyle === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>
              Details:
            </p>
            <ul className="space-y-1">
              {details.your_file_size && (
                <li className={errorStyle === 'warning' ? 'text-yellow-700' : 'text-red-700'}>
                  <strong>File size:</strong> {details.your_file_size}
                </li>
              )}
              {details.free_tier_limit && (
                <li className={errorStyle === 'warning' ? 'text-yellow-700' : 'text-red-700'}>
                  <strong>Free tier limit:</strong> {details.free_tier_limit}
                </li>
              )}
              {details.reason && (
                <li className={errorStyle === 'warning' ? 'text-yellow-700' : 'text-red-700'}>
                  <strong>Reason:</strong> {details.reason}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <p className={`font-semibold mb-2 text-sm ${errorStyle === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>
              What you can do:
            </p>
            <ul className="space-y-1.5">
              {suggestions.map((suggestion, index) => (
                <li key={index} className={`flex items-start gap-2 text-sm ${errorStyle === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>
                  <span className="mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upgrade CTA for feature limitations */}
        {statusCode === 403 && (
          <div className="mt-4 pt-4 border-t border-yellow-300">
            <button
              onClick={() => window.open('mailto:support@voiceflow.com?subject=Premium%20Upgrade', '_blank')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105"
            >
              🚀 Upgrade to Premium Plan
            </button>
            <p className="text-xs text-yellow-700 text-center mt-2">
              Get image OCR, larger files, and priority support
            </p>
          </div>
        )}

        {/* Upgrade CTA for size limitations */}
        {statusCode === 413 && (
          <div className="mt-4 pt-4 border-t border-yellow-300">
            <button
              onClick={() => window.open('mailto:support@voiceflow.com?subject=Premium%20Upgrade%20-%20Large%20Files', '_blank')}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105"
            >
              💼 Upgrade for Large File Support
            </button>
            <p className="text-xs text-yellow-700 text-center mt-2">
              Premium plan supports files up to 50MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;