import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  UserPlus,
  Phone,
  Edit,
  Trash2,
  Eye,
  Sparkles,
  Users,
  Save
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getStoredStudents, updateStoredStudent, deleteStoredStudent } from '../../../utils/studentStorage';
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  Modal,
  EmptyState,
  MaleIcon,
  FemaleIcon
} from '../../../components/common';

const classFilterOptions = [
  { value: 'all', label: 'All Classes' },
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
  { value: 'Class 6', label: 'Class 6' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 12', label: 'Class 12' },
];

const modalClassOptions = [
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
  { value: 'Class 6', label: 'Class 6' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 12', label: 'Class 12' },
];

const studentStatusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending Review', label: 'Pending Review' },
  { value: 'Fees Pending', label: 'Fees Pending' },
  { value: 'Inactive', label: 'Inactive' },
];

const StudentTableRow = React.memo(({ student, onQuickEdit, onDelete }) => (
  <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
    {/* Student Info */}
    <td className="px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-xs flex items-center justify-center clay-icon-pill shrink-0 shadow-xs">
          {student.avatar || student.name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-white">{student.name}</div>
          <div className="text-[10px] text-slate-400 font-mono">{student.id}</div>
        </div>
      </div>
    </td>

    {/* Roll No */}
    <td className="px-3 py-2.5">
      <span className="text-xs font-black font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
        {student.rollNo}
      </span>
    </td>

    {/* Class & Section */}
    <td className="px-3 py-2.5">
      <span className="font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
        {student.class} {student.section ? `• ${student.section}` : ''}
      </span>
    </td>

    {/* Father's Name */}
    <td className="px-4 py-2.5">
      <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
        <MaleIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span>{student.fatherName || '—'}</span>
      </div>
    </td>

    {/* Mother's Name */}
    <td className="px-4 py-2.5">
      <div className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
        <FemaleIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
        <span>{student.motherName || '—'}</span>
      </div>
    </td>

    {/* Contact Phone */}
    <td className="px-3 py-2.5">
      <a
        href={`tel:${student.contact}`}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 transition"
      >
        <Phone className="w-3 h-3 text-emerald-500" />
        <span>{student.contact}</span>
      </a>
    </td>

    {/* Status */}
    <td className="px-3 py-2.5">
      <Badge
        variant={
          student.status === 'Active' || student.status === 'Approved'
            ? 'emerald'
            : student.status === 'Fees Pending'
            ? 'amber'
            : 'emerald'
        }
      >
        {student.status}
      </Badge>
    </td>

    {/* Actions */}
    <td className="px-4 py-2.5 text-right">
      <div className="flex items-center justify-end gap-1.5">
        <Link
          to={`/admin/students/details/${student.id}`}
          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 transition"
          title="View Details"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          icon={Edit}
          onClick={() => onQuickEdit(student)}
          title="Quick Edit Student"
        />
        <Link
          to={`/admin/students/edit/${student.id}`}
          className="clay-btn-secondary px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 hover:text-emerald-600 transition"
          title="Full Page Editor"
        >
          Full Edit
        </Link>
        <Button
          variant="secondary"
          size="icon"
          icon={Trash2}
          onClick={() => onDelete(student.id, student.name)}
          className="hover:text-rose-600"
          title="Delete Student"
        />
      </div>
    </td>
  </tr>
));

const defaultStudentForm = {
  name: '',
  rollNo: '',
  class: 'Class 10',
  section: 'A',
  fatherName: '',
  motherName: '',
  contact: '',
  email: '',
  status: 'Active'
};

const StudentList = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(() => getStoredStudents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Quick Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState(defaultStudentForm);

  useEffect(() => {
    const handleUpdate = () => setStudents(getStoredStudents());
    window.addEventListener('school_students_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_students_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return students.filter((st) => {
      if (selectedClass !== 'all' && st.class !== selectedClass) return false;
      if (!q) return true;

      return (
        (st.name && st.name.toLowerCase().includes(q)) ||
        (st.rollNo && st.rollNo.toLowerCase().includes(q)) ||
        (st.fatherName && st.fatherName.toLowerCase().includes(q)) ||
        (st.motherName && st.motherName.toLowerCase().includes(q)) ||
        (st.contact && st.contact.includes(q)) ||
        (st.email && st.email.toLowerCase().includes(q))
      );
    });
  }, [students, searchQuery, selectedClass]);

  const openQuickEdit = useCallback((student) => {
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
  }, []);

  const handleSaveEdit = useCallback((e) => {
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
  }, [editingStudent, studentForm, showToast]);

  const handleDelete = useCallback((id, name) => {
    const updated = deleteStoredStudent(id);
    setStudents(updated);
    showToast({
      title: 'Student Record Removed',
      message: `${name}'s record was removed from system.`,
      type: 'info',
    });
  }, [showToast]);

  return (
    <div className="space-y-4 pb-8">
      {/* 🌟 Header Banner */}
      <Card variant="emerald">
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

          <Link to="/admin/students/add">
            <Button variant="emerald" icon={UserPlus}>
              + Add New Student
            </Button>
          </Link>
        </div>
      </Card>

      {/* 🔍 Search & Filters Bar */}
      <Card padding="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Input
              icon={Search}
              placeholder="Search by student name, roll number, father/mother name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              icon={Filter}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              options={classFilterOptions}
            />
          </div>
        </div>
      </Card>

      {/* 📋 Comprehensive Student Directory Table */}
      <Card padding="p-0" className="overflow-hidden">
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
                  <td colSpan={8}>
                    <EmptyState
                      title="No student records found"
                      description="No student records match your search criteria."
                    />
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <StudentTableRow
                    key={st.id}
                    student={st}
                    onQuickEdit={openQuickEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ✏️ Quick Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen && Boolean(editingStudent)}
        onClose={() => setIsEditModalOpen(false)}
        title={editingStudent ? `Edit Student: ${editingStudent.name}` : 'Edit Student'}
        subtitle={editingStudent ? `ID: ${editingStudent.id} • Roll: ${editingStudent.rollNo}` : ''}
        icon={Edit}
        iconTheme="emerald"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Full Name"
              required
              value={studentForm.name}
              onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
            />

            <Input
              label="Roll Number"
              required
              value={studentForm.rollNo}
              onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
            />

            <Select
              label="Class"
              value={studentForm.class}
              onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
              options={modalClassOptions}
            />

            <Input
              label="Section"
              value={studentForm.section}
              onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
            />

            <Input
              label="Father's Name"
              required
              value={studentForm.fatherName}
              onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
            />

            <Input
              label="Mother's Name"
              required
              value={studentForm.motherName}
              onChange={(e) => setStudentForm({ ...studentForm, motherName: e.target.value })}
            />

            <Input
              label="Contact Phone"
              type="tel"
              required
              value={studentForm.contact}
              onChange={(e) => setStudentForm({ ...studentForm, contact: e.target.value })}
            />

            <Select
              label="Status"
              value={studentForm.status}
              onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}
              options={studentStatusOptions}
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            {editingStudent && (
              <Link
                to={`/admin/students/edit/${editingStudent.id}`}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Full Page Form Editor ↗
              </Link>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="emerald"
                size="sm"
                type="submit"
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentList;
