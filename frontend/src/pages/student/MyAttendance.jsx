import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { Badge, Card, Select } from '../../components/common';

const monthlyAttendanceLogs = [
  { date: '2026-09-30', day: 'Wednesday', status: 'Present', timeIn: '07:55 AM', remarks: 'On Time' },
  { date: '2026-09-29', day: 'Tuesday', status: 'Present', timeIn: '07:50 AM', remarks: 'On Time' },
  { date: '2026-09-28', day: 'Monday', status: 'Present', timeIn: '07:58 AM', remarks: 'On Time' },
  { date: '2026-09-26', day: 'Saturday', status: 'Present', timeIn: '07:45 AM', remarks: 'Unit Test Day' },
  { date: '2026-09-25', day: 'Friday', status: 'Late', timeIn: '08:15 AM', remarks: 'Heavy rain traffic' },
  { date: '2026-09-24', day: 'Thursday', status: 'Present', timeIn: '07:52 AM', remarks: 'On Time' },
  { date: '2026-09-23', day: 'Wednesday', status: 'Present', timeIn: '07:48 AM', remarks: 'On Time' },
  { date: '2026-09-22', day: 'Tuesday', status: 'Absent', timeIn: '—', remarks: 'Medical Leave (Fever)' },
  { date: '2026-09-21', day: 'Monday', status: 'Present', timeIn: '07:50 AM', remarks: 'On Time' },
];

const monthOptions = [
  { value: 'September 2026', label: 'September 2026' },
  { value: 'August 2026', label: 'August 2026' },
  { value: 'July 2026', label: 'July 2026' },
];

const MyAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sky" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <CalendarCheck className="w-3.5 h-3.5 text-sky-700" />
              <span>Student Roll Call Record</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Attendance & Punctuality Record
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Daily clock-in logs, monthly attendance percentage, and CBSE exam hall ticket eligibility criteria.
            </p>
          </div>
        </div>
      </Card>

      {/* 📊 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Overall Attendance</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">96.5%</div>
            <span className="text-[10px] font-semibold text-slate-500">Exam Eligible (&gt;75%)</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Days Present</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">22 Days</div>
            <span className="text-[10px] font-semibold text-slate-500">Out of 24 working days</span>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 clay-icon-pill">
            <Calendar className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Absences Logged</span>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">1 Day</div>
            <span className="text-[10px] font-semibold text-slate-500">Medical excuse approved</span>
          </div>
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 clay-icon-pill">
            <XCircle className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Late Days</span>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">1 Day</div>
            <span className="text-[10px] font-semibold text-slate-500">Traffic delay</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </Card>
      </div>

      {/* 📋 Daily Logs Table */}
      <Card className="overflow-hidden p-0">
        <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white">
            Daily Roll-Call History ({selectedMonth})
          </h2>

          <div className="w-44">
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              options={monthOptions}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Clock-In Time</th>
                <th className="py-3 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {monthlyAttendanceLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-bold font-mono text-slate-800 dark:text-white">{log.date}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{log.day}</td>
                  <td className="py-3 px-4">
                    <Badge variant={log.status === 'Present' ? 'emerald' : log.status === 'Late' ? 'amber' : 'rose'}>
                      {log.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{log.timeIn}</td>
                  <td className="py-3 px-4 text-right text-slate-500">{log.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MyAttendance;
