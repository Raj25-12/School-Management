import React from 'react';
import Card from './Card';

const variantConfig = {
  default: {
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300',
    titleColor: 'text-slate-500 dark:text-slate-400',
    valColor: 'text-slate-800 dark:text-white',
    subColor: 'text-emerald-600 dark:text-emerald-400',
  },
  emerald: {
    cardVariant: 'emerald',
    iconBg: 'bg-emerald-200/60 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    titleColor: 'text-emerald-700 dark:text-emerald-300',
    valColor: 'text-emerald-800 dark:text-emerald-100',
    subColor: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300',
    titleColor: 'text-slate-500 dark:text-slate-400',
    valColor: 'text-slate-800 dark:text-white',
    subColor: 'text-amber-600 dark:text-amber-400',
  },
  indigo: {
    iconBg: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300',
    titleColor: 'text-slate-500 dark:text-slate-400',
    valColor: 'text-slate-800 dark:text-white',
    subColor: 'text-indigo-600 dark:text-indigo-400',
  },
  rose: {
    iconBg: 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300',
    titleColor: 'text-slate-500 dark:text-slate-400',
    valColor: 'text-slate-800 dark:text-white',
    subColor: 'text-rose-600 dark:text-rose-400',
  },
  sky: {
    iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300',
    titleColor: 'text-slate-500 dark:text-slate-400',
    valColor: 'text-slate-800 dark:text-white',
    subColor: 'text-sky-600 dark:text-sky-400',
  },
};

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  className = '',
  onClick,
}) => {
  const conf = variantConfig[variant] || variantConfig.default;

  return (
    <Card
      variant={conf.cardVariant || 'default'}
      padding="p-3.5"
      className={`flex flex-col justify-between ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${conf.titleColor}`}>
          {title}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded-lg clay-icon-pill ${conf.iconBg}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <div className="mt-2">
        <div className={`text-lg sm:text-xl font-black ${conf.valColor}`}>
          {value}
        </div>
        {subtitle && (
          <div className={`text-[11px] font-semibold ${conf.subColor} mt-0.5 truncate`}>
            {subtitle}
          </div>
        )}
      </div>
    </Card>
  );
};

export default React.memo(StatsCard);
