import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  HeartHandshake,
  Search,
  Filter,
  Phone,
  Edit,
  Trash2,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Save
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getStoredParents, updateStoredParent, deleteStoredParent, saveNewParent } from '../../../utils/parentStorage';
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

const classOptions = [
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
  { value: 'Class 10-A', label: 'Class 10-A' },
  { value: 'Class 9-A', label: 'Class 9-A' },
  { value: 'Class 8-B', label: 'Class 8-B' },
  { value: 'Class 7-A', label: 'Class 7-A' },
  { value: 'Class 6-B', label: 'Class 6-B' },
  { value: 'Class 11-Science', label: 'Class 11-Science' },
  { value: 'Class 12-Science', label: 'Class 12-Science' },
];

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Pending Verification', label: 'Pending Verification' },
  { value: 'Inactive', label: 'Inactive' },
];

// Sub-component for individual table row
const ParentTableRow = React.memo(({ parent, onEdit, onDelete }) => (
  <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
    {/* Parents Name */}
    <td className="px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 clay-icon-pill shrink-0 shadow-xs">
          {parent.avatar || 'PR'}
        </div>
        <div>
          <div className="font-semibold text-slate-800 dark:text-white leading-snug flex items-center gap-1.5 text-xs">
            <MaleIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{parent.fatherName || 'Father N/A'}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal flex items-center gap-1.5 mt-0.5">
            <FemaleIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{parent.motherName || 'Mother N/A'}</span>
          </div>
        </div>
      </div>
    </td>

    {/* Student Ward */}
    <td className="px-3 py-2.5">
      <div className="font-semibold text-slate-800 dark:text-white">{parent.wardName}</div>
      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
        <span className="font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
          {parent.wardClass}
        </span>
        <span>• Roll: {parent.wardRollNo}</span>
      </div>
    </td>

    {/* Contact */}
    <td className="px-3 py-2.5">
      <div className="flex flex-col gap-0.5">
        <a
          href={`tel:${parent.phone}`}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <Phone className="w-3 h-3 text-slate-500" />
          <span>{parent.phone}</span>
        </a>
        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
          {parent.email}
        </span>
      </div>
    </td>

    {/* Profession */}
    <td className="px-3 py-2.5">
      <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
        <Briefcase className="w-3 h-3 text-slate-500" />
        <span>{parent.occupation || 'Self-Employed'}</span>
      </div>
    </td>

    {/* Address */}
    <td className="px-3 py-2.5">
      <span className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 max-w-[170px]">
        {parent.address || 'Campus Town'}
      </span>
    </td>

    {/* Status */}
    <td className="px-3 py-2.5">
      <div className="flex flex-col gap-1">
        <Badge variant="emerald" icon={ShieldCheck}>
          {parent.portalStatus || 'Active'}
        </Badge>
        <span className={`text-[10px] font-medium ${parent.feesStatus?.includes('Overdue') ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
          Fees: {parent.feesStatus || 'Paid'}
        </span>
      </div>
    </td>

    {/* Actions */}
    <td className="px-4 py-2.5 text-right">
      <div className="flex items-center justify-end gap-1.5">
        <Button
          variant="secondary"
          size="icon"
          icon={Edit}
          onClick={() => onEdit(parent)}
          title="Edit Parent"
        />
        <Button
          variant="secondary"
          size="icon"
          icon={Trash2}
          onClick={() => onDelete(parent.id, parent.fatherName || parent.motherName)}
          className="hover:text-rose-600"
          title="Delete Parent"
        />
      </div>
    </td>
  </tr>
));

const defaultFormState = {
  fatherName: '',
  motherName: '',
  wardName: '',
  wardRollNo: '',
  wardClass: 'Class 10-A',
  phone: '',
  email: '',
  occupation: '',
  address: '',
  portalStatus: 'Active',
  feesStatus: 'Paid'
};

const ParentList = () => {
  const { showToast } = useToast();
  const [parents, setParents] = useState(() => getStoredParents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState(null);
  const [parentForm, setParentForm] = useState(defaultFormState);

  useEffect(() => {
    const handleUpdate = () => setParents(getStoredParents());
    window.addEventListener('school_parents_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_parents_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredParents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return parents.filter((pr) => {
      if (selectedClass !== 'all' && !pr.wardClass?.includes(selectedClass)) return false;
      if (selectedStatus !== 'all' && pr.portalStatus !== selectedStatus) return false;
      if (!query) return true;

      return (
        (pr.fatherName && pr.fatherName.toLowerCase().includes(query)) ||
        (pr.motherName && pr.motherName.toLowerCase().includes(query)) ||
        (pr.wardName && pr.wardName.toLowerCase().includes(query)) ||
        (pr.wardRollNo && pr.wardRollNo.toLowerCase().includes(query)) ||
        (pr.phone && pr.phone.includes(query)) ||
        (pr.email && pr.email.toLowerCase().includes(query)) ||
        (pr.occupation && pr.occupation.toLowerCase().includes(query))
      );
    });
  }, [parents, searchQuery, selectedClass, selectedStatus]);

  const openAddModal = useCallback(() => {
    setEditingParent(null);
    setParentForm(defaultFormState);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((parent) => {
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
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback((e) => {
    e.preventDefault();
    if (!parentForm.fatherName.trim() && !parentForm.motherName.trim()) {
      showToast({ title: 'Validation Error', message: 'At least one Parent Name is required.', type: 'error' });
      return;
    }

    if (editingParent) {
      updateStoredParent(editingParent.id, parentForm);
      showToast({
        title: 'Parent Updated',
        message: `Updated profile details for ${parentForm.fatherName || parentForm.motherName}.`,
        type: 'success',
      });
    } else {
      saveNewParent(parentForm);
      showToast({
        title: 'Parent Enrolled',
        message: `Successfully registered parent account for ward ${parentForm.wardName}.`,
        type: 'success',
      });
    }

    setParents(getStoredParents());
    setIsModalOpen(false);
  }, [editingParent, parentForm, showToast]);

  const handleDelete = useCallback((id, name) => {
    const updated = deleteStoredParent(id);
    setParents(updated);
    showToast({
      title: 'Parent Record Removed',
      message: `${name}'s parent record removed.`,
      type: 'info',
    });
  }, [showToast]);

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <Card variant="emerald">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Parent-Guardian Administration Hub</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Parents & Guardians Directory
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Complete parent database linked to enrolled students with phone, profession, and portal status.
            </p>
          </div>

          <Button
            variant="emerald"
            icon={HeartHandshake}
            onClick={openAddModal}
          >
            + Register Parent
          </Button>
        </div>
      </Card>

      {/* Search & Filters Bar */}
      <Card padding="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Input
              icon={Search}
              placeholder="Search by parent name, ward name, roll no, phone, occupation, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              icon={Filter}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              options={classOptions}
            />
          </div>
        </div>
      </Card>

      {/* Comprehensive Parent Directory Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">
              Registered Parents ({filteredParents.length})
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Active School-Parent Communications
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-500 uppercase bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="px-4 py-3">Parent Name (Father / Mother)</th>
                <th className="px-3 py-3">Student Ward</th>
                <th className="px-3 py-3">Contact & WhatsApp</th>
                <th className="px-3 py-3">Profession</th>
                <th className="px-3 py-3">Address</th>
                <th className="px-3 py-3">Portal & Fees</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-normal">
              {filteredParents.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState
                      title="No parent records found"
                      description="No parent records match your current search query or class filter."
                    />
                  </td>
                </tr>
              ) : (
                filteredParents.map((pr) => (
                  <ParentTableRow
                    key={pr.id}
                    parent={pr}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Unified Parent Modal (Add / Edit) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingParent ? 'Edit Parent & Guardian Record' : 'Register New Parent / Guardian'}
        subtitle={
          editingParent
            ? `ID: ${editingParent.id} • Ward: ${editingParent.wardName} (${editingParent.wardRollNo})`
            : 'Connect parent credentials to student ward'
        }
        icon={HeartHandshake}
        iconTheme="emerald"
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Father's Name"
              placeholder="e.g. Ramesh Kumar"
              value={parentForm.fatherName}
              onChange={(e) => setParentForm({ ...parentForm, fatherName: e.target.value })}
            />

            <Input
              label="Mother's Name"
              placeholder="e.g. Sunita Kumar"
              value={parentForm.motherName}
              onChange={(e) => setParentForm({ ...parentForm, motherName: e.target.value })}
            />

            <Input
              label="Student / Ward Name"
              required
              placeholder="e.g. Rahul Kumar"
              value={parentForm.wardName}
              onChange={(e) => setParentForm({ ...parentForm, wardName: e.target.value })}
            />

            <Input
              label="Ward Roll Number"
              required
              placeholder="e.g. 10A-18"
              value={parentForm.wardRollNo}
              onChange={(e) => setParentForm({ ...parentForm, wardRollNo: e.target.value })}
            />

            <Input
              label="Primary Phone / WhatsApp"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={parentForm.phone}
              onChange={(e) => setParentForm({ ...parentForm, phone: e.target.value })}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="parent@school.com"
              value={parentForm.email}
              onChange={(e) => setParentForm({ ...parentForm, email: e.target.value })}
            />

            <Input
              label="Occupation / Profession"
              placeholder="e.g. Doctor, Merchant"
              value={parentForm.occupation}
              onChange={(e) => setParentForm({ ...parentForm, occupation: e.target.value })}
            />

            {editingParent ? (
              <Select
                label="Portal Account Status"
                value={parentForm.portalStatus}
                onChange={(e) => setParentForm({ ...parentForm, portalStatus: e.target.value })}
                options={statusOptions}
              />
            ) : (
              <Select
                label="Ward Class"
                value={parentForm.wardClass}
                onChange={(e) => setParentForm({ ...parentForm, wardClass: e.target.value })}
                options={modalClassOptions}
              />
            )}

            <div className="sm:col-span-2">
              <Input
                label="Residential Address"
                placeholder="Campus Town"
                value={parentForm.address}
                onChange={(e) => setParentForm({ ...parentForm, address: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="emerald"
              size="sm"
              type="submit"
              icon={Save}
            >
              {editingParent ? 'Save Changes' : 'Register Parent'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ParentList;
