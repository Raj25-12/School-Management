import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Card } from '../../components/common';

// 🗓️ Monthly Attendance Records (Green for Present, Red for Absent, Amber for Leave, Weekend for Sundays)
const ATTENDANCE_DATA = {
  // OCTOBER 2026
  '2026-10': {
    '2026-10-01': 'Present',
    '2026-10-02': 'Leave',
    '2026-10-03': 'Present',
    '2026-10-04': 'Weekend',
    '2026-10-05': 'Present',
    '2026-10-06': 'Present',
    '2026-10-07': 'Leave',
    '2026-10-08': 'Present',
    '2026-10-09': 'Present',
    '2026-10-11': 'Weekend',
    '2026-10-12': 'Present',
  },
  // SEPTEMBER 2026
  '2026-09': {
    '2026-09-01': 'Present',
    '2026-09-02': 'Present',
    '2026-09-03': 'Present',
    '2026-09-04': 'Present',
    '2026-09-05': 'Present',
    '2026-09-06': 'Weekend',
    '2026-09-07': 'Present',
    '2026-09-08': 'Present',
    '2026-09-09': 'Present',
    '2026-09-10': 'Present',
    '2026-09-11': 'Present',
    '2026-09-12': 'Present',
    '2026-09-13': 'Weekend',
    '2026-09-14': 'Present',
    '2026-09-15': 'Present',
    '2026-09-16': 'Present',
    '2026-09-17': 'Present',
    '2026-09-18': 'Present',
    '2026-09-19': 'Present',
    '2026-09-20': 'Weekend',
    '2026-09-21': 'Present',
    '2026-09-22': 'Absent',
    '2026-09-23': 'Present',
    '2026-09-24': 'Present',
    '2026-09-25': 'Leave',
    '2026-09-26': 'Present',
    '2026-09-27': 'Weekend',
    '2026-09-28': 'Present',
    '2026-09-29': 'Present',
    '2026-09-30': 'Present',
  },
  // AUGUST 2026
  '2026-08': {
    '2026-08-01': 'Present',
    '2026-08-02': 'Weekend',
    '2026-08-03': 'Present',
    '2026-08-04': 'Present',
    '2026-08-05': 'Present',
    '2026-08-06': 'Absent',
    '2026-08-07': 'Present',
    '2026-08-08': 'Present',
    '2026-08-09': 'Weekend',
    '2026-08-10': 'Present',
    '2026-08-11': 'Present',
    '2026-08-12': 'Present',
    '2026-08-13': 'Present',
    '2026-08-14': 'Present',
    '2026-08-15': 'Leave',
    '2026-08-16': 'Weekend',
    '2026-08-17': 'Present',
    '2026-08-18': 'Leave',
    '2026-08-19': 'Leave',
    '2026-08-20': 'Present',
    '2026-08-21': 'Present',
    '2026-08-22': 'Present',
    '2026-08-23': 'Weekend',
    '2026-08-24': 'Present',
    '2026-08-25': 'Present',
    '2026-08-26': 'Present',
    '2026-08-27': 'Present',
    '2026-08-28': 'Present',
    '2026-08-29': 'Leave',
    '2026-08-30': 'Weekend',
    '2026-08-31': 'Present',
  }
};

// Procedural generator for any other selected month
const getMonthStatusMap = (year, monthIndex) => {
  const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
  if (ATTENDANCE_DATA[monthKey]) {
    return ATTENDANCE_DATA[monthKey];
  }

  const map = {};
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  for (let d = 1; d <= totalDays; d++) {
    const dayOfWeek = new Date(year, monthIndex, d).getDay();
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    if (dayOfWeek === 0) {
      map[dateStr] = 'Weekend';
    } else {
      const hash = (d * 17 + monthIndex * 31 + year) % 20;
      if (hash === 4) {
        map[dateStr] = 'Absent';
      } else if (hash === 9) {
        map[dateStr] = 'Leave';
      } else {
        map[dateStr] = 'Present';
      }
    }
  }

  return map;
};

// 🎨 Pure Color Theme:
// - Green for Present
// - Red for Absent
// - Amber/Orange for Leave
// - Gray for Sunday/Weekend
const STATUS_STYLES = {
  Present: {
    cellClass: 'bg-emerald-50/90 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700/80',
    numberClass: 'text-emerald-900 dark:text-emerald-100 font-black',
    accentBar: 'bg-emerald-500',
    dotClass: 'bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900',
  },
  Absent: {
    cellClass: 'bg-rose-50/90 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border-rose-300 dark:border-rose-700/80',
    numberClass: 'text-rose-900 dark:text-rose-100 font-black',
    accentBar: 'bg-rose-500',
    dotClass: 'bg-rose-500 ring-2 ring-rose-200 dark:ring-rose-900',
  },
  Leave: {
    cellClass: 'bg-amber-50/90 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border-amber-300 dark:border-amber-700/80',
    numberClass: 'text-amber-900 dark:text-amber-100 font-black',
    accentBar: 'bg-amber-500',
    dotClass: 'bg-amber-500 ring-2 ring-amber-200 dark:ring-amber-900',
  },
  Weekend: {
    cellClass: 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60',
    numberClass: 'text-slate-400 font-bold',
    accentBar: 'bg-transparent',
    dotClass: 'bg-transparent',
  }
};

const monthOptionsList = [
  { value: '2026-10', label: 'October 2026' },
  { value: '2026-09', label: 'September 2026' },
  { value: '2026-08', label: 'August 2026' },
  { value: '2026-07', label: 'July 2026' },
  { value: '2026-06', label: 'June 2026' },
];

