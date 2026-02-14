// import React from 'react';
// import { useTheme } from '../contexts/ThemeContext';
// import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// const Header = () => {
//   const { isDark, toggle } = useTheme();

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-bg-primary/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo/Brand */}
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
//               <span className="text-white text-xl font-bold">🎤</span>
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
//                 VoiceFlow
//               </h1>
//               <p className="text-xs text-gray-500 dark:text-dark-text-secondary">
//                 AI Voice Studio
//               </p>
//             </div>
//           </div>

//           {/* Theme Toggle */}
//           <button
//             onClick={toggle}
//             className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
//             aria-label="Toggle theme"
//           >
//             {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur-lg opacity-50 animate-pulse-slow"></div>
              <div className="relative glass-strong rounded-xl p-2.5 shadow-lg">
                <svg 
                  className="w-7 h-7 text-primary-600 dark:text-primary-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold gradient-text">
                VoiceFlow
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                AI-Powered Text-to-Speech
              </p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="glass hover:glass-strong p-3 rounded-xl transform hover:scale-110 active:scale-95 transition-all duration-200 group"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5 text-slate-700 group-hover:text-primary-600 transition-colors" />
            ) : (
              <SunIcon className="w-5 h-5 text-slate-300 group-hover:text-primary-400 transition-colors" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
