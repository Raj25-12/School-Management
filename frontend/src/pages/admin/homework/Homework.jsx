import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Download,
  Eye,
  Trash2,
  Edit,
  Sparkles,
  BookOpen,
  Send,
  Paperclip,
  CheckCheck,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const initialHomeworkList = [
  {
    id: 'HW-101',
    title: 'Quadratic Equations & Polynomials Problem Set',
    subject: 'Mathematics',
    classGrade: 'Class 10-A',
    teacher: 'Prof. Rajesh Sharma',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-02',
    totalStudents: 32,
    submittedCount: 29,
    reviewedCount: 24,
    status: 'Active',
    maxMarks: 25,
    attachment: 'Math_HW_Set4_Polynomials.pdf',
    instructions: 'Complete exercises 4.1 to 4.3 from NCERT textbook. Show all derivation steps clearly and submit neatly scanned copies.',
    submissions: [
      { id: 'sub-1', studentName: 'Alex Johnson', rollNo: '10A-01', submitDate: '2026-09-29 14:20', status: 'Reviewed', marks: 24, remarks: 'Excellent step explanation.' },
      { id: 'sub-2', studentName: 'Riya Sen', rollNo: '10A-02', submitDate: '2026-09-29 16:45', status: 'Reviewed', marks: 23, remarks: 'Good work, verify question 4.' },
      { id: 'sub-3', studentName: 'Rohan Sharma', rollNo: '10A-03', submitDate: '2026-09-30 09:15', status: 'Submitted', marks: null, remarks: '' },
      { id: 'sub-4', studentName: 'Sneha Patel', rollNo: '10A-04', submitDate: '2026-09-30 11:30', status: 'Submitted', marks: null, remarks: '' },
      { id: 'sub-5', studentName: 'Kabir Verma', rollNo: '10A-05', submitDate: null, status: 'Pending', marks: null, remarks: '' }
    ]
  },
  {
    id: 'HW-102',
    title: 'Ray Optics - Reflection & Spherical Mirrors Lab Report',
    subject: 'Physics',
    classGrade: 'Class 12-Science',
    teacher: 'Dr. Sunita Verma',
    assignedDate: '2026-09-27',
    dueDate: '2026-10-01',
    totalStudents: 28,
    submittedCount: 26,
    reviewedCount: 26,
    status: 'Active',
    maxMarks: 20,
    attachment: 'Optics_FocalLength_Calculation.pdf',
    instructions: 'Write the experimental setup, ray diagram sketches, error analysis, and final conclusion for convex lens focal length determination.',
    submissions: [
      { id: 'sub-11', studentName: 'Aman Dixit', rollNo: '12S-01', submitDate: '2026-09-28 18:10', status: 'Reviewed', marks: 19, remarks: 'Clean diagrams.' },
      { id: 'sub-12', studentName: 'Pooja Hegde', rollNo: '12S-02', submitDate: '2026-09-29 10:00', status: 'Reviewed', marks: 20, remarks: 'Perfect calculations.' }
    ]
  },
  {
    id: 'HW-103',
    title: 'Shakespeare’s Julius Caesar - Act 3 Speech Analysis',
    subject: 'English Literature',
    classGrade: 'Class 9-A',
    teacher: 'Mrs. Priya Nair',
    assignedDate: '2026-09-25',
    dueDate: '2026-09-30',
    totalStudents: 35,
    submittedCount: 35,
    reviewedCount: 35,
    status: 'Completed',
    maxMarks: 15,
    attachment: 'Julius_Caesar_Antony_Speech.docx',
    instructions: 'Analyze Mark Antony’s funeral speech rhetorical devices: irony, rhetorical questions, and emotional appeal to the Roman mob.',
    submissions: [
      { id: 'sub-21', studentName: 'Tanvi Joshi', rollNo: '09A-12', submitDate: '2026-09-27 12:00', status: 'Reviewed', marks: 15, remarks: 'Superb literary depth.' }
    ]
  },
  {
    id: 'HW-104',
    title: 'Organic Chemistry - Hydrocarbons & IUPAC Nomenclature',
    subject: 'Chemistry',
    classGrade: 'Class 11-Science',
    teacher: 'Mr. Arvind Gupta',
    assignedDate: '2026-09-29',
    dueDate: '2026-10-05',
    totalStudents: 30,
    submittedCount: 14,
    reviewedCount: 6,
    status: 'Active',
    maxMarks: 30,
    attachment: 'IUPAC_Naming_Rules_Wksht.pdf',
    instructions: 'Solve the 40 structural formula questions attached. Draw structural isomers of pentane and hexane.',
    submissions: []
  },
  {
    id: 'HW-105',
    title: 'Python Functions & Recursion Practice Problems',
    subject: 'Computer Science',
    classGrade: 'Class 10-B',
    teacher: 'Mr. Deepak Mehta',
    assignedDate: '2026-09-26',
    dueDate: '2026-10-03',
    totalStudents: 30,
    submittedCount: 22,
    reviewedCount: 18,
    status: 'Active',
    maxMarks: 20,
    attachment: 'Python_Recursion_Set2.py',
    instructions: 'Implement recursive Fibonacci, Factorial, and Tower of Hanoi functions with proper docstrings and test cases.',
    submissions: []
  }
];