const MyAttendance = () => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // Default to September 2026

  const monthKey = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}`;
  const monthName = new Date(currentYear, currentMonthIndex, 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  const statusMap = useMemo(() => {
    return getMonthStatusMap(currentYear, currentMonthIndex);
  }, [currentYear, currentMonthIndex]);

  // Counts for summary cards
  const counts = useMemo(() => {
    let present = 0;
    let absent = 0;
    let leave = 0;

    Object.values(statusMap).forEach(status => {
      if (status === 'Present') present++;
      else if (status === 'Absent') absent++;
      else if (status === 'Leave') leave++;
    });

    const totalWorking = present + absent + leave;
    const rate = totalWorking > 0 ? Math.round((present / totalWorking) * 100) : 0;

    return { present, absent, leave, totalWorking, rate };
  }, [statusMap]);

  // Calendar Matrix
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

    const cells = [];

    // Trailing days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        dayNum: daysInPrevMonth - i,
        isCurrentMonth: false,
        status: null,
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: true,
        status: statusMap[dateStr] || 'Present',
      });
    }

    // Trailing days to finish grid
    const remainder = (7 - (cells.length % 7)) % 7;
    for (let next = 1; next <= remainder; next++) {
      cells.push({
        dayNum: next,
        isCurrentMonth: false,
        status: null,
      });
    }

    return cells;
  }, [currentYear, currentMonthIndex, statusMap]);

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const handleMonthSelect = (val) => {
    const [y, m] = val.split('-');
    setCurrentYear(parseInt(y, 10));
    setCurrentMonthIndex(parseInt(m, 10) - 1);
  };

  const handleJumpToToday = () => {
    setCurrentYear(2026);
    setCurrentMonthIndex(9); // October
  };

  return (
    <div className="space-y-4 pb-12 max-w-5xl mx-auto">
      {/* 🌟 Header Banner */}
      <Card variant="sky" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <CalendarCheck className="w-3.5 h-3.5 text-sky-700 dark:text-sky-300" />
              <span>Student Attendance Calendar</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
              Attendance Record
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Pure color-coded calendar: Green for Present, Red for Absent, and Amber for Leave.
            </p>
          </div>
        </div>
      </Card>

      {/* 📊 Simple KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Present (Green) */}
        <Card className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Present
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {counts.present} <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
          </div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></div>
        </Card>

        {/* Absent (Red) */}
        <Card className="p-3.5 bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Absent
            </span>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
              {counts.absent} <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
          </div>
          <div className="w-4 h-4 rounded-full bg-rose-500 shadow-sm"></div>
        </Card>

        {/* Leave (Amber / Orange) */}
        <Card className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Leave
            </span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {counts.leave} <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
          </div>
          <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></div>
        </Card>

        {/* Attendance Rate */}
        <Card className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Attendance
            </span>
            <div className="text-2xl font-black text-slate-800 dark:text-white mt-0.5">
              {counts.rate}%
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {counts.totalWorking} Days
          </span>
        </Card>
      </div>

      {/* 🧭 Month Navigation & Legend */}
      <Card className="p-3.5 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Navigation Controls (< Month Year >) */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-3 py-1 font-black text-xs sm:text-sm text-slate-800 dark:text-white min-w-36 text-center select-none">
                {monthName}
              </div>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Month Dropdown */}
            <select
              value={monthKey}
              onChange={(e) => handleMonthSelect(e.target.value)}
              className="text-xs font-semibold py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              {monthOptionsList.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleJumpToToday}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Today</span>
            </button>
          </div>

          {/* Simple Legend */}
          <div className="flex items-center gap-3.5 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs"></span>
              <span className="text-emerald-700 dark:text-emerald-400">Present (Green)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-xs"></span>
              <span className="text-rose-700 dark:text-rose-400">Absent (Red)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-xs"></span>
              <span className="text-amber-700 dark:text-amber-400">Leave (Amber)</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 📅 Clean, Pure-Color Calendar Grid (No Text Inside Cells) */}
      <Card className="p-3 sm:p-5">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, idx) => (
            <div
              key={d}
              className={`py-2 text-xs sm:text-sm font-black uppercase tracking-wider rounded-lg ${
                idx === 0
                  ? 'text-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
                  : 'text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/60'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* 7-Column Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarCells.map((cell, idx) => {
            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-14 sm:h-18 p-2 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 border border-dashed border-slate-200/60 dark:border-slate-800/40 opacity-30 select-none flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-slate-400">
                    {cell.dayNum}
                  </span>
                </div>
              );
            }

            const status = cell.status || 'Present';
            const style = STATUS_STYLES[status] || STATUS_STYLES.Present;
            const isToday = cell.dateStr === '2026-10-12';

            return (
              <div
                key={cell.dateStr}
                className={`h-14 sm:h-18 p-2 rounded-xl border flex flex-col items-center justify-center relative transition-all duration-150 select-none ${
                  style.cellClass
                } ${isToday ? 'ring-2 ring-sky-500 shadow-md font-extrabold' : ''}`}
                title={status !== 'Weekend' ? `${cell.dateStr}: ${status}` : `${cell.dateStr}: Sunday Off`}
              >
                {/* Date Number Styled with Corresponding Status Color */}
                <span className={`text-sm sm:text-base ${style.numberClass}`}>
                  {cell.dayNum}
                </span>

                {/* Pure Color Dot Indicator */}
                {status !== 'Weekend' && (
                  <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mt-1 ${style.dotClass}`}></span>
                )}

                {/* Subtle Today Pill */}
                {isToday && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-sky-600 text-white text-[7px] font-black uppercase shadow-xs">
                    Today
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default MyAttendance;
