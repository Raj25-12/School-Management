import React from 'react';
import {
  Monitor,
  FlaskConical,
  Trophy,
  BookOpen,
  Bus,
  Music,
  ShieldCheck,
  Utensils,
  Sparkles,
  Check
} from 'lucide-react';

const schoolFeatures = [
  {
    id: 'smart-classrooms',
    title: 'Smart AC Classrooms',
    tag: 'Digital Learning',
    description: '4K interactive smart displays, digital multimedia curriculum, and climate-controlled ergonomic seating.',
    points: ['Interactive Touch Boards', 'Air Conditioned', 'Audio-Visual Sound'],
    icon: Monitor,
    iconBg: 'bg-teal-50 dark:bg-teal-950/60',
    iconColor: 'text-teal-600 dark:text-teal-400',
    tagBg: 'bg-teal-100/70 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300',
  },
  {
    id: 'stem-labs',
    title: 'Advanced Science & STEM Labs',
    tag: 'Hands-on Discovery',
    description: 'State-of-the-art experiment stations for Physics, Chemistry, Biology, and an AI Robotics innovation hub.',
    points: ['Physics & Chemistry Labs', 'Robotics & AI Kits', 'Modern Microscopes'],
    icon: FlaskConical,
    iconBg: 'bg-sky-50 dark:bg-sky-950/60',
    iconColor: 'text-sky-600 dark:text-sky-400',
    tagBg: 'bg-sky-100/70 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300',
  },
  {
    id: 'sports-complex',
    title: 'World-Class Sports Arena',
    tag: 'Athletics & Fitness',
    description: 'Expansive outdoor cricket grounds, FIFA-grade football turf, basketball courts, and professional NIS coaching.',
    points: ['Grass Football Pitch', 'Cricket Practice Nets', 'Athletic Running Track'],
    icon: Trophy,
    iconBg: 'bg-amber-50 dark:bg-amber-950/60',
    iconColor: 'text-amber-600 dark:text-amber-400',
    tagBg: 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
  },
  {
    id: 'library',
    title: 'Modern Central E-Library',
    tag: 'Knowledge Hub',
    description: 'Over 25,000+ reference volumes, encyclopedias, international periodicals, and quiet digital research pods.',
    points: ['25,000+ Print Books', 'Kindle E-Readers', 'Silent Study Zones'],
    icon: BookOpen,
    iconBg: 'bg-purple-50 dark:bg-purple-950/60',
    iconColor: 'text-purple-600 dark:text-purple-400',
    tagBg: 'bg-purple-100/70 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300',
  },
  {
    id: 'transport',
    title: 'GPS-Tracked Safe Bus Fleet',
    tag: 'Safe Commute',
    description: 'Air-conditioned bus fleet covering extensive routes, equipped with live GPS tracking, speed governors & attendants.',
    points: ['Real-Time GPS App', 'CCTV Onboard', 'Female Attendants'],
    icon: Bus,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    tagBg: 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
  },
  {
    id: 'fine-arts',
    title: 'Music, Dance & Art Studios',
    tag: 'Creative Expression',
    description: 'Acoustically engineered halls for classical and western instruments, choir vocals, drama, and fine pottery.',
    points: ['Instrumental Lab', 'Dance & Drama Studio', 'Pottery & Painting'],
    icon: Music,
    iconBg: 'bg-rose-50 dark:bg-rose-950/60',
    iconColor: 'text-rose-600 dark:text-rose-400',
    tagBg: 'bg-rose-100/70 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300',
  },
  {
    id: 'security-health',
    title: '24/7 Security & Medical Infirmary',
    tag: 'Safety & Well-being',
    description: 'Round-the-clock campus CCTV monitoring, biometric visitor management, and an on-campus nurse first-aid clinic.',
    points: ['Complete CCTV Mesh', 'Resident Nurse On Duty', 'Emergency Ambulance'],
    icon: ShieldCheck,
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    tagBg: 'bg-indigo-100/70 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300',
  },
  {
    id: 'cafeteria',
    title: 'Hygienic Dining & Pure RO Water',
    tag: 'Health & Nutrition',
    description: 'Wholesome, nutritionist-approved daily meals prepared in an ultra-clean kitchen, with multi-stage RO water stations.',
    points: ['Nutritious Hot Meals', 'Multi-Stage UV/RO Water', 'Sanitized Kitchen'],
    icon: Utensils,
    iconBg: 'bg-teal-50 dark:bg-teal-950/60',
    iconColor: 'text-teal-600 dark:text-teal-400',
    tagBg: 'bg-teal-100/70 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300',
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-16 sm:py-24 bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="clay-emerald inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Campus Highlights & Amenities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            School Facilities & Features
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Everything your child needs to thrive: modern infrastructure, sports arenas, innovative labs, and uncompromised safety.
          </p>
        </div>

        {/* 8 Real School Feature Cards in Claymorphism Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="clay-card p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
              >
                <div>
                  {/* Top Bar: Icon + Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor} clay-icon-pill flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${item.tagBg}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5">
                  {item.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
