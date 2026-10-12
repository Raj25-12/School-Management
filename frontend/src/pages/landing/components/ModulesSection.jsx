import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const portals = [
  {
    id: 'admin',
    name: 'Administrator Portal',
    badge: 'Institutional Control',
    icon: ShieldCheck,
    tagline: 'Complete 360-degree control over school operations',
    description: 'Empowers principals, directors, and administrative heads with authoritative data control, compliance tracking, and campus reporting.',
    features: [
      'Comprehensive Student & Teacher Directory',
      'Automated Timetable & Conflict Detection',
      'Tuition Fee Structure & Receipt Issuance',
      'Campus-wide Broadcasts & Emergency Bulletins',
      'Academic Promotion & Batch Transitions',
      'Instant Attendance Auditing & Excel Reports',
    ],
    buttonText: 'Access Admin Portal',
  },
  {
    id: 'teacher',
    name: 'Faculty & Teacher Portal',
    badge: 'Instructional Tools',
    icon: GraduationCap,
    tagline: 'Save hours on grading and classroom organization',
    description: 'Equips teachers with streamlined tools to conduct digital roll calls, upload assignments, input test marks, and communicate directly with students.',
    features: [
      '1-Click Class Roll-Call & Absence Logging',
      'Exam Mark Input & Grade Calculations',
      'Class & Subject Timetable Schedules',
      'Interactive Student Doubt Clearing Hub',
      'Homework Task & Assignment Assignments',
      'Teacher Profile & Leave Tracking',
    ],
    buttonText: 'Access Teacher Portal',
  },
  {
    id: 'student',
    name: 'Student & Parent Portal',
    badge: 'Learning Engagement',
    icon: Users,
    tagline: 'Transparent access to academic progress and notices',
    description: 'Keeps students and guardians informed with transparent schedules, published exam report cards, fee balances, and school announcements.',
    features: [
      'Digital Attendance Percentage & Calendar View',
      'Downloadable Exam Report Cards & Transcripts',
      'Weekly Class Timetable & Subject Breakdown',
      'Live School Circulars & Holiday Calendars',
      'Direct Academic Inquiries & Doubt Submission',
      'Pending Tuition Fee Status & Invoices',
    ],
    buttonText: 'Access Student Portal',
  },
];

const ModulesSection = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const currentPortal = portals.find((p) => p.id === activeTab) || portals[0];

  return (
    <section
      id="modules"
      className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="clay-emerald inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Tailored Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Dedicated Portals for Every Role
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Switch between customized workspaces crafted specifically for administrators, faculty members, and learners.
          </p>
        </div>

        {/* Portal Tabs Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {portals.map((portal) => {
            const TabIcon = portal.icon;
            const isSelected = activeTab === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setActiveTab(portal.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'clay-btn-emerald scale-102 text-white'
                    : 'clay-btn-secondary text-slate-700 dark:text-slate-200'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{portal.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Portal Clay Showcase Card */}
        <div className="clay-card rounded-3xl p-6 sm:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Role Details */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="clay-emerald inline-block px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-300 mb-3">
                {currentPortal.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                {currentPortal.tagline}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {currentPortal.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/login"
                  className="clay-btn-emerald btn-shine inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-bold text-sm shadow-md transition-all group"
                >
                  <span>{currentPortal.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="clay-btn-secondary inline-flex items-center justify-center px-5 py-3 text-slate-800 dark:text-slate-200 font-bold text-sm"
                >
                  Create New Account
                </Link>
              </div>
            </div>

            {/* Right Column: Feature Checklist in Clay Emerald Card */}
            <div className="lg:col-span-6 clay-emerald rounded-2xl p-6">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-teal-800 dark:text-teal-300 mb-4">
                Highlighted Module Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentPortal.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
