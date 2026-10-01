import React from 'react';
import { Loader2 } from 'lucide-react';

const variantClasses = {
  emerald: 'clay-btn-emerald',
  primary: 'clay-btn-emerald',
  sky: 'clay-btn-sky',
  secondary: 'clay-btn-secondary text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95',
  rose: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95',
  ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
};

const sizeClasses = {
  xs: 'px-2.5 py-1 text-[11px] font-semibold gap-1 rounded-lg',
  sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5 rounded-xl',
  md: 'px-4 py-2 text-xs font-bold gap-2 rounded-xl',
  lg: 'px-5 py-2.5 text-sm font-bold gap-2.5 rounded-2xl',
  icon: 'p-1.5 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 shrink-0'
};

const Button = React.memo(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) => {
  const baseVariant = variantClasses[variant] || variantClasses.primary;
  const baseSize = sizeClasses[size] || sizeClasses.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${baseVariant} ${baseSize} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 shrink-0" />
      )}
      {children && <span>{children}</span>}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 shrink-0" />}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
