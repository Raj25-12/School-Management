import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Edit2,
  Sparkles,
  MapPin
} from 'lucide-react';
import { getTeacherById } from '../../../utils/teacherStorage';
import {
  Button,
  Badge,
  Card,
  AvatarUpload
} from '../../../components/common';

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(() => getTeacherById(id));
  const [avatar, setAvatar] = useState(() => teacher?.avatar || localStorage.getItem(`teacher_avatar_${id}`) || null);

  useEffect(() => {
    const t = getTeacherById(id);
    setTeacher(t);
    setAvatar(t?.avatar || localStorage.getItem(`teacher_avatar_${id}`) || null);
  }, [id]);

  const handleAvatarChange = (photo) => {
    setAvatar(photo);
    if (photo) {
      localStorage.setItem(`teacher_avatar_${id}`, photo);
    } else {
      localStorage.removeItem(`teacher_avatar_${id}`);
    }
  };

  if (!teacher) {
    return (
      <Card className="p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Faculty Record Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No faculty record matching ID {id}.
        </p>
        <Link to="/admin/teachers">
          <Button variant="emerald" icon={ArrowLeft}>
            Back to Teachers Directory
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4 pb-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <Card variant="emerald">
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

          <Link to={`/admin/teachers/edit/${teacher.id || teacher.employeeId}`}>
            <Button variant="emerald" icon={Edit2}>
              Edit Teacher
            </Button>
          </Link>
        </div>
      </Card>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left ID & Quick Info */}
        <Card padding="p-5" className="space-y-4">
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
            <div className="mb-3">
              <AvatarUpload
                image={avatar}
                initials={teacher.name.charAt(0)}
                name={teacher.name}
                variant="emerald"
                size="md"
                onImageChange={handleAvatarChange}
              />
            </div>
            <h2 className="text-base font-black text-slate-800 dark:text-white">{teacher.name}</h2>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{teacher.employeeId}</div>
            <div className="mt-2">
              <Badge variant={teacher.status === 'Active' ? 'emerald' : 'amber'}>
                {teacher.status || 'Active'}
              </Badge>
            </div>
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
            <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Local: </span>
                  {teacher.localAddress || teacher.address || 'Campus Staff Quarters'}
                </div>
                {teacher.permanentAddress && teacher.permanentAddress !== teacher.localAddress && (
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Permanent: </span>
                    {teacher.permanentAddress}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Right Details Grid */}
        <Card padding="p-5 sm:p-6" className="lg:col-span-2 space-y-4">
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
        </Card>
      </div>
    </div>
  );
};

export default TeacherDetails;
