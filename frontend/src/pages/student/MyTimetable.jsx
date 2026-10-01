import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Building,
  UserCheck,
  BookOpen,
  Printer,
  Sparkles,
  Coffee,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo_clean.png';

const studentSchedule = {
  Monday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Physics Lab', teacher: 'Dr. Sunita Verma', room: 'Physics Lab 1', type: 'Practical' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'English Literature', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Chemistry Practicals', teacher: 'Dr. Sunita Verma', room: 'Chem Lab', type: 'Practical' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
    { period: 'BREAK', time: '12:00 - 12:45 PM', subject: 'Lunch & Recess Break', teacher: 'Campus Cafeteria', room: 'Dining Hall', type: 'Break' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'History & Civics', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
    { period: 7, time: '01:30 - 02:15 PM', subject: 'Physical Education', teacher: 'Anand Kumar', room: 'Sports Ground', type: 'Activity' },
  ],
  Tuesday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Physics', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Lecture' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Biology Lab', teacher: 'Dr. Meera Nambiar', room: 'Bio Lab', type: 'Practical' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'English Grammar', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Hindi / Sanskrit', teacher: 'Meenakshi S.', room: 'Room 201', type: 'Lecture' },
    { period: 'BREAK', time: '12:00 - 12:45 PM', subject: 'Lunch & Recess Break', teacher: 'Campus Cafeteria', room: 'Dining Hall', type: 'Break' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'Mathematics Tutorial', teacher: 'Prof. Rajesh Sharma', room: 'Math Lab', type: 'Tutorial' },
    { period: 7, time: '01:30 - 02:15 PM', subject: 'Art & Craft', teacher: 'Kavita Menon', room: 'Art Studio', type: 'Activity' },
  ],
  Wednesday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Chemistry', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Lecture' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Geography', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'English Literature', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
    { period: 'BREAK', time: '12:00 - 12:45 PM', subject: 'Lunch & Recess Break', teacher: 'Campus Cafeteria', room: 'Dining Hall', type: 'Break' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'Physics Tutorial', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Tutorial' },
    { period: 7, time: '01:30 - 02:15 PM', subject: 'Library & Reading', teacher: 'Suresh Raina', room: 'Central Library', type: 'Activity' },
  ],
  Thursday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'English Grammar', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Biology', teacher: 'Dr. Meera Nambiar', room: 'Room 201', type: 'Lecture' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Chemistry Lab', teacher: 'Dr. Sunita Verma', room: 'Chem Lab', type: 'Practical' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Economics', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
    { period: 'BREAK', time: '12:00 - 12:45 PM', subject: 'Lunch & Recess Break', teacher: 'Campus Cafeteria', room: 'Dining Hall', type: 'Break' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'General Knowledge', teacher: 'Meenakshi S.', room: 'Room 201', type: 'Lecture' },
    { period: 7, time: '01:30 - 02:15 PM', subject: 'Yoga & Wellness', teacher: 'Anand Kumar', room: 'Yoga Hall', type: 'Activity' },
  ],
  Friday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Physics', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Lecture' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'History & Civics', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
    { period: 4, time: '10:30 - 11:15 AM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
    { period: 5, time: '11:15 - 12:00 PM', subject: 'Environmental Science', teacher: 'Dr. Meera Nambiar', room: 'Room 201', type: 'Lecture' },
    { period: 'BREAK', time: '12:00 - 12:45 PM', subject: 'Lunch & Recess Break', teacher: 'Campus Cafeteria', room: 'Dining Hall', type: 'Break' },
    { period: 6, time: '12:45 - 01:30 PM', subject: 'English Debate', teacher: 'Amit Patel', room: 'Auditorium', type: 'Activity' },
    { period: 7, time: '01:30 - 02:15 PM', subject: 'Clubs & Projects', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Activity' },
  ],
  Saturday: [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Weekly Unit Test', teacher: 'All Faculty', room: 'Examination Hall', type: 'Exam' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Doubt Clearing Session', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Tutorial' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Science Quiz', teacher: 'Dr. Sunita Verma', room: 'AV Room', type: 'Activity' },
    { period: 4, time: '10:30 - 11:30 AM', subject: 'Sports Inter-House', teacher: 'Anand Kumar', room: 'Playground', type: 'Activity' },
  ]
};

