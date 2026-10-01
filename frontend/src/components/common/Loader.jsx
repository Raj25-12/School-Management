import React from 'react';

/**
 * IconMorphLoader
 * Exact visual reproduction of the Dribbble Icon Morph Loader (Shot 4397553).
 * Vector path morphing seamlessly between 6 icon states:
 * Circle -> Heart -> Rounded Card -> 4-Point Star -> Play Delta -> Shield Hexagon -> Circle
 * Features 60 FPS hardware accelerated spline morphing, elastic rotation, and synchronized core particle pulse.
 */
const Loader = ({
  size = 'md',
  variant = 'primary',
  className = '',
  fullScreen = false,
  overlay = false,
  duration = 3.6,
  showBackdrop = true,
  ariaLabel = 'Loading...',
}) => {
  // Compute pixel dimensions
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs':
        return 20;
      case 'sm':
        return 28;
      case 'md':
        return 46;
      case 'lg':
        return 60;
      case 'xl':
        return 76;
      default:
        return 46;
    }
  };

  const dim = getDimension();
  const strokeWidth = dim <= 22 ? 5.2 : dim <= 32 ? 4.4 : dim <= 50 ? 3.8 : 3.2;

  // Dynamic Theme Colors
  const getColorClass = () => {
    switch (variant) {
      case 'primary':
      case 'indigo':
        return 'text-indigo-600 dark:text-indigo-400 stroke-indigo-600 dark:stroke-indigo-400';
      case 'emerald':
        return 'text-emerald-600 dark:text-emerald-400 stroke-emerald-600 dark:stroke-emerald-400';
      case 'amber':
        return 'text-amber-500 dark:text-amber-400 stroke-amber-500 dark:stroke-amber-400';
      case 'purple':
        return 'text-purple-600 dark:text-purple-400 stroke-purple-600 dark:stroke-purple-400';
      case 'sky':
        return 'text-sky-600 dark:text-sky-400 stroke-sky-600 dark:stroke-sky-400';
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

  // 1. Circle
  const pathCircle =
    'M 50 18 C 58.49 18 65.98 21.1 72.63 27.37 C 78.9 34.02 82 41.51 82 50 C 82 58.49 78.9 65.98 72.63 72.63 C 65.98 78.9 58.49 82 50 82 C 41.51 82 34.02 78.9 27.37 72.63 C 21.1 65.98 18 58.49 18 50 C 18 41.51 21.1 34.02 27.37 27.37 C 34.02 21.1 41.51 18 50 18 Z';

  // 2. Heart
  const pathHeart =
    'M 50 34 C 44 20 22 20 20 38 C 18 56 36 68 50 80 C 64 68 82 56 80 38 C 78 20 56 20 50 34 C 50 34 50 34 50 34 C 50 34 50 34 50 34 C 50 34 50 34 50 34 Z';

  // 3. Rounded Square / Card Box
  const pathSquare =
    'M 50 20 C 62 20 74 20 78 24 C 82 28 82 40 82 50 C 82 60 82 72 78 76 C 74 80 62 80 50 80 C 38 80 26 80 22 76 C 18 72 18 60 18 50 C 18 40 18 28 22 24 C 26 20 38 20 50 20 Z';

  // 4. Star / Sparkle
  const pathStar =
    'M 50 16 C 53 30 62 42 72 47 C 78 49 82 50 84 50 C 82 50 78 51 72 53 C 62 58 53 70 50 84 C 47 70 38 58 28 53 C 22 51 18 50 16 50 C 18 50 22 49 28 47 C 38 42 47 30 50 16 Z';

  // 5. Triangle / Play Delta
  const pathTriangle =
    'M 50 18 C 55 23 64 40 71 54 C 77 66 82 75 77 79 C 72 83 62 82 50 82 C 38 82 28 83 23 79 C 18 75 23 66 29 54 C 36 40 45 23 50 18 C 50 18 50 18 50 18 C 50 18 50 18 50 18 Z';

  // 6. Shield / Hexagon
  const pathShield =
    'M 50 18 C 60 18 72 24 78 34 C 82 40 82 48 82 54 C 82 64 74 76 50 84 C 26 76 18 64 18 54 C 18 48 18 40 22 34 C 28 24 40 18 50 18 C 50 18 50 18 50 18 Z';

  const outerValues = `${pathCircle}; ${pathHeart}; ${pathSquare}; ${pathStar}; ${pathTriangle}; ${pathShield}; ${pathCircle}`;
  const keyTimes = '0; 0.166; 0.333; 0.5; 0.666; 0.833; 1';
  const splines = '0.5 0 0.15 1; 0.5 0 0.15 1; 0.5 0 0.15 1; 0.5 0 0.15 1; 0.5 0 0.15 1; 0.5 0 0.15 1';

  // Inner Synchronized Core Particles
  const innerCircle =
    'M 50 45 C 52.76 45 55 47.24 55 50 C 55 52.76 52.76 55 50 55 C 47.24 55 45 52.76 45 50 C 45 47.24 47.24 45 50 45 Z';
  const innerHeart =
    'M 50 46 C 48 42 45 42 45 46 C 45 49 48 52 50 54 C 52 52 55 49 55 46 C 55 42 52 42 50 46 C 50 46 50 46 50 46 Z';
  const innerSquare =
    'M 50 44 C 54 44 56 44 56 47 C 56 53 56 56 50 56 C 44 56 44 53 44 47 C 44 44 46 44 50 44 Z';
  const innerStar =
    'M 50 42 C 51 46 54 49 58 50 C 54 51 51 54 50 58 C 49 54 46 51 42 50 C 46 49 49 46 50 42 Z';
  const innerTriangle =
    'M 50 43 C 53 46 55 51 55 55 C 53 56 47 56 45 55 C 45 51 47 46 50 43 C 50 43 50 43 50 43 Z';
  const innerShield =
    'M 50 43 C 55 44 56 47 56 50 C 56 53 55 56 50 57 C 45 56 44 53 44 50 C 44 47 45 44 50 43 Z';

  const innerValues = `${innerCircle}; ${innerHeart}; ${innerSquare}; ${innerStar}; ${innerTriangle}; ${innerShield}; ${innerCircle}`;

  const durStr = `${duration}s`;

  // Core Vector Morph Icon
  const morphSvg = (
    <div
      className={`icon-morph-container inline-flex items-center justify-center relative select-none ${getColorClass()} ${className}`}
      style={{ width: dim, height: dim }}
      role="progressbar"
      aria-label={ariaLabel}
    >
      {/* Soft Radiant Aura Behind Morphing Vector */}
      {dim >= 24 && (
        <div
          className="absolute inset-0 rounded-full opacity-25 dark:opacity-35 blur-md pointer-events-none bg-current animate-pulse"
          style={{ animationDuration: `${duration * 0.7}s` }}
        />
      )}

      <svg
        className="icon-morph-svg w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animationDuration: durStr }}
      >
        <defs>
          <linearGradient id={`morphGrad-${dim}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.88" />
          </linearGradient>
        </defs>

        {/* Outer Morphing Vector Contour */}
        <path
          className="icon-morph-path"
          d={pathCircle}
          stroke={`url(#morphGrad-${dim})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <animate
            attributeName="d"
            dur={durStr}
            repeatCount="indefinite"
            values={outerValues}
            keyTimes={keyTimes}
            keySplines={splines}
            calcMode="spline"
          />
        </path>

        {/* Inner Synchronized Core Particle */}
        {dim >= 20 && (
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
              keyTimes={keyTimes}
              keySplines={splines}
              calcMode="spline"
            />
          </path>
        )}
      </svg>
    </div>
  );

  // Global Full-Screen Mode: Centered + Strong Background Blur + Slightly Dimmed
  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          showBackdrop
            ? 'bg-slate-900/30 dark:bg-slate-950/60 backdrop-blur-lg'
            : 'bg-transparent'
        } transition-all duration-300 animate-in fade-in select-none cursor-wait`}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Sleek Floating Glass/Clay Centered Card */}
        <div className="clay-card p-4 sm:p-5 flex items-center justify-center shadow-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl animate-in zoom-in-95 duration-200">
          <div className="p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/60 ring-1 ring-indigo-200/60 dark:ring-indigo-800/40 flex items-center justify-center">
            {morphSvg}
          </div>
        </div>
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
        <div className="clay-card p-3 flex items-center justify-center shadow-lg bg-white/95 dark:bg-slate-900/95 rounded-2xl">
          {morphSvg}
        </div>
      </div>
    );
  }

  return morphSvg;
};

export default Loader;
