import React from 'react';
import { Sparkles } from 'lucide-react';
import logo from '../../assets/logo_clean.png';
import Card from './Card';
import AvatarUpload from './AvatarUpload';

const IdCardPreview = ({
  name,
  idNumber,
  roleLabel = 'Faculty ID Card',
  subHeading,
  extraFieldLabel = 'Dept:',
  extraFieldValue,
  email,
  phone,
  tags = [],
  status = 'Active',
  tipText = 'Once created, the user can immediately log in using their email and assigned credentials.',
  avatarInitial,
  avatarImage,
  onAvatarChange,
  variant = 'emerald',
}) => {
  const initial = avatarInitial || (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <Card padding="p-5" className="space-y-4 sticky top-20">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Live ID Card Preview
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          {roleLabel}
        </span>
      </div>

      {/* Simulated School ID Card */}
      <div className="clay-emerald p-4 rounded-2xl space-y-3 relative overflow-hidden border border-emerald-300 dark:border-emerald-800 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 p-1 flex items-center justify-center clay-icon-pill">
              <img src={logo} alt="Logo" className="w-full h-full object-contain dark:brightness-0 dark:invert" />
            </div>
            <div>
              <div className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">
                School Management
              </div>
              <div className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase">
                {roleLabel}
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-600 dark:text-slate-400">
            {idNumber || 'ID-XXXX'}
          </span>
        </div>

        {/* Photo & Name */}
        <div className="flex items-center gap-3 pt-2">
          <AvatarUpload
            image={avatarImage}
            initials={initial}
            name={name}
            variant={variant}
            size="sm"
            editable={Boolean(onAvatarChange)}
            onImageChange={onAvatarChange}
          />
          <div className="truncate">
            <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
              {name || 'Full Name'}
            </h3>
            {subHeading && (
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 truncate mt-0.5">
                {subHeading}
              </div>
            )}
            {extraFieldValue && (
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {extraFieldLabel} {extraFieldValue}
              </div>
            )}
          </div>
        </div>

        {/* Badges / Details */}
        <div className="pt-2 border-t border-emerald-200/70 dark:border-emerald-800/70 space-y-1.5 text-[11px]">
          {email && (
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Email:</span>
              <span className="font-mono font-bold truncate max-w-[140px]">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Phone:</span>
              <span className="font-mono font-bold truncate max-w-[140px]">{phone}</span>
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Classes:</span>
              <span className="font-bold truncate max-w-[140px] text-emerald-700 dark:text-emerald-300">
                {tags.join(', ')}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="text-slate-500 dark:text-slate-400">Status:</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-extrabold text-[10px]">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      {tipText && (
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Quick Tip</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {tipText}
          </p>
        </div>
      )}
    </Card>
  );
};

export default React.memo(IdCardPreview);
