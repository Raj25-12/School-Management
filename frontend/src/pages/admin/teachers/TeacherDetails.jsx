import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  UserCheck,
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Building2,
  Edit2,
  Sparkles,
  IdCard,
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { getTeacherById } from '../../../utils/teacherStorage';
import logo from '../../../assets/logo_clean.png';

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const found = getTeacherById(id);
    if (found) {
      setTeacher(found);
    }
  }, [id]);

  if (!teacher) {
    return (
      <div className="clay-card p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Faculty Record Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No faculty record matching ID {id}.
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
          <div className="flex items-center gap-3">
            <Link
              to="/admin/teachers"
              className="clay-btn-secondary p-2 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 cursor-pointer shrink-0"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Faculty Profile • ID: {teacher.employeeId || teacher.id}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                {teacher.name}
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {teacher.primarySubject} • {teacher.department} Department
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/admin/teachers/edit/${teacher.id || teacher.employeeId}`}
              className="clay-btn-emerald px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Teacher</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left ID & Quick Info */}
        <div className="clay-card p-5 space-y-4">
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
            <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-lg clay-icon-pill mb-3">
              {teacher.name.charAt(0)}
            </div>
            <h2 className="text-base font-black text-slate-800 dark:text-white">{teacher.name}</h2>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{teacher.employeeId}</div>
            <span className="mt-2 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
              {teacher.status || 'Active'}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-mono truncate">{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-mono">{teacher.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{teacher.address || 'Campus Staff Quarters'}</span>
            </div>
          </div>
        </div>

        {/* Right Details Grid */}
        <div className="lg:col-span-2 clay-card p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            Academic & Employment Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Department</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{teacher.department}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Primary Subject</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{teacher.primarySubject}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Qualification</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{teacher.qualification || 'M.Sc, B.Ed'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Experience</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{teacher.experience || '8 Years'}</div>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Assigned Classes</span>
            <div className="flex flex-wrap gap-1.5">
              {(teacher.assignedClasses || []).map((cls) => (
                <span
                  key={cls}
                  className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800"
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
