import React, { useCallback } from 'react';
import {
  Award,
  Printer,
  Trophy,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

const academicTermResults = {
  termName: 'Half-Yearly Examination 2026',
  studentName: 'Alex Johnson',
  rollNo: '10A-01',
  classGrade: 'Class 10-A',
  rank: '1st in Class (Rank 1)',
  aggregateScore: 476,
  maxTotal: 500,
  percentage: 95.2,
  finalGrade: 'A1 (Outstanding)',
  subjects: [
    { name: 'Mathematics', theory: 78, practical: 20, max: 100, total: 98, grade: 'A1', remarks: 'Outstanding proofs & calculations' },
    { name: 'Physics & Science', theory: 74, practical: 19, max: 100, total: 93, grade: 'A1', remarks: 'Excellent lab performance' },
    { name: 'Chemistry', theory: 72, practical: 20, max: 100, total: 92, grade: 'A1', remarks: 'Good conceptual clarity' },
    { name: 'English Literature', theory: 76, practical: 19, max: 100, total: 95, grade: 'A1', remarks: 'Superb expressive writing' },
    { name: 'Computer Science', theory: 78, practical: 20, max: 100, total: 98, grade: 'A1', remarks: 'Flawless code logic' },
  ]
};

const MyResults = () => {
  const result = academicTermResults;

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <div className="clay-card p-4 sm:p-5 relative overflow-hidden bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <Award className="w-3.5 h-3.5 text-sky-700" />
              <span>Official Academic Performance Card</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Academic Term Results & Merit Report
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Subject-wise marks breakdown, GPA grade conversion, class ranking, and printable report card.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-sky px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🏆 Merit Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Overall Score</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">{result.percentage}%</div>
            <span className="text-[10px] font-semibold text-emerald-600">{result.aggregateScore} / {result.maxTotal} Marks</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Class Rank</span>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">🥇 1st Rank</div>
            <span className="text-[10px] font-semibold text-slate-500">{result.classGrade} Topper</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 clay-icon-pill">
            <Trophy className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Final Grade</span>
            <div className="text-xl font-black text-sky-700 dark:text-sky-300 mt-0.5">{result.finalGrade}</div>
            <span className="text-[10px] font-semibold text-slate-500">Distinction</span>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 clay-icon-pill">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Passing Status</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">PASSED</div>
            <span className="text-[10px] font-semibold text-slate-500">Eligible for Term 2</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 📋 Official Report Card Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black text-slate-800 dark:text-white">
              {result.termName} • Subject Breakdown
            </h2>
            <p className="text-[11px] text-slate-500">Student: {result.studentName} ({result.rollNo})</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sky-50/50 dark:bg-sky-950/30 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Theory (Max 80)</th>
                <th className="py-3 px-4">Practical / IA (Max 20)</th>
                <th className="py-3 px-4">Total Marks (100)</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {result.subjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">{sub.name}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{sub.theory}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{sub.practical}</td>
                  <td className="py-3 px-4 font-black text-slate-800 dark:text-white">{sub.total} / {sub.max}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500 dark:text-slate-400">{sub.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
