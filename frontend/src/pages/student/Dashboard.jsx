import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  CalendarCheck,
  FileText,
  Award,
  CreditCard,
  Clock,
  ArrowUpRight,
  BookOpen,
  BellRing,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Attendance Rate', value: '94.8%', icon: CalendarCheck, detail: '48 of 50 days attended', progress: 94.8, clayClass: 'clay-emerald', iconColor: 'text-emerald-600 dark:text-emerald-400', pillBg: 'bg-emerald-100/80 dark:bg-emerald-900/50', barColor: 'bg-emerald-500 dark:bg-emerald-400' },
    { title: 'Pending Homework', value: '3 Tasks', icon: FileText, detail: '1 of 3 submitted', progress: 33.3, clayClass: 'clay-amber', iconColor: 'text-amber-600 dark:text-amber-400', pillBg: 'bg-amber-100/80 dark:bg-amber-900/50', barColor: 'bg-amber-500 dark:bg-amber-400' },
    { title: 'Average Grade', value: 'A (89%)', icon: Award, detail: 'Top 10% in Class', progress: 89, clayClass: 'clay-indigo', iconColor: 'text-indigo-600 dark:text-indigo-400', pillBg: 'bg-indigo-100/80 dark:bg-indigo-900/50', barColor: 'bg-indigo-600 dark:bg-indigo-400' },
    { title: 'Fee Status', value: 'Cleared', icon: CreditCard, detail: '100% dues paid', progress: 100, clayClass: 'clay-purple', iconColor: 'text-purple-600 dark:text-purple-400', pillBg: 'bg-purple-100/80 dark:bg-purple-900/50', barColor: 'bg-purple-600 dark:bg-purple-400' },
  ];

  const subjectProgress = [
    { subject: 'Mathematics', currentUnit: 'Unit 4: Quadratic Equations', progress: 78, chapters: '11/14 Ch', color: 'from-indigo-500 to-blue-600' },
    { subject: 'Physics', currentUnit: 'Unit 3: Optics & Wave Motion', progress: 64, chapters: '7/11 Ch', color: 'from-emerald-500 to-teal-600' },
    { subject: 'Computer Science', currentUnit: 'Unit 5: Web & Database Systems', progress: 92, chapters: '9/10 Ch', color: 'from-purple-500 to-pink-600' },
  ];

  const todayClasses = [
    { time: '09:00 - 09:45 AM', subject: 'Mathematics', teacher: 'Prof. Sharma', room: 'Room 204', status: 'Ongoing', clay: 'clay-indigo' },
    { time: '10:00 - 10:45 AM', subject: 'Physics', teacher: 'Dr. Verma', room: 'Physics Lab', status: 'Upcoming', clay: 'clay-card' },
    { time: '11:00 - 11:45 AM', subject: 'English Literature', teacher: 'Mrs. Davis', room: 'Room 102', status: 'Upcoming', clay: 'clay-card' },
    { time: '01:00 - 01:45 PM', subject: 'Computer Science', teacher: 'Mr. Alex', room: 'Comp Lab A', status: 'Upcoming', clay: 'clay-card' },
  ];

  const notices = [
    { title: 'Mid-Term Exam Schedule Released', date: 'Today, 10:30 AM', category: 'Exam', clay: 'clay-rose' },
    { title: 'Annual Sports Meet Registrations Open', date: 'Yesterday', category: 'Events', clay: 'clay-sky' },
    { title: 'Library Book Return Deadline Reminder', date: '28 Sep 2026', category: 'Library', clay: 'clay-amber' },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* 🌟 Compact Claymorphism Welcome Banner */}
      <div className="clay-indigo p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-indigo-700 dark:text-indigo-300 mb-1.5 shadow-xs border border-indigo-200/60 dark:border-indigo-800/60">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Academic Year 2026-2027 • Class 10-A</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Welcome back, {user?.name || 'Alex'}! 👋
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              You have <span className="font-bold text-indigo-600 dark:text-indigo-400">4 classes</span> and <span className="font-bold text-amber-600 dark:text-amber-400">2 assignments</span> pending today.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/student/timetable"
              className="clay-btn-primary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timetable</span>
            </Link>
            <Link
              to="/student/homework"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Homework</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Compact KPI Stats Grid with Progress Bars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.clayClass} p-3.5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.title}
                </span>
                <div className={`p-1.5 rounded-lg ${item.pillBg} ${item.iconColor} clay-icon-pill`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
                    {item.value}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {item.progress}%
                  </span>
                </div>
                {/* 🌟 Compact Claymorphic Progress Bar */}
                <div className="clay-progress-track h-1.5 w-full mt-1.5">
                  <div
                    className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Main Content Grid: Schedule & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Classes */}
        <div className="lg:col-span-2 clay-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 clay-icon-pill">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Today's Schedule</h2>
                <p className="text-[11px] text-slate-400">Daily period time & rooms</p>
              </div>
            </div>
            <Link
              to="/student/timetable"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 inline-flex items-center gap-0.5 hover:underline"
            >
              <span>Full Schedule</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {todayClasses.map((cls, idx) => (
              <div
                key={idx}
                className={`${cls.clay} p-2.5 sm:p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-white/60 dark:border-slate-800`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 clay-icon-pill shrink-0 mt-0.5 sm:mt-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-800 dark:text-white">
                      {cls.subject}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cls.teacher} • <span className="font-semibold text-slate-700 dark:text-slate-300">{cls.room}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {cls.time}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      cls.status === 'Ongoing'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {cls.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices & Announcements */}
        <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 clay-icon-pill">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Notice Board</h2>
                  <p className="text-[11px] text-slate-400">Latest school updates</p>
                </div>
              </div>
              <Link
                to="/student/notices"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {notices.map((notice, idx) => (
                <div
                  key={idx}
                  className={`${notice.clay} p-2.5 rounded-xl border border-white/60 dark:border-slate-800/80 transition hover:-translate-y-0.5`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                    <span className="uppercase text-[9px] tracking-wider font-bold text-slate-700 dark:text-slate-200">
                      {notice.category}
                    </span>
                    <span>{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {notice.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/student/exams"
              className="clay-btn-primary w-full py-2 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Check Upcoming Exams</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 📚 My Subjects Learning & Syllabus Progress */}
      <div className="clay-card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 clay-icon-pill">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Course & Subject Syllabus Completion
              </h2>
              <p className="text-[11px] text-slate-400">Track your learning goals for upcoming exams</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Semester 1 Progress
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {subjectProgress.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.subject}</span>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{item.progress}%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.currentUnit}</p>
              {/* Progress bar */}
              <div className="clay-progress-track h-2 w-full mt-2">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1 font-semibold">
                <span>Completed</span>
                <span>{item.chapters}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