const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MyTimetable = () => {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'
  const schedule = studentSchedule;

  const todayPeriods = schedule[selectedDay] || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <div className="clay-card p-4 sm:p-5 relative overflow-hidden bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <Calendar className="w-3.5 h-3.5 text-sky-700" />
              <span>Class 10-A • Academic Session 2026-2027</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Class Schedule & Daily Timetable
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Weekly periods, lab sessions, subject teachers, and classroom room locations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" />
              <span>Print Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 Daily Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-4">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">My Class</span>
            <div className="text-lg font-black text-slate-800 dark:text-white mt-0.5">Class 10-A</div>
            <span className="text-[10px] font-semibold text-sky-700 dark:text-sky-400">Room 201</span>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 clay-icon-pill">
            <Building className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Today's Periods</span>
            <div className="text-lg font-black text-slate-800 dark:text-white mt-0.5">{todayPeriods.length} Slots</div>
            <span className="text-[10px] font-semibold text-slate-500">{selectedDay}</span>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Class Incharge</span>
            <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5 truncate max-w-[120px]">Prof. Sharma</div>
            <span className="text-[10px] font-semibold text-emerald-600">Mathematics</span>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 clay-icon-pill">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lunch Break</span>
            <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">12:00 - 12:45 PM</div>
            <span className="text-[10px] font-semibold text-amber-600">Dining Hall</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 clay-icon-pill">
            <Coffee className="w-4 h-4" />
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
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'clay-card text-slate-600 dark:text-slate-300 hover:text-sky-600'
                }`}
              >
                <span>{day}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/30 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
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
              viewMode === 'day' ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Day View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('week')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              viewMode === 'week' ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Full Week
          </button>
        </div>
      </div>

      {/* 📋 DAY VIEW */}
      {viewMode === 'day' ? (
        <div className="space-y-2.5">
          {todayPeriods.map((slot, idx) => {
            const isBreak = slot.type === 'Break';
            return (
              <div
                key={idx}
                className={`clay-card p-3.5 flex items-center justify-between transition ${
                  isBreak ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60' : 'hover:border-sky-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl font-black text-xs flex items-center justify-center clay-icon-pill shrink-0 ${
                    isBreak
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200'
                  }`}>
                    {isBreak ? <Coffee className="w-4 h-4" /> : `P${slot.period}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                        {slot.subject}
                      </h3>
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                        isBreak
                          ? 'bg-amber-100 text-amber-800'
                          : slot.type === 'Practical'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      }`}>
                        {slot.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{slot.teacher}</span>
                      <span>•</span>
                      <span>{slot.room}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                    {slot.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 📋 FULL WEEK TABLE VIEW */
        <div className="clay-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-sky-50/50 dark:bg-sky-950/40 text-[11px] font-extrabold uppercase text-slate-600 dark:text-slate-300">
                  <th className="py-3 px-4 w-28">Day</th>
                  <th className="py-3 px-3">P1 (08:00)</th>
                  <th className="py-3 px-3">P2 (08:45)</th>
                  <th className="py-3 px-3">P3 (09:30)</th>
                  <th className="py-3 px-3">P4 (10:30)</th>
                  <th className="py-3 px-3">P5 (11:15)</th>
                  <th className="py-3 px-3">P6 (12:45)</th>
                  <th className="py-3 px-3">P7 (01:30)</th>
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
                      {[1, 2, 3, 4, 5, 6, 7].map((pNum) => {
                        const slot = slots.find((s) => s.period === pNum);
                        if (!slot) {
                          return (
                            <td key={pNum} className="py-2.5 px-2 text-center text-slate-300 dark:text-slate-600">
                              -
                            </td>
                          );
                        }
                        return (
                          <td key={pNum} className="py-2.5 px-2">
                            <div className="p-2 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs">
                              <div className="font-bold text-slate-800 dark:text-white truncate">
                                {slot.subject}
                              </div>
                              <div className="text-[10px] text-sky-700 dark:text-sky-400 truncate mt-0.5">
                                {slot.teacher.split(' ').pop()}
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

export default MyTimetable;
