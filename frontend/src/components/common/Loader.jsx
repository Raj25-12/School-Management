import React from 'react';
import IconMorphLoader from './IconMorphLoader';

const Loader = ({
  size = 'md',
  color = 'border-emerald-500',
  text = 'Loading...',
  fullPage = false,
  className = '',
  variant = 'spinner', // 'spinner' | 'morph'
}) => {
  if (variant === 'spinner') {
    const sizeMap = {
      sm: 'w-4 h-4 border-2',
      md: 'w-8 h-8 border-3',
      lg: 'w-12 h-12 border-4',
    };
    const spinnerClass = sizeMap[size] || sizeMap.md;

    const spinnerContent = (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <div
          className={`${spinnerClass} ${color} border-t-transparent rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
        {text && (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {text}
          </p>
        )}
      </div>
    );

    if (fullPage) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs">
          <div className="clay-card p-6 flex flex-col items-center gap-3">
            {spinnerContent}
          </div>
        </div>
      );
    }

    return spinnerContent;
  }

  return (
    <IconMorphLoader
      size={size}
      text={text}
      fullPage={fullPage}
      className={className}
    />
  );
};

export default React.memo(Loader);
