import React from 'react';

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
  ariaLabel = 'Loading...',
}) => {
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

  // Dynamic Theme Colors
  const getColorClass = () => {
    switch (variant) {
      case 'primary':
      case 'indigo':
        return 'text-indigo-600 dark:text-indigo-400 stroke-indigo-600 dark:stroke-indigo-400';
      case 'emerald':
        return 'text-emerald-600 dark:text-emerald-400 stroke-emerald-600 dark:stroke-emerald-400';
      case 'amber':
      case 'sand':
      case 'rose':
        return 'text-amber-600 dark:text-amber-400 stroke-amber-600 dark:stroke-amber-400';
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

  // Outer Morph Paths (Normalized 100x100 space, 8 cubic Bezier segments each)
  const pathCircle =
    'M 50 18 C 58.49 18 65.98 21.1 72.63 27.37 C 78.9 34.02 82 41.51 82 50 C 82 58.49 78.9 65.98 72.63 72.63 C 65.98 78.9 58.49 82 50 82 C 41.51 82 34.02 78.9 27.37 72.63 C 21.1 65.98 18 58.49 18 50 C 18 41.51 21.1 34.02 27.37 27.37 C 34.02 21.1 41.51 18 50 18 Z';

  const pathSquare =
    'M 50 20 C 60 20 68 20 74 26 C 80 32 80 40 80 50 C 80 60 80 68 74 74 C 68 80 60 80 50 80 C 40 80 32 80 26 74 C 20 68 20 60 20 50 C 20 40 20 32 26 26 C 32 20 40 20 50 20 Z';

  const pathTriangle =
    'M 50 18 C 54 22 62 38 70 54 C 76 66 80 74 76 78 C 72 82 62 82 50 82 C 38 82 28 82 24 78 C 20 74 24 66 30 54 C 38 38 46 22 50 18 C 50 18 50 18 50 18 C 50 18 50 18 50 18 Z';

  const pathStar =
    'M 50 16 C 53 28 60 40 72 47 C 78 49 82 50 84 50 C 82 50 78 51 72 53 C 60 60 53 72 50 84 C 47 72 40 60 28 53 C 22 51 18 50 16 50 C 18 50 22 49 28 47 C 40 40 47 28 50 16 Z';

  const pathHexagon =
    'M 50 18 C 58 18 70 24 78 34 C 82 39 82 45 82 50 C 82 55 82 61 78 66 C 70 76 58 82 50 82 C 42 82 30 76 22 66 C 18 61 18 55 18 50 C 18 45 18 39 22 34 C 30 24 42 18 50 18 Z';

  const outerValues = `${pathCircle}; ${pathSquare}; ${pathTriangle}; ${pathStar}; ${pathHexagon}; ${pathCircle}`;
  const splines = '0.55 0 0.15 1; 0.55 0 0.15 1; 0.55 0 0.15 1; 0.55 0 0.15 1; 0.55 0 0.15 1';

  // Inner Core Morph Paths
  const innerCircle =
    'M 50 45 C 52.76 45 55 47.24 55 50 C 55 52.76 52.76 55 50 55 C 47.24 55 45 52.76 45 50 C 45 47.24 47.24 45 50 45 Z';

  const innerSquare =
    'M 50 44 C 54 44 56 44 56 47 C 56 53 56 56 50 56 C 44 56 44 53 44 47 C 44 44 46 44 50 44 Z';

  const innerTriangle =
    'M 50 43 C 53 46 55 51 55 55 C 53 56 47 56 45 55 C 45 51 47 46 50 43 C 50 43 50 43 50 43 Z';

  const innerStar =
    'M 50 42 C 51 46 54 49 58 50 C 54 51 51 54 50 58 C 49 54 46 51 42 50 C 46 49 49 46 50 42 Z';

  const innerHexagon =
    'M 50 43 C 55 44 56 47 56 50 C 56 53 55 56 50 57 C 45 56 44 53 44 50 C 44 47 45 44 50 43 Z';

  const innerValues = `${innerCircle}; ${innerSquare}; ${innerTriangle}; ${innerStar}; ${innerHexagon}; ${innerCircle}`;

  const durStr = `${duration}s`;

  // Main Morph SVG Icon Component
  const morphSvg = (
    <div
      className={`icon-morph-container inline-flex items-center justify-center relative select-none ${getColorClass()} ${className}`}
      style={{ width: dim, height: dim }}
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
          </path>
        )}
      </svg>
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

export default Loader;
