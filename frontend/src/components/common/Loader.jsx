import React from 'react';

const Loader = ({
  size = 'md',
  variant = 'primary',
  className = '',
  fullScreen = false,
  overlay = false,
  showBackdrop = true,
  ariaLabel = 'Loading...',
  text = '',
}) => {
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs': return 20;
      case 'sm': return 28;
      case 'md': return 44;
      case 'lg': return 60;
      case 'xl': return 76;
      default: return 44;
    }
  };

  const dim = getDimension();
  const isCompact = dim <= 28;

  const getColorClass = () => {
    switch (variant) {
      case 'primary':
      case 'indigo':
        return 'text-indigo-600 dark:text-indigo-400';
      case 'sky':
        return 'text-sky-500 dark:text-sky-400';
      case 'emerald':
        return 'text-emerald-500 dark:text-emerald-400';
      case 'amber':
        return 'text-amber-500 dark:text-amber-400';
      case 'rose':
        return 'text-rose-500 dark:text-rose-400';
      case 'white':
        return 'text-white';
      case 'slate':
      case 'dark':
        return 'text-slate-800 dark:text-slate-200';
      default:
        return 'text-current';
    }
  };

  const loaderContent = (
    <div
      className={`flex flex-col items-center justify-center select-none ${getColorClass()} ${className}`}
      role="progressbar"
      aria-label={ariaLabel}
    >
      <div className="relative flex items-center justify-center" style={{ width: dim, height: dim }}>
        {/* Outer smooth spinner ring */}
        <svg
          className="animate-spin"
          style={{ width: dim, height: dim }}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth={isCompact ? "4" : "3.5"}
            strokeDasharray="80"
            strokeDashoffset="60"
            strokeLinecap="round"
            className="opacity-25"
          />
          <path
            d="M 24 4 A 20 20 0 0 1 44 24"
            stroke="currentColor"
            strokeWidth={isCompact ? "4" : "3.5"}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Academic / Spark Icon for medium & large loaders */}
        {!isCompact && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-pulse"
              style={{ width: dim * 0.45, height: dim * 0.45 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
        )}
      </div>

      {text && (
        <p className="mt-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          showBackdrop ? 'bg-slate-900/20 backdrop-blur-xs dark:bg-slate-950/40' : 'bg-transparent'
        } transition-all duration-200 cursor-wait`}
      >
        {loaderContent}
      </div>
    );
  }

  if (overlay) {
    return (
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center ${
          showBackdrop ? 'bg-slate-900/20 backdrop-blur-xs dark:bg-slate-950/40' : 'bg-transparent'
        } rounded-inherit transition-all duration-200 cursor-wait`}
      >
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default React.memo(Loader);
