import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Edit,
  Sparkles,
  MapPin
} from 'lucide-react';
import { getStudentById } from '../../../utils/studentStorage';
import {
  Button,
  Badge,
  Card,
  MaleIcon,
  FemaleIcon
} from '../../../components/common';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(() => getStudentById(id));

  useEffect(() => {
    setStudent(getStudentById(id));
  }, [id]);

  if (!student) {
    return (
      <Card className="p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Student Record Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No student record found matching identifier: {id}.
        </p>
        <Link to="/admin/students">
          <Button variant="emerald" icon={ArrowLeft}>
            Back to Students List
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
              to="/admin/students"
              className="clay-btn-secondary p-2 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 cursor-pointer shrink-0"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Student Dossier • Roll: {student.rollNo} • ID: {student.id}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                {student.name}
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {student.class} {student.section && `• Section ${student.section}`}
              </p>
            </div>
          </div>

          <Link to={`/admin/students/edit/${student.id}`}>
            <Button variant="emerald" icon={Edit}>
              Edit Student
            </Button>
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Profile Summary */}
        <Card padding="p-5" className="space-y-4">
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
            <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-lg clay-icon-pill mb-3">
              {student.avatar || student.name.charAt(0)}
            </div>
            <h2 className="text-base font-black text-slate-800 dark:text-white">{student.name}</h2>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Roll No: {student.rollNo}</div>
            <div className="mt-2">
              <Badge
                variant={student.status === 'Active' || student.status === 'Approved' ? 'emerald' : 'amber'}
                size="md"
              >
                {student.status || 'Active'}
              </Badge>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href={`tel:${student.contact}`} className="font-mono font-bold hover:underline">
                {student.contact}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-mono truncate">{student.email || 'student@school.com'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{student.address || 'Local Residence'}</span>
            </div>
          </div>
        </Card>

        {/* Right Details Grid */}
        <Card padding="p-5 sm:p-6" className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            Student & Parents Complete Dossier
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Academic Class</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{student.class}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Section</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{student.section || 'A'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                <MaleIcon className="w-3 h-3 text-blue-500" />
                <span>Father's Name</span>
              </span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{student.fatherName || 'N/A'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                <FemaleIcon className="w-3 h-3 text-rose-500" />
                <span>Mother's Name</span>
              </span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{student.motherName || 'N/A'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Gender</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{student.gender || 'Male'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Date of Birth</span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{student.dob || '2010-01-01'}</div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Link to={`/admin/students/edit/${student.id}`}>
              <Button variant="emerald" icon={Edit}>
                Modify Details
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetails;