const Homework = () => {
  const { showToast } = useToast();
  const [homeworkList, setHomeworkList] = useState(initialHomeworkList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);

  // Form for new Homework
  const [formHW, setFormHW] = useState({
    title: '',
    subject: 'Mathematics',
    classGrade: 'Class 10-A',
    teacher: 'Prof. Rajesh Sharma',
    dueDate: '2026-10-05',
    maxMarks: 20,
    instructions: '',
    attachmentName: 'Assignment_Notes.pdf'
  });

  // Calculate metrics
  const totalAssignments = homeworkList.length;
  const activeAssignments = homeworkList.filter(h => h.status === 'Active').length;
  const totalSubmissions = homeworkList.reduce((acc, h) => acc + h.submittedCount, 0);
  const totalExpected = homeworkList.reduce((acc, h) => acc + h.totalStudents, 0);
  const submissionRate = Math.round((totalSubmissions / (totalExpected || 1)) * 100);

  // Filtered Homework
  const filteredList = homeworkList.filter(hw => {
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedClass !== 'All Classes' && hw.classGrade !== selectedClass) return false;
    if (selectedSubject !== 'All Subjects' && hw.subject !== selectedSubject) return false;
    if (selectedStatus !== 'All' && hw.status !== selectedStatus) return false;
    return true;
  });

  const handleCreateHomework = (e) => {
    e.preventDefault();
    if (!formHW.title.trim()) {
      showToast({ title: 'Validation Error', message: 'Homework Title is required.', type: 'error' });
      return;
    }

    const newEntry = {
      id: `HW-${Math.floor(100 + Math.random() * 900)}`,
      title: formHW.title,
      subject: formHW.subject,
      classGrade: formHW.classGrade,
      teacher: formHW.teacher,
      assignedDate: new Date().toISOString().slice(0, 10),
      dueDate: formHW.dueDate,
      totalStudents: 32,
      submittedCount: 0,
      reviewedCount: 0,
      status: 'Active',
      maxMarks: Number(formHW.maxMarks) || 20,
      attachment: formHW.attachmentName || 'Homework_Sheet.pdf',
      instructions: formHW.instructions || 'Complete all questions as specified.',
      submissions: []
    };

    setHomeworkList([newEntry, ...homeworkList]);
    setIsCreateModalOpen(false);
    setFormHW({
      title: '',
      subject: 'Mathematics',
      classGrade: 'Class 10-A',
      teacher: 'Prof. Rajesh Sharma',
      dueDate: '2026-10-05',
      maxMarks: 20,
      instructions: '',
      attachmentName: 'Assignment_Notes.pdf'
    });

    showToast({
      title: 'Homework Assigned',
      message: `Assignment successfully published for ${newEntry.classGrade}.`,
      type: 'success'
    });
  };

  const handleDeleteHomework = (id) => {
    if (window.confirm('Delete this homework assignment record?')) {
      setHomeworkList(homeworkList.filter(h => h.id !== id));
      showToast({ title: 'Removed', message: 'Homework entry deleted.', type: 'info' });
    }
  };

  const handleOpenSubmissions = (hw) => {
    setSelectedHomework(hw);
    setIsSubmissionsModalOpen(true);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Academics & Daily Task Administration</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Homework & Assignment Desk
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Publish class assignments, track student digital submissions, evaluate scores, and monitor submission punctuality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Assign Homework</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Assignments
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalAssignments} Tasks</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Curriculum Active</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Due Soon
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{activeAssignments} Open</div>
            <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">Awaiting Deadlines</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Submissions Handed In
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalSubmissions} Works</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">From all sections</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <CheckCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Campus Submission Rate
            </span>
            <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{submissionRate}%</div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Average Punctuality</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🔍 Search & Filters Bar */}
      <div className="clay-card p-3.5 sm:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search homework by title, teacher, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs pb-1 md:pb-0">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold shrink-0">Class:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="clay-input px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="All Classes">All Classes</option>
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 10-B">Class 10-B</option>
                <option value="Class 9-A">Class 9-A</option>
                <option value="Class 11-Science">Class 11-Science</option>
                <option value="Class 12-Science">Class 12-Science</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold shrink-0">Subject:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="clay-input px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English Literature">English Literature</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold shrink-0">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="clay-input px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 📚 Homework Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredList.length === 0 ? (
          <div className="col-span-3 clay-card p-10 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No homework assignments found</p>
            <p className="text-xs text-slate-400 mt-0.5">Try changing your filters or create a new assignment.</p>
          </div>
        ) : (
          filteredList.map((hw) => {
            const isCompleted = hw.status === 'Completed';
            const progress = Math.round((hw.submittedCount / (hw.totalStudents || 1)) * 100);

            return (
              <div
                key={hw.id}
                className="clay-card p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition relative overflow-hidden"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60">
                        {hw.classGrade}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {hw.subject}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-emerald-500 text-white shadow-xs'
                    }`}>
                      {hw.status}
                    </span>
                  </div>

                  {/* Title & Instructions */}
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug mb-1">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {hw.instructions}
                  </p>

                  {/* Meta Details */}
                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Assigned By:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{hw.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Due Date:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {hw.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Max Marks:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{hw.maxMarks} Pts</span>
                    </div>
                  </div>

                  {/* Submission Progress */}
                  <div className="mt-3.5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Submissions Progress</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {hw.submittedCount} / {hw.totalStudents} ({progress}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenSubmissions(hw)}
                    className="clay-btn-emerald flex-1 py-1.5 px-3 text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Submissions ({hw.submittedCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteHomework(hw.id)}
                    className="clay-btn-secondary p-2 rounded-xl text-slate-400 hover:text-rose-600 transition cursor-pointer shrink-0"
                    title="Delete Homework"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 📝 Create Homework Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Publish New Homework Assignment
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Assign coursework with instructions and attachments
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHomework} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Linear Equations Chapter 3 Review Problems"
                  value={formHW.title}
                  onChange={(e) => setFormHW({ ...formHW, title: e.target.value })}
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Class & Section
                  </label>
                  <select
                    value={formHW.classGrade}
                    onChange={(e) => setFormHW({ ...formHW, classGrade: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 10-B">Class 10-B</option>
                    <option value="Class 9-A">Class 9-A</option>
                    <option value="Class 8-A">Class 8-A</option>
                    <option value="Class 11-Science">Class 11-Science</option>
                    <option value="Class 12-Science">Class 12-Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={formHW.subject}
                    onChange={(e) => setFormHW({ ...formHW, subject: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English Literature">English Literature</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Submission Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formHW.dueDate}
                    onChange={(e) => setFormHW({ ...formHW, dueDate: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Max Marks
                  </label>
                  <input
                    type="number"
                    value={formHW.maxMarks}
                    onChange={(e) => setFormHW({ ...formHW, maxMarks: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned By (Faculty Teacher)
                </label>
                <input
                  type="text"
                  value={formHW.teacher}
                  onChange={(e) => setFormHW({ ...formHW, teacher: e.target.value })}
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Instructions & Guidelines
                </label>
                <textarea
                  rows={3}
                  value={formHW.instructions}
                  onChange={(e) => setFormHW({ ...formHW, instructions: e.target.value })}
                  placeholder="Provide step-by-step homework directions, reference chapters, and formatting expectations..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="clay-btn-secondary px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📋 Submissions Review Modal */}
      {isSubmissionsModalOpen && selectedHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Student Submissions & Evaluation Roster
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedHomework.title} • {selectedHomework.classGrade} ({selectedHomework.subject})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmissionsModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Submissions Table */}
            <div className="max-h-80 overflow-y-auto overflow-x-auto border border-slate-200/80 dark:border-slate-700 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Roll No</th>
                    <th className="py-2.5 px-3">Submission Time</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Marks / Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(selectedHomework.submissions && selectedHomework.submissions.length > 0) ? (
                    selectedHomework.submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-semibold text-slate-800 dark:text-white">
                          {sub.studentName}
                        </td>
                        <td className="py-2 px-3 text-slate-500">{sub.rollNo}</td>
                        <td className="py-2 px-3 text-slate-500 text-[11px]">{sub.submitDate || 'Not submitted'}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            sub.status === 'Reviewed'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : sub.status === 'Submitted'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-slate-800 dark:text-white">
                          {sub.marks !== null ? `${sub.marks} / ${selectedHomework.maxMarks}` : '—'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-400">
                        No individual student records logged for this test homework yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsSubmissionsModalOpen(false)}
                className="clay-btn-emerald px-4 py-1.5 text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homework;
