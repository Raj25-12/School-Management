import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  UserCheck,
  Save,
  ArrowLeft,
  User,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  Building2,
  Calendar,
  AlertCircle,
  IdCard,
  Briefcase,
  MapPin,
  Lock
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getTeacherById, updateStoredTeacher } from '../../../utils/teacherStorage';
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
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast({ title: 'Validation Error', message: 'Teacher Name and Email are required.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      updateStoredTeacher(id, formData);
      setIsLoading(false);

      showToast({
        title: 'Teacher Profile Updated',
        message: `Successfully updated credentials & info for ${formData.name}.`,
        type: 'success',
      });

      navigate('/admin/teachers');
    }, 300);
  };

  if (notFound) {
    return (
      <div className="clay-card p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Faculty Record Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The teacher with ID <span className="font-mono font-bold text-slate-700">{id}</span> does not exist.
        </p>
        <Link
          to="/admin/teachers"
          className="clay-btn-emerald inline-flex items-center gap-2 px-4 py-2 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teachers Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Teacher Profile Editor • Employee ID: {formData.employeeId || id}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Edit Faculty Profile
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-normal">
              Update teacher credentials, subject assignments, assigned classes, and contact details.
            </p>
          </div>

          <Link
            to="/admin/teachers"
            className="clay-btn-secondary px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel & Back</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Edit Form */}
        <div className="lg:col-span-2">
          <div className="clay-card p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Section 1: Personal & Contact */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>1. Personal & Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Sunita Verma"
                        className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Employee ID *
                    </label>
                    <div className="relative">
                      <IdCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        placeholder="e.g. TCH-1002"
                        className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sunita.verma@school.com"
                        className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98222 33445"
                        className="clay-input w-full pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
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
                      className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Employment Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Resigned">Resigned</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Department & Academic Details */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>2. Department & Subject Assignment</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Subject
                    </label>
                    <input
                      type="text"
                      value={formData.primarySubject}
                      onChange={(e) => setFormData({ ...formData, primarySubject: e.target.value })}
                      placeholder="e.g. Physics & Optics"
                      className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      placeholder="e.g. Ph.D. Physics, M.Sc."
                      className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g. 9 Years"
                      className="clay-input w-full px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Assigned Teaching Classes
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
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <Link
                  to="/admin/teachers"
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
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Teacher Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right 1 Column: Live Card Preview */}
        <div className="space-y-4">
          <div className="clay-card p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Preview
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Updated Profile
              </span>
            </div>

            {/* Teacher Card Preview */}
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
                    {formData.name || 'Teacher Name'}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeacher;
