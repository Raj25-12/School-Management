import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Building,
  Users,
  BookOpen,
  Printer,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo_clean.png';

const initialTeacherSchedule = {
  Monday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', classGrade: 'Class 10-A', room: 'Room 201', type: 'Lecture', status: 'Completed' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', classGrade: 'Class 10-B', room: 'Room 202', type: 'Lecture', status: 'Completed' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Free / Prep Period', classGrade: 'Staff Room', room: 'Faculty Lounge', type: 'Prep', status: 'Completed' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Mathematics Tutorial', classGrade: 'Class 9-A', room: 'Room 105', type: 'Tutorial', status: 'In Progress' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Advanced Algebra', classGrade: 'Class 11-Science', room: 'Math Lab', type: 'Practical', status: 'Upcoming' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'Mathematics', classGrade: 'Class 8-A', room: 'Room 102', type: 'Lecture', status: 'Upcoming' },
  ],
  Tuesday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', classGrade: 'Class 10-B', room: 'Room 202', type: 'Lecture', status: 'Upcoming' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', classGrade: 'Class 10-A', room: 'Room 201', type: 'Lecture', status: 'Upcoming' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Math Lab Practicals', classGrade: 'Class 10-A', room: 'Math Lab', type: 'Practical', status: 'Upcoming' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'Mathematics Tutorial', classGrade: 'Class 10-A', room: 'Room 201', type: 'Tutorial', status: 'Upcoming' },
  ],
  Wednesday: [
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', classGrade: 'Class 10-A', room: 'Room 201', type: 'Lecture', status: 'Upcoming' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Mathematics', classGrade: 'Class 9-A', room: 'Room 105', type: 'Lecture', status: 'Upcoming' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Linear Algebra', classGrade: 'Class 11-Science', room: 'Room 301', type: 'Lecture', status: 'Upcoming' },
    { period: 7, time: '01:30 - 02:15 PM', subject: 'Mathematics Remedial', classGrade: 'Class 10-B', room: 'Room 202', type: 'Tutorial', status: 'Upcoming' },
  ],
  Thursday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', classGrade: 'Class 10-A', room: 'Room 201', type: 'Lecture', status: 'Upcoming' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Mathematics', classGrade: 'Class 8-A', room: 'Room 102', type: 'Lecture', status: 'Upcoming' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Mathematics', classGrade: 'Class 10-B', room: 'Room 202', type: 'Lecture', status: 'Upcoming' },
  ],
  Friday: [
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', classGrade: 'Class 10-A', room: 'Room 201', type: 'Lecture', status: 'Upcoming' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Math Olympiad Prep', classGrade: 'Class 10-A', room: 'Room 201', type: 'Activity', status: 'Upcoming' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'Mathematics', classGrade: 'Class 9-A', room: 'Room 105', type: 'Lecture', status: 'Upcoming' },
  ],
  Saturday: [
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Doubt Clearing Session', classGrade: 'Class 10-A', room: 'Room 201', type: 'Tutorial', status: 'Upcoming' },
    { period: 4, time: '10:30 - 11:30 AM', subject: 'Faculty Curriculum Meet', classGrade: 'Department', room: 'Conf Room 1', type: 'Prep', status: 'Upcoming' }
  ]
};

