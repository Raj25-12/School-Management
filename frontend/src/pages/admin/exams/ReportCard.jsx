import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  Download,
  Award,
  FileText,
  BarChart3,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';

const ReportCard = () => {
  const [selectedStudent, setSelectedStudent] = useState('Alex Johnson');
  const [selectedTerm, setSelectedTerm] = useState('Mid-Term Examination 2026');

  const reportData = {
    student: {
      name: 'Alex Johnson',
      rollNo: '10A-02',
      id: 'STU-1043',
      class: 'Class 10-A',
      dob: '2010-05-14',
      fatherName: 'Robert Johnson',
      attendanceRate: '96.5%',
      academicYear: '2026-2027'
    },
    subjects: [
      { name: 'Mathematics', maxMarks: 100, obtained: 94, grade: 'A+', teacherRemark: 'Outstanding analytical skills' },
      { name: 'Physics', maxMarks: 100, obtained: 91, grade: 'A+', teacherRemark: 'Strong conceptual clarity in optics' },
      { name: 'Chemistry', maxMarks: 100, obtained: 88, grade: 'A', teacherRemark: 'Very thorough in lab practicals' },
      { name: 'Biology', maxMarks: 100, obtained: 92, grade: 'A+', teacherRemark: 'Well drawn diagrams and thorough notes' },
      { name: 'English Literature', maxMarks: 100, obtained: 86, grade: 'A', teacherRemark: 'Good comprehension & creative essays' },
      { name: 'Social Science', maxMarks: 100, obtained: 89, grade: 'A', teacherRemark: 'Excellent understanding of world history' },
    ],
    overall: {
      totalObtained: 540,
      totalMax: 600,
      percentage: '90.0%',
      overallGrade: 'A+',
      rankInClass: 'Rank 1 / 42 Students',
      principalRemarks: 'Alex has shown remarkable dedication, discipline, and academic excellence throughout the term. Keep up the high standards!',
      resultStatus: 'PROMOTED / PASSED WITH DISTINCTION'
    }
  };

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
                <Printer className="w-3.5 h-3.5 text-emerald-500" />
                <span>Student Academic Progress Card • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Official Report Card Generator
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Generate, customize, and print CBSE/ICSE standard term progress report cards.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="clay-btn-emerald px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md text-white"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report Card</span>
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
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Results & Merit Lists</span>
        </Link>
        <Link
          to="/admin/exams/report-card"
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Report Cards</span>
        </Link>
      </div>

      {/* Select Candidate & Term */}
      <div className="clay-card p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Candidate</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="clay-input w-full px-3 py-2 text-xs font-bold text-slate-800 dark:text-white"
          >
            <option value="Alex Johnson">Alex Johnson (10A-02)</option>
            <option value="Rohan Sharma">Rohan Sharma (10A-01)</option>
            <option value="Priya Gupta">Priya Gupta (10A-03)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Examination Term</label>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="clay-input w-full px-3 py-2 text-xs font-bold text-slate-800 dark:text-white"
          >
            <option value="Mid-Term Examination 2026">Mid-Term Examination 2026</option>
            <option value="Annual Examination">Annual Cumulative 2026-27</option>
          </select>
        </div>
      </div>

      {/* Printable Report Card Sheet */}
      <div className="clay-card p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto space-y-6">
        {/* School Crest & Header */}
        <div className="text-center pb-6 border-b-2 border-emerald-500/80">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-slate-800 p-2.5 mx-auto mb-2 clay-icon-pill flex items-center justify-center border border-emerald-300">
            <img src={logo} alt="School Management" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Greenwood Public High School
          </h2>
          <p className="text-xs text-slate-500 font-medium">Affiliated to Central Board of Secondary Education • School Code: 40921</p>
          <div className="inline-block mt-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-xs tracking-wider uppercase">
            Official Student Progress Report • {selectedTerm}
          </div>
        </div>

        {/* Student Profile Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
          <div>
            <span className="text-slate-400 font-medium">Student Name:</span>
            <div className="font-extrabold text-slate-800 dark:text-white text-sm">{reportData.student.name}</div>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Roll No / ID:</span>
            <div className="font-bold text-slate-800 dark:text-white font-mono">{reportData.student.rollNo} ({reportData.student.id})</div>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Class & Section:</span>
            <div className="font-bold text-slate-800 dark:text-white">{reportData.student.class}</div>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Attendance Rate:</span>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">{reportData.student.attendanceRate}</div>
          </div>
        </div>

        {/* Subject Marks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-y border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/70 text-[11px] font-extrabold uppercase text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4 text-center">Max Marks</th>
                <th className="py-3 px-4 text-center">Marks Obtained</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4">Teacher Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {reportData.subjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">{sub.name}</td>
                  <td className="py-3 px-4 text-center text-slate-500 font-mono">{sub.maxMarks}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-white font-mono">{sub.obtained}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs">{sub.teacherRemark}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50/60 dark:bg-emerald-950/40 font-extrabold text-slate-900 dark:text-white">
                <td className="py-3.5 px-4 uppercase">Grand Aggregate Total</td>
                <td className="py-3.5 px-4 text-center font-mono">{reportData.overall.totalMax}</td>
                <td className="py-3.5 px-4 text-center font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  {reportData.overall.totalObtained}
                </td>
                <td className="py-3.5 px-4 text-center font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  {reportData.overall.percentage}
                </td>
                <td className="py-3.5 px-4 font-mono text-emerald-700 dark:text-emerald-300">
                  {reportData.overall.rankInClass}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Remarks & Principal Sign */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Principal & Headmaster's Assessment Remarks:</div>
          <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">
            "{reportData.overall.principalRemarks}"
          </p>
        </div>

        {/* Signatures */}
        <div className="pt-10 flex items-center justify-between text-center text-xs font-bold text-slate-600 dark:text-slate-400">
          <div className="border-t border-slate-400 pt-2 w-40">
            Class Teacher Signature
          </div>
          <div className="border-t border-slate-400 pt-2 w-40">
            Parent / Guardian Signature
          </div>
          <div className="border-t border-slate-400 pt-2 w-40 font-black text-emerald-700 dark:text-emerald-400">
            Principal Stamp & Sign
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
