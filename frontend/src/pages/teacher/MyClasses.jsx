import React from 'react';
import {
  BookOpen,
  CalendarCheck,
  Award,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card } from '../../components/common';

const teacherClasses = [
  {
    id: 'cls-1',
    name: 'Class 10-A',
    role: 'Designated Class Teacher & Subject Faculty',
    subject: 'Mathematics & Advanced Algebra',
    studentsCount: 32,
    room: 'Room 201 (Science Block)',
    attendanceToday: '96.8%',
    syllabusProgress: 75,
    weeklyLectures: 6,
    isClassTeacher: true,
    topper: 'Alex Johnson (98.6%)'
  },
  {
    id: 'cls-2',
    name: 'Class 10-B',
    role: 'Subject Faculty',
    subject: 'Mathematics & Coordinate Geometry',
    studentsCount: 30,
    room: 'Room 202 (Science Block)',
    attendanceToday: '93.3%',
    syllabusProgress: 68,
    weeklyLectures: 6,
    isClassTeacher: false,
    topper: 'Riya Sen (95.4%)'
  },
  {
    id: 'cls-3',
    name: 'Class 9-A',
    role: 'Subject Faculty',
    subject: 'Mathematics & Geometry Basics',
    studentsCount: 35,
    room: 'Room 105 (Middle Block)',
    attendanceToday: '97.1%',
    syllabusProgress: 80,
    weeklyLectures: 5,
    isClassTeacher: false,
    topper: 'Tanvi Joshi (97.2%)'
  },
  {
    id: 'cls-4',
    name: 'Class 11-Science',
    role: 'Subject Faculty',
    subject: 'Higher Mathematics & Calculus',
    studentsCount: 30,
    room: 'Room 301 (Senior Block)',
    attendanceToday: '93.3%',
    syllabusProgress: 60,
    weeklyLectures: 5,
    isClassTeacher: false,
    topper: 'Pooja Hegde (97.8%)'
  },
  {
    id: 'cls-5',
    name: 'Class 8-A',
    role: 'Subject Faculty',
    subject: 'Foundation Mathematics',
    studentsCount: 36,
    room: 'Room 102 (Junior Block)',
    attendanceToday: '98.5%',
    syllabusProgress: 85,
    weeklyLectures: 4,
    isClassTeacher: false,
    topper: 'Karan Sharma (96.0%)'
  }
];

const MyClasses = () => {
  const totalStudents = teacherClasses.reduce((acc, c) => acc + c.studentsCount, 0);
  const totalLectures = teacherClasses.reduce((acc, c) => acc + c.weeklyLectures, 0);

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sand" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Teaching Roster & Assigned Classes</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Teaching Classes & Subject Roster
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Assigned grades, student counts, roll-call attendance rates, and syllabus milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Card className="px-3.5 py-1.5 text-center">
              <span className="text-[10px] text-slate-500 block">Total Students</span>
              <span className="text-base font-black text-slate-800 dark:text-white">{totalStudents}</span>
            </Card>
            <Card className="px-3.5 py-1.5 text-center">
              <span className="text-[10px] text-slate-500 block">Weekly Periods</span>
              <span className="text-base font-black text-amber-700 dark:text-amber-400">{totalLectures}</span>
            </Card>
          </div>
        </div>
      </Card>

      {/* 📋 Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teacherClasses.map((cls) => (
          <Card key={cls.id} className="p-5 space-y-4 hover:border-amber-300 dark:hover:border-amber-700 transition">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-black text-slate-800 dark:text-white">{cls.name}</h2>
                  {cls.isClassTeacher && (
                    <Badge variant="teacher">
                      Class Incharge
                    </Badge>
                  )}
                </div>
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{cls.subject}</p>
                <span className="text-[11px] text-slate-500 block mt-0.5">{cls.room}</span>
              </div>
              <Badge variant="sand">
                {cls.studentsCount} Students
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <span className="text-[10px] text-slate-500 block font-semibold">Today's Attendance</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{cls.attendanceToday}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <span className="text-[10px] text-slate-500 block font-semibold">Weekly Load</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">{cls.weeklyLectures} Periods</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <span className="text-[10px] text-slate-500 block font-semibold">Syllabus Done</span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{cls.syllabusProgress}%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11px]">Topper: <strong className="text-slate-700 dark:text-slate-300">{cls.topper}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/teacher/attendance">
                  <Button variant="secondary" size="xs" icon={CalendarCheck}>
                    Roll Call
                  </Button>
                </Link>
                <Link to="/teacher/students">
                  <Button variant="sand" size="xs" icon={ArrowRight} iconPosition="right">
                    Students
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
