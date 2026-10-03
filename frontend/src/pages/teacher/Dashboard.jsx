import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Sparkles,
  Award,
  ChevronRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [attendanceMarked, setAttendanceMarked] = useState({
    '10-A': true,
    '9-B': false,
    '10-B': false,
  });

  const stats = [
    {
      title: 'Active Classes',
      value: '5 Classes',
      detail: '4 of 5 taught today',
      progress: 80,
      icon: BookOpen,
      clayClass: 'clay-card',
      iconColor: 'text-[#9c6f21] dark:text-[#ebd5ab]',
      pillBg: 'bg-[#ebd5ab]/40 dark:bg-[#856326]/50',
      barColor: 'bg-[#c49646] dark:bg-[#dfbc7c]'
    },
    {
      title: 'Total Students',
      value: '184',
      detail: '177 present today',
      progress: 96.2,
      icon: Users,
      clayClass: 'clay-card',
      iconColor: 'text-[#9c6f21] dark:text-[#ebd5ab]',
      pillBg: 'bg-[#ebd5ab]/40 dark:bg-[#856326]/50',
      barColor: 'bg-[#c49646] dark:bg-[#dfbc7c]'
    },
    {
      title: "Today's Attendance",
      value: '96.2%',
      detail: '2 of 3 classes marked',
      progress: 66.6,
      icon: CalendarCheck,
      clayClass: 'clay-card',
      iconColor: 'text-[#9c6f21] dark:text-[#ebd5ab]',
      pillBg: 'bg-[#ebd5ab]/40 dark:bg-[#856326]/50',
      barColor: 'bg-[#c49646] dark:bg-[#dfbc7c]'
    },
    {
      title: 'Pending Reviews',
      value: '18 Tasks',
      detail: '72% reviewed',
      progress: 72,
      icon: FileText,
      clayClass: 'clay-card',
      iconColor: 'text-[#9c6f21] dark:text-[#ebd5ab]',
      pillBg: 'bg-[#ebd5ab]/40 dark:bg-[#856326]/50',
      barColor: 'bg-[#c49646] dark:bg-[#dfbc7c]'
    },
  ];

  const syllabusProgress = [
    { subject: 'Class 10-A • Mathematics', currentTopic: 'Quadratic Equations (Ch 4)', completed: 74, totalChapters: '12 / 16 Ch' },
    { subject: 'Class 9-B • Algebra', currentTopic: 'Polynomials (Ch 3)', completed: 62, totalChapters: '8 / 13 Ch' },
    { subject: 'Class 10-B • Geometry', currentTopic: 'Circles & Theorems (Ch 5)', completed: 81, totalChapters: '13 / 16 Ch' },
  ];

  const todaySchedule = [
    {
      period: 'P1',
      time: '09:00 - 09:45 AM',
      subject: 'Mathematics',
      className: '10-A',
      room: 'Room 204',
      topic: 'Quadratic Equations & Roots',
      status: 'Completed',
      clay: 'clay-card'
    },
    {
      period: 'P2',
      time: '10:00 - 10:45 AM',
      subject: 'Algebra',
      className: '9-B',
      room: 'Room 105',
      topic: 'Polynomial Factorization',
      status: 'In Progress',
      clay: 'clay-card'
    },
    {
      period: 'P4',
      time: '11:45 - 12:30 PM',
      subject: 'Geometry',
      className: '10-B',
      room: 'Room 205',
      topic: 'Circle Theorems & Tangents',
      status: 'Upcoming',
      clay: 'clay-card'
    },
    {
      period: 'P6',
      time: '02:00 - 02:45 PM',
      subject: 'Doubt Clearing & Lab',
      className: '10 (All)',
      room: 'Math Lab',
      topic: 'Graphing & Formulas Practice',
      status: 'Upcoming',
      clay: 'clay-card'
    },
  ];

  const pendingSubmissions = [
    { student: 'Aarav Mehta', roll: '10A-04', assignment: 'Quadratic Eq Exercise 4.2', date: 'Today, 08:30 AM', avatar: 'AM' },
    { student: 'Pooja Verma', roll: '10A-12', assignment: 'Quadratic Eq Exercise 4.2', date: 'Today, 08:15 AM', avatar: 'PV' },
    { student: 'Karan Shah', roll: '9B-08', assignment: 'Polynomials Assignment 2', date: 'Yesterday', avatar: 'KS' },
  ];

  const notices = [
    { title: 'Unit Test 1 Marks submission deadline is Friday', category: 'Academic', time: '1h ago', clay: 'clay-card' },
    { title: 'Parent-Teacher Meeting scheduled for Saturday', category: 'Notice', time: 'Yesterday', clay: 'clay-card' },
    { title: 'Science Exhibition evaluation committee meeting', category: 'Event', time: '2d ago', clay: 'clay-card' },
  ];

  const handleToggleAttendance = (cls) => {
    setAttendanceMarked((prev) => ({
      ...prev,
      [cls]: !prev[cls],
    }));
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Welcome Banner */}
      <div className="clay-sand p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-[#775010] dark:text-[#ebd5ab] mb-1.5 shadow-xs border border-[#ebd5ab] dark:border-[#856326]">
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>Academic Year 2026-27 • Semester 1</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Good Morning, {user?.name || 'Prof. Sharma'}!
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              You have <span className="font-bold text-[#9c6f21] dark:text-[#ebd5ab]">4 lectures</span> scheduled today.
              Class 10-A attendance is recorded.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/teacher/attendance"
              className="clay-btn-sand px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-[#2b1804] dark:text-[#fff9ed]"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Attendance</span>
            </Link>
            <Link
              to="/teacher/homework"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#9c6f21] dark:text-[#ebd5ab]" />
              <span>Homework</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards with Progress Bars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.clayClass} p-3.5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.title}
                </span>
                <div className={`p-1.5 rounded-lg ${item.pillBg} ${item.iconColor} clay-icon-pill`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
                    {item.value}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    {item.progress}%
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="clay-progress-track h-1.5 w-full mt-1.5">
                  <div
                    className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus & Curriculum Progress Card */}
      <div className="clay-card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#ebd5ab]/40 text-[#9c6f21] dark:bg-[#856326]/60 dark:text-[#ebd5ab] clay-icon-pill">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Curriculum & Syllabus Progress
              </h2>
              <p className="text-[11px] text-slate-400">Term 1 syllabus completion status across sections</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ebd5ab]/40 text-[#775010] dark:bg-[#856326]/50 dark:text-[#ebd5ab] border border-[#ebd5ab] dark:border-[#856326]">
            Mid-Term Target: 70%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {syllabusProgress.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{item.subject}</span>
                <span className="text-xs font-bold text-[#9c6f21] dark:text-[#ebd5ab]">{item.completed}%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.currentTopic}</p>
              {/* Progress bar */}
              <div className="clay-progress-track h-2 w-full mt-2">
                <div
                  className="h-full rounded-full bg-[#c49646] dark:bg-[#dfbc7c] transition-all duration-500"
                  style={{ width: `${item.completed}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1 font-medium">
                <span>Completed</span>
                <span>{item.totalChapters}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Grid: Lecture Schedule & Quick Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lecture Timeline (2 cols) */}
        <div className="lg:col-span-2 clay-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#ebd5ab]/40 text-[#9c6f21] dark:bg-[#856326]/60 dark:text-[#ebd5ab] clay-icon-pill">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                  Today's Lectures
                </h2>
                <p className="text-[11px] text-slate-400">
                  Wednesday • 4 Scheduled Periods
                </p>
              </div>
            </div>
            <Link
              to="/teacher/timetable"
              className="text-xs font-bold text-[#9c6f21] hover:text-[#775010] dark:text-[#ebd5ab] inline-flex items-center gap-0.5 hover:underline"
            >
              <span>Full Week</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Schedule list */}
          <div className="space-y-2">
            {todaySchedule.map((lecture, idx) => (
              <div
                key={idx}
                className="clay-card p-2.5 sm:p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-200/70 dark:border-slate-800"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#9c6f21] dark:text-[#ebd5ab] shrink-0 font-semibold text-xs border border-slate-200 dark:border-slate-700 clay-icon-pill flex items-center justify-center">
                    <span className="font-bold text-xs">{lecture.period}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-semibold text-slate-800 dark:text-white">
                        {lecture.subject}
                      </h3>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-[#ebd5ab]/40 text-[#775010] dark:bg-[#856326]/50 dark:text-[#ebd5ab] border border-[#ebd5ab] dark:border-[#856326]">
                        {lecture.className}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Topic: <span className="text-slate-700 dark:text-slate-200">{lecture.topic}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {lecture.room} • {lecture.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      lecture.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : lecture.status === 'In Progress'
                        ? 'bg-[#c49646] text-[#261704] font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {lecture.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Attendance Marker & Tools */}
        <div className="space-y-4">
          {/* Quick Attendance Widget */}
          <div className="clay-card p-4 border border-[#ebd5ab] dark:border-[#856326]">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9c6f21] dark:text-[#ebd5ab]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                  Quick Attendance
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#775010] dark:text-[#ebd5ab] bg-[#ebd5ab]/40 dark:bg-[#856326]/60 px-1.5 py-0.5 rounded border border-[#ebd5ab] dark:border-[#856326]">
                Today
              </span>
            </div>

            <div className="space-y-2">
              {['10-A', '9-B', '10-B'].map((cls) => {
                const isDone = attendanceMarked[cls];
                return (
                  <div
                    key={cls}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between border border-slate-200/60 dark:border-slate-800 shadow-xs"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-white">
                        Class {cls}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {isDone ? 'Marked' : 'Pending'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(cls)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'clay-btn-sand text-[#2b1804] dark:text-[#fff9ed]'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Done</span>
                        </>
                      ) : (
                        <span>Mark</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Exam Tools */}
          <div className="clay-card p-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#9c6f21] dark:text-[#ebd5ab]" />
              <span>Exam & Marks</span>
            </h3>
            <div className="space-y-1.5">
              <Link
                to="/teacher/marks"
                className="w-full clay-btn-secondary p-2 text-xs font-semibold flex items-center justify-between text-slate-700 dark:text-slate-200 hover:text-[#8d6016] transition"
              >
                <span>Upload Unit Test Marks</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                to="/teacher/exams"
                className="w-full clay-btn-secondary p-2 text-xs font-semibold flex items-center justify-between text-slate-700 dark:text-slate-200 hover:text-[#8d6016] transition"
              >
                <span>View Exam Schedules</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Submissions & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Homework Submissions */}
        <div className="lg:col-span-2 clay-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#ebd5ab]/40 text-[#9c6f21] dark:bg-[#856326]/60 dark:text-[#ebd5ab] clay-icon-pill">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                  Recent Submissions
                </h2>
                <p className="text-[11px] text-slate-400">
                  Ready for review & marks input
                </p>
              </div>
            </div>
            <Link
              to="/teacher/homework"
              className="text-xs font-bold text-[#9c6f21] hover:text-[#775010] dark:text-[#ebd5ab] hover:underline"
            >
              View All 18
            </Link>
          </div>

          <div className="space-y-2">
            {pendingSubmissions.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2 hover:border-[#ebd5ab] dark:hover:border-[#856326] transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 clay-icon-pill shrink-0 shadow-xs">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-white">
                      {item.student}{' '}
                      <span className="text-[10px] font-normal text-slate-400">({item.roll})</span>
                    </h4>
                    <p className="text-[11px] font-bold text-[#9c6f21] dark:text-[#ebd5ab]">
                      {item.assignment}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 hidden sm:inline">{item.date}</span>
                  <Link
                    to="/teacher/homework"
                    className="clay-btn-secondary px-2.5 py-1 text-[11px] font-bold text-[#9c6f21] dark:text-[#ebd5ab] hover:bg-[#ebd5ab]/20 transition"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circulars */}
        <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#ebd5ab]/40 text-[#9c6f21] dark:bg-[#856326]/60 dark:text-[#ebd5ab] clay-icon-pill">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                  Circulars
                </h2>
              </div>
              <Link
                to="/teacher/notices"
                className="text-xs font-bold text-[#9c6f21] hover:text-[#775010] dark:text-[#ebd5ab] hover:underline"
              >
                See All
              </Link>
            </div>

            <div className="space-y-2">
              {notices.map((n, idx) => (
                <div
                  key={idx}
                  className="clay-card p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                    <span className="uppercase text-[9px] tracking-wider font-semibold text-slate-700 dark:text-slate-200">
                      {n.category}
                    </span>
                    <span>{n.time}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    {n.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/teacher/notices/broadcast"
              className="clay-btn-sand w-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-[#2b1804] dark:text-[#fff9ed]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
