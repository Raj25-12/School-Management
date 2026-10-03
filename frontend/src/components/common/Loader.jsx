import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PenTool,
  GraduationCap,
  Pencil,
  Compass,
  Library,
  Sparkles
} from 'lucide-react';

const studyItems = [
  {
    id: 'book',
    icon: BookOpen,
    label: 'Books & Knowledge',
    sublabel: 'Reading curriculum...',
    accentColor: '#4f46e5', // indigo
  },
  {
    id: 'pen',
    icon: PenTool,
    label: 'Fountain Pen & Writing',
    sublabel: 'Composing lessons...',
    accentColor: '#2563eb', // blue
  },
  {
    id: 'grad-cap',
    icon: GraduationCap,
    label: 'Graduation & Achievement',
    sublabel: 'Academic excellence...',
    accentColor: '#0ea5e9', // sky
  },
  {
    id: 'pencil',
    icon: Pencil,
    label: 'Pencil & Practice',
    sublabel: 'Refining coursework...',
    accentColor: '#3b82f6', // blue
  },
  {
    id: 'compass',
    icon: Compass,
    label: 'Geometry & Focus',
    sublabel: 'Structuring modules...',
    accentColor: '#6366f1', // indigo
  },
  {
    id: 'library',
    icon: Library,
    label: 'Library & Research',
    sublabel: 'Loading school portal...',
    accentColor: '#0284c7', // light blue
  },
];

const Loader = ({
  size = 'md',
  variant = 'primary',
  className = '',
  fullScreen = false,
  overlay = false,
  showBackdrop = true,
  ariaLabel = 'Loading study portal...',
  text = '',
  showText = true,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % studyItems.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Compute pixel dimensions
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs':
        return 22;
      case 'sm':
        return 32;
      case 'md':
        return 56;
      case 'lg':
        return 72;
      case 'xl':
        return 92;
      default:
        return 56;
    }
  };

  const dim = getDimension();
  const isCompact = dim <= 34;
  const current = studyItems[index];
  const CurrentIcon = current.icon;

  // Dynamic Theme Colors
  const getColorClass = () => {
    switch (variant) {
      case 'primary':
      case 'indigo':
        return 'text-indigo-600 dark:text-indigo-400 stroke-indigo-600 dark:stroke-indigo-400';
      case 'sky':
        return 'text-sky-500 dark:text-sky-400 stroke-sky-500 dark:stroke-sky-400';
      case 'emerald':
        return 'text-emerald-500 dark:text-emerald-400 stroke-emerald-500 dark:stroke-emerald-400';
      case 'amber':
        return 'text-amber-500 dark:text-amber-400 stroke-amber-500 dark:stroke-amber-400';
      case 'purple':
        return 'text-purple-500 dark:text-purple-400 stroke-purple-500 dark:stroke-purple-400';
      case 'white':
        return 'text-white stroke-white';
      case 'slate':
      case 'dark':
        return 'text-slate-800 dark:text-slate-200 stroke-slate-800 dark:stroke-slate-200';
      case 'currentColor':
      default:
        return 'text-current stroke-current';
    }
  };

  // Compact inline loader (for small buttons/badges)
  if (isCompact) {
    return (
      <div
        className={`inline-flex items-center justify-center relative select-none ${getColorClass()} ${className}`}
        style={{ width: dim, height: dim }}
        role="progressbar"
        aria-label={ariaLabel}
      >
        <div className="absolute inset-0 rounded-full border-2 border-current/25 border-t-current animate-spin" />
        <CurrentIcon
          key={index}
          className="animate-study-pop"
          style={{ width: dim * 0.55, height: dim * 0.55 }}
          strokeWidth={2.4}
        />
      </div>
    );
  }

  // Full Rich Academic & Study Loader Visual
  const iconSizePx = Math.round(dim * 0.44);

  const studyLoaderContent = (
    <div
      className={`flex flex-col items-center justify-center select-none ${getColorClass()} ${className}`}
      role="progressbar"
      aria-label={ariaLabel}
    >
      {/* Central Interactive Academic Visual Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: dim * 1.35, height: dim * 1.35 }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute inset-2 rounded-full opacity-35 dark:opacity-45 blur-xl pointer-events-none bg-indigo-500 animate-pulse"
          style={{ animationDuration: '2.5s' }}
        />

        {/* Outer Orbit Track Ring 1 (Clockwise) */}
        <div className="absolute inset-0 rounded-full border border-dashed border-indigo-400/40 dark:border-indigo-400/30 animate-study-orbit pointer-events-none" />

        {/* Orbital Satellite 1: Pen Nib / Sparkle traveling orbit */}
        <div className="absolute inset-0 animate-study-orbit pointer-events-none">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 p-1 rounded-full bg-indigo-600/90 dark:bg-indigo-400 text-white shadow-sm">
            <Sparkles style={{ width: Math.max(10, dim * 0.16), height: Math.max(10, dim * 0.16) }} />
          </div>
        </div>

        {/* Outer Orbit Track Ring 2 (Counter Clockwise) */}
        <div className="absolute inset-2 rounded-full border border-indigo-300/30 dark:border-indigo-500/20 animate-study-orbit-reverse pointer-events-none" />

        {/* Orbital Satellite 2: Mini Graduation / Book Accent */}
        <div className="absolute inset-2 animate-study-orbit-reverse pointer-events-none">
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-xs ring-2 ring-sky-300/40" />
        </div>

        {/* Floating Center Glass Ring */}
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl animate-study-float"
          style={{
            width: dim,
            height: dim,
          }}
        >
          {/* Morphing Study Icon */}
          <div key={index} className="animate-study-pop flex items-center justify-center drop-shadow-md">
            <CurrentIcon
              style={{ width: iconSizePx, height: iconSizePx }}
              strokeWidth={2.3}
            />
          </div>

          {/* Animated Dynamic Pen Stroke Writing Underline */}
          <svg
            className="w-3/4 h-2 overflow-visible mt-1 opacity-80"
            viewBox="0 0 60 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 2 4 Q 30 1 58 4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="60"
              style={{
                animation: 'study-pen-write 1.8s ease-in-out infinite'
              }}
            />
          </svg>
        </div>
      </div>

      {/* Optional custom text if explicitly passed */}
      {text ? (
        <div className="mt-3.5 flex flex-col items-center text-center">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            {text}
          </p>
        </div>
      ) : null}
    </div>
  );

  // Global Full-Screen Mode
  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          showBackdrop
            ? 'bg-slate-900/30 dark:bg-slate-950/60 backdrop-blur-md'
            : 'bg-transparent'
        } transition-all duration-300 animate-in fade-in select-none cursor-wait`}
        style={{ pointerEvents: 'auto' }}
      >
        {studyLoaderContent}
      </div>
    );
  }

  // Container Overlay Mode
  if (overlay) {
    return (
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center ${
          showBackdrop
            ? 'bg-slate-900/20 backdrop-blur-xs dark:bg-slate-950/40'
            : 'bg-transparent'
        } rounded-inherit transition-all duration-200 cursor-wait`}
        style={{ pointerEvents: 'auto' }}
      >
        {studyLoaderContent}
      </div>
    );
  }

  return studyLoaderContent;
};

export default React.memo(Loader);
