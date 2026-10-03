import React from 'react';
import {
  Award,
  Calendar,
  Clock,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card } from '../../components/common';

const studentExams = [
  {
    id: 'EX-S1',
    subject: 'Mathematics',
    paperCode: 'MATH-10',
    date: '2026-10-12',
    time: '09:00 AM - 12:00 PM',
    room: 'Hall A (Seat #24)',
    maxMarks: 80,
    syllabus: 'Chapters 1 to 7: Quadratic Equations, Arithmetic Progressions, Coordinate Geometry, Trigonometry',
    status: 'Upcoming'
  },
  {
    id: 'EX-S2',
    subject: 'Physics & Practical Lab',
    paperCode: 'PHY-10',
    date: '2026-10-14',
    time: '09:00 AM - 12:00 PM',
    room: 'Hall A (Seat #24)',
    maxMarks: 80,
    syllabus: 'Light - Reflection & Refraction, Human Eye & Colourful World, Electricity & Magnetic Effects',
    status: 'Upcoming'
  },
  {
    id: 'EX-S3',
    subject: 'Chemistry',
    paperCode: 'CHEM-10',
    date: '2026-10-16',
    time: '09:00 AM - 12:00 PM',
    room: 'Hall A (Seat #24)',
    maxMarks: 80,
    syllabus: 'Chemical Reactions, Acids Bases and Salts, Metals and Non-Metals, Carbon and its Compounds',
    status: 'Upcoming'
  },
  {
    id: 'EX-S4',
    subject: 'English Language & Literature',
    paperCode: 'ENG-10',
    date: '2026-10-19',
    time: '09:00 AM - 12:00 PM',
    room: 'Hall A (Seat #24)',
    maxMarks: 80,
    syllabus: 'Reading Comprehension, Formal Letter Writing, Literature Prose & Poetry Chapters 1-8',
    status: 'Upcoming'
  }
];

const MyExams = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <Card variant="sky" className="p-4 sm:p-5 relative overflow-hidden print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <Award className="w-3.5 h-3.5 text-sky-700" />
              <span>Half-Yearly Examination Date Sheet 2026</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Examination Dates & Hall Ticket
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Subject date sheet, seating room allocation, syllabus blueprints, and hall ticket verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
            >
              Print Date Sheet
            </Button>
            <Link to="/student/results">
              <Button
                variant="sky"
                size="sm"
                icon={Award}
              >
                View Past Results
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 📋 Exam Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studentExams.map((exam) => (
          <Card key={exam.id} className="p-5 space-y-3 hover:shadow-md transition">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {exam.paperCode}
                  </span>
                  <Badge variant="sky" size="sm">
                    Max: {exam.maxMarks} Marks
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">{exam.subject}</h3>
              </div>
              <Badge variant="amber">
                {exam.status}
              </Badge>
            </div>

            <div className="p-3 rounded-2xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-bold">{exam.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{exam.time}</span>
              </div>
              <div className="col-span-2 text-[11px] text-slate-500 font-semibold pt-1 border-t border-sky-200/60 dark:border-sky-800/40">
                Room Seating: <span className="font-bold text-slate-800 dark:text-white">{exam.room}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 pt-1">
              <span className="font-bold text-slate-800 dark:text-white block text-[11px] mb-0.5">Syllabus Outline:</span>
              <p className="text-[11px] leading-relaxed text-slate-500">{exam.syllabus}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyExams;
