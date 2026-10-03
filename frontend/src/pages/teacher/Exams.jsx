import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Clock,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card } from '../../components/common';

const teacherExamSchedules = [
  {
    id: 'EX-T1',
    examTitle: 'Half-Yearly Mid-Term Examination 2026',
    subject: 'Mathematics (Theory & Problem Solving)',
    classGrade: 'Class 10-A & 10-B',
    date: '2026-10-12',
    time: '09:00 AM - 12:00 PM',
    room: 'Hall A & Examination Hall',
    invigilator: 'Prof. Rajesh Sharma (Lead)',
    maxMarks: 80,
    syllabus: 'Chapters 1 to 7 (Algebra, Polynomials, Coordinate Geometry, Trigonometry)',
    status: 'Upcoming'
  },
  {
    id: 'EX-T2',
    examTitle: 'Half-Yearly Mid-Term Examination 2026',
    subject: 'Higher Mathematics & Vectors',
    classGrade: 'Class 11-Science',
    date: '2026-10-15',
    time: '09:00 AM - 12:00 PM',
    room: 'Room 301',
    invigilator: 'Prof. Rajesh Sharma',
    maxMarks: 80,
    syllabus: 'Calculus, Vectors, Sequences & Series',
    status: 'Upcoming'
  },
  {
    id: 'EX-T3',
    examTitle: 'Unit Test 1 (Periodic Assessment)',
    subject: 'Mathematics Assessment',
    classGrade: 'Class 9-A',
    date: '2026-08-20',
    time: '08:30 AM - 10:00 AM',
    room: 'Room 105',
    invigilator: 'Prof. Rajesh Sharma',
    maxMarks: 40,
    syllabus: 'Number Systems, Polynomials',
    status: 'Completed'
  }
];

const TeacherExams = () => {
  const [exams] = useState(teacherExamSchedules);

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sand" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Examination Duty & Invigilation Roster</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Examination Schedules & Faculty Duties
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Track upcoming subject papers, invigilation hall assignments, question blueprint syllabus, and marks entry.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/teacher/marks">
              <Button
                variant="sand"
                size="sm"
                icon={FileText}
              >
                Enter Student Marks
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 📋 Exam Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((ex) => (
          <Card
            key={ex.id}
            className="p-4 sm:p-5 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 transition relative overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {ex.id}
                </span>
                <Badge variant={ex.status === 'Completed' ? 'emerald' : 'amber'}>
                  {ex.status}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">
                {ex.subject}
              </h3>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{ex.examTitle} • {ex.classGrade}</p>

              <div className="mt-3 p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-bold">{ex.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{ex.time}</span>
                </div>
                <div className="col-span-2 text-[11px] text-slate-500 font-semibold pt-1 border-t border-amber-200/60 dark:border-amber-800/40">
                  Assigned Invigilator: <strong className="text-slate-800 dark:text-white">{ex.invigilator}</strong> ({ex.room})
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 pt-3">
                <span className="font-bold text-slate-800 dark:text-white block text-[11px] mb-0.5">Syllabus Outline:</span>
                <p className="text-[11px] leading-relaxed text-slate-500">{ex.syllabus}</p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Max Score: {ex.maxMarks} Marks</span>
              <Link to="/teacher/marks">
                <Button variant="sand" size="xs" icon={FileText}>
                  Enter Marks
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherExams;
