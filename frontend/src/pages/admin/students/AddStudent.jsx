import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { saveNewStudent } from '../../../utils/studentStorage';
import { MaleIcon, FemaleIcon } from '../../../components/common/GenderIcons';
import { Button, Input, Select, Card } from '../../../components/common';

const classOptions = [
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
  { value: 'Class 6', label: 'Class 6' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 12', label: 'Class 12' },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending Review', label: 'Pending Review' },
  { value: 'Fees Pending', label: 'Fees Pending' },
];

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
      <Card variant="emerald" className="p-4 sm:p-5 relative overflow-hidden">
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

          <Link to="/admin/students">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Directory
            </Button>
          </Link>
        </div>
      </Card>

      {/* 📝 Form */}
      <Card className="p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Academic & Student Details */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>1. Academic & Student Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <Input
                label="Full Student Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rohan Sharma"
                icon={User}
              />

              <Input
                label="Roll Number *"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="e.g. 10A-01"
              />

              <Select
                label="Class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                options={classOptions}
              />

              <Input
                label="Section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                placeholder="e.g. A"
              />

              <Select
                label="Gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                options={genderOptions}
              />

              <Select
                label="Admission Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={statusOptions}
              />
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

          {/* Section 3: Contact & Address Details */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>3. Contact & Address Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                label="Primary Contact / Phone Number *"
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                icon={Phone}
              />

              <Input
                label="Registered Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. student@school.com"
                icon={Mail}
              />

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
            <Link to="/admin/students">
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              variant="emerald"
              loading={isLoading}
              icon={UserPlus}
            >
              Enroll Student
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddStudent;
