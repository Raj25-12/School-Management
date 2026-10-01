import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  options = [],
  placeholder,
  required = false,
  className = '',
  wrapperClassName = '',
  children,
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-1 ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <select
          ref={ref}
          id={selectId}
          required={required}
          className={`clay-input w-full py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none transition-all ${
            Icon ? 'pl-9 pr-3' : 'px-3'
          } ${
            error ? 'border-rose-400 focus:ring-rose-400/20' : ''
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => {
                const value = typeof opt === 'object' ? opt.value : opt;
                const labelText = typeof opt === 'object' ? opt.label : opt;
                return (
                  <option key={value} value={value}>
                    {labelText}
                  </option>
                );
              })
            : children}
        </select>
      </div>

      {error ? (
        <p className="text-[10px] font-medium text-rose-500 mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-[10px] text-slate-400 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
export default React.memo(Select);
