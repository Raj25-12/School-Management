import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  BookOpenCheck,
  CreditCard,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  FileText,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Bell,
  MapPin,
  UserCheck
} from 'lucide-react';

const StudentDashboard = () => {
  const student = {
    name: 'Alex Johnson',
    rollNo: 'STU-1024',
    class: 'Grade 10-A',
    academicYear: '2025-2026',
    attendancePercent: 96.4,
    gpa: '3.88',
    rank: '#3 in Class',
    pendingTasks: 3,
    feeStatus: 'Paid in Full',
  };

  const todayClasses = [
    {
      period: 'Period 1',
      time: '08:30 AM - 09:25 AM',
      subject: 'Mathematics',
      topic: 'Quadratic Equations & Roots',
      teacher: 'Prof. R. Sharma',
      room: 'Room 204',
      status: 'completed',
    },
    {
      period: 'Period 2',
      time: '09:30 AM - 10:25 AM',
      subject: 'Physics Lab',
      topic: 'Optics & Refraction Experiment',
      teacher: 'Dr. V. Verma',
      room: 'Physics Lab A',
      status: 'live',
    },
    {
      period: 'Period 3',
      time: '10:45 AM - 11:40 AM',
      subject: 'English Literature',
      topic: 'Shakespeare: The Merchant of Venice',
      teacher: 'Ms. E. Davis',
      room: 'Room 102',
      status: 'upcoming',
    },
    {
      period: 'Period 4',
      time: '11:45 AM - 12:40 PM',
      subject: 'Computer Science',
      topic: 'Data Structures in JavaScript',
      teacher: 'Mr. K. Alan',
      room: 'Computer Lab 2',
      status: 'upcoming',
    },
    {
      period: 'Period 5',
      time: '01:30 PM - 02:25 PM',
      subject: 'Chemistry',
      topic: 'Periodic Properties & Bonding',
      teacher: 'Dr. N. Mehta',
      room: 'Chem Lab B',
      status: 'upcoming',
    },
  ];

  const pendingAssignments = [
    {
      id: 1,
      title: 'Physics Lab Observation Report',
      subject: 'Physics',
      dueDate: 'Today, 5:00 PM',
      isUrgent: true,
      points: '20 Pts',
    },
    {
      id: 2,
      title: 'Math Exercise 5.2 (Questions 1 to 15)',
      subject: 'Mathematics',
      dueDate: 'Tomorrow, 9:00 AM',
      isUrgent: false,
      points: '15 Pts',
    },
    {
      id: 3,
      title: 'English Essay: Technology in 2030',
      subject: 'English',
      dueDate: 'Oct 02, 11:59 PM',
      isUrgent: false,
      points: '30 Pts',
    },
  ];

  const subjectProgress = [
    { name: 'Mathematics', score: 95, grade: 'A+', teacher: 'Prof. Sharma', attendance: '98%' },
    { name: 'Computer Science', score: 98, grade: 'A+', teacher: 'Mr. Alan', attendance: '100%' },
    { name: 'Physics', score: 91, grade: 'A', teacher: 'Dr. Verma', attendance: '95%' },
    { name: 'English Literature', score: 89, grade: 'A', teacher: 'Ms. Davis', attendance: '94%' },
    { name: 'Chemistry', score: 87, grade: 'A-', teacher: 'Dr. Mehta', attendance: '92%' },
  ];

  const upcomingExams = [
    {
      title: 'Mid-Term Physics Theory',
      date: 'Oct 08, 2026',
      daysLeft: '8 days left',
      duration: '2 Hours (100 Marks)',
    },
    {
      title: 'Mathematics Assessment 2',
      date: 'Oct 12, 2026',
      daysLeft: '12 days left',
      duration: '1.5 Hours (50 Marks)',
    },
  ];

  const recentNotices = [
    {
      title: 'Annual Science Exhibition 2026 Registration Open',
      date: 'Sep 28, 2026',
      category: 'Event',
    },
    {
      title: 'Revised Schedule for Autumn Sports Week',
      date: 'Sep 26, 2026',
      category: 'Sports',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Hero Banner (Neutral Dark / Crisp Light) */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-900 dark:via-zinc-800/90 dark:to-zinc-900 text-white border border-slate-700/50 dark:border-zinc-800 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold bg-white/15 text-white border border-white/20">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                {student.class}
              </span>
              <span className="rounded-full px-3 py-0.5 text-xs font-semibold bg-white/10 text-zinc-200 border border-white/10">
                Roll No: {student.rollNo}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Welcome back, {student.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              You have <span className="font-bold text-amber-300">1 class currently in session</span> and{' '}
              <span className="font-bold text-white">3 assignments due this week</span>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link
              to="/student/timetable"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Timetable</span>
            </Link>
            <Link
              to="/student/homework"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              <BookOpenCheck className="h-4 w-4" />
              <span>Submit Task</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Attendance Card */}
        <div className="theme-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-zinc-400">
              Total Attendance
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
                {student.attendancePercent}%
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +1.8%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              118 Present of 122 Days
            </p>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '96.4%' }} />
          </div>
        </div>

        {/* GPA & Standing */}
        <div className="theme-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-zinc-400">
              Academic GPA
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
                {student.gpa}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                / 4.0 Max
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              {student.rank} • Top 5% Grade
            </p>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full rounded-full bg-slate-800 dark:bg-zinc-200" style={{ width: '94%' }} />
          </div>
        </div>

        {/* Homework Tasks */}
        <div className="theme-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-zinc-400">
              Homework Due
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <BookOpenCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
                {student.pendingTasks}
              </span>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                1 Due Today
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              18 Submitted Assignments
            </p>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full rounded-full bg-amber-500" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Fee Status */}
        <div className="theme-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-zinc-400">
              Tuition Fees
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 dark:text-zinc-100">
                {student.feeStatus}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Next installment Nov 15
            </p>
          </div>
          <div className="mt-3 pt-1 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
            <Link to="/student/fees" className="hover:underline flex items-center gap-1">
              <span>View Receipts</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Schedule & Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 theme-card p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-700 dark:text-zinc-300" />
                Today's Class Schedule
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Tuesday • 5 Periods Scheduled
              </p>
            </div>
            <Link
              to="/student/timetable"
              className="theme-btn-secondary px-3 py-1.5 text-xs font-bold flex items-center gap-1"
            >
              <span>Weekly View</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {todayClasses.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-3.5 rounded-xl border transition-all ${
                  item.status === 'live'
                    ? 'border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/80 shadow-xs'
                    : item.status === 'completed'
                    ? 'border-slate-200/80 bg-slate-50/60 dark:border-zinc-800/60 dark:bg-zinc-900/40 opacity-75'
                    : 'border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                      item.status === 'live'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : item.status === 'completed'
                        ? 'bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                    }`}
                  >
                    {item.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <span>P{idx + 1}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                        {item.subject}
                      </h3>
                      {item.status === 'live' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5">
                      {item.topic}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        {item.teacher}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.room}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                    <Clock className="h-3 w-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks & Homework */}
        <div className="theme-card p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-amber-500" />
                Tasks & Homework
              </h2>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                3 Pending
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {pendingAssignments.map((task) => (
                <div
                  key={task.id}
                  className="theme-well p-3.5 hover:border-slate-400 dark:hover:border-zinc-600 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-white px-2 py-0.5 text-xs font-bold text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700">
                      {task.subject}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">{task.points}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 mt-1.5 leading-snug">
                    {task.title}
                  </h4>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 dark:border-zinc-800">
                    <span
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        task.isUrgent
                          ? 'text-rose-600 dark:text-rose-400 font-bold'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </span>

                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-bold flex items-center gap-0.5 transition cursor-pointer"
                    >
                      <span>Submit</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/student/homework"
            className="theme-btn-secondary mt-4 block w-full py-2.5 text-center text-xs font-bold rounded-xl"
          >
            View All Assignments
          </Link>
        </div>
      </div>

      {/* 4. Subject Progress & Exam Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Performance */}
        <div className="lg:col-span-2 theme-card p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-slate-700 dark:text-zinc-300" />
                Subject Performance & Attendance
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Current Term 2 Grades Breakdown
              </p>
            </div>
            <Link
              to="/student/results"
              className="theme-btn-secondary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <span>Report Card</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-zinc-800">
            {subjectProgress.map((sub, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="sm:w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
                      {sub.name}
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {sub.grade}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 block">
                    Faculty: {sub.teacher}
                  </span>
                </div>

                <div className="flex-1 max-w-sm">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    <span>Score</span>
                    <span className="text-slate-900 dark:text-zinc-100 font-bold">{sub.score}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-900 dark:bg-zinc-200"
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>

                <div className="text-right sm:w-24 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Attendance
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
                    {sub.attendance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams & Notices */}
        <div className="space-y-6">
          {/* Exams */}
          <div className="theme-card p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-700 dark:text-zinc-300" />
                Upcoming Exams
              </h2>
              <Link to="/student/exams" className="text-xs font-bold text-slate-700 dark:text-zinc-300 hover:underline">
                View All
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {upcomingExams.map((exam, idx) => (
                <div
                  key={idx}
                  className="theme-well p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
                      {exam.title}
                    </span>
                    <span className="rounded-md bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 shrink-0">
                      {exam.daysLeft}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                    <span>📅 {exam.date}</span>
                    <span>•</span>
                    <span>⏱️ {exam.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Notices */}
          <div className="theme-card p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-500" />
                Notice Board
              </h2>
              <Link to="/student/notices" className="text-xs font-bold text-slate-700 dark:text-zinc-300 hover:underline">
                All Notices
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {recentNotices.map((notice, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-zinc-800/60 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-bold text-slate-700 dark:text-zinc-300">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400">{notice.date}</span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                    {notice.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
