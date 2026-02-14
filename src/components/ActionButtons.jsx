import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const ActionButtons = ({ onGenerate, onClear, loading, disabled }) => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Generate Button */}
          <button
            onClick={onGenerate}
            disabled={disabled || loading}
            className={`btn-primary flex items-center justify-center gap-3 min-w-[200px] ${
              disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Generate Audio</span>
              </>
            )}
          </button>

          {/* Clear Button */}
          <button
            onClick={onClear}
            disabled={loading}
            className={`btn-secondary flex items-center justify-center gap-3 min-w-[200px] ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActionButtons;