import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Search,
  Filter,
  Phone,
  Mail,
  Edit,
  Trash2,
  Sparkles,
  Users,
  Briefcase,
  ShieldCheck,
  Building2,
  Save,
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getStoredParents, updateStoredParent, deleteStoredParent, saveNewParent } from '../../../utils/parentStorage';
import { MaleIcon, FemaleIcon } from '../../../components/common/GenderIcons';


const ParentList = () => {
  const { showToast } = useToast();
  const [parents, setParents] = useState(() => getStoredParents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState(null);

  const [parentForm, setParentForm] = useState({
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
  });

  useEffect(() => {
    const handleUpdate = () => {
      setParents(getStoredParents());
    };
    window.addEventListener('school_parents_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('school_parents_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredParents = parents.filter((pr) => {
    const matchesSearch =
      (pr.fatherName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pr.motherName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pr.wardName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pr.wardRollNo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pr.phone || '').includes(searchQuery) ||
      (pr.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pr.occupation || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedClass !== 'all' && !pr.wardClass?.includes(selectedClass)) return false;
    if (selectedStatus !== 'all' && pr.portalStatus !== selectedStatus) return false;
    return true;
  });

  const openAddModal = () => {
    setParentForm({
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
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (parent) => {
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
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!parentForm.fatherName.trim() && !parentForm.motherName.trim()) {
      showToast({ title: 'Validation Error', message: 'At least one Parent Name is required.', type: 'error' });
      return;
    }

    saveNewParent(parentForm);
    setParents(getStoredParents());
    setIsAddModalOpen(false);

    showToast({
      title: 'Parent Enrolled',
      message: `Successfully registered parent account for ward ${parentForm.wardName}.`,
      type: 'success',
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingParent) return;

    updateStoredParent(editingParent.id, parentForm);
    setParents(getStoredParents());
    setIsEditModalOpen(false);

    showToast({
      title: 'Parent Updated',
      message: `Updated profile details for ${parentForm.fatherName || parentForm.motherName}.`,
      type: 'success',
    });
  };

  const handleDelete = (id, name) => {
    const updated = deleteStoredParent(id);
    setParents(updated);
    showToast({
      title: 'Parent Record Removed',
      message: `${name}'s parent record removed.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openAddModal}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>+ Register Parent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="clay-card p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by parent name, ward name, roll no, phone, occupation, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clay-input w-full pl-9 pr-4 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Class:</span>
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="clay-input px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200"
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

      {/* Comprehensive Parent Directory Table */}
      <div className="clay-card overflow-hidden">
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
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-xs">
                    No parent records found matching the search query.
                  </td>
                </tr>
              ) : (
                filteredParents.map((pr) => (
                  <tr key={pr.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    {/* Parents Name */}
                    <td className="px-4 py-2.5">
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

                    {/* Student Ward */}
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-slate-800 dark:text-white">
                        {pr.wardName}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
                          {pr.wardClass}
                        </span>
                        <span>• Roll: {pr.wardRollNo}</span>
                      </div>
                    </td>

                    {/* Contact */}
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

                    {/* Profession */}
                    <td className="px-3 py-2.5">
                      <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
                        <Briefcase className="w-3 h-3 text-slate-500" />
                        <span>{pr.occupation || 'Self-Employed'}</span>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-3 py-2.5">
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 max-w-[170px]">
                        {pr.address || 'Campus Town'}
                      </span>
                    </td>

                    {/* Status */}
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

                    {/* Actions */}
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(pr)}
                          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                          title="Edit Parent"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(pr.id, pr.fatherName || pr.motherName)}
                          className="clay-btn-secondary p-1.5 rounded-lg text-slate-500 hover:text-rose-600 transition cursor-pointer"
                          title="Delete Parent"
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

      {/* Edit Parent Modal */}
      {isEditModalOpen && editingParent && (
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
                onClick={() => setIsEditModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Full Name
                  </label>
                  <input
                    type="text"
                    value={parentForm.fatherName}
                    onChange={(e) => setParentForm({ ...parentForm, fatherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mother's Full Name
                  </label>
                  <input
                    type="text"
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
                  onClick={() => setIsEditModalOpen(false)}
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
            </form>
          </div>
        </div>
      )}

      {/* Register Parent Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Register New Parent / Guardian
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Connect parent credentials to student ward
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={parentForm.fatherName}
                    onChange={(e) => setParentForm({ ...parentForm, fatherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunita Kumar"
                    value={parentForm.motherName}
                    onChange={(e) => setParentForm({ ...parentForm, motherName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student / Ward Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar"
                    value={parentForm.wardName}
                    onChange={(e) => setParentForm({ ...parentForm, wardName: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ward Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10A-18"
                    value={parentForm.wardRollNo}
                    onChange={(e) => setParentForm({ ...parentForm, wardRollNo: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
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
                    placeholder="parent@school.com"
                    value={parentForm.email}
                    onChange={(e) => setParentForm({ ...parentForm, email: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Doctor, Merchant"
                    value={parentForm.occupation}
                    onChange={(e) => setParentForm({ ...parentForm, occupation: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ward Class
                  </label>
                  <select
                    value={parentForm.wardClass}
                    onChange={(e) => setParentForm({ ...parentForm, wardClass: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 9-A">Class 9-A</option>
                    <option value="Class 8-B">Class 8-B</option>
                    <option value="Class 7-A">Class 7-A</option>
                    <option value="Class 6-B">Class 6-B</option>
                    <option value="Class 11-Science">Class 11-Science</option>
                    <option value="Class 12-Science">Class 12-Science</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="clay-btn-secondary px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Register Parent</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentList;
