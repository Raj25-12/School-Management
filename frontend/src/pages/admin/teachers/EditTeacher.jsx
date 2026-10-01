import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  UserCheck,
  Save,
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getTeacherById, updateStoredTeacher } from '../../../utils/teacherStorage';
import logo from '../../../assets/logo_clean.png';
import { Button, Input, Select, Badge, Card, EmptyState } from '../../../components/common';

const departments = [
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Computer Science',
  'Languages (Hindi/Sanskrit)',
  'Physical Education & Sports',
  'Fine Arts & Music'
];

const availableClasses = [
  'Class 6-A', 'Class 6-B',
  'Class 7-A', 'Class 7-B',
  'Class 8-A', 'Class 8-B',
  'Class 9-A', 'Class 9-B',
  'Class 10-A', 'Class 10-B',
  'Class 11-Science', 'Class 11-Commerce', 'Class 11-Humanities',
  'Class 12-Science', 'Class 12-Commerce', 'Class 12-Humanities'
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const departmentOptions = departments.map((d) => ({ value: d, label: d }));

const contractOptions = [
  { value: 'Full-Time', label: 'Full-Time (Permanent)' },
  { value: 'Contract', label: 'Contractual' },
  { value: 'Part-Time', label: 'Part-Time / Visiting' },
];

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'On Leave', label: 'On Leave' },
  { value: 'Inactive', label: 'Inactive' },
];

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    primarySubject: '',
    qualification: '',
    experience: '',
    joiningDate: '',
    assignedClasses: [],
    contractType: 'Full-Time',
    salary: '',
    address: '',
    gender: 'Male',
    status: 'Active',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const teacher = getTeacherById(id);
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        employeeId: teacher.employeeId || teacher.id || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        department: teacher.department || 'Mathematics',
        primarySubject: teacher.primarySubject || '',
        qualification: teacher.qualification || '',
        experience: teacher.experience || '',
        joiningDate: teacher.joiningDate || '',
        assignedClasses: Array.isArray(teacher.assignedClasses) ? teacher.assignedClasses : [],
        contractType: teacher.contractType || 'Full-Time',
        salary: teacher.salary || '',
        address: teacher.address || '',
        gender: teacher.gender || 'Male',
        status: teacher.status || 'Active',
      });
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleClassToggle = (cls) => {
    setFormData((prev) => {
      const exists = prev.assignedClasses.includes(cls);
      if (exists) {
        return { ...prev, assignedClasses: prev.assignedClasses.filter((c) => c !== cls) };
      } else {
        return { ...prev, assignedClasses: [...prev.assignedClasses, cls] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateStoredTeacher(id, formData);
      setIsLoading(false);

      showToast({
        title: 'Teacher Profile Updated',
        message: `${formData.name}'s faculty records have been updated.`,
        type: 'emerald',
      });

      navigate('/admin/teachers');
    }, 400);
  };

  if (notFound) {
    return (
      <div className="py-12">
        <EmptyState
          icon={AlertCircle}
          title="Faculty Profile Not Found"
          description={`No teacher was found with ID: ${id}.`}
          actionLabel="Back to Teachers"
          actionIcon={ArrowLeft}
          onAction={() => navigate('/admin/teachers')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-10">
      {/* Header Banner */}
      <Card variant="emerald" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/admin/teachers">
              <Button variant="secondary" size="sm" icon={ArrowLeft} />
            </Link>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Faculty Profile Editor • {formData.employeeId || id}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Edit Faculty Details
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Update teaching assignments, salary, contact details, and departmental roles.
              </p>
            </div>
          </div>

          <Link to="/admin/teachers">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Multi-section Edit Form */}
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Section 1: Basic Personal Info */}
            <Card className="p-5 space-y-3.5">
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
                  label="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  label="Employee ID *"
                  required
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                />

                <Input
                  label="Email Address *"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={Mail}
                />

                <Input
                  label="Phone Number *"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  icon={Phone}
                />

                <Select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  options={genderOptions}
                />

                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  options={statusOptions}
                />
              </div>

              <Input
                label="Residential Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Card>

            {/* Section 2: Department & Academic Details */}
            <Card className="p-5 space-y-3.5">
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
                  label="Department *"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  options={departmentOptions}
                />

                <Input
                  label="Primary Subject *"
                  required
                  value={formData.primarySubject}
                  onChange={(e) => setFormData({ ...formData, primarySubject: e.target.value })}
                />

                <Input
                  label="Highest Qualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />

                <Input
                  label="Teaching Experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>

              {/* Assigned Classes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
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

            {/* Section 3: Joining & Contract */}
            <Card className="p-5 space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  3. Employment & Contract
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <Select
                  label="Contract Type"
                  value={formData.contractType}
                  onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                  options={contractOptions}
                />

                <Input
                  label="Date of Joining"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                />

                <Input
                  label="Monthly Salary / Scale"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
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
                loading={isLoading}
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Right 1 Column: Live Real-Time ID Card Preview */}
        <div className="space-y-4">
          <Card className="p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live ID Card Preview
              </span>
              <Badge variant="emerald">
                Staff Card
              </Badge>
            </div>

            {/* Simulated School ID Card */}
            <Card variant="emerald" className="p-4 rounded-2xl space-y-3 relative overflow-hidden border border-emerald-300 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 p-1 flex items-center justify-center clay-icon-pill">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain dark:brightness-0 dark:invert" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">
                      School Management
                    </div>
                    <div className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase">
                      Faculty ID Card
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  {formData.employeeId || 'TCH-XXXX'}
                </span>
              </div>

              {/* Photo & Name */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl font-black text-emerald-600 dark:text-emerald-400 clay-icon-pill shrink-0 shadow-xs">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'T'}
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {formData.name || 'Teacher Full Name'}
                  </h3>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 truncate mt-0.5">
                    {formData.primarySubject || 'Primary Subject'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Dept: {formData.department}
                  </div>
                </div>
              </div>

              {/* Badges / Details */}
              <div className="pt-2 border-t border-emerald-200/70 dark:border-emerald-800/70 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400">Email:</span>
                  <span className="font-mono font-bold truncate max-w-[140px]">{formData.email || 'email@school.com'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400">Classes:</span>
                  <span className="font-bold truncate max-w-[140px] text-emerald-700 dark:text-emerald-300">
                    {formData.assignedClasses.length > 0 ? formData.assignedClasses.join(', ') : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400">Status:</span>
                  <Badge variant="emerald" size="sm">
                    {formData.status}
                  </Badge>
                </div>
              </div>
            </Card>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Modifications to assigned classes and departments will reflect dynamically in the timetable and teacher dashboards.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditTeacher;
