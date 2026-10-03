import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PenTool,
  GraduationCap,
  Pencil,
  Library,
  Compass,
  FlaskConical,
  Sparkles
} from 'lucide-react';

const morphIcons = [
  {
    icon: BookOpen,
    name: 'BookOpen',
    label: 'Books & Coursework',
    gradient: 'from-indigo-500 via-blue-600 to-indigo-700',
    glowColor: 'rgba(79, 70, 229, 0.45)',
    textColor: 'text-indigo-700 dark:text-indigo-400',
    ringColor: 'border-indigo-400/40 dark:border-indigo-500/30',
    bgBadge: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/80 dark:border-indigo-800/80',
  },
  {
    icon: PenTool,
    name: 'PenTool',
    label: 'Writing & Assignments',
    gradient: 'from-blue-500 via-sky-600 to-indigo-600',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    textColor: 'text-blue-700 dark:text-blue-400',
    ringColor: 'border-blue-400/40 dark:border-blue-500/30',
    bgBadge: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/80',
  },
  {
    icon: GraduationCap,
    name: 'GraduationCap',
    label: 'Academic Excellence',
    gradient: 'from-sky-500 via-blue-500 to-indigo-600',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    textColor: 'text-sky-700 dark:text-sky-400',
    ringColor: 'border-sky-400/40 dark:border-sky-500/30',
    bgBadge: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200/80 dark:border-sky-800/80',
  },
  {
    icon: Pencil,
    name: 'Pencil',
    label: 'Study & Practice',
    gradient: 'from-indigo-400 via-sky-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    textColor: 'text-indigo-700 dark:text-indigo-400',
    ringColor: 'border-indigo-400/40 dark:border-indigo-500/30',
    bgBadge: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/80 dark:border-indigo-800/80',
  },
  {
    icon: Library,
    name: 'Library',
    label: 'Curriculum & Resources',
    gradient: 'from-blue-600 via-indigo-600 to-sky-600',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    textColor: 'text-blue-700 dark:text-blue-400',
    ringColor: 'border-blue-400/40 dark:border-blue-500/30',
    bgBadge: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/80',
  },
  {
    icon: Compass,
    name: 'Compass',
    label: 'Student Growth & Focus',
    gradient: 'from-sky-500 via-indigo-600 to-blue-500',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    textColor: 'text-sky-700 dark:text-sky-400',
    ringColor: 'border-sky-400/40 dark:border-sky-500/30',
    bgBadge: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200/80 dark:border-sky-800/80',
  }
];

const sizeConfig = {
  sm: {
    container: 'w-16 h-16',
    iconSize: 'w-6 h-6',
    blobSize: 'w-14 h-14',
    textSize: 'text-xs',
    barWidth: 'w-24'
  },
  md: {
    container: 'w-24 h-24',
    iconSize: 'w-10 h-10',
    blobSize: 'w-20 h-20',
    textSize: 'text-xs',
    barWidth: 'w-36'
  },
  lg: {
    container: 'w-32 h-32',
    iconSize: 'w-12 h-12',
    blobSize: 'w-28 h-28',
    textSize: 'text-sm',
    barWidth: 'w-48'
  },
  xl: {
    container: 'w-40 h-40',
    iconSize: 'w-16 h-16',
    blobSize: 'w-36 h-36',
    textSize: 'text-sm',
    barWidth: 'w-56'
  }
};

const IconMorphLoader = ({
  size = 'lg',
  text = 'Loading...',
  showProgress = true,
  fullPage = false,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cfg = sizeConfig[size] || sizeConfig.lg;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % morphIcons.length);
    }, 900);

    return () => clearInterval(timer);
  }, []);

  const current = morphIcons[currentIndex];
  const CurrentIcon = current.icon;

  const content = (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Morphing Visual Stage */}
      <div className={`relative flex items-center justify-center ${cfg.container}`}>
        {/* Expanding Background Ripples / Halos */}
        <div
          className="absolute inset-0 rounded-full animate-morph-ripple-1 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: current.glowColor }}
        />
        <div
          className="absolute inset-0 rounded-full animate-morph-ripple-2 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: current.glowColor }}
        />
        <div
          className="absolute inset-0 rounded-full animate-morph-ripple-3 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: current.glowColor }}
        />

        {/* Orbiting Dashed Ring */}
        <div
          className={`absolute inset-[-6px] rounded-full border-2 border-dashed ${current.ringColor} animate-morph-ring pointer-events-none transition-colors duration-700`}
        />

        {/* Morphing Organic Blob Container */}
        <div
          className={`${cfg.blobSize} bg-gradient-to-tr ${current.gradient} animate-morph-shape flex items-center justify-center shadow-xl transition-all duration-700 relative overflow-hidden`}
          style={{
            boxShadow: `0 14px 30px ${current.glowColor}, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)`
          }}
        >
          {/* Inner Light Reflection */}
          <div className="absolute top-1 left-2 w-1/2 h-1/3 bg-white/35 rounded-full blur-[1px] pointer-events-none" />

          {/* Morphing Animated Icon */}
          <div key={currentIndex} className="animate-morph-icon text-white relative z-10 drop-shadow-md">
            <CurrentIcon className={cfg.iconSize} strokeWidth={2.4} />
          </div>
        </div>
      </div>

      {/* Dynamic Status / Caption */}
      {(text || showProgress) && (
        <div className="mt-4 flex flex-col items-center text-center space-y-1.5">
          {text && (
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-tight transition-colors duration-300">
              {text}
            </p>
          )}

          {/* Sleek Animated Progress Bar */}
          {showProgress && (
            <div className={`mt-1.5 ${cfg.barWidth} h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden relative shadow-inner`}>
              <div
                className={`h-full bg-gradient-to-r ${current.gradient} rounded-full animate-morph-bar w-full`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-all duration-300">
        {content}
      </div>
    );
  }

  return content;
};

export default React.memo(IconMorphLoader);
