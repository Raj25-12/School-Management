import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  UserCheck,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Calendar,
  Briefcase,
  DollarSign,
  IdCard,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Building2,
  Save,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';

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
  });

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

    // Persist new teacher to localStorage so TeacherList can display it
    const existingTeachers = JSON.parse(localStorage.getItem('admin_teachers_list') || '[]');
    const newTeacher = {
      ...formData,
      id: `TCH-REC-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('admin_teachers_list', JSON.stringify([newTeacher, ...existingTeachers]));

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Teacher "${formData.name}" created successfully!`);
      setTimeout(() => {
        navigate('/admin/teachers');
      }, 1200);
    }, 500);
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/teachers"
              className="clay-btn-secondary p-2 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 cursor-pointer shrink-0"
              title="Back to Teacher List"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <UserPlus className="w-3.5 h-3.5 text-emerald-500" />
                <span>Teacher Onboarding • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Add New Faculty / Teacher
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Create faculty profile, assign academic departments, classes, and setup login credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/teachers"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="clay-emerald p-4 flex items-center gap-3 border border-emerald-300 dark:border-emerald-800 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-100">
              {successMsg}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
              Redirecting to Teachers directory...
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Multi-section Registration Form */}
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Section 1: Basic Personal Info */}
            <div className="clay-card p-5 space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  1. Personal & Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sunita Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TCH-1045"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address * (For Portal Login)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="teacher@school.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="clay-input w-full pl-8 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="clay-input w-full pl-8 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Male" className="dark:bg-slate-900">Male</option>
                    <option value="Female" className="dark:bg-slate-900">Female</option>
                    <option value="Other" className="dark:bg-slate-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  placeholder="Street Address, City, State, PIN"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Section 2: Department & Academic Details */}
            <div className="clay-card p-5 space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  2. Academic Department & Teaching Subject
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="dark:bg-slate-900">
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics / Chemistry"
                    value={formData.primarySubject}
                    onChange={(e) => setFormData({ ...formData, primarySubject: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M.Sc, M.Phil, Ph.D, B.Ed"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Teaching Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
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
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${isSelected
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
            </div>

            {/* Section 3: Joining & Credentials */}
            <div className="clay-card p-5 space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-slate-800 dark:text-white">
                  3. Employment & Portal Login Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contract Type
                  </label>
                  <select
                    value={formData.contractType}
                    onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Full-Time" className="dark:bg-slate-900">Full-Time (Permanent)</option>
                    <option value="Contract" className="dark:bg-slate-900">Contractual</option>
                    <option value="Part-Time" className="dark:bg-slate-900">Part-Time / Visiting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Monthly Salary / Scale
                  </label>
                  <input
                    type="text"
                    placeholder="₹55,000"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Default Login Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            </div>

            {/* Submit & Save Button Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/admin/teachers"
                className="clay-btn-secondary px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="clay-btn-emerald px-6 py-2.5 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create & Onboard Teacher</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Column: Live Real-Time ID Card Preview */}
        <div className="space-y-4">
          <div className="clay-card p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live ID Card Preview
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Staff Card
              </span>
            </div>

            {/* Simulated School ID Card */}
            <div className="clay-emerald p-4 rounded-2xl space-y-3 relative overflow-hidden border border-emerald-300 dark:border-emerald-800">
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
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-extrabold text-[10px]">
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Quick Tip</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Once created, the teacher can immediately log in using their email and assigned password via the Teacher Portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
