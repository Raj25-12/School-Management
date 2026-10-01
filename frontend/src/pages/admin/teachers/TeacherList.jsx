import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Search,
  Building2,
  IdCard,
  Edit2,
  Trash2,
  Sparkles,
  CheckCircle2,
  Award
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';
import { getStoredTeachers, deleteStoredTeacher } from '../../../utils/teacherStorage';
import { useToast } from '../../../context/ToastContext';
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  EmptyState,
  ConfirmDialog
} from '../../../components/common';

const departmentOptions = [
  'All Departments',
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Computer Science',
  'Languages (Hindi/Sanskrit)',
  'Physical Education & Sports'
];

const statusOptions = ['All Statuses', 'Active', 'On Leave'];

const TeacherCard = React.memo(({ teacher, onDelete }) => (
  <Card padding="p-4" className="flex flex-col justify-between space-y-3">
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

        <Badge variant={teacher.status === 'Active' ? 'emerald' : 'amber'}>
          {teacher.status}
        </Badge>
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
          className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
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
        <Button
          variant="secondary"
          size="icon"
          icon={Trash2}
          onClick={() => onDelete(teacher.id || teacher.employeeId)}
          className="hover:text-rose-600"
          title="Remove Teacher"
        />
      </div>
    </div>
  </Card>
));

const TeacherList = () => {
  const { showToast } = useToast();
  const [teachers, setTeachers] = useState(() => getStoredTeachers());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [deleteId, setDeleteId] = useState(null);

  // Load teachers and listen for reactive updates
  useEffect(() => {
    const handleUpdate = () => setTeachers(getStoredTeachers());
    window.addEventListener('school_teachers_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_teachers_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Filtered list
  const filteredTeachers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return teachers.filter((t) => {
      const matchDept = selectedDept === 'All Departments' || t.department === selectedDept;
      const matchStatus = selectedStatus === 'All Statuses' || t.status === selectedStatus;
      if (!matchDept || !matchStatus) return false;
      if (!q) return true;

      return (
        (t.name && t.name.toLowerCase().includes(q)) ||
        (t.employeeId && t.employeeId.toLowerCase().includes(q)) ||
        (t.primarySubject && t.primarySubject.toLowerCase().includes(q)) ||
        (t.email && t.email.toLowerCase().includes(q))
      );
    });
  }, [teachers, searchQuery, selectedDept, selectedStatus]);

  const handleDelete = useCallback((id) => {
    const updated = deleteStoredTeacher(id);
    setTeachers(updated);
    setDeleteId(null);
    showToast({
      title: 'Faculty Removed',
      message: 'Teacher record removed from system',
      type: 'info',
    });
  }, [showToast]);

  return (
    <div className="space-y-4 pb-10">
      {/* Header Banner */}
      <Card variant="emerald">
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
            <Link to="/admin/attendance/teacher">
              <Button variant="secondary" size="sm">
                Teacher Attendance
              </Button>
            </Link>
            <Link to="/admin/teachers/add">
              <Button variant="emerald" size="sm" icon={UserPlus}>
                Add New Teacher
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card padding="p-3.5" className="flex flex-col justify-between">
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
        </Card>

        <Card variant="emerald" padding="p-3.5" className="flex flex-col justify-between">
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
        </Card>

        <Card padding="p-3.5" className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Departments
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
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
        </Card>

        <Card padding="p-3.5" className="flex flex-col justify-between">
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
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <Input
              icon={Search}
              placeholder="Search teacher name, ID, subject, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            options={departmentOptions}
          />

          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={statusOptions}
          />
        </div>
      </Card>

      {/* Teacher Grid Cards */}
      {filteredTeachers.length === 0 ? (
        <Card>
          <EmptyState
            title="No faculty members found"
            description="Try changing your search keywords or filter criteria."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id || teacher.employeeId}
              teacher={teacher}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title="Remove Faculty Member?"
        message="This will remove this teacher's account and assigned classes mapping from the system."
        confirmText="Confirm Delete"
        variant="danger"
      />
    </div>
  );
};

export default TeacherList;
