import React from 'react';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import classroomTeacherImg from '../../../assets/about_classroom_kids.webp';

const AboutSection = ({ scrollToSection }) => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 relative overflow-hidden"
    >
      {/* Soft circular decorative backdrop */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-100/50 dark:bg-teal-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Classroom Photo with Dot Pattern & Floating Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Dot Pattern Grid (Top-Left) */}
              <div className="absolute -top-6 -left-6 z-0 grid grid-cols-4 gap-2.5 opacity-60 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-teal-400 dark:bg-teal-600 inline-block"
                  />
                ))}
              </div>

              {/* Main Classroom Image with rounded corners and clay bevel */}
              <div className="relative z-10 clay-card rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={classroomTeacherImg}
                  alt="Dedicated teacher mentoring students with textbooks in modern school classroom"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge: "CBSE Affiliated • 20+ Years" */}
              <div className="absolute -top-5 -right-3 sm:-right-5 z-20 animate-float-gentle">
                <div className="clay-card py-2.5 px-4 rounded-xl flex items-center gap-3 shadow-xl">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                      CBSE Affiliated
                    </p>
                    <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
                      20+ Years of Trust
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: School Vision & 4 Pillars */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Badge: About Our School */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>About Our School</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-5">
              Nurturing Character, <br />
              Intellect & <span className="text-teal-600 dark:text-teal-400">Leadership</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Our school provides an inspiring environment where every child is encouraged to question, create, and lead. We believe education extends far beyond textbooks—fostering integrity, physical well-being, creative brilliance, and global perspective.
            </p>

            {/* 4 Bullet Points in 2 Columns with Green Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 w-full mb-8">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Experiential Learning
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Holistic Sports & Arts
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  1:18 Teacher Ratio
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Safe & Moral Foundation
                </span>
              </div>
            </div>

            {/* Explore Campus Life Button */}
            <button
              onClick={() => scrollToSection('school-life')}
              className="clay-btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-900 dark:text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span>Explore School Life</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
