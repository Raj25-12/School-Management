import React, { useState } from 'react';
import {
  Clock,
  Sun,
  BookOpen,
  FlaskConical,
  Utensils,
  Trophy,
  Users,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  Heart,
  Calendar,
  Compass,
  Music,
  Bus,
  Check
} from 'lucide-react';

const dailySchedule = [
  {
    time: '07:45 AM',
    title: 'Morning Arrival & Entry',
    badge: 'Campus Entry',
    desc: 'Students arrive via GPS-monitored buses or with parents. Teachers and student prefects greet everyone with morning smiles.',
    points: ['Safe Bus Bays', 'Prefect Welcome', 'RFID Attendance'],
    icon: Bus,
    clay: 'clay-amber',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60',
    iconColor: 'text-amber-600 dark:text-amber-400',
    tagClass: 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
  },
  {
    time: '08:00 AM',
    title: 'Assembly & Value Prayer',
    badge: 'Character & Unity',
    desc: 'School choir leads the anthem, student speeches, daily news bulletin, and brief mindfulness breathing before class.',
    points: ['Choir Anthem', 'Thought of the Day', 'Mindfulness Time'],
    icon: Users,
    clay: 'clay-emerald',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    tagClass: 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
  },
  {
    time: '08:30 AM',
    title: 'Smart Academic Sessions',
    badge: 'Core Academics',
    desc: 'Interactive learning in Mathematics, Sciences, and Languages using 4K digital smart boards and collaborative group work.',
    points: ['4K Touch Panels', 'Active Quizzes', 'Concept Mastery'],
    icon: BookOpen,
    clay: 'clay-sky',
    iconBg: 'bg-sky-50 dark:bg-sky-950/60',
    iconColor: 'text-sky-600 dark:text-sky-400',
    tagClass: 'bg-sky-100/70 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300',
  },
  {
    time: '11:00 AM',
    title: 'STEM & Science Labs',
    badge: 'Practical Labs',
    desc: 'Hands-on practical experiments in Physics, Chemistry, Biology, and Robotics labs for real scientific discovery.',
    points: ['Live Experiments', 'Robotics & Coding', 'Microscopes'],
    icon: FlaskConical,
    clay: 'clay-purple',
    iconBg: 'bg-purple-50 dark:bg-purple-950/60',
    iconColor: 'text-purple-600 dark:text-purple-400',
    tagClass: 'bg-purple-100/70 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300',
  },
  {
    time: '12:30 PM',
    title: 'Healthy Lunch & Recess',
    badge: 'Nutrition & Recess',
    desc: 'Fresh, nutritious hot lunch served in our sanitized dining hall. Students relax in green courtyards and bond with friends.',
    points: ['Dietitian Diet', 'Social Play Time', 'Pure RO Water'],
    icon: Utensils,
    clay: 'clay-rose',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60',
    iconColor: 'text-rose-600 dark:text-rose-400',
    tagClass: 'bg-rose-100/70 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300',
  },
  {
    time: '01:15 PM',
    title: 'Sports & Athletic Training',
    badge: 'Sports Arena',
    desc: 'Outdoor athletics coaching across Football turf, Cricket nets, Basketball, Swimming, and track training under NIS coaches.',
    points: ['FIFA Grass Turf', 'Cricket Coaching', 'Track & Field'],
    icon: Trophy,
    clay: 'clay-amber',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60',
    iconColor: 'text-amber-600 dark:text-amber-400',
    tagClass: 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
  },
  {
    time: '02:00 PM',
    title: 'Music, Drama & Art Studio',
    badge: 'Creative Arts',
    desc: 'Acoustic music hall rehearsals, orchestra instruments, classical dance, theatrical drama, and fine pottery studio.',
    points: ['Keyboard & Violin', 'Theatre Society', 'Clay & Painting'],
    icon: Music,
    clay: 'clay-purple',
    iconBg: 'bg-purple-50 dark:bg-purple-950/60',
    iconColor: 'text-purple-600 dark:text-purple-400',
    tagClass: 'bg-purple-100/70 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300',
  },
  {
    time: '02:45 PM',
    title: 'Mentorship & Safe Dispersal',
    badge: 'Daily Wrap-up',
    desc: 'Teachers review student homework diaries, clarify remaining doubts, and escort students safely to their bus bays.',
    points: ['1:1 Doubt Solving', 'Diary Sign-off', 'Supervised Buses'],
    icon: ShieldCheck,
    clay: 'clay-indigo',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    tagClass: 'bg-indigo-100/70 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300',
  },
];

