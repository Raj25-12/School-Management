import React from 'react';

const cardVariants = {
  default: 'clay-card',
  emerald: 'clay-emerald',
  sky: 'clay-card bg-sky-50/80 dark:bg-sky-950/30 border-sky-200/80 dark:border-sky-800/60',
  teacher: 'clay-card bg-[#fdf8ee]/90 dark:bg-[#1a140b]/90 border-[#ebd5ab] dark:border-[#856326]',
  plain: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl'
};

const Card = React.memo(({
  children,
  variant = 'default',
  className = '',
  padding = 'p-4 sm:p-5',
  ...props
}) => {
  const variantClass = cardVariants[variant] || cardVariants.default;

  return (
    <div
      className={`${variantClass} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
export default Card;
