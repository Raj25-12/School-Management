import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Upload
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button, Badge, Card } from '../../components/common';

const studentHomeworkList = [
  {
    id: 'HW-S1',
    title: 'Quadratic Equations & Polynomials Problem Set',
    subject: 'Mathematics',
    teacher: 'Prof. Rajesh Sharma',
    dueDate: '2026-10-02',
    status: 'Submitted',
    maxMarks: 25,
    score: 24,
    remarks: 'Excellent step derivation and clean graphs.',
    instructions: 'Complete exercises 4.1 to 4.3 from NCERT textbook.'
  },
  {
    id: 'HW-S2',
    title: 'Ray Optics - Reflection & Spherical Mirrors Lab Report',
    subject: 'Physics',
    teacher: 'Dr. Sunita Verma',
    dueDate: '2026-10-01',
    status: 'Pending Submission',
    maxMarks: 20,
    score: null,
    remarks: '',
    instructions: 'Write the experimental setup, ray diagram sketches, error analysis, and final conclusion.'
  },
  {
    id: 'HW-S3',
    title: 'Shakespeare’s Julius Caesar - Act 3 Speech Analysis',
    subject: 'English Literature',
    teacher: 'Mrs. Priya Nair',
    dueDate: '2026-09-30',
    status: 'Graded',
    maxMarks: 15,
    score: 15,
    remarks: 'Superb analysis of rhetorical devices.',
    instructions: 'Analyze Mark Antony’s funeral speech rhetorical devices.'
  },
  {
    id: 'HW-S4',
    title: 'Python Functions & Recursion Practice Problems',
    subject: 'Computer Science',
    teacher: 'Mr. Deepak Mehta',
    dueDate: '2026-10-03',
    status: 'Pending Submission',
    maxMarks: 20,
    score: null,
    remarks: '',
    instructions: 'Implement recursive Fibonacci, Factorial, and Tower of Hanoi functions.'
  }
];

const MyHomework = () => {
  const { showToast } = useToast();
  const [homeworkList, setHomeworkList] = useState(studentHomeworkList);

  const handleUploadSubmit = (id, title) => {
    setHomeworkList(prev =>
      prev.map(h => h.id === id ? { ...h, status: 'Submitted' } : h)
    );
    showToast({
      title: 'Assignment Submitted',
      message: `Your work for "${title}" was uploaded and sent to the teacher.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sky" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <FileText className="w-3.5 h-3.5 text-sky-700" />
              <span>Daily Assignments & Digital Turn-In</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              My Homework & Coursework Tasks
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Review assigned questions, upload digital homework submissions, and view teacher marks and corrections.
            </p>
          </div>
        </div>
      </Card>

      {/* 📋 Homework Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homeworkList.map((hw) => (
          <Card key={hw.id} className="p-5 space-y-3 hover:shadow-md transition">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Badge variant="sky" size="sm">
                    {hw.subject}
                  </Badge>
                  <span className="text-[11px] text-slate-500 font-medium">By {hw.teacher}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">{hw.title}</h3>
              </div>
              <Badge variant={hw.status === 'Graded' ? 'emerald' : hw.status === 'Submitted' ? 'sky' : 'amber'}>
                {hw.status}
              </Badge>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {hw.instructions}
            </p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                <span>Due: {hw.dueDate}</span>
              </div>

              {hw.status === 'Graded' ? (
                <Badge variant="emerald">
                  Score: {hw.score} / {hw.maxMarks}
                </Badge>
              ) : hw.status === 'Submitted' ? (
                <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300">Under Review</span>
              ) : (
                <Button
                  variant="sky"
                  size="xs"
                  icon={Upload}
                  onClick={() => handleUploadSubmit(hw.id, hw.title)}
                >
                  Turn In
                </Button>
              )}
            </div>

            {hw.remarks && (
              <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                <span className="font-bold">Feedback:</span> {hw.remarks}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyHomework;
