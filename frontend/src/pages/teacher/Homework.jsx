import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  CheckCheck,
  Eye,
  Trash2,
  Sparkles,
  Send,
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const defaultTeacherHomework = [
  {
    id: 'HW-T1',
    title: 'Quadratic Equations & Polynomials Problem Set',
    classGrade: 'Class 10-A',
    subject: 'Mathematics',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-02',
    totalStudents: 32,
    submittedCount: 29,
    reviewedCount: 24,
    maxMarks: 25,
    status: 'Active',
    instructions: 'Complete exercises 4.1 to 4.3 from NCERT textbook. Show step-by-step derivation.',
    submissions: [
      { id: '1', studentName: 'Alex Johnson', rollNo: '10A-01', submitDate: '2026-09-29', marks: 24, status: 'Reviewed' },
      { id: '2', studentName: 'Riya Sen', rollNo: '10A-02', submitDate: '2026-09-29', marks: 23, status: 'Reviewed' },
      { id: '3', studentName: 'Rohan Sharma', rollNo: '10A-03', submitDate: '2026-09-30', marks: null, status: 'Submitted' },
      { id: '4', studentName: 'Kabir Verma', rollNo: '10A-05', submitDate: null, marks: null, status: 'Pending' }
    ]
  },
  {
    id: 'HW-T2',
    title: 'Coordinate Geometry & Distance Formula Practice',
    classGrade: 'Class 10-B',
    subject: 'Mathematics',
    assignedDate: '2026-09-29',
    dueDate: '2026-10-04',
    totalStudents: 30,
    submittedCount: 18,
    reviewedCount: 12,
    maxMarks: 20,
    status: 'Active',
    instructions: 'Solve the 15 worksheet problems on distance and section formulas.',
    submissions: []
  },
  {
    id: 'HW-T3',
    title: 'Triangle Theorems & Congruence Proofs',
    classGrade: 'Class 9-A',
    subject: 'Mathematics',
    assignedDate: '2026-09-25',
    dueDate: '2026-09-30',
    totalStudents: 35,
    submittedCount: 35,
    reviewedCount: 35,
    maxMarks: 15,
    status: 'Completed',
    instructions: 'Write formal Euclidean geometric proofs for midpoint and angle bisector theorems.',
    submissions: []
  }
];

const TeacherHomework = () => {
  const { showToast } = useToast();
  const [homeworkList, setHomeworkList] = useState(defaultTeacherHomework);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [formHW, setFormHW] = useState({
    title: '',
    classGrade: 'Class 10-A',
    subject: 'Mathematics',
    dueDate: '2026-10-05',
    maxMarks: 20,
    instructions: ''
  });

  const handleCreateHW = (e) => {
    e.preventDefault();
    if (!formHW.title.trim()) return;

    const newHW = {
      id: `HW-T${Math.floor(100 + Math.random() * 900)}`,
      title: formHW.title,
      classGrade: formHW.classGrade,
      subject: formHW.subject,
      assignedDate: new Date().toISOString().slice(0, 10),
      dueDate: formHW.dueDate,
      totalStudents: 32,
      submittedCount: 0,
      reviewedCount: 0,
      maxMarks: Number(formHW.maxMarks) || 20,
      status: 'Active',
      instructions: formHW.instructions || 'Complete assignment as requested.',
      submissions: []
    };

    setHomeworkList([newHW, ...homeworkList]);
    setIsModalOpen(false);
    setFormHW({
      title: '',
      classGrade: 'Class 10-A',
      subject: 'Mathematics',
      dueDate: '2026-10-05',
      maxMarks: 20,
      instructions: ''
    });

    showToast({
      title: 'Homework Assigned',
      message: `Assignment published for ${newHW.classGrade}.`,
      type: 'success'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this homework assignment?')) {
      setHomeworkList(homeworkList.filter(h => h.id !== id));
      showToast({ title: 'Removed', message: 'Homework assignment deleted.', type: 'info' });
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <div className="clay-card p-4 sm:p-5 relative overflow-hidden bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Homework & Daily Assignment Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Class Homework & Digital Evaluation
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Assign coursework, review student digital submissions, assign scores, and provide corrective feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="clay-btn-sand px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Assign Homework</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📚 Homework Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {homeworkList.map((hw) => {
          const progress = Math.round((hw.submittedCount / (hw.totalStudents || 1)) * 100);
          return (
            <div
              key={hw.id}
              className="clay-card p-4 sm:p-5 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 transition relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                    {hw.classGrade} • {hw.subject}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    hw.status === 'Completed'
                      ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      : 'bg-emerald-500 text-white shadow-xs'
                  }`}>
                    {hw.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug mb-1">
                  {hw.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {hw.instructions}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 bg-amber-50/60 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-800/40">
                  <div className="flex items-center justify-between">
                    <span>Due Date:</span>
                    <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {hw.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Max Marks:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{hw.maxMarks} Points</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Submissions</span>
                    <span className="font-black text-amber-800 dark:text-amber-300">
                      {hw.submittedCount} / {hw.totalStudents} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => { setSelectedHomework(hw); setIsReviewOpen(true); }}
                  className="clay-btn-sand flex-1 py-1.5 px-3 text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[#2b1804] dark:text-[#fff9ed]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review Submissions ({hw.submittedCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(hw.id)}
                  className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-rose-600 transition cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-5 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 clay-icon-pill">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Assign New Homework
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHW} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={formHW.title}
                  onChange={(e) => setFormHW({ ...formHW, title: e.target.value })}
                  placeholder="e.g. Chapter 4 Exercise 4.2 Proofs"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Class
                  </label>
                  <select
                    value={formHW.classGrade}
                    onChange={(e) => setFormHW({ ...formHW, classGrade: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 10-B">Class 10-B</option>
                    <option value="Class 9-A">Class 9-A</option>
                    <option value="Class 11-Science">Class 11-Science</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formHW.dueDate}
                    onChange={(e) => setFormHW({ ...formHW, dueDate: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Instructions & Guidelines
                </label>
                <textarea
                  rows={3}
                  value={formHW.instructions}
                  onChange={(e) => setFormHW({ ...formHW, instructions: e.target.value })}
                  placeholder="Specify question numbers, submission format, and criteria..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="clay-btn-secondary px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-sand px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md text-[#2b1804] dark:text-[#fff9ed]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewOpen && selectedHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-xl w-full p-5 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 clay-icon-pill">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Submission Review & Grading
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedHomework.title} • {selectedHomework.classGrade}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto border border-slate-200/80 dark:border-slate-700 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-50/50 dark:bg-amber-950/30 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Roll No</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(selectedHomework.submissions && selectedHomework.submissions.length > 0) ? (
                    selectedHomework.submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-white">{sub.studentName}</td>
                        <td className="py-2.5 px-3 text-slate-500">{sub.rollNo}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            sub.status === 'Reviewed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : sub.status === 'Submitted'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800 dark:text-white">
                          {sub.marks !== null ? `${sub.marks} / ${selectedHomework.maxMarks}` : '—'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400">
                        No submissions logged yet for this assignment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                className="clay-btn-sand px-4 py-1.5 text-xs font-bold cursor-pointer text-[#2b1804] dark:text-[#fff9ed]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherHomework;
