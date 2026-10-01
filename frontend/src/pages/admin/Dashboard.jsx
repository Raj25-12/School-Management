import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  GraduationCap,
  UserCheck,
  CreditCard,
  ArrowUpRight,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  Building2,
  CalendarCheck,
  Sparkles,
  ChevronRight,
  Bell,
  Send,
  Mail,
  Pin,
  Phone,
  Edit,
  Eye,
  Save,
  CheckCircle2,
  HeartHandshake,
  Briefcase,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredStudents, updateStoredStudent } from '../../utils/studentStorage';
import { getStoredParents, updateStoredParent } from '../../utils/parentStorage';
import { MaleIcon, FemaleIcon } from '../../components/common/GenderIcons';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { notifications, sendNotification } = useNotifications();
  const { showToast } = useToast();

  const [isQuickBroadcastOpen, setIsQuickBroadcastOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickAudience, setQuickAudience] = useState('all');

  // Dynamic Students List loaded from storage
  const [studentsList, setStudentsList] = useState(() => getStoredStudents());

  // Dynamic Parents List loaded from storage
  const [parentsList, setParentsList] = useState(() => getStoredParents());

  // Quick Edit Student Modal State
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    rollNo: '',
    class: '',
    section: '',
    fatherName: '',
    motherName: '',
    contact: '',
    status: 'Active'
  });

  // Quick Edit Parent Modal State
  const [isEditParentModalOpen, setIsEditParentModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState(null);
  const [parentForm, setParentForm] = useState({
    fatherName: '',
    motherName: '',
    wardName: '',
    wardRollNo: '',
    wardClass: '',
    phone: '',
    email: '',
    occupation: '',
    address: '',
    portalStatus: 'Active',
    feesStatus: 'Paid'
  });

  // Listen to updates from other tabs or Edit pages
  useEffect(() => {
    const handleUpdate = () => {
      setStudentsList(getStoredStudents());
      setParentsList(getStoredParents());
    };
    window.addEventListener('school_students_updated', handleUpdate);
    window.addEventListener('school_parents_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_students_updated', handleUpdate);
      window.removeEventListener('school_parents_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const openQuickEdit = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name || '',
      rollNo: student.rollNo || '',
      class: student.class || 'Class 10',
      section: student.section || 'A',
      fatherName: student.fatherName || '',
      motherName: student.motherName || '',
      contact: student.contact || '',
      status: student.status || 'Active'
    });
    setIsEditStudentModalOpen(true);
  };

  const handleSaveStudentEdit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStoredStudent(editingStudent.id, studentForm);
    setStudentsList(getStoredStudents());
    setIsEditStudentModalOpen(false);

    showToast({
      title: 'Student Record Updated',
      message: `Successfully updated details for ${studentForm.name} (Roll: ${studentForm.rollNo}).`,
      type: 'success',
    });
  };

  const openQuickEditParent = (parent) => {
    setEditingParent(parent);
    setParentForm({
      fatherName: parent.fatherName || '',
      motherName: parent.motherName || '',
      wardName: parent.wardName || '',
      wardRollNo: parent.wardRollNo || '',
      wardClass: parent.wardClass || 'Class 10-A',
      phone: parent.phone || '',
      email: parent.email || '',
      occupation: parent.occupation || '',
      address: parent.address || '',
      portalStatus: parent.portalStatus || 'Active',
      feesStatus: parent.feesStatus || 'Paid'
    });
    setIsEditParentModalOpen(true);
  };

  const handleSaveParentEdit = (e) => {
    e.preventDefault();
    if (!editingParent) return;

    updateStoredParent(editingParent.id, parentForm);
    setParentsList(getStoredParents());
    setIsEditParentModalOpen(false);

    showToast({
      title: 'Parent Record Updated',
      message: `Updated profile and contact for ${parentForm.fatherName || parentForm.motherName} (Ward: ${parentForm.wardName}).`,
      type: 'success',
    });
  };



  const handleQuickSend = (e) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickMessage.trim()) return;

    sendNotification({
      title: quickTitle,
      message: quickMessage,
      targetAudience: quickAudience,
      targetClass: quickAudience === 'teachers' ? 'All Faculty' : 'All Classes',
      type: 'general',
      priority: 'normal',
      pinned: true,
      senderRole: 'admin',
      senderName: user?.name || 'Administrator',
      senderEmail: user?.email || 'admin@school.com',
    });

    setQuickTitle('');
    setQuickMessage('');
    setIsQuickBroadcastOpen(false);
  };

  const stats = [
    { title: 'Total Students', value: '1,248', icon: GraduationCap, detail: '1,248 / 1,500 target', progress: 83.2, clayClass: 'clay-card', iconColor: 'text-emerald-700 dark:text-emerald-400', pillBg: 'bg-emerald-50 dark:bg-emerald-950/70', barColor: 'bg-emerald-600 dark:bg-emerald-500' },
    { title: 'Total Teachers', value: '64', icon: UserCheck, detail: '64 / 70 staffing', progress: 91.4, clayClass: 'clay-card', iconColor: 'text-emerald-700 dark:text-emerald-400', pillBg: 'bg-emerald-50 dark:bg-emerald-950/70', barColor: 'bg-emerald-600 dark:bg-emerald-500' },
    { title: 'Fee Collection', value: '₹14.2 L', icon: CreditCard, detail: '₹14.2L / ₹16.5L', progress: 86.0, clayClass: 'clay-card', iconColor: 'text-emerald-700 dark:text-emerald-400', pillBg: 'bg-emerald-50 dark:bg-emerald-950/70', barColor: 'bg-emerald-600 dark:bg-emerald-500' },
    { title: "Today's Attendance", value: '95.4%', icon: CalendarCheck, detail: '1,191 of 1,248 present', progress: 95.4, clayClass: 'clay-card', iconColor: 'text-emerald-700 dark:text-emerald-400', pillBg: 'bg-emerald-50 dark:bg-emerald-950/70', barColor: 'bg-emerald-600 dark:bg-emerald-500' },
  ];

  const institutionalGoals = [
    { title: 'Term 1 Fee Realization', current: '₹14.2 Lakh', target: '₹16.5 Lakh', progress: 86, color: 'bg-emerald-600 dark:bg-emerald-500' },
    { title: 'Annual Student Admissions', current: '1,248 Students', target: '1,500 Capacity', progress: 83.2, color: 'bg-emerald-600 dark:bg-emerald-500' },
    { title: 'Teacher Attendance Benchmark', current: '62 / 64 Staff', target: '96.8% active', progress: 96.8, color: 'bg-emerald-600 dark:bg-emerald-500' },
  ];



  return (
    <div className="space-y-4 pb-6">
      {/* Welcome Banner (Emerald Admin Theme) */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>School Administration System • 2026-27</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Welcome back, {user?.name || 'Administrator'}!
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              1,248 students enrolled across 32 sections. Today's overall attendance rate is <span className="font-semibold text-emerald-600 dark:text-emerald-400">95.4%</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsQuickBroadcastOpen(true)}
              className="clay-btn-emerald px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>+ Send Notification</span>
            </button>
            <Link
              to="/admin/teachers/add"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
              <span>Add Teacher</span>
            </Link>
            <Link
              to="/admin/students/add"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Add Student</span>
            </Link>
            <Link
              to="/admin/parents"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              <span>Parents Hub</span>
            </Link>
            <Link
              to="/admin/notices"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Notices Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Broadcast Notification Modal */}
      {isQuickBroadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Broadcast Notification from Admin
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Dispatches instant toast & notice bell alert to selected recipients
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickBroadcastOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickSend} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Audience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickAudience('all')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer ${quickAudience === 'all'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                      }`}
                  >
                    Everyone
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickAudience('teachers')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer ${quickAudience === 'teachers'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                      }`}
                  >
                    Teachers
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickAudience('students')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer ${quickAudience === 'students'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                      }`}
                  >
                    Students
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  required
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="e.g. Urgent Campus Announcement"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={3}
                  required
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Type announcement details..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuickBroadcastOpen(false)}
                  className="clay-btn-secondary px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Notification Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KPI Stat Cards with Progress Bars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.clayClass} p-3.5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.title}
                </span>
                <div className={`p-1.5 rounded-lg ${item.pillBg} ${item.iconColor} clay-icon-pill`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
                    {item.value}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    {item.progress}%
                  </span>
                </div>
                {/* Compact Progress Bar */}
                <div className="clay-progress-track h-1.5 w-full mt-1.5">
                  <div
                    className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Admissions Table */}
        <div className="lg:col-span-2 clay-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Student Directory & Admissions</h2>
                <p className="text-[11px] text-slate-400">Student profile, parents details, and contact info</p>
              </div>
            </div>
            <Link
              to="/admin/students"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-0.5 hover:underline"
            >
              <span>View All Students</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-500 uppercase bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="px-3 py-2 rounded-l-lg">Student / Roll No</th>
                  <th className="px-3 py-2">Class</th>
                  <th className="px-3 py-2">Father & Mother Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-normal">
                {studentsList.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 clay-icon-pill shrink-0">
                          {st.avatar || st.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-white leading-snug">{st.name}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                              Roll: {st.rollNo}
                            </span>
                            <span className="text-[10px] text-slate-400">({st.id})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        {st.class} {st.section ? `(${st.section})` : ''}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="text-[11px] font-medium text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <MaleIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{st.fatherName || 'N/A'}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal flex items-center gap-1.5">
                        <FemaleIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{st.motherName || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <a
                        href={`tel:${st.contact}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-lg border border-slate-200/70 dark:border-slate-700/70 transition"
                      >
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{st.contact}</span>
                      </a>
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${st.status === 'Active' || st.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                            : st.status === 'Fees Pending'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                      >
                        {st.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/students/details/${st.id}`}
                          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openQuickEdit(st)}
                          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                          title="Quick Edit Student"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Notices & Broadcasts Quick Panel */}
        <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Active Circulars</h2>
                  <p className="text-[11px] text-slate-400">Live school notices</p>
                </div>
              </div>
              <Link
                to="/admin/notices"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
              >
                <span>Manage</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-400 transition"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">
                    <span className="font-semibold uppercase text-emerald-700 dark:text-emerald-400">
                      To: {notif.targetClass || notif.targetAudience}
                    </span>
                    <span>{notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-white line-clamp-1">
                    {notif.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsQuickBroadcastOpen(true)}
              className="clay-btn-emerald w-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notice to Teachers/Students</span>
            </button>
          </div>
        </div>
      </div>

      {/* Parents & Guardians Directory Card on Dashboard */}
      <div className="clay-card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Parents & Guardians Directory ({parentsList.length})
              </h2>
              <p className="text-[11px] text-slate-400">
                Father & Mother names, student wards, contact phone, profession, and fee status
              </p>
            </div>
          </div>
          <Link
            to="/admin/parents"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-0.5 hover:underline"
          >
            <span>View All Parents</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-500 uppercase bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="px-3 py-2 rounded-l-lg">Parents (Father / Mother)</th>
                <th className="px-3 py-2">Student Ward</th>
                <th className="px-3 py-2">Contact & Email</th>
                <th className="px-3 py-2">Profession</th>
                <th className="px-3 py-2">Portal & Fee Status</th>
                <th className="px-3 py-2 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-normal">
              {parentsList.map((pr, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 clay-icon-pill shrink-0 shadow-xs">
                        {pr.avatar || 'PR'}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-white leading-snug flex items-center gap-1.5 text-xs">
                          <MaleIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>{pr.fatherName || 'Father N/A'}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal flex items-center gap-1.5 mt-0.5">
                          <FemaleIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>{pr.motherName || 'Mother N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-slate-800 dark:text-white flex items-center gap-1">
                      <span>{pr.wardName}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
                        {pr.wardClass}
                      </span>
                      <span>• Roll: {pr.wardRollNo}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-col gap-0.5">
                      <a
                        href={`tel:${pr.phone}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{pr.phone}</span>
                      </a>
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
                        {pr.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
                      <Briefcase className="w-3 h-3 text-slate-500" />
                      <span>{pr.occupation || 'Self-Employed'}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full w-fit border border-emerald-200/60 dark:border-emerald-800/60">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{pr.portalStatus || 'Active'}</span>
                      </span>
                      <span className={`text-[10px] font-medium ${pr.feesStatus?.includes('Overdue') ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        Fees: {pr.feesStatus || 'Paid'}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openQuickEditParent(pr)}
                        className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                        title="Edit Parent Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Targets & Metrics */}
      <div className="clay-card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Institutional Targets & Annual Progress
              </h2>
              <p className="text-[11px] text-slate-400">Key metrics tracking for academic term 2026-27</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Realtime Tracking
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {institutionalGoals.map((goal, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{goal.title}</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{goal.progress}%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{goal.current}</p>
              {/* Progress Bar */}
              <div className="clay-progress-track h-2 w-full mt-2">
                <div
                  className={`h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1 font-medium">
                <span>Current</span>
                <span>Target: {goal.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Edit Student Modal */}
      {isEditStudentModalOpen && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <Edit className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Quick Edit Student: {editingStudent.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    ID: {editingStudent.id} • Roll: {editingStudent.rollNo}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditStudentModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStudentEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Class
                  </label>
                  <select
                    value={studentForm.class}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    value={studentForm.section}
                    onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.fatherName}
                    onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.motherName}
                    onChange={(e) => setStudentForm({ ...studentForm, motherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentForm.contact}
                    onChange={(e) => setStudentForm({ ...studentForm, contact: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={studentForm.status}
                    onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Fees Pending">Fees Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/admin/students/edit/${editingStudent.id}`}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Open Full Page Editor ↗
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditStudentModalOpen(false)}
                    className="clay-btn-secondary px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="clay-btn-emerald px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Edit Parent Modal */}
      {isEditParentModalOpen && editingParent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Edit Parent & Guardian Record
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    ID: {editingParent.id} • Ward: {editingParent.wardName} ({editingParent.wardRollNo})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditParentModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveParentEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentForm.fatherName}
                    onChange={(e) => setParentForm({ ...parentForm, fatherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentForm.motherName}
                    onChange={(e) => setParentForm({ ...parentForm, motherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentForm.phone}
                    onChange={(e) => setParentForm({ ...parentForm, phone: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={parentForm.email}
                    onChange={(e) => setParentForm({ ...parentForm, email: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Occupation / Profession
                  </label>
                  <input
                    type="text"
                    value={parentForm.occupation}
                    onChange={(e) => setParentForm({ ...parentForm, occupation: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Portal Account Status
                  </label>
                  <select
                    value={parentForm.portalStatus}
                    onChange={(e) => setParentForm({ ...parentForm, portalStatus: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={parentForm.address}
                    onChange={(e) => setParentForm({ ...parentForm, address: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditParentModalOpen(false)}
                  className="clay-btn-secondary px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md text-white"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Parent Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


