import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  ChevronDown,
  X,
  Sparkles,
  Save,
  Check,
  AlertTriangle,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';

const initialAttendanceData = [
  {
    id: 'ATT-101',
    teacherId: 'TCH-1001',
    name: 'Prof. Rajesh Sharma',
    department: 'Mathematics',
    date: '2026-09-29',
    checkIn: '07:45 AM',
    checkOut: '02:30 PM',
    status: 'Present',
    remarks: 'Regular morning shift',
  },
  {
    id: 'ATT-102',
    teacherId: 'TCH-1002',
    name: 'Dr. Sunita Verma',
    department: 'Science',
    date: '2026-09-29',
    checkIn: '07:50 AM',
    checkOut: '02:30 PM',
    status: 'Present',
    remarks: 'Physics Lab Session',
  },
  {
    id: 'ATT-103',
    teacherId: 'TCH-1003',
    name: 'Amit Patel',
    department: 'English',
    date: '2026-09-29',
    checkIn: '08:20 AM',
    checkOut: '02:30 PM',
    status: 'Late',
    remarks: 'Traffic delay - Informed HOD',
  },
  {
    id: 'ATT-104',
    teacherId: 'TCH-1004',
    name: 'Pooja Iyer',
    department: 'Social Science',
    date: '2026-09-29',
    checkIn: '-',
    checkOut: '-',
    status: 'On Leave',
    remarks: 'Medical leave approved',
  },
  {
    id: 'ATT-105',
    teacherId: 'TCH-1005',
    name: 'Vikram Singh',
    department: 'Computer Science',
    date: '2026-09-29',
    checkIn: '07:40 AM',
    checkOut: '02:30 PM',
    status: 'Present',
    remarks: 'Coding club mentor',
  },
  {
    id: 'ATT-106',
    teacherId: 'TCH-1006',
    name: 'Meenakshi Sundaram',
    department: 'Languages',
    date: '2026-09-29',
    checkIn: '07:55 AM',
    checkOut: '11:45 AM',
    status: 'Half Day',
    remarks: 'Personal urgent appointment',
  },
  {
    id: 'ATT-107',
    teacherId: 'TCH-1007',
    name: 'Anand Kumar',
    department: 'Sports & Arts',
    date: '2026-09-29',
    checkIn: '-',
    checkOut: '-',
    status: 'Absent',
    remarks: 'Uninformed absence',
  },
  {
    id: 'ATT-108',
    teacherId: 'TCH-1008',
    name: 'Kavita Menon',
    department: 'Mathematics',
    date: '2026-09-29',
    checkIn: '07:42 AM',
    checkOut: '02:30 PM',
    status: 'Present',
    remarks: 'Senior Secondary coordinator',
  }
];

const departments = [
  'All Departments',
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Computer Science',
  'Languages',
  'Sports & Arts'
];

const statuses = ['All Statuses', 'Present', 'Late', 'Half Day', 'On Leave', 'Absent'];

