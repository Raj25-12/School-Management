import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Filter,
  UserPlus,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
  Sparkles,
  Users,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getStoredStudents, updateStoredStudent, deleteStoredStudent } from '../../../utils/studentStorage';
import { MaleIcon, FemaleIcon } from '../../../components/common/GenderIcons';


const StudentList = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(() => getStoredStudents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Quick Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    rollNo: '',
    class: '',
    section: '',
    fatherName: '',
    motherName: '',
    contact: '',
    email: '',
    status: 'Active'
  });

  // Re-sync with student storage whenever updated
  useEffect(() => {
    const handleUpdate = () => {
      setStudents(getStoredStudents());
    };
    window.addEventListener('school_students_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_students_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.rollNo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.fatherName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.motherName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.contact || '').includes(searchQuery) ||
      (st.email || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedClass === 'all') return true;
    return st.class === selectedClass;
  });

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
      email: student.email || '',
      status: student.status || 'Active'
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStoredStudent(editingStudent.id, studentForm);
    setStudents(getStoredStudents());
    setIsEditModalOpen(false);

    showToast({
      title: 'Student Profile Updated',
      message: `Successfully saved changes for ${studentForm.name} (Roll: ${studentForm.rollNo}).`,
      type: 'success',
    });
  };

  const handleDelete = (id, name) => {
    const updated = deleteStoredStudent(id);
    setStudents(updated);
    showToast({
      title: 'Student Record Removed',
      message: `${name}'s record was removed from system.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 🌟 Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Management Directory</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              All Enrolled Students List
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Comprehensive list with Roll No, Class, Parents (Father & Mother) Name, Contact, and direct Edit options.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/students/add"
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add New Student</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔍 Search & Filters Bar */}
      <div className="clay-card p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, roll number, father/mother name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-9 pr-4 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Class:</span>
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="clay-input px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <option value="all">All Classes</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📋 Comprehensive Student Directory Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">
              Student Records ({filteredStudents.length})
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Showing all student profiles with full parentage details
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-500 uppercase bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-3 py-3">Roll No</th>
                <th className="px-3 py-3">Class & Sec</th>
                <th className="px-4 py-3">Father's Name</th>
                <th className="px-4 py-3">Mother's Name</th>
                <th className="px-3 py-3">Contact Phone</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 text-xs">
                    No student records matching your search query.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr
                    key={st.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                  >
                    {/* Student Info */}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-xs flex items-center justify-center clay-icon-pill shrink-0 shadow-xs">
                          {st.avatar || st.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">
                            {st.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {st.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Roll No */}
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-black font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                        {st.rollNo}
                      </span>
                    </td>

                    {/* Class & Section */}
                    <td className="px-3 py-2.5">
                      <span className="font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        {st.class} {st.section ? `• ${st.section}` : ''}
                      </span>
                    </td>

                    {/* Father's Name */}
                    <td className="px-4 py-2.5">
                      <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <MaleIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{st.fatherName || '—'}</span>
                      </div>
                    </td>

                    {/* Mother's Name */}
                    <td className="px-4 py-2.5">
                      <div className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <FemaleIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{st.motherName || '—'}</span>
                      </div>
                    </td>

                    {/* Contact Phone */}
                    <td className="px-3 py-2.5">
                      <a
                        href={`tel:${st.contact}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 transition"
                      >
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span>{st.contact}</span>
                      </a>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          st.status === 'Active' || st.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                            : st.status === 'Fees Pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/students/details/${st.id}`}
                          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 transition"
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
                        <Link
                          to={`/admin/students/edit/${st.id}`}
                          className="clay-btn-secondary px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:text-emerald-600 transition"
                          title="Full Page Editor"
                        >
                          Full Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(st.id, st.name)}
                          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-rose-600 transition cursor-pointer"
                          title="Delete Student"
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

      {/* ✏️ Quick Edit Student Modal */}
      {isEditModalOpen && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
                  <Edit className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white">
                    Edit Student: {editingStudent.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    ID: {editingStudent.id} • Roll: {editingStudent.rollNo}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class
                  </label>
                  <select
                    value={studentForm.class}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
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
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    value={studentForm.section}
                    onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.fatherName}
                    onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.motherName}
                    onChange={(e) => setStudentForm({ ...studentForm, motherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentForm.contact}
                    onChange={(e) => setStudentForm({ ...studentForm, contact: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={studentForm.status}
                    onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
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
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Full Page Form Editor ↗
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="clay-btn-secondary px-3.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="clay-btn-emerald px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
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
    </div>
  );
};

export default StudentList;
