const LoadingSkeleton = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-8 space-y-6">
          {/* Title skeleton */}
          <div className="flex items-center gap-3">
            <div className="skeleton w-12 h-12 rounded-xl"></div>
            <div className="space-y-2 flex-1">
              <div className="skeleton h-5 w-32 rounded"></div>
              <div className="skeleton h-4 w-24 rounded"></div>
            </div>
          </div>

          {/* Waveform skeleton */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-center gap-1 h-20">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton w-1 rounded-full"
                  style={{ 
                    height: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar skeleton */}
          <div className="space-y-2">
            <div className="skeleton h-2 w-full rounded-lg"></div>
            <div className="flex justify-between">
              <div className="skeleton h-3 w-12 rounded"></div>
              <div className="skeleton h-3 w-12 rounded"></div>
            </div>
          </div>

          {/* Controls skeleton */}
          <div className="flex items-center justify-between gap-4">
            <div className="skeleton w-16 h-16 rounded-full"></div>
            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <div className="skeleton w-5 h-5 rounded"></div>
              <div className="skeleton h-2 flex-1 rounded-lg"></div>
            </div>
            <div className="skeleton w-32 h-12 rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;