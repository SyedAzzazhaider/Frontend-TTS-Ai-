const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="glass-strong p-2.5 rounded-xl">
                  <svg 
                    className="w-6 h-6 text-primary-600 dark:text-primary-400" 
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
                <span className="text-xl font-display font-bold gradient-text">
                  VoiceFlow
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Professional AI-powered text-to-speech conversion with multi-language support.
              </p>
            </div>

            {/* Developer Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-display font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Built By
              </h3>
              <div className="space-y-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Syed Azzaz Haider Rizvi
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:azzazhaider4@gmail.com"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    azzazhaider4@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/syed-azzaz-haider-rizvi-20b387351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
              <p>
                © {currentYear} VoiceFlow. All rights reserved.
              </p>
              <p>
                Built by Syed Azzaz Haider Rizvi
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;