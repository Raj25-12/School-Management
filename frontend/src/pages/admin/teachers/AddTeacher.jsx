import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  UserCheck,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Building2,
  Save,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import {
  PageHeader,
  Card,
  Input,
  Select,
  Button,
  IdCardPreview,
  Loader,
} from '../../../components/common';

const departments = [
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Computer Science',
  'Languages (Hindi/Sanskrit)',
  'Physical Education & Sports',
  'Fine Arts & Music',
];

const availableClasses = [
  'Class 6-A', 'Class 6-B',
  'Class 7-A', 'Class 7-B',
  'Class 8-A', 'Class 8-B',
  'Class 9-A', 'Class 9-B',
  'Class 10-A', 'Class 10-B',
  'Class 11-Science', 'Class 11-Commerce', 'Class 11-Humanities',
  'Class 12-Science', 'Class 12-Commerce', 'Class 12-Humanities',
];

const AddTeacher = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
    gender: 'Male',
    dob: '1990-05-15',
    department: 'Mathematics',
    primarySubject: 'Advanced Algebra & Calculus',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '6 Years',
    joiningDate: '2026-09-29',
    assignedClasses: ['Class 9-A', 'Class 10-A'],
    contractType: 'Full-Time',
    salary: '₹55,000 / month',
    address: '14/B Academic Enclave, Green Park, City',
    password: 'password123',
    status: 'Active',
    avatar: null,
  });

  const handleClassToggle = useCallback((cls) => {
    setFormData((prev) => {
      const exists = prev.assignedClasses.includes(cls);
      return {
        ...prev,
        assignedClasses: exists
          ? prev.assignedClasses.filter((c) => c !== cls)
          : [...prev.assignedClasses, cls],
      };
    });
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Persist new teacher to localStorage
    const existingTeachers = JSON.parse(localStorage.getItem('admin_teachers_list') || '[]');
    const newTeacher = {
      ...formData,
      id: `TCH-REC-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('admin_teachers_list', JSON.stringify([newTeacher, ...existingTeachers]));
    window.dispatchEvent(new Event('school_teachers_updated'));

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Teacher "${formData.name}" created successfully!`);
      setTimeout(() => {
        navigate('/admin/teachers');
      }, 1200);
    }, 400);
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Reusable Header Banner */}
      <PageHeader
        backTo="/admin/teachers"
        badgeIcon={UserPlus}
        badgeText="Teacher Onboarding • Admin Portal"
        title="Add New Faculty / Teacher"
        description="Create faculty profile, assign academic departments, classes, and setup login credentials."
        actions={
          <Link to="/admin/teachers">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </Link>
        }
      />

      {/* Success Notification */}
      {successMsg && (
        <Card variant="emerald" padding="p-4" className="flex items-center gap-3 border border-emerald-300 dark:border-emerald-800 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-100">
              {successMsg}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
              Redirecting to Teachers directory...
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Form */}
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Section 1: Basic Personal Info */}
            <Card padding="p-5" className="space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  1. Personal & Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Full Name"
                  required
                  placeholder="e.g. Dr. Sunita Verma"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />

                <Input
                  label="Employee ID"
                  required
                  placeholder="TCH-1045"
                  value={formData.employeeId}
                  onChange={(e) => handleChange('employeeId', e.target.value)}
                />

                <Input
                  label="Email Address (For Portal Login)"
                  type="email"
                  required
                  icon={Mail}
                  placeholder="teacher@school.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  required
                  icon={Phone}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />

                <Select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  options={['Male', 'Female', 'Other']}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
              </div>

              <Input
                label="Residential Address"
                placeholder="Street Address, City, State, PIN"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Card>

            {/* Section 2: Department & Academic Details */}
            <Card padding="p-5" className="space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  2. Academic Department & Teaching Subject
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Select
                  label="Department"
                  required
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  options={departments}
                />

                <Input
                  label="Primary Subject"
                  required
                  placeholder="e.g. Physics / Chemistry"
                  value={formData.primarySubject}
                  onChange={(e) => handleChange('primarySubject', e.target.value)}
                />

                <Input
                  label="Highest Qualification"
                  placeholder="e.g. M.Sc, M.Phil, Ph.D, B.Ed"
                  value={formData.qualification}
                  onChange={(e) => handleChange('qualification', e.target.value)}
                />

                <Input
                  label="Teaching Experience"
                  placeholder="e.g. 5 Years"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                />
              </div>

              {/* Assigned Classes */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Assign Teaching Classes (Click to Select)
                </label>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  {availableClasses.map((cls) => {
                    const isSelected = formData.assignedClasses.includes(cls);
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => handleClassToggle(cls)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                          isSelected
                            ? 'clay-btn-emerald text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500'
                        }`}
                      >
                        {cls} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Section 3: Joining & Credentials */}
            <Card padding="p-5" className="space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  3. Employment & Portal Login Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <Select
                  label="Contract Type"
                  value={formData.contractType}
                  onChange={(e) => handleChange('contractType', e.target.value)}
                  options={[
                    { value: 'Full-Time', label: 'Full-Time (Permanent)' },
                    { value: 'Contract', label: 'Contractual' },
                    { value: 'Part-Time', label: 'Part-Time / Visiting' },
                  ]}
                />

                <Input
                  label="Date of Joining"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleChange('joiningDate', e.target.value)}
                />

                <Input
                  label="Monthly Salary / Scale"
                  placeholder="₹55,000"
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Default Login Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                    className="clay-input w-full pl-8 pr-9 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </Card>

            {/* Submit & Save Button Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link to="/admin/teachers">
                <Button variant="secondary" size="md">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="emerald"
                size="md"
                disabled={isLoading}
                icon={isLoading ? null : Save}
              >
                {isLoading ? <Loader size="xs" variant="white" /> : 'Create & Onboard Teacher'}
              </Button>
            </div>
          </form>
        </div>

        {/* Right 1 Column: Reusable Live ID Card Preview */}
        <div>
          <IdCardPreview
            name={formData.name}
            idNumber={formData.employeeId}
            roleLabel="Faculty ID Card"
            subHeading={formData.primarySubject}
            extraFieldLabel="Dept:"
            extraFieldValue={formData.department}
            email={formData.email}
            phone={formData.phone}
            tags={formData.assignedClasses}
            status={formData.status}
            avatarImage={formData.avatar}
            onAvatarChange={(img) => handleChange('avatar', img)}
            tipText="Once created, the teacher can immediately log in using their email and assigned password via the Teacher Portal."
          />
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
