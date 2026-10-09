import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  UserCheck,
  Save,
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  AlertCircle,
  IdCard,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { getTeacherById, updateStoredTeacher } from '../../../utils/teacherStorage';
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
    localAddress: '',
    permanentAddress: '',
    address: '',
    gender: 'Male',
    status: 'Active',
    avatar: null,
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
        localAddress: teacher.localAddress || teacher.address || '',
        permanentAddress: teacher.permanentAddress || teacher.address || '',
        address: teacher.localAddress || teacher.address || '',
        gender: teacher.gender || 'Male',
        status: teacher.status || 'Active',
        avatar: teacher.avatar || localStorage.getItem(`teacher_avatar_${id}`) || null,
      });
    } else {
      setNotFound(true);
    }
  }, [id]);

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
      <Card padding="p-8" className="text-center space-y-4 max-w-md mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Faculty Record Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The teacher with ID <span className="font-mono font-bold text-slate-700">{id}</span> does not exist.
        </p>
        <Link to="/admin/teachers">
          <Button variant="emerald" size="sm" icon={ArrowLeft}>
            Back to Teachers Directory
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4 pb-8 max-w-5xl mx-auto">
      {/* Reusable Page Header */}
      <PageHeader
        backTo="/admin/teachers"
        badgeIcon={Sparkles}
        badgeText={`Teacher Profile Editor • Employee ID: ${formData.employeeId || id}`}
        title="Edit Faculty Profile"
        description="Update teacher credentials, subject assignments, assigned classes, and contact details."
        actions={
          <Link to="/admin/teachers">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Cancel & Back
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Edit Form */}
        <div className="lg:col-span-2">
          <Card padding="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Section 1: Personal & Contact */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>1. Personal & Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Dr. Sunita Verma"
                  />

                  <Input
                    label="Employee ID"
                    required
                    icon={IdCard}
                    value={formData.employeeId}
                    onChange={(e) => handleChange('employeeId', e.target.value)}
                    placeholder="e.g. TCH-1002"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    required
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="e.g. sunita.verma@school.com"
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    icon={Phone}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="e.g. +91 98222 33445"
                  />

                  <Select
                    label="Gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    options={['Male', 'Female', 'Other']}
                  />

                  <Select
                    label="Employment Status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    options={['Active', 'On Leave', 'Suspended', 'Resigned']}
                  />

                  <Input
                    label="Local Address"
                    value={formData.localAddress || ''}
                    onChange={(e) => {
                      handleChange('localAddress', e.target.value);
                      handleChange('address', e.target.value);
                    }}
                    placeholder="Street Address, City, State, PIN"
                  />

                  <Input
                    label="Permanent Address"
                    value={formData.permanentAddress || ''}
                    onChange={(e) => handleChange('permanentAddress', e.target.value)}
                    placeholder="Permanent Home Address, City, PIN"
                  />
                </div>
              </div>

              {/* Section 2: Department & Academic Details */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 pb-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>2. Department & Subject Assignment</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Select
                    label="Department"
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    options={departments}
                  />

                  <Input
                    label="Primary Subject"
                    value={formData.primarySubject}
                    onChange={(e) => handleChange('primarySubject', e.target.value)}
                    placeholder="e.g. Physics & Optics"
                  />

                  <Input
                    label="Qualification"
                    value={formData.qualification}
                    onChange={(e) => handleChange('qualification', e.target.value)}
                    placeholder="e.g. Ph.D. Physics, M.Sc."
                  />

                  <Input
                    label="Experience"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="e.g. 9 Years"
                  />

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
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
                  {isLoading ? <Loader size="xs" variant="white" /> : 'Save Teacher Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right 1 Column: Reusable Live Card Preview */}
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
            onAvatarChange={(img) => {
              handleChange('avatar', img);
              if (img) localStorage.setItem(`teacher_avatar_${id}`, img);
              else localStorage.removeItem(`teacher_avatar_${id}`);
            }}
            tipText="Changes made will immediately reflect in the portal schedule and faculty directory."
          />
        </div>
      </div>
    </div>
  );
};

export default EditTeacher;
