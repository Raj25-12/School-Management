import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Building2,
  IdCard,
  Edit2,
  Trash2,
  CheckCircle2,
  Award,
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';
import { getStoredTeachers, deleteStoredTeacher } from '../../../utils/teacherStorage';
import { useToast } from '../../../context/ToastContext';
import { useDebounce } from '../../../hooks/useDebounce';
import {
  PageHeader,
  StatsCard,
  SearchFilterBar,
  Button,
  Badge,
  Card,
  EmptyState,
  ConfirmDialog,
} from '../../../components/common';

const departmentOptions = [
  'All Departments',
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Computer Science',
  'Languages (Hindi/Sanskrit)',
  'Physical Education & Sports',
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
  const debouncedSearch = useDebounce(searchQuery, 250);
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

  // Filtered list with debounced search query (saving re-render CPU cycles)
  const filteredTeachers = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
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
  }, [teachers, debouncedSearch, selectedDept, selectedStatus]);

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
      <PageHeader
        logoSrc={logo}
        badgeIcon={Users}
        badgeText="Faculty Directory • Admin Portal"
        title="Teachers & Faculty Management"
        description="Manage all academic staff, view assignments, onboard new educators, and oversee credentials."
        actions={
          <>
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
          </>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Total Faculty"
          value={teachers.length}
          subtitle="100% faculty mapped"
          icon={Users}
          variant="default"
        />

        <StatsCard
          title="Active On Duty"
          value={teachers.filter((t) => t.status === 'Active').length}
          subtitle="Currently taking lectures"
          icon={CheckCircle2}
          variant="emerald"
        />

        <StatsCard
          title="Departments"
          value="8"
          subtitle="Academic wings"
          icon={Building2}
          variant="default"
        />

        <StatsCard
          title="Avg Experience"
          value="8.4 Yrs"
          subtitle="Senior pedagogical staff"
          icon={Award}
          variant="amber"
        />
      </div>

      {/* Filter and Search Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search teacher name, ID, subject, email..."
        filters={[
          {
            id: 'dept',
            value: selectedDept,
            onChange: setSelectedDept,
            options: departmentOptions,
          },
          {
            id: 'status',
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: statusOptions,
          },
        ]}
      />

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