const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TeacherTimetable = () => {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'
  const schedule = initialTeacherSchedule;

  const todayPeriods = schedule[selectedDay] || [];
  const nextClass = todayPeriods.find(p => p.status === 'In Progress' || p.status === 'Upcoming') || todayPeriods[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <div className="clay-card p-4 sm:p-5 relative overflow-hidden bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Teaching Faculty Weekly Routine</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Lecture Timetable & Classroom Schedule
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Assigned classes, room locations, practical lab sessions, and daily period timings for {user?.name || 'Prof. Rajesh Sharma'}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Print My Schedule</span>
            </button>
            <Link
              to="/teacher/attendance"
              className="clay-btn-sand px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Mark Attendance</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Next Lecture Live Pill & KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 print:grid-cols-3">
        {/* Live Next Lecture */}
        <div className="clay-card p-4 bg-amber-100/60 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <PlayCircle className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Current / Next Lecture</span>
            </div>
            {nextClass ? (
              <div className="mt-1.5">
                <div className="text-base font-extrabold text-slate-800 dark:text-white">
                  {nextClass.subject} ({nextClass.classGrade})
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 flex items-center gap-2">
                  <span className="flex items-center gap-1 font-mono text-amber-900 dark:text-amber-200">
                    <Clock className="w-3 h-3" /> {nextClass.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" /> {nextClass.room}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-1 font-medium">No further lectures scheduled today.</p>
            )}
          </div>
        </div>

        <div className="clay-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Today's Lectures</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">{todayPeriods.length} Periods</div>
            <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">Scheduled for {selectedDay}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Weekly Load</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">26 Periods</div>
            <span className="text-[10px] font-semibold text-slate-500">5 Classes (Classes 8, 9, 10, 11)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 clay-icon-pill">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🧭 Day Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 print:hidden">
        <div className="flex items-center gap-1.5">
          {daysList.map((day) => {
            const count = (schedule[day] || []).length;
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-900 shadow-sm'
                    : 'clay-card text-slate-600 dark:text-slate-300 hover:text-amber-600'
                }`}
              >
                <span>{day}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('day')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              viewMode === 'day' ? 'bg-amber-500 text-slate-900' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Day View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('week')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              viewMode === 'week' ? 'bg-amber-500 text-slate-900' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Full Week
          </button>
        </div>
      </div>

      {/* 📋 DAY VIEW */}
      {viewMode === 'day' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {todayPeriods.length === 0 ? (
            <div className="col-span-2 clay-card p-10 text-center text-slate-400">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No scheduled lectures on {selectedDay}.</p>
            </div>
          ) : (
            todayPeriods.map((slot, idx) => (
              <div
                key={idx}
                className="clay-card p-4 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 transition relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-black text-sm flex items-center justify-center clay-icon-pill shrink-0">
                      P{slot.period}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                          {slot.subject}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                          {slot.classGrade}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          <span>{slot.room}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{slot.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    slot.status === 'Completed'
                      ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      : slot.status === 'In Progress'
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  }`}>
                    {slot.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* 📋 FULL WEEK TABLE VIEW */
        <div className="clay-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-amber-50/50 dark:bg-amber-950/40 text-[11px] font-extrabold uppercase text-slate-600 dark:text-slate-300">
                  <th className="py-3 px-4 w-28">Day</th>
                  <th className="py-3 px-3">P1 (08:00)</th>
                  <th className="py-3 px-3">P2 (08:45)</th>
                  <th className="py-3 px-3">P3 (09:30)</th>
                  <th className="py-3 px-3">P4 (10:30)</th>
                  <th className="py-3 px-3">P5 (11:15)</th>
                  <th className="py-3 px-3">P6 (12:45)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {daysList.map((day) => {
                  const slots = schedule[day] || [];
                  return (
                    <tr key={day} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-extrabold text-slate-800 dark:text-white bg-slate-50/40 dark:bg-slate-900/40">
                        {day}
                      </td>
                      {[1, 2, 3, 4, 5, 6].map((pNum) => {
                        const slot = slots.find((s) => s.period === pNum);
                        if (!slot) {
                          return (
                            <td key={pNum} className="py-2.5 px-2 text-center text-slate-300 dark:text-slate-600">
                              <span className="text-[10px] text-slate-400 italic">Free</span>
                            </td>
                          );
                        }
                        return (
                          <td key={pNum} className="py-2.5 px-2">
                            <div className="p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 shadow-2xs">
                              <div className="font-bold text-slate-800 dark:text-white truncate">
                                {slot.subject}
                              </div>
                              <div className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 truncate mt-0.5">
                                {slot.classGrade}
                              </div>
                              <div className="text-[9px] text-slate-500 truncate">
                                {slot.room}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;
