import { SparklesIcon } from '@heroicons/react/24/outline';

const EmptyState = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="empty-state">
          {/* Illustration */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="relative glass-strong rounded-full w-full h-full flex items-center justify-center">
              <svg 
                className="w-24 h-24 text-primary-600 dark:text-primary-400 animate-float" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <SparklesIcon className="w-5 h-5 text-primary-500" />
              <h3 className="text-xl font-display font-bold text-slate-700 dark:text-slate-300">
                Ready to Generate
              </h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Enter your text or upload a file, select your preferred language, 
              and click "Generate Audio" to create your voice output.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 flex justify-center gap-3">
            {['🎙️', '🔊', '🎵'].map((emoji, i) => (
              <div 
                key={i}
                className="glass-strong p-3 rounded-xl animate-float-delayed"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <span className="text-2xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyState;