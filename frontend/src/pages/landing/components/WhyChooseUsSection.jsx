import React from 'react';
import {
  GraduationCap,
  Trophy,
  ShieldCheck,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

const reasons = [
  {
    title: 'Academic Excellence',
    description: 'Consistent 100% board examination pass rates, national Olympiad medalists, and university admissions guidance.',
    icon: GraduationCap,
    clayClass: 'clay-sky',
    iconColor: 'text-sky-700 dark:text-sky-300',
  },
  {
    title: 'Holistic Sports & Arts',
    description: 'Over 15+ sporting disciplines with certified NIS athletic coaches, performing orchestra, dance studio, and annual championship trophy.',
    icon: Trophy,
    clayClass: 'clay-emerald',
    iconColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    title: 'Safe, Secured & Green Campus',
    description: 'Full perimeter CCTV surveillance, biometric visitor checkpoints, GPS-tracked buses, clean air gardens, and full-time medical infirmary.',
    icon: ShieldCheck,
    clayClass: 'clay-indigo',
    iconColor: 'text-indigo-700 dark:text-indigo-300',
  },
  {
    title: 'Character & Value Education',
    description: 'Nurturing compassionate leaders with daily morning ethics assemblies, community social drives, Model United Nations, and public oratory.',
    icon: HeartHandshake,
    clayClass: 'clay-amber',
    iconColor: 'text-amber-700 dark:text-amber-300',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="clay-emerald inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Why Parents Trust Our School
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            A nurturing campus ecosystem where every student feels inspired, safe, and motivated to achieve greatness.
          </p>
        </div>

        {/* 4 Claymorphism Icon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl ${item.clayClass} flex flex-col items-start transition-all duration-200 hover:-translate-y-1.5 cursor-pointer group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill ${item.iconColor} flex items-center justify-center shadow-xs mb-4 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
