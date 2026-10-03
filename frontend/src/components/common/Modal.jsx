import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-full mx-4'
};

const iconThemeMap = {
  emerald: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
  sky: 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400',
  rose: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400',
  amber: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400',
  slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
};

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  iconTheme = 'emerald',
  maxWidth = 'lg',
  children,
  footer,
  className = '',
  closeOnEsc = true,
  closeOnClickOutside = true,
}) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const maxWidthClass = maxWidthMap[maxWidth] || maxWidthMap.lg;
  const iconThemeClass = iconThemeMap[iconTheme] || iconThemeMap.emerald;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={closeOnClickOutside ? (e) => e.target === e.currentTarget && onClose() : undefined}
    >
      <div
        className={`clay-card w-full ${maxWidthClass} p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || Icon) && (
          <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              {Icon && (
                <div className={`p-2 rounded-xl ${iconThemeClass} clay-icon-pill shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <div>
                {title && (
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="text-xs">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 pt-3 mt-4 border-t border-slate-100 dark:border-slate-800">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Modal);