const TeacherAttendance = () => {
  const { showToast } = useToast();
  const [attendanceList, setAttendanceList] = useState(initialAttendanceData);
  const [selectedDate, setSelectedDate] = useState('2026-09-29');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [formData, setFormData] = useState({
    id: '',
    teacherId: '',
    name: '',
    department: 'Mathematics',
    date: '2026-09-29',
    checkIn: '07:45 AM',
    checkOut: '02:30 PM',
    status: 'Present',
    remarks: '',
  });

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Filtered List
  const filteredList = useMemo(() => {
    return attendanceList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.remarks.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept =
        selectedDepartment === 'All Departments' || item.department === selectedDepartment;
      const matchStatus =
        selectedStatus === 'All Statuses' || item.status === selectedStatus;
      const matchDate = !selectedDate || item.date === selectedDate;

      return matchSearch && matchDept && matchStatus && matchDate;
    });
  }, [attendanceList, searchQuery, selectedDepartment, selectedStatus, selectedDate]);

  // Statistics
  const stats = useMemo(() => {
    const total = attendanceList.length;
    const present = attendanceList.filter((a) => a.status === 'Present').length;
    const late = attendanceList.filter((a) => a.status === 'Late').length;
    const halfDay = attendanceList.filter((a) => a.status === 'Half Day').length;
    const onLeave = attendanceList.filter((a) => a.status === 'On Leave').length;
    const absent = attendanceList.filter((a) => a.status === 'Absent').length;
    const rate = total > 0 ? (((present + late + halfDay * 0.5) / total) * 100).toFixed(1) : '0';

    return { total, present, late, halfDay, onLeave, absent, rate };
  }, [attendanceList]);

  // Handle Mark All Present
  const handleMarkAllPresent = () => {
    setAttendanceList((prev) =>
      prev.map((item) => ({
        ...item,
        status: 'Present',
        checkIn: item.checkIn === '-' ? '07:45 AM' : item.checkIn,
        checkOut: item.checkOut === '-' ? '02:30 PM' : item.checkOut,
        remarks: 'Bulk marked present by Admin'
      }))
    );
    showToast({
      title: 'Bulk Attendance Complete ✅',
      message: `All ${attendanceList.length} staff members marked as Present for today.`,
      type: 'emerald',
    });
  };

  // Open Create Modal
  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: `ATT-${Date.now().toString().slice(-4)}`,
      teacherId: 'TCH-100' + (attendanceList.length + 1),
      name: '',
      department: 'Mathematics',
      date: selectedDate || '2026-09-29',
      checkIn: '07:45 AM',
      checkOut: '02:30 PM',
      status: 'Present',
      remarks: '',
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setModalMode('edit');
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  // Save Attendance Form (Create or Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast({
        title: 'Validation Error',
        message: 'Please enter teacher name',
        type: 'error',
      });
      return;
    }

    if (modalMode === 'create') {
      const newItem = {
        ...formData,
        id: formData.id || `ATT-${Date.now().toString().slice(-4)}`,
      };
      setAttendanceList([newItem, ...attendanceList]);
      showToast({
        title: 'Attendance Recorded',
        message: `${formData.name} attendance logged as ${formData.status}.`,
        type: 'emerald',
      });
    } else {
      setAttendanceList((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      showToast({
        title: 'Attendance Updated',
        message: `${formData.name} record updated successfully.`,
        type: 'info',
      });
    }
    setIsModalOpen(false);
  };

  // Delete Attendance
  const handleDelete = (id) => {
    const deletedItem = attendanceList.find((i) => i.id === id);
    setAttendanceList((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirmId(null);
    showToast({
      title: 'Record Removed',
      message: `Attendance log for ${deletedItem?.name || 'Staff'} deleted.`,
      type: 'rose',
    });
  };

  // Quick Status Toggle on table
  const handleQuickStatusChange = (id, newStatus) => {
    const item = attendanceList.find((i) => i.id === id);
    setAttendanceList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let checkIn = item.checkIn;
          let checkOut = item.checkOut;
          if (newStatus === 'Absent' || newStatus === 'On Leave') {
            checkIn = '-';
            checkOut = '-';
          } else if (checkIn === '-') {
            checkIn = '07:45 AM';
            checkOut = '02:30 PM';
          }
          return { ...item, status: newStatus, checkIn, checkOut };
        }
        return item;
      })
    );
    showToast({
      title: 'Status Changed',
      message: `${item?.name || 'Teacher'} status updated to ${newStatus}.`,
      type: newStatus === 'Present' ? 'emerald' : newStatus === 'Absent' ? 'rose' : 'amber',
    });
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Late':
        return 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Half Day':
        return 'bg-amber-100/70 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'On Leave':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
      case 'Absent':
        return 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4 pb-8">
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
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Staff Attendance Management • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Teacher & Staff Attendance
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Record daily attendance, manage biometric logs, leaves, and staff punctuality reports.
              </p>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark All Present</span>
            </button>
            <button
              type="button"
              onClick={openCreateModal}
              className="clay-btn-emerald px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Entry</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid with Clay Progress Bars */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Teachers
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 clay-icon-pill">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              {stats.total}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Active staff members
            </div>
          </div>
        </div>

        <div className="clay-emerald p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Present Today
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-200/60 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-emerald-800 dark:text-emerald-100">
              {stats.present}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {((stats.present / stats.total) * 100).toFixed(0)}% on duty
            </div>
          </div>
        </div>

        <div className="clay-amber p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Late / Half Day
            </span>
            <div className="p-1.5 rounded-lg bg-amber-200/60 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 clay-icon-pill">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-amber-800 dark:text-amber-100">
              {stats.late + stats.halfDay}
            </div>
            <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
              {stats.late} Late, {stats.halfDay} Half-day
            </div>
          </div>
        </div>

        <div className="clay-rose p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Leave / Absent
            </span>
            <div className="p-1.5 rounded-lg bg-rose-200/60 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 clay-icon-pill">
              <XCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-rose-800 dark:text-rose-100">
              {stats.onLeave + stats.absent}
            </div>
            <div className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
              {stats.onLeave} Leave, {stats.absent} Absent
            </div>
          </div>
        </div>

        <div className="clay-card p-3.5 flex flex-col justify-between col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Attendance Rate
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.rate}%
            </div>
            <div className="w-full clay-progress-track h-2 mt-1.5">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, stats.rate))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="clay-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search teacher name, ID, remarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept} className="dark:bg-slate-900">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st} className="dark:bg-slate-900">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Indicators */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div>
            Showing <span className="font-bold text-slate-800 dark:text-white">{filteredList.length}</span> of {attendanceList.length} staff attendance records
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment('All Departments');
                setSelectedStatus('All Statuses');
                setSelectedDate('2026-09-29');
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Attendance Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="py-3.5 px-4">Teacher & ID</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Check-In / Out</th>
                <th className="py-3.5 px-4">Status (Click to Switch)</th>
                <th className="py-3.5 px-4">Remarks</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                      <p className="font-bold">No attendance records found matching filters.</p>
                      <button
                        type="button"
                        onClick={openCreateModal}
                        className="clay-btn-emerald px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer"
                      >
                        + Record New Attendance
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Teacher & Avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center justify-center clay-icon-pill shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white leading-tight">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                            {item.teacherId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {item.department}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                      {item.date}
                    </td>

                    {/* Check-In / Out */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-[11px]">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {item.checkIn}
                        </span>
                        <span className="text-slate-400 mx-1">→</span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {item.checkOut}
                        </span>
                      </div>
                    </td>

                    {/* Status Dropdown / Interactive Badge */}
                    <td className="py-3 px-4">
                      <div className="relative inline-block">
                        <select
                          value={item.status}
                          onChange={(e) => handleQuickStatusChange(item.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer appearance-none pr-6 focus:outline-none ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          <option value="Present" className="dark:bg-slate-900 text-slate-800 dark:text-white">Present</option>
                          <option value="Late" className="dark:bg-slate-900 text-slate-800 dark:text-white">Late</option>
                          <option value="Half Day" className="dark:bg-slate-900 text-slate-800 dark:text-white">Half Day</option>
                          <option value="On Leave" className="dark:bg-slate-900 text-slate-800 dark:text-white">On Leave</option>
                          <option value="Absent" className="dark:bg-slate-900 text-slate-800 dark:text-white">Absent</option>
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </td>

                    {/* Remarks */}
                    <td className="py-3 px-4 max-w-xs truncate text-slate-600 dark:text-slate-400 text-[11px]">
                      {item.remarks || '-'}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="clay-btn-secondary p-1.5 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition cursor-pointer"
                          title="Edit Attendance"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="clay-btn-secondary p-1.5 rounded-xl text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📝 Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800 dark:text-white">
                    {modalMode === 'create' ? 'Record Staff Attendance' : 'Edit Attendance Record'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Fill in details for teacher daily attendance
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Teacher Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Prof. Rajesh Sharma"
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    placeholder="e.g. TCH-1001"
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  >
                    {departments.filter((d) => d !== 'All Departments').map((dept) => (
                      <option key={dept} value={dept} className="dark:bg-slate-900">
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Attendance Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      let checkIn = formData.checkIn;
                      let checkOut = formData.checkOut;
                      if (newStatus === 'Absent' || newStatus === 'On Leave') {
                        checkIn = '-';
                        checkOut = '-';
                      } else if (checkIn === '-') {
                        checkIn = '07:45 AM';
                        checkOut = '02:30 PM';
                      }
                      setFormData({ ...formData, status: newStatus, checkIn, checkOut });
                    }}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="Present" className="dark:bg-slate-900">Present</option>
                    <option value="Late" className="dark:bg-slate-900">Late</option>
                    <option value="Half Day" className="dark:bg-slate-900">Half Day</option>
                    <option value="On Leave" className="dark:bg-slate-900">On Leave</option>
                    <option value="Absent" className="dark:bg-slate-900">Absent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Check-In Time
                  </label>
                  <input
                    type="text"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    placeholder="07:45 AM"
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Check-Out Time
                  </label>
                  <input
                    type="text"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    placeholder="02:30 PM"
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Remarks / Notes
                </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="e.g. Late due to exam duty, medical leave approval..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                />
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
                  className="clay-btn-emerald px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{modalMode === 'create' ? 'Save Record' : 'Update Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ⚠️ Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card w-full max-w-sm p-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center clay-icon-pill mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-white">
              Delete Attendance Entry?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              This will permanently remove this attendance log from the system records.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="clay-btn-secondary px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="clay-btn-rose px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
