import { CheckCircleIcon } from '@heroicons/react/24/solid';

const LanguageControls = ({ detectedLanguage }) => {
  if (!detectedLanguage) {
    return null; // Don't show anything if no language detected yet
  }

  const languageInfo = {
    'en': { label: 'English', icon: '🇬🇧' },
    'ur': { label: 'اردو (Urdu)', icon: '🇵🇰' }
  };

  const info = languageInfo[detectedLanguage] || { label: 'Unknown', icon: '🌐' };

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <div className="glass p-4 rounded-xl inline-flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Audio Generated:
              </span>
            </div>
            <span className="px-3 py-1 bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-400 rounded-full text-sm font-bold flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4" />
              <span>{info.icon}</span>
              <span>{info.label}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageControls;