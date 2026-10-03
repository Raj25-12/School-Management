import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Save,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { saveNewStudent } from '../../../utils/studentStorage';
import { MaleIcon, FemaleIcon } from '../../../components/common/GenderIcons';
import Loader from '../../../components/common/Loader';


const AddStudent = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    class: 'Class 10',
    section: 'A',
    fatherName: '',
    motherName: '',
    contact: '',
    email: '',
    gender: 'Male',
    dob: '',
    address: '',
    status: 'Active',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) {
      showToast({ title: 'Validation Error', message: 'Student Name and Roll No are required.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      saveNewStudent(formData);
      setIsLoading(false);

      showToast({
        title: 'Student Enrolled Successfully',
        message: `${formData.name} has been enrolled in ${formData.class}-${formData.section}.`,
        type: 'success',
      });

      navigate('/admin/students');
    }, 300);
  };

  return (
    <div className="space-y-4 pb-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Admission & Registration</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Add New Student
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-normal">
              Enter student credentials, roll number, class assignment, parents details, and contact info.
            </p>
          </div>

          <Link
            to="/admin/students"
            className="clay-btn-secondary px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Directory</span>
          </Link>
        </div>
      </div>

      {/* 📝 Form */}
      <div className="clay-card p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1 */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>1. Academic & Student Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Student Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohan Sharma"
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  placeholder="e.g. 10A-01"
                  className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Class
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  placeholder="e.g. A"
                  className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admission Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Fees Pending">Fees Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Parents Information */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
              <span>2. Parents / Guardian Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <MaleIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span>Father's Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="e.g. Manoj Sharma"
                  className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <FemaleIcon className="w-3.5 h-3.5 text-rose-500" />
                  <span>Mother's Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  placeholder="e.g. Sunita Sharma"
                  className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>3. Contact & Address Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Contact / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. student@school.com"
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Residential Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Flat No, Street, Landmark, City..."
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <Link
              to="/admin/students"
              className="clay-btn-secondary px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="clay-btn-emerald px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              {isLoading ? (
                <Loader size="xs" variant="white" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Enroll Student</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
