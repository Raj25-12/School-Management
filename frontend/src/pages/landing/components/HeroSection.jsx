import React from 'react';
import {
  GraduationCap,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import heroCampusImage from '../../../assets/hero_reference_campus.webp';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-900"
    >
      {/* Background Campus Image with Readability Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImage}
          alt="Modern school campus building with students walking outdoors"
          className="w-full h-full object-cover object-center transform scale-102"
          loading="eager"
          fetchPriority="high"
        />
        {/* Soft Vignette & Gradient Overlay for Ultra-Crisp Left Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 dark:from-slate-950/98 dark:via-slate-950/85 dark:to-slate-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[540px]">
          {/* Left Column: Heading, Badges, CTAs (Exact match to Reference) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pt-6 pb-4">
            {/* Badge: CBSE Affiliated • K-12 Excellence */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/95 text-xs sm:text-sm font-semibold mb-6 shadow-sm animate-fade-in">
              <GraduationCap className="w-4 h-4 text-teal-300" />
              <span>CBSE Affiliated • K-12 Excellence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight text-white leading-[1.12] mb-6 drop-shadow-md">
              Inspiring Young <br />
              Minds for a <br />
              <span className="relative inline-block text-teal-400">
                Brighter Future
                {/* Curved playful accent line underneath */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-teal-400 opacity-90 overflow-visible"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C55 2.5 145 2.5 197 9"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200/95 font-normal leading-relaxed max-w-xl drop-shadow-sm">
              Welcome to our vibrant campus. We empower students through academic rigor, athletic discipline, creative discovery, and strong moral character.
            </p>
          </div>

          {/* Right Column: 3 Stacked Claymorphic Stat Cards (Exact match to Reference) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center gap-4 py-4">
            {/* Card 1: Total Students (1,250 +12%) */}
            <div className="clay-card w-full max-w-xs p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer group animate-float-gentle">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 clay-icon-pill text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Total Students
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      1,250
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+12%</span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Teachers (85 +8%) */}
            <div className="clay-card w-full max-w-xs p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer group animate-float-gentle [animation-delay:1.2s]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 clay-icon-pill text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Total Teachers
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      85
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+8%</span>
                </div>
              </div>
            </div>

            {/* Card 3: Board Exam Results (100% Pass Rate) */}
            <div className="clay-card w-full max-w-xs p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer group animate-float-gentle [animation-delay:2.4s]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 clay-icon-pill text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Calendar className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Board Exam Results
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      100%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Pass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
