import React, { useRef } from 'react';
import { Camera, Trash2 } from 'lucide-react';

const variantConfig = {
  amber: {
    bg: 'bg-amber-200 dark:bg-amber-900',
    text: 'text-amber-900 dark:text-amber-100',
    border: 'border-2 border-amber-300 dark:border-amber-700',
    btnBg: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/40',
  },
  sky: {
    bg: 'bg-sky-100 dark:bg-sky-900',
    text: 'text-sky-800 dark:text-sky-200',
    border: 'border-2 border-sky-300 dark:border-sky-700',
    btnBg: 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/40',
  },
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-950',
    text: 'text-emerald-800 dark:text-emerald-200',
    border: 'border-2 border-emerald-300 dark:border-emerald-700',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/40',
  },
  indigo: {
    bg: 'bg-indigo-100 dark:bg-indigo-900',
    text: 'text-indigo-800 dark:text-indigo-200',
    border: 'border-2 border-indigo-300 dark:border-indigo-700',
    btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/40',
  },
};

const sizeConfig = {
  sm: 'w-14 h-14 text-lg rounded-2xl',
  md: 'w-20 h-20 text-2xl rounded-3xl',
  lg: 'w-24 h-24 text-3xl rounded-3xl',
  xl: 'w-28 h-28 text-4xl rounded-3xl',
};

const AvatarUpload = ({
  image,
  initials = '?',
  name = 'User',
  onImageChange,
  variant = 'amber',
  size = 'md',
  editable = true,
  className = '',
}) => {
  const fileInputRef = useRef(null);
  const conf = variantConfig[variant] || variantConfig.amber;
  const sizeClass = sizeConfig[size] || sizeConfig.md;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, WebP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (onImageChange) {
          onImageChange(event.target?.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onImageChange) {
      onImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Hidden File Input */}
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Avatar Container */}
      <div
        onClick={triggerUpload}
        className={`relative ${sizeClass} ${conf.bg} ${conf.text} ${conf.border} font-black flex items-center justify-center mx-auto shadow-md clay-icon-pill overflow-hidden select-none transition-all duration-300 ${
          editable ? 'cursor-pointer hover:scale-105 group' : ''
        }`}
        title={editable ? 'Click to change profile picture' : name}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <span className="tracking-tight uppercase">{initials}</span>
        )}

        {/* Semi-transparent hover overlay with camera icon */}
        {editable && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1 z-10">
            <Camera className="w-5 h-5 drop-shadow-md text-white animate-bounce" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-white drop-shadow-md">
              Upload
            </span>
          </div>
        )}
      </div>

      {/* Floating Corner Camera Icon Badge */}
      {editable && (
        <button
          type="button"
          onClick={triggerUpload}
          className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${conf.btnBg} border-2 border-white dark:border-slate-900 shadow-md cursor-pointer transition-transform hover:scale-115 active:scale-95 z-20`}
          title="Upload / Change Photo"
        >
          <Camera className="w-3.5 h-3.5 text-white" />
        </button>
      )}

      {/* Floating Remove Button if Image exists */}
      {editable && image && (
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-1 -right-1 p-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white border-2 border-white dark:border-slate-900 shadow-md cursor-pointer transition-transform hover:scale-115 active:scale-95 z-20"
          title="Remove Photo"
        >
          <Trash2 className="w-3 h-3 text-white" />
        </button>
      )}
    </div>
  );
};

export default React.memo(AvatarUpload);
