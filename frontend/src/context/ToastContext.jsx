import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ToastContext = createContext(null);

const ToastIcon = ({ type }) => {
  switch (type) {
    case 'error':
    case 'rose':
    case 'red':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case 'warning':
    case 'amber':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'student':
    case 'sky':
    case 'blue':
    case 'info':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
    case 'admin':
    case 'success':
    case 'emerald':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (options, fallbackType = 'success') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);

      const isTeacher = typeof window !== 'undefined' && window.location.pathname.startsWith('/teacher');
      const isStudent = typeof window !== 'undefined' && window.location.pathname.startsWith('/student');

      let toastData = {};
      if (typeof options === 'string') {
        let determinedType = fallbackType;
        if (determinedType === 'success' && isTeacher) determinedType = 'teacher';
        if (determinedType === 'success' && isStudent) determinedType = 'student';

        toastData = {
          id,
          message: options,
          type: determinedType,
          duration: 4000,
        };
      } else {
        let determinedType = options.type || fallbackType;
        if ((determinedType === 'success' || determinedType === 'info') && isTeacher) {
          determinedType = 'teacher';
        } else if ((determinedType === 'success' || determinedType === 'info') && isStudent) {
          determinedType = 'student';
        }

        toastData = {
          id,
          title: options.title || '',
          message: options.message || options.msg || '',
          type: determinedType,
          duration: options.duration !== undefined ? options.duration : 4000,
          actionLabel: options.actionLabel || '',
          onAction: options.onAction || null,
        };
      }

      setToasts((prev) => [toastData, ...prev.slice(0, 4)]);

      if (toastData.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, toastData.duration);
      }

      return id;
    },
    [removeToast]
  );

  const getToastStyles = (type) => {
    switch (type) {
      case 'teacher':
      case 'sand':
      case 'gold':
        return {
          card: 'bg-[#fdf8ee]/95 dark:bg-[#1a140b]/95 border-[#ebd5ab] dark:border-[#856326] shadow-[0_8px_25px_rgba(235,213,171,0.35)]',
          iconBg: 'bg-[#ebd5ab] dark:bg-[#856326] text-[#523707] dark:text-[#fff9ed]',
          title: 'text-[#6b470a] dark:text-[#ebd5ab]',
          bar: 'bg-[#c49646]',
        };
      case 'admin':
      case 'success':
      case 'emerald':
        return {
          card: 'bg-emerald-50/95 dark:bg-slate-900/95 border-emerald-300 dark:border-emerald-700/70',
          iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
          title: 'text-emerald-900 dark:text-emerald-200',
          bar: 'bg-emerald-500',
        };
      case 'student':
      case 'sky':
      case 'blue':
      case 'info':
        return {
          card: 'bg-sky-50/95 dark:bg-slate-900/95 border-sky-300 dark:border-sky-700/70',
          iconBg: 'bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400',
          title: 'text-sky-900 dark:text-sky-200',
          bar: 'bg-sky-500',
        };
      case 'error':
      case 'rose':
      case 'red':
        return {
          card: 'bg-rose-50/95 dark:bg-slate-900/95 border-rose-300 dark:border-rose-700/70',
          iconBg: 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400',
          title: 'text-rose-900 dark:text-rose-200',
          bar: 'bg-rose-500',
        };
      case 'warning':
      case 'amber':
        return {
          card: 'bg-amber-50/95 dark:bg-slate-900/95 border-amber-300 dark:border-amber-700/70',
          iconBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
          title: 'text-amber-900 dark:text-amber-200',
          bar: 'bg-amber-500',
        };
      default:
        return {
          card: 'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-700',
          iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
          title: 'text-slate-800 dark:text-white',
          bar: 'bg-[#c49646]',
        };
    }
  };

  const contextValue = useMemo(() => ({
    showToast,
    removeToast
  }), [showToast, removeToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-3 sm:px-0">
          {toasts.map((toast) => {
            const style = getToastStyles(toast.type);

            return (
              <div
                key={toast.id}
                className={`pointer-events-auto clay-card p-3.5 relative overflow-hidden backdrop-blur-md border shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4 fade-in ${style.card}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 clay-icon-pill ${style.iconBg}`}>
                    <ToastIcon type={toast.type} />
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    {toast.title && (
                      <h4 className={`text-xs font-semibold leading-tight ${style.title}`}>
                        {toast.title}
                      </h4>
                    )}
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-snug mt-0.5">
                      {toast.message}
                    </p>

                    {toast.actionLabel && (
                      <button
                        type="button"
                        onClick={() => {
                          if (toast.onAction) toast.onAction();
                          removeToast(toast.id);
                        }}
                        className="mt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        {toast.actionLabel} →
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeToast(toast.id)}
                    className="clay-btn-secondary p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shrink-0 transition"
                    aria-label="Dismiss toast"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {toast.duration > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-800/50 overflow-hidden">
                    <div
                      className={`h-full ${style.bar} animate-toast-progress origin-left`}
                      style={{
                        animationDuration: `${toast.duration}ms`,
                        animationTimingFunction: 'linear',
                        animationFillMode: 'forwards',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: () => {},
      removeToast: () => {},
    };
  }
  return context;
};

export default ToastContext;
