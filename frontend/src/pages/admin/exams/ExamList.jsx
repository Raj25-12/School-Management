import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Download,
  Printer,
  ChevronRight,
  Filter,
  Layers,
  X,
  Save,
  BarChart3
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';

const initialExams = [
  {
    id: 'EX-201',
    title: 'Mid-Term Examination 2026',
    term: 'Semester 1',
    targetClasses: ['Class 10-A', 'Class 10-B', 'Class 9-A', 'Class 9-B'],
    startDate: '2026-10-15',
    endDate: '2026-10-24',
    totalSubjects: 6,
    status: 'Upcoming',
    maxMarks: 100,
    passingMarks: 40,
    schedule: [
      { date: '2026-10-15', time: '09:00 - 12:00 PM', subject: 'Mathematics', room: 'Hall A' },
      { date: '2026-10-17', time: '09:00 - 12:00 PM', subject: 'Physics', room: 'Hall A' },
      { date: '2026-10-19', time: '09:00 - 12:00 PM', subject: 'Chemistry', room: 'Hall A' },
      { date: '2026-10-21', time: '09:00 - 12:00 PM', subject: 'Biology', room: 'Hall A' },
      { date: '2026-10-23', time: '09:00 - 12:00 PM', subject: 'English', room: 'Hall A' },
      { date: '2026-10-24', time: '09:00 - 12:00 PM', subject: 'Social Science', room: 'Hall A' }
    ]
  },
  {
    id: 'EX-202',
    title: 'Unit Test 1 (Formative Assessment)',
    term: 'Term 1',
    targetClasses: ['Class 10-A', 'Class 10-B'],
    startDate: '2026-08-20',
    endDate: '2026-08-25',
    totalSubjects: 5,
    status: 'Completed',
    maxMarks: 50,
    passingMarks: 20,
    schedule: [
      { date: '2026-08-20', time: '08:30 - 10:00 AM', subject: 'Mathematics', room: 'Room 201' },
      { date: '2026-08-22', time: '08:30 - 10:00 AM', subject: 'Science', room: 'Room 201' },
      { date: '2026-08-25', time: '08:30 - 10:00 AM', subject: 'English', room: 'Room 201' }
    ]
  },
  {
    id: 'EX-203',
    title: 'Senior Secondary Pre-Board 1',
    term: 'Term 2',
    targetClasses: ['Class 11-Science', 'Class 12-Commerce'],
    startDate: '2026-11-05',
    endDate: '2026-11-18',
    totalSubjects: 6,
    status: 'Scheduled',
    maxMarks: 100,
    passingMarks: 35,
    schedule: []
  }
];

const ExamList = () => {
  const { showToast } = useToast();
  const [exams, setExams] = useState(initialExams);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    term: 'Semester 1',
    targetClasses: ['Class 10-A'],
    startDate: '2026-10-15',
    endDate: '2026-10-24',
    totalSubjects: 6,
    status: 'Upcoming',
    maxMarks: 100,
    passingMarks: 40
  });

  const filteredExams = useMemo(() => {
    return exams.filter((ex) => {
      const matchSearch =
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || ex.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [exams, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = exams.length;
    const upcoming = exams.filter((e) => e.status === 'Upcoming' || e.status === 'Scheduled').length;
    const completed = exams.filter((e) => e.status === 'Completed').length;
    return { total, upcoming, completed };
  }, [exams]);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: `EX-${Date.now().toString().slice(-3)}`,
      title: '',
      term: 'Semester 1',
      targetClasses: ['Class 10-A'],
      startDate: '2026-10-15',
      endDate: '2026-10-24',
      totalSubjects: 6,
      status: 'Upcoming',
      maxMarks: 100,
      passingMarks: 40
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ex) => {
    setModalMode('edit');
    setFormData({ ...ex });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast({ title: 'Validation Error', message: 'Exam title is required', type: 'rose' });
      return;
    }

    if (modalMode === 'create') {
      setExams([{ ...formData, id: formData.id || `EX-${Date.now().toString().slice(-3)}`, schedule: [] }, ...exams]);
      showToast({ title: 'Exam Created', message: `${formData.title} has been scheduled.`, type: 'emerald' });
    } else {
      setExams(exams.map((ex) => (ex.id === formData.id ? { ...formData, schedule: ex.schedule || [] } : ex)));
      showToast({ title: 'Exam Updated', message: `${formData.title} details updated.`, type: 'emerald' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setExams(exams.filter((e) => e.id !== id));
    showToast({ title: 'Exam Removed', message: 'Exam schedule deleted successfully.', type: 'rose' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Ongoing':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800';
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
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>Examination & Assessment Controller • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Examinations Management
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Create exam datesheets, manage marks evaluation, publish result analytics, and generate report cards.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/admin/exams/marks"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Marks Entry</span>
            </Link>
            <Link
              to="/admin/exams/results"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Results Analytics</span>
            </Link>
            <button
              type="button"
              onClick={openCreateModal}
              className="clay-btn-emerald px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule New Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
        <Link
          to="/admin/exams"
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Examinations List ({exams.length})</span>
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
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Report Cards</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="clay-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Exams</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-1">{stats.total} Assessments</div>
            <div className="text-xs text-slate-500 mt-0.5">Academic Session 2026-27</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming & Active</span>
            <div className="text-xl font-black text-sky-600 dark:text-sky-400 mt-1">{stats.upcoming} Scheduled</div>
            <div className="text-xs text-slate-500 mt-0.5">Datesheets released</div>
          </div>
          <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 clay-icon-pill">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="clay-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evaluated & Archived</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.completed} Completed</div>
            <div className="text-xs text-slate-500 mt-0.5">Marks & results published</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clay-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam title, term, code..."
            className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="clay-input px-3 py-2 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Main Exams List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.length === 0 ? (
          <div className="col-span-3 clay-card p-10 text-center text-slate-400">
            <Award className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="font-bold text-slate-700 dark:text-slate-300">No examination schedules found.</p>
          </div>
        ) : (
          filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="clay-card p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(exam.status)}`}>
                    {exam.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{exam.id}</span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{exam.term}</p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-mono font-semibold">{exam.startDate} → {exam.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Max / Pass Marks:</span>
                    <span className="font-bold">{exam.maxMarks} / {exam.passingMarks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Classes:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{exam.targetClasses.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(exam)}
                    className="clay-btn-secondary p-1.5 rounded-xl text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                    title="Edit Exam"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(exam.id)}
                    className="clay-btn-secondary p-1.5 rounded-xl text-slate-500 hover:text-rose-600 transition cursor-pointer"
                    title="Delete Exam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  to="/admin/exams/marks"
                  className="clay-btn-emerald px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Enter Marks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800 dark:text-white">
                    {modalMode === 'create' ? 'Schedule Examination' : 'Edit Examination Details'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Academic Session 2026-27</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Exam Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Mid-Term Assessment 2026"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Term / Semester
                  </label>
                  <select
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Annual Final">Annual Final</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Maximum Marks
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Passing Marks
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.passingMarks}
                    onChange={(e) => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="clay-btn-secondary px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-2 text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Examination</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamList;
