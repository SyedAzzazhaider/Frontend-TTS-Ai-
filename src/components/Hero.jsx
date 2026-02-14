const Hero = () => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element w-96 h-96 bg-primary-500 top-0 -left-48"></div>
        <div className="floating-element w-80 h-80 bg-accent-500 top-1/4 -right-40"></div>
        <div className="floating-element w-72 h-72 bg-primary-400 bottom-0 left-1/3"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold text-primary-700 dark:text-primary-300 animate-scale-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            AI-Powered Voice Generation
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold">
            <span className="gradient-text">Transform Text</span>
            <br />
            <span className="text-slate-800 dark:text-slate-100">into Natural Speech</span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Experience professional-grade text-to-speech with automatic language detection. 
            Convert any text or document into crystal-clear audio instantly.
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Generate audio in seconds' },
              { icon: '🌐', title: 'Multi-Language', desc: 'English & Urdu support' },
              { icon: '🎯', title: 'High Quality', desc: 'Crystal-clear audio output' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-strong rounded-xl p-4 card-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-display font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;