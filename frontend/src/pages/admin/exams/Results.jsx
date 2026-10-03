import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Award,
  Download,
  Printer,
  Search,
  FileText,
  Sparkles,
  TrendingUp,
  Users,
  CheckCircle2
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';

const rankListData = [
  { rank: 1, rollNo: '10A-02', name: 'Alex Johnson', totalMarks: 582, maxMarks: 600, percentage: 97.0, grade: 'A+', status: 'Passed (Distinction)' },
  { rank: 2, rollNo: '10A-07', name: 'Ananya Roy', totalMarks: 574, maxMarks: 600, percentage: 95.6, grade: 'A+', status: 'Passed (Distinction)' },
  { rank: 3, rollNo: '10A-01', name: 'Rohan Sharma', totalMarks: 561, maxMarks: 600, percentage: 93.5, grade: 'A+', status: 'Passed (Distinction)' },
  { rank: 4, rollNo: '10A-05', name: 'Pooja Verma', totalMarks: 538, maxMarks: 600, percentage: 89.6, grade: 'A', status: 'Passed (First Class)' },
  { rank: 5, rollNo: '10A-03', name: 'Priya Gupta', totalMarks: 512, maxMarks: 600, percentage: 85.3, grade: 'A', status: 'Passed (First Class)' },
  { rank: 6, rollNo: '10A-08', name: 'Kabir Das', totalMarks: 489, maxMarks: 600, percentage: 81.5, grade: 'A', status: 'Passed (First Class)' },
  { rank: 7, rollNo: '10A-04', name: 'Aarav Mehta', totalMarks: 442, maxMarks: 600, percentage: 73.6, grade: 'B+', status: 'Passed (Second Class)' },
  { rank: 8, rollNo: '10A-06', name: 'Karan Shah', totalMarks: 388, maxMarks: 600, percentage: 64.6, grade: 'B', status: 'Passed' }
];

const AdminResults = () => {
  const [selectedExam, setSelectedExam] = useState('Mid-Term Examination 2026');
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = rankListData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <img src={logo} alt="School Management" className="w-full h-full object-contain dark:brightness-0 dark:invert transition" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Results Analytics & Merit Leaderboard • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Exam Results & Merit Rankings
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Class rankings, cumulative grade point averages, subject toppers, and pass percentage reports.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Merit List</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Result summary downloaded')}
              className="clay-btn-emerald px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
        <Link
          to="/admin/exams"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Examinations List</span>
        </Link>
        <Link
          to="/admin/exams/marks"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Marks Entry</span>
        </Link>
        <Link
          to="/admin/exams/results"
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Results & Merit Lists</span>
        </Link>
        <Link
          to="/admin/exams/report-card"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Report Cards</span>
        </Link>
      </div>

      {/* Selector Filters */}
      <div className="clay-card p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Examination</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="clay-input w-full px-3 py-2 text-xs font-bold text-slate-800 dark:text-white"
          >
            <option value="Mid-Term Examination 2026">Mid-Term Examination 2026</option>
            <option value="Unit Test 1">Unit Test 1 (Formative)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Class Section</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="clay-input w-full px-3 py-2 text-xs font-bold text-slate-800 dark:text-white"
          >
            <option value="Class 10-A">Class 10-A</option>
            <option value="Class 10-B">Class 10-B</option>
            <option value="Class 9-A">Class 9-A</option>
            <option value="Class 9-B">Class 9-B</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {rankListData.slice(0, 3).map((top, idx) => (
          <div key={top.rank} className="clay-card p-4 flex items-center justify-between relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3 h-3" />
                <span>Rank #{top.rank} Topper</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-800 dark:text-white mt-1">{top.name}</h4>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{top.rollNo} • {top.percentage}%</div>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg clay-icon-pill ${
              idx === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300' :
              idx === 1 ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200' :
              'bg-orange-100 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300'
            }`}>
              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
            </div>
          </div>
        ))}
      </div>

      {/* Full Results Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
            Class {selectedClass} Rank List • {selectedExam}
          </h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate or roll..."
              className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Student & Roll No</th>
                <th className="py-3 px-4">Total Score (Max 600)</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Overall Grade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filtered.map((item) => (
                <tr key={item.rank} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs">
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 dark:text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.rollNo}</div>
                  </td>
                  <td className="py-3 px-4 font-bold font-mono">
                    {item.totalMarks} / {item.maxMarks}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {item.percentage}%
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {item.status}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/admin/exams/report-card"
                      className="clay-btn-secondary px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" />
                      <span>View Card</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
