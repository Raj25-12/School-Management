import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Save,
  Search,
  CheckCircle2,
  Award,
  BarChart3,
  Printer,
  ChevronDown,
  Sparkles,
  Download
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';

const initialStudentsMarks = [
  { id: 'STU-101', rollNo: '10A-01', name: 'Rohan Sharma', marks: 88, maxMarks: 100, grade: 'A', remarks: 'Excellent understanding of concepts' },
  { id: 'STU-102', rollNo: '10A-02', name: 'Alex Johnson', marks: 94, maxMarks: 100, grade: 'A+', remarks: 'Top scorer in calculus' },
  { id: 'STU-103', rollNo: '10A-03', name: 'Priya Gupta', marks: 76, maxMarks: 100, grade: 'B+', remarks: 'Good attempt, needs trigonometry practice' },
  { id: 'STU-104', rollNo: '10A-04', name: 'Aarav Mehta', marks: 68, maxMarks: 100, grade: 'B', remarks: 'Average performance' },
  { id: 'STU-105', rollNo: '10A-05', name: 'Pooja Verma', marks: 82, maxMarks: 100, grade: 'A', remarks: 'Very consistent' },
  { id: 'STU-106', rollNo: '10A-06', name: 'Karan Shah', marks: 54, maxMarks: 100, grade: 'C', remarks: 'Needs extra remedial support' },
  { id: 'STU-107', rollNo: '10A-07', name: 'Ananya Roy', marks: 91, maxMarks: 100, grade: 'A+', remarks: 'Outstanding presentation' },
  { id: 'STU-108', rollNo: '10A-08', name: 'Kabir Das', marks: 73, maxMarks: 100, grade: 'B+', remarks: 'Steady progress' }
];

const AdminMarks = () => {
  const { showToast } = useToast();
  const [selectedExam, setSelectedExam] = useState('Mid-Term Examination 2026');
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentsList, setStudentsList] = useState(initialStudentsMarks);

  const handleMarkChange = (id, newMarks) => {
    const val = Number(newMarks);
    setStudentsList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          let grade = 'F';
          if (val >= 90) grade = 'A+';
          else if (val >= 80) grade = 'A';
          else if (val >= 70) grade = 'B+';
          else if (val >= 60) grade = 'B';
          else if (val >= 50) grade = 'C';
          else if (val >= 40) grade = 'D';
          return { ...s, marks: val, grade };
        }
        return s;
      })
    );
  };

  const handleSaveAll = () => {
    showToast({
      title: 'Marks Saved Successfully ✅',
      message: `Evaluation marks for ${selectedSubject} (${selectedClass}) stored.`,
      type: 'emerald'
    });
  };

  const filteredStudents = useMemo(() => {
    return studentsList.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [studentsList, searchQuery]);

  const stats = useMemo(() => {
    const total = studentsList.length;
    const totalMarks = studentsList.reduce((acc, s) => acc + s.marks, 0);
    const avg = total > 0 ? (totalMarks / total).toFixed(1) : 0;
    const passed = studentsList.filter((s) => s.marks >= 40).length;
    const topScore = Math.max(...studentsList.map((s) => s.marks), 0);
    return { total, avg, passed, topScore };
  }, [studentsList]);

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
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span>Marks Evaluation & Entry Sheet • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Subject Marks Entry
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Input student marks, calculate automated grades, and publish report evaluations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSaveAll}
              className="clay-btn-emerald px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Evaluation</span>
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
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Marks Entry</span>
        </Link>
        <Link
          to="/admin/exams/results"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
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

      {/* Selector Controls Bar */}
      <div className="clay-card p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Exam</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="clay-input w-full px-3 py-2 text-xs font-bold text-slate-800 dark:text-white"
          >
            <option value="Mid-Term Examination 2026">Mid-Term Examination 2026</option>
            <option value="Unit Test 1">Unit Test 1 (Formative)</option>
            <option value="Pre-Board Exam">Pre-Board Exam 2026</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Class</label>
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

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="clay-input w-full px-3 py-2 text-xs font-bold text-slate-800 dark:text-white"
          >
            <option value="Mathematics">Mathematics (Max 100)</option>
            <option value="Physics">Physics (Max 100)</option>
            <option value="Chemistry">Chemistry (Max 100)</option>
            <option value="Biology">Biology (Max 100)</option>
            <option value="English">English Literature (Max 100)</option>
          </select>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Class Average</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{stats.avg}%</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 clay-icon-pill">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Highest Score</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">{stats.topScore} / 100</div>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 text-sky-600 clay-icon-pill">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Passed Rate</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">
              {((stats.passed / stats.total) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Candidates</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">{stats.total} Enrolled</div>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-600 clay-icon-pill">
            <FileText className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Marks Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
            {selectedSubject} Marks Sheet • {selectedClass}
          </h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or roll..."
              className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Student & Roll No</th>
                <th className="py-3 px-4 w-36">Obtained Marks (Max 100)</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Teacher's Evaluation Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 dark:text-white">{stu.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{stu.rollNo}</div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={stu.marks}
                      onChange={(e) => handleMarkChange(stu.id, e.target.value)}
                      className="clay-input w-24 px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-white text-center focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-lg font-black text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {stu.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stu.marks >= 40
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {stu.marks >= 40 ? 'Passed' : 'Needs Improvement'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs">
                    {stu.remarks}
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

export default AdminMarks;
