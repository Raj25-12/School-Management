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

/**
 * IconMorphLoader
 * Faithful reproduction of the Dribbble Icon Morph Loader (shot 4397553).
 * Vector path morphing seamlessly between 6 icon states:
 * Circle -> Square/Card -> Triangle -> Star -> Shield/Hexagon -> Circle
 * Features 60 FPS hardware accelerated spline morphing, elastic rotation, and synchronized core particle pulse.
 */
const Loader = ({
  size = 'md',
  variant = 'primary',
  className = '',
  text = '',
  fullScreen = false,
  overlay = false,
  duration = 3.0,
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
        return 18;
      case 'sm':
        return 24;
      case 'md':
        return 38;
      case 'lg':
        return 50;
      case 'xl':
        return 64;
      default:
        return 38;
    }
  };

  const dim = getDimension();
  const strokeWidth = dim <= 20 ? 5.2 : dim <= 30 ? 4.2 : dim <= 45 ? 3.8 : 3.2;
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
      case 'sand':
      case 'rose':
        return 'text-amber-600 dark:text-amber-400 stroke-amber-600 dark:stroke-amber-400';
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
      {/* Background Soft Radiant Aura */}
      {dim >= 24 && (
        <div
          className="absolute inset-0 rounded-full opacity-20 dark:opacity-30 blur-sm pointer-events-none bg-current animate-pulse"
          style={{ animationDuration: `${duration * 0.8}s` }}
        />
      )}

      <svg
        className="icon-morph-svg w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animationDuration: durStr }}
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
          <animate
            attributeName="d"
            dur={durStr}
            repeatCount="indefinite"
            values={outerValues}
            keyTimes="0; 0.22; 0.45; 0.68; 0.88; 1"
            keySplines={splines}
            calcMode="spline"
          />
        </path>

        {/* Inner Synchronized Core Particle */}
        {dim >= 18 && (
          <path
            className="icon-morph-inner"
            d={innerCircle}
            fill="currentColor"
            opacity="0.9"
          >
            <animate
              attributeName="d"
              dur={durStr}
              repeatCount="indefinite"
              values={innerValues}
              keyTimes="0; 0.22; 0.45; 0.68; 0.88; 1"
              keySplines={splines}
              calcMode="spline"
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

  // Small Size Centered Full-Screen Loader with Background Blur
  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          showBackdrop
            ? 'bg-slate-900/30 backdrop-blur-md dark:bg-slate-950/60'
            : 'bg-transparent'
        } transition-all duration-300 animate-in fade-in select-none cursor-wait`}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Compact, Sleek Floating Glass/Clay Morph Card in Dead Center */}
        <div className="clay-card p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl animate-in zoom-in-95 duration-200 min-w-[90px] min-h-[90px]">
          <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 ring-1 ring-indigo-200/60 dark:ring-indigo-800/40 flex items-center justify-center">
            {morphSvg}
          </div>
          {text ? (
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 tracking-wide mt-2 px-1">
              {text}
            </span>
          ) : (
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Container Overlay mode
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
        <div className="clay-card p-3 flex flex-col items-center justify-center text-center shadow-lg bg-white/95 dark:bg-slate-900/95 rounded-2xl min-w-[70px]">
          {morphSvg}
          {text && (
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mt-1.5">
              {text}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Inline / Container with optional text
  if (text) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {morphSvg}
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 select-none">
          {text}
        </span>
      </div>
    );
  }

  return morphSvg;
};

export default React.memo(Loader);
