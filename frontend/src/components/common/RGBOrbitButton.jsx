import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RGBOrbitButton
 * Renders a rounded button with a glowing rainbow aura and 
 * rotating multi-color gradient border that orbits around on hover.
 */
export const RGBOrbitButton = ({
  children,
  className = '',
  innerClassName = '',
  rounded = 'rounded-full',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <div className={`rgb-orbit-wrap ${rounded} ${className}`}>
      <span className="rgb-orbit-glow" aria-hidden="true" />
      <span className="rgb-orbit-border" aria-hidden="true" />
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`rgb-orbit-inner ${rounded} ${innerClassName}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

/**
 * RGBOrbitLink
 * Link version of the rotating rainbow orbit effect on hover.
 */
export const RGBOrbitLink = ({
  to,
  children,
  className = '',
  innerClassName = '',
  rounded = 'rounded-full',
  ...props
}) => {
  return (
    <div className={`rgb-orbit-wrap ${rounded} ${className}`}>
      <span className="rgb-orbit-glow" aria-hidden="true" />
      <span className="rgb-orbit-border" aria-hidden="true" />
      <Link
        to={to}
        className={`rgb-orbit-inner ${rounded} ${innerClassName}`}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default RGBOrbitButton;
