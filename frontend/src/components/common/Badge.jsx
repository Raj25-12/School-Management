import React from 'react';

const badgeVariants = {
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
  success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
  rose: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60',
  danger: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60',
  amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60',
  warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60',
  sky: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border-sky-200/60 dark:border-sky-800/60',
  info: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border-sky-200/60 dark:border-sky-800/60',
  teacher: 'bg-[#fdf8ee] dark:bg-[#1a140b] text-[#6b470a] dark:text-[#ebd5ab] border-[#ebd5ab] dark:border-[#856326]',
  neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

const badgeSizes = {
  xs: 'px-1.5 py-0.2 text-[9px] gap-1',
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

const Badge = React.memo(({
  children,
  variant = 'emerald',
  size = 'sm',
  icon: Icon,
  className = '',
}) => {
  const variantClass = badgeVariants[variant] || badgeVariants.emerald;
  const sizeClass = badgeSizes[size] || badgeSizes.sm;

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border shadow-2xs leading-none select-none ${variantClass} ${sizeClass} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
export default Badge;
