import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageHeader = ({
  badgeText,
  badgeIcon: BadgeIcon,
  title,
  description,
  backTo,
  onBack,
  backTitle = 'Back',
  actions,
  logoSrc,
  children,
  variant = 'emerald',
  className = '',
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const hasBack = Boolean(backTo || onBack);

  return (
    <div className={`clay-${variant} p-4 sm:p-5 relative overflow-hidden ${className}`}>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {hasBack && (
            <button
              type="button"
              onClick={handleBack}
              className="clay-btn-secondary p-2 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 cursor-pointer shrink-0 transition"
              title={backTitle}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {logoSrc && (
            <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <img
                src={logoSrc}
                alt="Logo"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
          )}

          <div>
            {badgeText && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-emerald-500" />}
                <span>{badgeText}</span>
              </div>
            )}
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {children && <div className="mt-3 relative z-10">{children}</div>}
    </div>
  );
};

export default React.memo(PageHeader);