const schoolPillars = [
  {
    title: 'The 4-House System',
    subtitle: 'Building Camaraderie & Team Spirit',
    desc: 'Every student belongs to one of four historic houses (Phoenix, Titans, Falcons, Warriors). They compete across sports, debate leagues, quizzes, and arts for the Annual House Trophy.',
    icon: Award,
    clay: 'clay-amber',
    iconColor: 'text-amber-700 dark:text-amber-300',
    tags: ['Phoenix', 'Titans', 'Falcons', 'Warriors'],
  },
  {
    title: 'Experiential Teaching',
    subtitle: 'Not Rote Learning, Real Understanding',
    desc: 'Our teachers use project-based problem solving, real-world case studies, science fairs, and field excursions so concepts are internalized deeply.',
    icon: Compass,
    clay: 'clay-sky',
    iconColor: 'text-sky-700 dark:text-sky-300',
    tags: ['STEM Projects', 'Audio-Visual', 'Debates', 'Field Trips'],
  },
  {
    title: 'Individual Student Care',
    subtitle: '1:18 Optimal Teacher-Student Ratio',
    desc: 'No child gets left behind. Dedicated remedial sessions, personalized mentor tracking, and caring teachers ensure every learner progresses at their own pace.',
    icon: Heart,
    clay: 'clay-purple',
    iconColor: 'text-purple-700 dark:text-purple-300',
    tags: ['1:1 Attention', 'Remedial Help', 'Counselor Support'],
  },
  {
    title: 'Parent-Teacher Partnership',
    subtitle: 'Transparent & Continuous Communication',
    desc: 'Regular Parent-Teacher Meets (PTMs), transparent digital progress reports, open-door principal hours, and parent workshops ensure shared student success.',
    icon: Users,
    clay: 'clay-emerald',
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    tags: ['Monthly PTMs', 'App Updates', 'Workshops'],
  },
];

const admissionSteps = [
  {
    step: '01',
    title: 'Campus Tour & Inquiry',
    desc: 'Parents visit our campus, tour smart classrooms, sports facilities, and meet academic counselors to explore the school culture.',
  },
  {
    step: '02',
    title: 'Friendly Student Interaction',
    desc: 'A stress-free interactive conversation and foundational readiness check to understand the child’s interests, strengths, and learning style.',
  },
  {
    step: '03',
    title: 'Document Submission',
    desc: 'Simple submission of birth certificate, previous school records (if applicable), and passport photos with transparent fee guidance.',
  },
  {
    step: '04',
    title: 'Welcome to School Family',
    desc: 'Formal admission letter, uniform & book set allocation, House assignment, and orientation session before the first day of class.',
  },
];

const SchoolLifeSection = () => {
  const [activeTab, setActiveTab] = useState('routine');

  return (
    <section
      id="school-life"
      className="py-20 md:py-28 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="clay-emerald inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Inside Our School
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            How Life & Learning Happen Here
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Take a closer look at our daily student routine, our unique learning methodology, and how our school community nurtures every child.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 gap-1">
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'routine'
                  ? 'clay-btn-emerald text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
              }`}
            >
              Daily Routine (7:45 AM - 3:00 PM)
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'methodology'
                  ? 'clay-btn-emerald text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
              }`}
            >
              How We Teach & Guide
            </button>
            <button
              onClick={() => setActiveTab('admissions')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'admissions'
                  ? 'clay-btn-emerald text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
              }`}
            >
              Admission Process (Step-by-Step)
            </button>
          </div>
        </div>

        {/* Tab 1: Daily Routine in Responsive Box Grid */}
        {activeTab === 'routine' && (
          <div>
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 text-center mb-8 max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm font-bold text-teal-900 dark:text-teal-200">
                ⏰ Regular School Timings: Monday to Friday • 07:45 AM to 03:00 PM (Pre-Primary: 08:30 AM to 12:30 PM)
              </p>
            </div>

            {/* 8 Claymorphic Boxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dailySchedule.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="clay-card p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
                  >
                    <div>
                      {/* Top Bar: Icon Badge on the Left, Time Chip on the Right */}
                      <div className="flex items-center justify-between mb-4">
                        {/* Prominent Visual Icon Pill */}
                        <div
                          className={`w-14 h-14 rounded-2xl ${item.iconBg} ${item.iconColor} clay-icon-pill flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                        >
                          <Icon className="w-7 h-7 stroke-[2.2]" />
                        </div>

                        {/* Time Chip Badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-teal-300 dark:bg-slate-800 text-xs font-mono font-bold shadow-xs">
                          <Clock className="w-3 h-3 text-teal-400" />
                          <span>{item.time}</span>
                        </div>
                      </div>

                      {/* Category Tag */}
                      <div className="mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${item.tagClass}`}>
                          {item.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-4">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
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
        )}

        {/* Tab 2: How We Teach & Guide */}
        {activeTab === 'methodology' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {schoolPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 rounded-3xl ${pillar.clay} flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group`}
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-white/95 dark:bg-slate-900/90 clay-icon-pill ${pillar.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                          {pillar.title}
                        </h4>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Highlight Tags */}
                  <div className="pt-4 border-t border-slate-300/40 dark:border-slate-700/50 flex flex-wrap gap-2">
                    {pillar.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 shadow-xs"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Admission Process (Step-by-Step) */}
        {activeTab === 'admissions' && (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {admissionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="clay-card p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 clay-icon-pill text-teal-600 dark:text-teal-400 font-mono text-xl font-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {step.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                    <span>Step {idx + 1} of 4</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Admission Help Desk Card */}
            <div className="clay-emerald p-6 sm:p-8 rounded-3xl text-center max-w-2xl mx-auto">
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                Admissions Open for Academic Year 2026-27
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-4">
                Grades: Nursery to Grade 12 (Science, Commerce & Humanities Streams)
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-teal-800 dark:text-teal-300 font-bold text-xs sm:text-sm shadow-sm">
                <span>📞 Admission Helpline: +91 98765 43210</span>
                <span>•</span>
                <span>admissions@edumanage.edu</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolLifeSection;
