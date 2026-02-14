import { useEffect } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  XMarkIcon 
} from '@heroicons/react/24/solid';

const FeedbackToast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircleIcon className="w-6 h-6 text-success-500" />,
    error: <XCircleIcon className="w-6 h-6 text-error-500" />,
  };

  const bgColors = {
    success: 'border-l-4 border-success-500',
    error: 'border-l-4 border-error-500',
  };

  return (
    <div className={`toast ${bgColors[type]}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
            {type === 'success' ? 'Success!' : 'Error'}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackToast;