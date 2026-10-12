import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Download,
  Printer,
  ChevronRight,
  TrendingUp,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

// 🏫 Institutional Daily Attendance Records (Today & Previous Days Across School)
const HISTORICAL_SCHOOL_ATTENDANCE = [
  {
    date: '2026-10-12',
    day: 'Monday (Today)',
    totalEnrolled: 520,
    presentCount: 496,
    absentCount: 14,
    leaveCount: 10,
    rate: 95.4,
    isToday: true,
  },
  {
    date: '2026-10-10',
    day: 'Saturday',
    totalEnrolled: 520,
    presentCount: 482,
    absentCount: 26,
    leaveCount: 12,
    rate: 92.7,
  },
  {
    date: '2026-10-09',
    day: 'Friday',
    totalEnrolled: 520,
    presentCount: 498,
    absentCount: 13,
    leaveCount: 9,
    rate: 95.8,
  },
  {
    date: '2026-10-08',
    day: 'Thursday',
    totalEnrolled: 520,
    presentCount: 504,
    absentCount: 10,
    leaveCount: 6,
    rate: 96.9,
  },
  {
    date: '2026-10-07',
    day: 'Wednesday',
    totalEnrolled: 520,
    presentCount: 491,
    absentCount: 17,
    leaveCount: 12,
    rate: 94.4,
  },
  {
    date: '2026-10-06',
    day: 'Tuesday',
    totalEnrolled: 520,
    presentCount: 500,
    absentCount: 12,
    leaveCount: 8,
    rate: 96.2,
  },
  {
    date: '2026-10-05',
    day: 'Monday',
    totalEnrolled: 520,
    presentCount: 495,
    absentCount: 16,
    leaveCount: 9,
    rate: 95.2,
  },
  {
    date: '2026-10-03',
    day: 'Saturday',
    totalEnrolled: 520,
    presentCount: 488,
    absentCount: 20,
    leaveCount: 12,
    rate: 93.8,
  },
  {
    date: '2026-10-01',
    day: 'Thursday',
    totalEnrolled: 520,
    presentCount: 502,
    absentCount: 11,
    leaveCount: 7,
    rate: 96.5,
  },
  {
    date: '2026-09-30',
    day: 'Wednesday',
    totalEnrolled: 520,
    presentCount: 506,
    absentCount: 8,
    leaveCount: 6,
    rate: 97.3,
  },
  {
    date: '2026-09-29',
    day: 'Tuesday',
    totalEnrolled: 520,
    presentCount: 499,
    absentCount: 13,
    leaveCount: 8,
    rate: 96.0,
  },
  {
    date: '2026-09-28',
    day: 'Monday',
    totalEnrolled: 520,
    presentCount: 492,
    absentCount: 18,
    leaveCount: 10,
    rate: 94.6,
  },
];

// 📚 Class-wise Attendance Data for the Selected Day
const CLASS_BREAKDOWN_DATA = [
  { class: 'Class 10-A', incharge: 'Prof. Rajesh Sharma', enrolled: 32, present: 31, absent: 1, leave: 0, rate: 96.9 },
  { class: 'Class 10-B', incharge: 'Mrs. Suman Rao', enrolled: 30, present: 29, absent: 0, leave: 1, rate: 96.7 },
  { class: 'Class 9-A', incharge: 'Mrs. Priya Nair', enrolled: 35, present: 33, absent: 1, leave: 1, rate: 94.3 },
  { class: 'Class 9-B', incharge: 'Mr. Arvind Gupta', enrolled: 34, present: 33, absent: 1, leave: 0, rate: 97.1 },
  { class: 'Class 8-A', incharge: 'Dr. Sunita Verma', enrolled: 36, present: 35, absent: 1, leave: 0, rate: 97.2 },
  { class: 'Class 8-B', incharge: 'Mr. Rohit Saxena', enrolled: 35, present: 33, absent: 1, leave: 1, rate: 94.3 },
  { class: 'Class 7-A', incharge: 'Ms. Kavita Joshi', enrolled: 32, present: 30, absent: 1, leave: 1, rate: 93.8 },
  { class: 'Class 6-A', incharge: 'Mrs. Meenakshi Iyer', enrolled: 30, present: 29, absent: 0, leave: 1, rate: 96.7 },
  { class: 'Class 11-Science', incharge: 'Mr. Deepak Mehta', enrolled: 30, present: 28, absent: 1, leave: 1, rate: 93.3 },
  { class: 'Class 12-Science', incharge: 'Dr. Ramesh Bose', enrolled: 28, present: 27, absent: 1, leave: 0, rate: 96.4 },
  { class: 'Class 11-Commerce', incharge: 'Mrs. Pooja Bansal', enrolled: 28, present: 27, absent: 0, leave: 1, rate: 96.4 },
  { class: 'Class 12-Commerce', incharge: 'Mr. Sanjay Kulkarni', enrolled: 26, present: 25, absent: 0, leave: 1, rate: 96.2 },
];

// Expanded Individual Student Roll-Call Samples
const SAMPLE_STUDENT_ROLLCALL = [
  { id: '1', rollNo: '10A-01', name: 'Rohan Sharma', class: 'Class 10-A', status: 'Present', clockIn: '07:48 AM', remarks: 'On Time' },
  { id: '2', rollNo: '10A-14', name: 'Alex Johnson', class: 'Class 10-A', status: 'Present', clockIn: '07:51 AM', remarks: 'On Time' },
  { id: '3', rollNo: '10A-05', name: 'Kabir Verma', class: 'Class 10-A', status: 'Absent', clockIn: '—', remarks: 'Unexcused Absence' },
  { id: '4', rollNo: '10A-08', name: 'Riya Sen', class: 'Class 10-A', status: 'Present', clockIn: '07:52 AM', remarks: 'On Time' },
  { id: '5', rollNo: '10B-03', name: 'Sneha Patel', class: 'Class 10-B', status: 'Present', clockIn: '07:45 AM', remarks: 'On Time' },
  { id: '6', rollNo: '10B-07', name: 'Vikram Mehta', class: 'Class 10-B', status: 'Leave', clockIn: '—', remarks: 'Approved Medical Leave' },
  { id: '7', rollNo: '09A-02', name: 'Ananya Roy', class: 'Class 9-A', status: 'Present', clockIn: '07:50 AM', remarks: 'On Time' },
  { id: '8', rollNo: '09A-11', name: 'Aman Dixit', class: 'Class 9-A', status: 'Absent', clockIn: '—', remarks: 'No Intimation' },
  { id: '9', rollNo: '09A-15', name: 'Pooja Hegde', class: 'Class 9-A', status: 'Leave', clockIn: '—', remarks: 'Family Function Leave' },
  { id: '10', rollNo: '08A-04', name: 'Tanvi Joshi', class: 'Class 8-A', status: 'Present', clockIn: '07:42 AM', remarks: 'On Time' },
  { id: '11', rollNo: '11S-22', name: 'Sneha Roy', class: 'Class 11-Science', status: 'Present', clockIn: '07:55 AM', remarks: 'On Time' },
  { id: '12', rollNo: '06B-05', name: 'Aarav Patel', class: 'Class 6-A', status: 'Present', clockIn: '07:54 AM', remarks: 'On Time' },
  { id: '13', rollNo: '12S-09', name: 'Kunal Singhal', class: 'Class 12-Science', status: 'Present', clockIn: '07:46 AM', remarks: 'On Time' },
  { id: '14', rollNo: '12S-18', name: 'Diya Kapoor', class: 'Class 12-Science', status: 'Absent', clockIn: '—', remarks: 'Fever' },
  { id: '15', rollNo: '11C-05', name: 'Aryan Malhotra', class: 'Class 11-Commerce', status: 'Leave', clockIn: '—', remarks: 'Sports Tournament Leave' },
];

const StudentAttendance = () => {
  const { showToast } = useToast();

  // Selected Date state (Default to today)
  const [selectedDate, setSelectedDate] = useState('2026-10-12');
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'classes' | 'students'
  const [studentSearch, setStudentSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [classFilter, setClassFilter] = useState('ALL');

  // Currently selected day summary
  const selectedDayRecord = useMemo(() => {
    return (
      HISTORICAL_SCHOOL_ATTENDANCE.find((item) => item.date === selectedDate) ||
      HISTORICAL_SCHOOL_ATTENDANCE[0]
    );
  }, [selectedDate]);

  // Today's record (always the first item)
  const todayRecord = HISTORICAL_SCHOOL_ATTENDANCE[0];

  // Filtered Student List
  const filteredStudents = useMemo(() => {
    return SAMPLE_STUDENT_ROLLCALL.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(studentSearch.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || student.status === statusFilter;
      const matchClass = classFilter === 'ALL' || student.class.includes(classFilter);
      return matchSearch && matchStatus && matchClass;
    });
  }, [studentSearch, statusFilter, classFilter]);

  const handleExportCSV = () => {
    showToast({
      title: 'Attendance Ledger Exported',
      message: `Complete student attendance for ${selectedDate} exported to CSV.`,
      type: 'success',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Student Roll-Call Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Student Attendance & Daily History
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Real-time total students present today and institutional day-by-day attendance records for previous school days.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="clay-btn-secondary px-3 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Export Ledger</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-emerald-950 dark:text-emerald-100"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Day Roll-Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 TOP KPI SUMMARY CARDS: TOTAL STUDENTS PRESENT TODAY & STATUS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Enrolled */}
        <div className="clay-card p-3.5 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total Enrolled Students
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mt-0.5">
              {todayRecord.totalEnrolled} <span className="text-xs font-normal text-slate-400">Students</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500">
              Across 12 Sections
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 clay-icon-pill">
            <Users className="w-4 h-4" />
          </div>
        </div>

        {/* Total Students Present Today */}
        <div className="clay-card p-3.5 sm:p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Present Today (In School)
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-baseline gap-1.5">
              <span>{todayRecord.presentCount}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/70 px-1.5 py-0.2 rounded-full">
                {todayRecord.rate}%
              </span>
            </div>
            <span className="text-[10px] font-medium text-emerald-700/80 dark:text-emerald-300">
              Morning assembly completed
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Total Students Absent Today */}
        <div className="clay-card p-3.5 sm:p-4 flex items-center justify-between border-l-4 border-l-rose-500">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Absent Today
            </span>
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
              {todayRecord.absentCount} <span className="text-xs font-normal text-slate-400">Students</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500">
              Unexcused / SMS alert sent
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 clay-icon-pill">
            <UserX className="w-4 h-4" />
          </div>
        </div>

        {/* Total On Leave Today */}
        <div className="clay-card p-3.5 sm:p-4 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Approved Leave Today
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {todayRecord.leaveCount} <span className="text-xs font-normal text-slate-400">Students</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500">
              Sanctioned Medical / Casual
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🧭 DATE SELECTOR & PREVIOUS DAYS SWITCHER */}
      <div className="clay-card p-3.5 sm:p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Quick Date Picker */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Inspect Date:
            </span>

            {/* Quick date pills */}
            {HISTORICAL_SCHOOL_ATTENDANCE.slice(0, 5).map((item) => (
              <button
                key={item.date}
                type="button"
                onClick={() => setSelectedDate(item.date)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedDate === item.date
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {item.isToday ? 'Today (Oct 12)' : item.date}
              </button>
            ))}

            {/* Dropdown for older dates */}
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="clay-input px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
            >
              {HISTORICAL_SCHOOL_ATTENDANCE.map((item) => (
                <option key={item.date} value={item.date}>
                  {item.date} &mdash; {item.day} ({item.presentCount} Present)
                </option>
              ))}
            </select>
          </div>

          {/* Active Date Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Selected Date:</span>
            <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">
              {selectedDayRecord.date} ({selectedDayRecord.day})
            </span>
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-600 text-white font-extrabold text-[10px]">
              {selectedDayRecord.presentCount} / {selectedDayRecord.totalEnrolled} Present ({selectedDayRecord.rate}%)
            </span>
          </div>
        </div>

        {/* View Tabs: 1. Previous Days History Ledger | 2. Class Breakdown for Selected Day | 3. Student Roll Call */}
        <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Previous Days History Log</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classes')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'classes'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Class-Wise Breakdown</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'students'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Roll Call Register</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-medium">
            💡 Click any previous date in the table to inspect its full roll-call details
          </span>
        </div>
      </div>

      {/* 📋 TAB 1: PREVIOUS DAYS PRESENT STUDENTS HISTORY TABLE */}
      {activeTab === 'history' && (
        <div className="clay-card overflow-hidden">
          <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                Previous Days School Attendance History
              </h2>
              <p className="text-xs text-slate-500">
                Daily record of total students present, absent, and on approved leave across all past academic days.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              Avg School Attendance: 95.3%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date &amp; Day</th>
                  <th className="py-3 px-4">Total Enrolled</th>
                  <th className="py-3 px-4 text-emerald-700 dark:text-emerald-400">Total Present (In School)</th>
                  <th className="py-3 px-4 text-rose-700 dark:text-rose-400">Total Absent</th>
                  <th className="py-3 px-4 text-amber-700 dark:text-amber-400">Approved Leave</th>
                  <th className="py-3 px-4">Attendance Rate (%)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {HISTORICAL_SCHOOL_ATTENDANCE.map((record) => {
                  const isSelected = selectedDate === record.date;
                  return (
                    <tr
                      key={record.date}
                      onClick={() => setSelectedDate(record.date)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-bold'
                          : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Date & Day */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-800 dark:text-white font-bold">
                            {record.date}
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            ({record.day})
                          </span>
                          {record.isToday && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-600 text-white uppercase">
                              Today
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Total Enrolled */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {record.totalEnrolled} Students
                      </td>

                      {/* Total Present Students (Green) */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {record.presentCount} Present
                        </span>
                      </td>

                      {/* Total Absent Students (Red) */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          {record.absentCount} Absent
                        </span>
                      </td>

                      {/* Total On Leave Students (Amber) */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          {record.leaveCount} Leave
                        </span>
                      </td>

                      {/* Attendance Percentage & Progress Bar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${record.rate}%` }}
                            ></div>
                          </div>
                          <span className="font-black text-emerald-700 dark:text-emerald-400">
                            {record.rate}%
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(record.date);
                            setActiveTab('classes');
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-950/60 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Class Breakdown</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📋 TAB 2: CLASS-WISE BREAKDOWN FOR THE SELECTED DAY */}
      {activeTab === 'classes' && (
        <div className="clay-card overflow-hidden">
          <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Class-Wise Attendance on {selectedDayRecord.date} ({selectedDayRecord.day})
              </h2>
              <p className="text-xs text-slate-500">
                School Totals: {selectedDayRecord.presentCount} Present • {selectedDayRecord.absentCount} Absent • {selectedDayRecord.leaveCount} Leave ({selectedDayRecord.rate}%)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Back to Daily History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Class &amp; Section</th>
                  <th className="py-3 px-4">Class Teacher</th>
                  <th className="py-3 px-4">Enrolled</th>
                  <th className="py-3 px-4 text-emerald-700 dark:text-emerald-400">Present (Green)</th>
                  <th className="py-3 px-4 text-rose-700 dark:text-rose-400">Absent (Red)</th>
                  <th className="py-3 px-4 text-amber-700 dark:text-amber-400">Leave (Amber)</th>
                  <th className="py-3 px-4">Rate (%)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {CLASS_BREAKDOWN_DATA.map((cls, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-black text-slate-800 dark:text-white">
                      {cls.class}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {cls.incharge}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {cls.enrolled}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                      {cls.present} Present
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400">
                      {cls.absent > 0 ? `${cls.absent} Absent` : '—'}
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">
                      {cls.leave > 0 ? `${cls.leave} Leave` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-black text-emerald-700 dark:text-emerald-400">
                        {cls.rate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setClassFilter(cls.class.replace('Class ', ''));
                          setActiveTab('students');
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-950/60 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Students</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📋 TAB 3: INDIVIDUAL STUDENT ROLL CALL REGISTER */}
      {activeTab === 'students' && (
        <div className="clay-card overflow-hidden">
          {/* Filter & Search Bar */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student name or roll no..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
              <span className="text-slate-500 font-semibold">Filter:</span>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="clay-input px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="Present">Present Only (Green)</option>
                <option value="Absent">Absent Only (Red)</option>
                <option value="Leave">Leave Only (Amber)</option>
              </select>

              {/* Class Filter */}
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="clay-input px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="ALL">All Classes</option>
                <option value="10-A">Class 10-A</option>
                <option value="10-B">Class 10-B</option>
                <option value="9-A">Class 9-A</option>
                <option value="8-A">Class 8-A</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Status &amp; Color</th>
                  <th className="py-3 px-4">Clock-In Time</th>
                  <th className="py-3 px-4 text-right">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-white">
                      {st.rollNo}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                      {st.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {st.class}
                    </td>
                    <td className="py-3 px-4">
                      {st.status === 'Present' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Present</span>
                        </span>
                      )}
                      {st.status === 'Absent' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold text-[11px]">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Absent</span>
                        </span>
                      )}
                      {st.status === 'Leave' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-[11px]">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Leave</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {st.clockIn}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {st.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
