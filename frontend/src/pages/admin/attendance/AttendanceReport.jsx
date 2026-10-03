import React, { useState } from 'react';
import {
  CalendarCheck,
  Calendar,
  Search,
  Filter,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Users,
  UserCheck,
  GraduationCap,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const classAttendanceData = [
  { class: 'Class 10-A', classTeacher: 'Prof. Rajesh Sharma', totalStudents: 32, workingDays: 24, presentAvg: 30.5, attendanceRate: 95.3, lowAttendanceCount: 1 },
  { class: 'Class 10-B', classTeacher: 'Mrs. Suman Rao', totalStudents: 30, workingDays: 24, presentAvg: 28.8, attendanceRate: 96.0, lowAttendanceCount: 0 },
  { class: 'Class 9-A', classTeacher: 'Mrs. Priya Nair', totalStudents: 35, workingDays: 24, presentAvg: 32.9, attendanceRate: 94.0, lowAttendanceCount: 2 },
  { class: 'Class 9-B', classTeacher: 'Mr. Arvind Gupta', totalStudents: 34, workingDays: 24, presentAvg: 32.5, attendanceRate: 95.6, lowAttendanceCount: 0 },
  { class: 'Class 8-A', classTeacher: 'Dr. Sunita Verma', totalStudents: 36, workingDays: 24, presentAvg: 34.8, attendanceRate: 96.7, lowAttendanceCount: 0 },
  { class: 'Class 11-Science', classTeacher: 'Mr. Deepak Mehta', totalStudents: 30, workingDays: 24, presentAvg: 28.2, attendanceRate: 94.0, lowAttendanceCount: 3 },
  { class: 'Class 12-Science', classTeacher: 'Dr. Ramesh Bose', totalStudents: 28, workingDays: 24, presentAvg: 27.2, attendanceRate: 97.1, lowAttendanceCount: 0 },
];

const lowAttendanceStudents = [
  { name: 'Neha Gupta', rollNo: '09A-08', class: 'Class 9-A', rate: '65.0%', daysAbsent: 8, parentPhone: '+91 98112 33445', warningSent: true },
  { name: 'Rohan Deshmukh', rollNo: '11S-14', class: 'Class 11-Science', rate: '68.5%', daysAbsent: 7, parentPhone: '+91 98770 12345', warningSent: true },
  { name: 'Kabir Verma', rollNo: '10A-05', class: 'Class 10-A', rate: '71.2%', daysAbsent: 6, parentPhone: '+91 98990 55667', warningSent: false }
];

const AttendanceReport = () => {
  const { showToast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [selectedWing, setSelectedWing] = useState('All Wings');
  const [searchQuery, setSearchQuery] = useState('');

  const handleExportCSV = () => {
    showToast({
      title: 'Attendance Report Exported',
      message: `Monthly summary for ${selectedMonth} downloaded as CSV spreadsheet.`,
      type: 'success'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredClasses = classAttendanceData.filter(c =>
    c.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.classTeacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Biometric & Roll-Call Audit</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Institutional Attendance Analytics & Reports
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Monthly and session-wide student roll call audit, class averages, and defaulter tracking under 75% CBSE threshold.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="clay-btn-secondary px-3 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Overall Student Attendance
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">95.4%</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">September 2026</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Teaching Faculty Attendance
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">98.2%</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Biometric Clock-In</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active School Days
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">24 Days</div>
            <span className="text-[10px] font-medium text-slate-500">Excluding 4 Sundays</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Defaulters (&lt;75% Attendance)
            </span>
            <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">3 Students</div>
            <span className="text-[10px] font-medium text-slate-500">Notice dispatched</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🔍 Month & Class Filter Bar */}
      <div className="clay-card p-3.5 sm:p-4 print:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search class or incharge teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
            <span className="text-slate-500 font-semibold shrink-0">Month:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="clay-input px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-white"
            >
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
              <option value="July 2026">July 2026</option>
              <option value="Term 1 Aggregate">Term 1 Aggregate</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📋 Class Attendance Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white">
            Class-Wise Monthly Attendance Audit ({selectedMonth})
          </h2>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            CBSE Minimum Mandate: 75%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-4">Class & Section</th>
                <th className="py-2.5 px-4">Class Teacher</th>
                <th className="py-2.5 px-4">Enrolled Students</th>
                <th className="py-2.5 px-4">Working Days</th>
                <th className="py-2.5 px-4">Avg Daily Present</th>
                <th className="py-2.5 px-4">Attendance Rate</th>
                <th className="py-2.5 px-4 text-right">Defaulters (&lt;75%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredClasses.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                    {item.class}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.classTeacher}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.totalStudents}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.workingDays} Days</td>
                  <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">{item.presentAvg}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.attendanceRate}%` }}></div>
                      </div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{item.attendanceRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.lowAttendanceCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200">
                        {item.lowAttendanceCount} Student(s)
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">Nil</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⚠️ Critical Low Attendance Defaulters Box */}
      <div className="clay-card p-4 sm:p-5">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Attendance Defaulter Warning Register (&lt;75% Attendance)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Students listed below are currently below the required 75% attendance threshold for examination hall ticket eligibility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {lowAttendanceStudents.map((st, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800 dark:text-white">{st.name}</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{st.rate}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {st.class} • Roll No: {st.rollNo}
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200/60 dark:border-amber-800/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Days Absent: {st.daysAbsent}</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">SMS Alert Sent</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
