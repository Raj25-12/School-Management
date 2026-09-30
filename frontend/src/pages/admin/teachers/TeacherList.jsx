import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Award,
  Sparkles,
  Calendar,
  Building2,
  IdCard,
  AlertTriangle
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';
import { getStoredTeachers, deleteStoredTeacher } from '../../../utils/teacherStorage';


const initialTeachers = [
  {
    id: 'TCH-1001',
    name: 'Prof. Rajesh Sharma',
    employeeId: 'TCH-1001',
    email: 'rajesh.sharma@school.com',
    phone: '+91 98111 22334',
    department: 'Mathematics',
    primarySubject: 'Algebra & Calculus',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '12 Years',
    assignedClasses: ['Class 9-A', 'Class 10-A', 'Class 12-Sci'],
    status: 'Active',
    joiningDate: '2014-06-10'
  },
  {
    id: 'TCH-1002',
    name: 'Dr. Sunita Verma',
    employeeId: 'TCH-1002',
    email: 'sunita.verma@school.com',
    phone: '+91 98222 33445',
    department: 'Science',
    primarySubject: 'Physics & Optics',
    qualification: 'Ph.D. Physics, M.Sc.',
    experience: '9 Years',
    assignedClasses: ['Class 10-A', 'Class 11-Sci', 'Class 12-Sci'],
    status: 'Active',
    joiningDate: '2017-08-01'
  },
  {
    id: 'TCH-1003',
    name: 'Amit Patel',
    employeeId: 'TCH-1003',
    email: 'amit.patel@school.com',
    phone: '+91 98333 44556',
    department: 'English',
    primarySubject: 'English Literature',
    qualification: 'M.A. English, B.Ed.',
    experience: '6 Years',
    assignedClasses: ['Class 8-A', 'Class 9-B', 'Class 10-B'],
    status: 'Active',
    joiningDate: '2020-01-15'
  },
  {
    id: 'TCH-1004',
    name: 'Pooja Iyer',
    employeeId: 'TCH-1004',
    email: 'pooja.iyer@school.com',
    phone: '+91 98444 55667',
    department: 'Social Science',
    primarySubject: 'History & Civics',
    qualification: 'M.A. History, B.Ed.',
    experience: '7 Years',
    assignedClasses: ['Class 7-B', 'Class 8-B', 'Class 9-A'],
    status: 'On Leave',
    joiningDate: '2019-07-20'
  },
  {
    id: 'TCH-1005',
    name: 'Vikram Singh',
    employeeId: 'TCH-1005',
    email: 'vikram.singh@school.com',
    phone: '+91 98555 66778',
    department: 'Computer Science',
    primarySubject: 'Python & Web Tech',
    qualification: 'MCA, B.Tech CS',
    experience: '5 Years',
    assignedClasses: ['Class 9-A', 'Class 10-A', 'Class 11-Sci', 'Class 12-Sci'],
    status: 'Active',
    joiningDate: '2021-04-12'
  },
  {
    id: 'TCH-1006',
    name: 'Meenakshi Sundaram',
    employeeId: 'TCH-1006',
    email: 'meenakshi.s@school.com',
    phone: '+91 98666 77889',
    department: 'Languages',
    primarySubject: 'Sanskrit & Hindi',
    qualification: 'M.A. Sanskrit, B.Ed.',
    experience: '14 Years',
    assignedClasses: ['Class 6-A', 'Class 7-A', 'Class 8-A'],
    status: 'Active',
    joiningDate: '2012-03-05'
  }
];

const departments = [
  'All Departments',
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Computer Science',
  'Languages (Hindi/Sanskrit)',
  'Physical Education & Sports'
];


const TeacherList = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(() => getStoredTeachers());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [deleteId, setDeleteId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Load teachers and listen for reactive updates
  useEffect(() => {
    const handleUpdate = () => {
      setTeachers(getStoredTeachers());
    };
    window.addEventListener('school_teachers_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_teachers_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Filtered list
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchSearch =
        (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.employeeId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.primarySubject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.email || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = selectedDept === 'All Departments' || t.department === selectedDept;
      const matchStatus = selectedStatus === 'All Statuses' || t.status === selectedStatus;

      return matchSearch && matchDept && matchStatus;
    });
  }, [teachers, searchQuery, selectedDept, selectedStatus]);

  const handleDelete = (id) => {
    const updated = deleteStoredTeacher(id);
    setTeachers(updated);
    setDeleteId(null);
    showToast('Teacher record removed from system');
  };


  return (
    <div className="space-y-4 pb-10">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <img
                src={logo}
                alt="School Management"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>Faculty Directory • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Teachers & Faculty Management
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Manage all academic staff, view assignments, onboard new educators, and oversee credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/attendance/teacher"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
            >
              Teacher Attendance
            </Link>
            <Link
              to="/admin/teachers/add"
              className="clay-btn-emerald px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add New Teacher</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Faculty
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              {teachers.length}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              100% faculty mapped
            </div>
          </div>
        </div>

        <div className="clay-emerald p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Active On Duty
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-200/60 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-emerald-800 dark:text-emerald-100">
              {teachers.filter((t) => t.status === 'Active').length}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              Currently taking lectures
            </div>
          </div>
        </div>

        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Departments
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 clay-icon-pill">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              8
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Academic wings
            </div>
          </div>
        </div>

        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Avg Experience
            </span>
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 clay-icon-pill">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              8.4 Yrs
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Senior pedagogical staff
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clay-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search teacher name, ID, subject, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="dark:bg-slate-900">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All Statuses" className="dark:bg-slate-900">All Statuses</option>
              <option value="Active" className="dark:bg-slate-900">Active</option>
              <option value="On Leave" className="dark:bg-slate-900">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teacher Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id || teacher.employeeId} className="clay-card p-4 flex flex-col justify-between space-y-3">
            <div>
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-sm clay-icon-pill shrink-0">
                    {teacher.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white truncate">
                      {teacher.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      <IdCard className="w-3 h-3" />
                      <span>{teacher.employeeId}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    teacher.status === 'Active'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  }`}
                >
                  {teacher.status}
                </span>
              </div>

              {/* Details */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Department:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{teacher.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Subject:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{teacher.primarySubject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Email:</span>
                  <span className="font-mono text-[11px] truncate max-w-[170px]">{teacher.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Phone:</span>
                  <span className="font-mono text-[11px]">{teacher.phone}</span>
                </div>
              </div>

              {/* Assigned Classes */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Assigned Classes:
                </div>
                <div className="flex flex-wrap gap-1">
                  {(teacher.assignedClasses || []).map((cls) => (
                    <span
                      key={cls}
                      className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Exp: {teacher.experience || '5 Yrs'}
              </span>
              <div className="flex items-center gap-1.5">
                <Link
                  to={`/admin/teachers/details/${teacher.id || teacher.employeeId}`}
                  className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  title="View Details"
                >
                  <Building2 className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/admin/teachers/edit/${teacher.id || teacher.employeeId}`}
                  className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  title="Edit Teacher"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteId(teacher.id || teacher.employeeId)}
                  className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer"
                  title="Remove Teacher"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card w-full max-w-sm p-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center clay-icon-pill mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-white">
              Remove Faculty Member?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              This will remove this teacher's account and classes mapping.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="clay-btn-secondary px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="clay-btn-rose px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
