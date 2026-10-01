import React, { useState } from 'react';
import {
  CalendarCheck,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Sparkles,
  Calendar,
  ChevronRight,
  Send,
  AlertTriangle,
  Award
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const defaultClassStudents = [
  { id: '1', name: 'Alex Johnson', rollNo: '10A-01', gender: 'Male', status: 'Present', remarks: '' },
  { id: '2', name: 'Riya Sen', rollNo: '10A-02', gender: 'Female', status: 'Present', remarks: '' },
  { id: '3', name: 'Rohan Sharma', rollNo: '10A-03', gender: 'Male', status: 'Present', remarks: '' },
  { id: '4', name: 'Sneha Patel', rollNo: '10A-04', gender: 'Female', status: 'Present', remarks: '' },
  { id: '5', name: 'Kabir Verma', rollNo: '10A-05', gender: 'Male', status: 'Absent', remarks: 'Unwell - Leave note submitted' },
  { id: '6', name: 'Ananya Roy', rollNo: '10A-06', gender: 'Female', status: 'Present', remarks: '' },
  { id: '7', name: 'Vikram Mehta', rollNo: '10A-07', gender: 'Male', status: 'Late', remarks: 'Bus delay' },
  { id: '8', name: 'Pooja Hegde', rollNo: '10A-08', gender: 'Female', status: 'Present', remarks: '' },
  { id: '9', name: 'Aman Dixit', rollNo: '10A-09', gender: 'Male', status: 'Present', remarks: '' },
  { id: '10', name: 'Tanvi Joshi', rollNo: '10A-10', gender: 'Female', status: 'Present', remarks: '' },
];

const TeacherAttendance = () => {
  const { showToast } = useToast();
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState(defaultClassStudents);
  const [searchQuery, setSearchQuery] = useState('');

  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const lateCount = students.filter(s => s.status === 'Late').length;
  const attendanceRate = Math.round(((presentCount + lateCount) / (students.length || 1)) * 100);

  const handleStatusChange = (id, newStatus) => {
    setStudents(prev =>
      prev.map(st => st.id === id ? { ...st, status: newStatus } : st)
    );
  };

  const handleMarkAll = (status) => {
    setStudents(prev => prev.map(st => ({ ...st, status })));
    showToast({
      title: 'Bulk Action',
      message: `Marked all students as ${status}.`,
      type: 'info'
    });
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    showToast({
      title: 'Roll Call Saved',
      message: `Attendance for ${selectedClass} on ${selectedDate} logged (${attendanceRate}% present).`,
      type: 'success'
    });
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <div className="clay-card p-4 sm:p-5 relative overflow-hidden bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <CalendarCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Daily Student Roll-Call Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Classroom Attendance Management
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Mark daily morning period roll calls, record absentee excuses, and dispatch automated SMS alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAttendance}
              className="clay-btn-sand px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Roll Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 Attendance Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Present</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{presentCount} Students</div>
            <span className="text-[10px] font-semibold text-slate-500">In class</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Absent</span>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">{absentCount} Students</div>
            <span className="text-[10px] font-semibold text-slate-500">SMS alert queued</span>
          </div>
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 clay-icon-pill">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Late Arrival</span>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">{lateCount} Students</div>
            <span className="text-[10px] font-semibold text-slate-500">With permission</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Attendance Rate</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">{attendanceRate}%</div>
            <span className="text-[10px] font-semibold text-emerald-600">High Punctuality</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 clay-icon-pill">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🔍 Controls & Bulk Actions Bar */}
      <div className="clay-card p-3.5 sm:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Class</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="clay-input px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-white"
              >
                <option value="Class 10-A">Class 10-A (Class Teacher)</option>
                <option value="Class 10-B">Class 10-B</option>
                <option value="Class 9-A">Class 9-A</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="clay-input px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleMarkAll('Present')}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer"
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => handleMarkAll('Absent')}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 cursor-pointer"
            >
              Mark All Absent
            </button>
          </div>
        </div>
      </div>

      {/* 📋 Roll-Call Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Roll Call Sheet • {selectedClass}</span>
            <span className="text-xs font-normal text-slate-400">({students.length} Students)</span>
          </h2>

          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-7 pr-2 py-1 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/50 dark:bg-amber-950/30 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-4">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-4">Gender</th>
                <th className="py-2.5 px-4">Attendance Status</th>
                <th className="py-2.5 px-4 text-right">Remarks / Excuse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-600 dark:text-slate-300">
                    {st.rollNo}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                    {st.name}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {st.gender}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(st.id, 'Present')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          st.status === 'Present'
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(st.id, 'Absent')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          st.status === 'Absent'
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(st.id, 'Late')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          st.status === 'Late'
                            ? 'bg-amber-500 text-slate-900 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-600'
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={st.remarks}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStudents(prev => prev.map(s => s.id === st.id ? { ...s, remarks: val } : s));
                      }}
                      className="clay-input px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 w-44 text-right"
                    />
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

export default TeacherAttendance;
