import React, { useState } from 'react';
import {
  Award,
  Save,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Printer,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const initialStudentMarks = [
  { id: '1', rollNo: '10A-01', name: 'Alex Johnson', marksObtained: 78, maxMarks: 80, remarks: 'Outstanding proofs.' },
  { id: '2', rollNo: '10A-02', name: 'Riya Sen', marksObtained: 74, maxMarks: 80, remarks: 'Very good execution.' },
  { id: '3', rollNo: '10A-03', name: 'Rohan Sharma', marksObtained: 68, maxMarks: 80, remarks: 'Review question 5 algebra.' },
  { id: '4', rollNo: '10A-04', name: 'Sneha Patel', marksObtained: 71, maxMarks: 80, remarks: 'Clean presentation.' },
  { id: '5', rollNo: '10A-05', name: 'Kabir Verma', marksObtained: 42, maxMarks: 80, remarks: 'Needs remedial practice.' },
  { id: '6', rollNo: '10A-06', name: 'Ananya Roy', marksObtained: 76, maxMarks: 80, remarks: 'High distinction.' },
  { id: '7', rollNo: '10A-07', name: 'Vikram Mehta', marksObtained: 55, maxMarks: 80, remarks: 'Satisfactory.' },
  { id: '8', rollNo: '10A-08', name: 'Pooja Hegde', marksObtained: 79, maxMarks: 80, remarks: 'Class high scorer.' }
];

const TeacherMarks = () => {
  const { showToast } = useToast();
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedExam, setSelectedExam] = useState('Half-Yearly Mid-Term 2026');
  const [marksList, setMarksList] = useState(initialStudentMarks);
  const [searchQuery, setSearchQuery] = useState('');

  const calculateGrade = (score, max) => {
    const pct = (score / max) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 35) return 'D';
    return 'F';
  };

  const handleScoreChange = (id, newScore) => {
    setMarksList(prev =>
      prev.map(st => st.id === id ? { ...st, marksObtained: Number(newScore) || 0 } : st)
    );
  };

  const handleRemarksChange = (id, newRemarks) => {
    setMarksList(prev =>
      prev.map(st => st.id === id ? { ...st, remarks: newRemarks } : st)
    );
  };

  const handleSaveMarks = (e) => {
    e.preventDefault();
    showToast({
      title: 'Marks Saved',
      message: `Updated subject marks sheet for ${selectedClass} (${selectedSubject}).`,
      type: 'success'
    });
  };

  const filteredMarks = marksList.filter(st =>
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <div className="clay-card p-4 sm:p-5 relative overflow-hidden bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Assessment & Grade Entry Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Subject Examination Marks Entry Sheet
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Input student scores, auto-calculate grading brackets (A+ to F), and save official remarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              onClick={handleSaveMarks}
              className="clay-btn-sand px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Marks Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🔍 Filters Bar */}
      <div className="clay-card p-3.5 sm:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Class</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="clay-input px-3 py-1.5 font-bold text-slate-800 dark:text-white w-full"
              >
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 10-B">Class 10-B</option>
                <option value="Class 9-A">Class 9-A</option>
                <option value="Class 11-Science">Class 11-Science</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Exam Term</span>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="clay-input px-3 py-1.5 font-bold text-slate-800 dark:text-white w-full"
              >
                <option value="Half-Yearly Mid-Term 2026">Half-Yearly Mid-Term 2026</option>
                <option value="Unit Test 1 (Periodic)">Unit Test 1 (Periodic)</option>
                <option value="Annual Final Exam 2026">Annual Final Exam 2026</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Subject</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="clay-input px-3 py-1.5 font-bold text-slate-800 dark:text-white w-full"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
          </div>

          <div className="relative w-full sm:w-56 self-end">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-7 pr-2 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 📋 Marks Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Score Entry Sheet • {selectedClass} ({selectedSubject})</span>
            <span className="text-xs font-normal text-slate-400">Max: 80 Marks</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/50 dark:bg-amber-950/30 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-4">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-4">Marks Obtained (Max 80)</th>
                <th className="py-2.5 px-4">Percentage</th>
                <th className="py-2.5 px-4">Grade</th>
                <th className="py-2.5 px-4 text-right">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMarks.map((st) => {
                const pct = Math.round((st.marksObtained / st.maxMarks) * 100);
                const grade = calculateGrade(st.marksObtained, st.maxMarks);

                return (
                  <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-600 dark:text-slate-300">
                      {st.rollNo}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                      {st.name}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={0}
                        max={st.maxMarks}
                        value={st.marksObtained}
                        onChange={(e) => handleScoreChange(st.id, e.target.value)}
                        className="clay-input px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-white w-20 text-center"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">
                      {pct}%
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        grade.startsWith('A')
                          ? 'bg-emerald-100 text-emerald-700'
                          : grade.startsWith('B')
                          ? 'bg-blue-100 text-blue-700'
                          : grade === 'F'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="text"
                        placeholder="Add remarks..."
                        value={st.remarks}
                        onChange={(e) => handleRemarksChange(st.id, e.target.value)}
                        className="clay-input px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 w-52 text-right"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherMarks;
