import React from 'react';
import {
  User,
  GraduationCap,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge, Card } from '../../components/common';

const MyProfile = () => {
  const { user } = useAuth();

  const studentInfo = {
    name: user?.name || 'Alex Johnson',
    rollNo: '10A-01',
    classGrade: 'Class 10-A',
    admissionNo: 'ADM-2022-894',
    academicYear: '2026-2027',
    dob: '12 August 2010',
    gender: 'Male',
    bloodGroup: 'O+ Positive',
    email: user?.email || 'student@school.com',
    phone: '+91 98111 22334',
    fatherName: 'Mr. Robert Johnson (Software Architect)',
    motherName: 'Mrs. Emily Johnson (Teacher)',
    address: 'Flat 402, Oakwood Towers, Campus Enclave, New Delhi',
    classTeacher: 'Prof. Rajesh Sharma'
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sky" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <User className="w-3.5 h-3.5 text-sky-700" />
              <span>Student Identity & Academic Enrollment</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Student Profile & Enrolled Record
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Official school records, parent contacts, class incharge teacher, and admission details.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Card */}
        <Card className="p-5 text-center flex flex-col items-center justify-between">
          <div>
            <div className="w-20 h-20 rounded-3xl bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-2xl font-black flex items-center justify-center mx-auto mb-3 shadow-md clay-icon-pill border-2 border-sky-300">
              AJ
            </div>
            <h2 className="text-base font-black text-slate-800 dark:text-white">{studentInfo.name}</h2>
            <p className="text-xs font-semibold text-sky-700 dark:text-sky-300 mt-0.5">{studentInfo.classGrade}</p>
            <div className="mt-2">
              <Badge variant="sky">
                Roll No: {studentInfo.rollNo}
              </Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>Admission No: {studentInfo.admissionNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>Class Head: {studentInfo.classTeacher}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>DOB: {studentInfo.dob}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Details */}
        <Card className="md:col-span-2 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white pb-2.5 border-b border-slate-100 dark:border-slate-800">
            Official Enrollment Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Email Address</span>
              <span className="font-bold text-slate-800 dark:text-white text-xs">{studentInfo.email}</span>
            </div>

            <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Primary Phone</span>
              <span className="font-bold text-slate-800 dark:text-white text-xs">{studentInfo.phone}</span>
            </div>

            <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Gender & Blood Group</span>
              <span className="font-bold text-slate-800 dark:text-white text-xs">{studentInfo.gender} • {studentInfo.bloodGroup}</span>
            </div>

            <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Academic Session</span>
              <span className="font-bold text-slate-800 dark:text-white text-xs">{studentInfo.academicYear}</span>
            </div>

            <div className="sm:col-span-2 p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Parents / Guardians</span>
              <div className="font-bold text-slate-800 dark:text-white text-xs mt-0.5">Father: {studentInfo.fatherName}</div>
              <div className="font-bold text-slate-800 dark:text-white text-xs mt-0.5">Mother: {studentInfo.motherName}</div>
            </div>

            <div className="sm:col-span-2 p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Permanent Address</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">{studentInfo.address}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
