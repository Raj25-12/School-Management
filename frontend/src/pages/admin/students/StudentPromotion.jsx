import React, { useState } from 'react';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { Button, Input, Select, Badge, Card, EmptyState } from '../../../components/common';

const sampleClassStudents = [
  { id: 'st-1', name: 'Alex Johnson', rollNo: '09A-01', finalScore: 92.4, attendance: 97.5, currentGrade: 'A+', eligible: true },
  { id: 'st-2', name: 'Riya Sen', rollNo: '09A-02', finalScore: 88.6, attendance: 95.0, currentGrade: 'A', eligible: true },
  { id: 'st-3', name: 'Rohan Sharma', rollNo: '09A-03', finalScore: 74.2, attendance: 91.2, currentGrade: 'B+', eligible: true },
  { id: 'st-4', name: 'Sneha Patel', rollNo: '09A-04', finalScore: 82.0, attendance: 94.8, currentGrade: 'A', eligible: true },
  { id: 'st-5', name: 'Kabir Verma', rollNo: '09A-05', finalScore: 68.5, attendance: 88.0, currentGrade: 'B', eligible: true },
  { id: 'st-6', name: 'Ananya Roy', rollNo: '09A-06', finalScore: 95.1, attendance: 99.0, currentGrade: 'A+', eligible: true },
  { id: 'st-7', name: 'Vikram Mehta', rollNo: '09A-07', finalScore: 54.0, attendance: 78.5, currentGrade: 'C', eligible: true },
  { id: 'st-8', name: 'Neha Gupta', rollNo: '09A-08', finalScore: 32.5, attendance: 65.0, currentGrade: 'F', eligible: false }
];

const fromSessionOptions = [
  { value: '2025-2026', label: '2025-2026' },
  { value: '2026-2027', label: '2026-2027' },
];

const toSessionOptions = [
  { value: '2026-2027', label: '2026-2027' },
  { value: '2027-2028', label: '2027-2028' },
];

const fromClassOptions = [
  { value: 'Class 9-A', label: 'Class 9-A' },
  { value: 'Class 9-B', label: 'Class 9-B' },
  { value: 'Class 8-A', label: 'Class 8-A' },
  { value: 'Class 10-A', label: 'Class 10-A' },
  { value: 'Class 11-Science', label: 'Class 11-Science' },
];

const toClassOptions = [
  { value: 'Class 10-A', label: 'Class 10-A' },
  { value: 'Class 10-B', label: 'Class 10-B' },
  { value: 'Class 9-A', label: 'Class 9-A' },
  { value: 'Class 11-Science', label: 'Class 11-Science' },
  { value: 'Class 12-Science', label: 'Class 12-Science' },
  { value: 'Graduated / Alumni', label: 'Graduated / Alumni' },
];

const StudentPromotion = () => {
  const { showToast } = useToast();
  const [fromClass, setFromClass] = useState('Class 9-A');
  const [toClass, setToClass] = useState('Class 10-A');
  const [fromSession, setFromSession] = useState('2025-2026');
  const [toSession, setToSession] = useState('2026-2027');

  const [students] = useState(sampleClassStudents);
  const [selectedIds, setSelectedIds] = useState(() =>
    sampleClassStudents.filter(s => s.eligible).map(s => s.id)
  );

  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(students.map(s => s.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleExecutePromotion = () => {
    if (selectedIds.length === 0) {
      showToast({ title: 'No Students Selected', message: 'Please select at least one student to promote.', type: 'warning' });
      return;
    }

    showToast({
      title: 'Batch Promotion Complete',
      message: `Successfully promoted ${selectedIds.length} students from ${fromClass} to ${toClass} (${toSession}).`,
      type: 'success'
    });
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Top Header */}
      <Card variant="emerald" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Annual Session Migration Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Batch Student Promotion & Upgrades
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Promote passing students to the subsequent academic year and grade based on cumulative examination scores and attendance.
            </p>
          </div>

          <Button
            variant="emerald"
            size="sm"
            onClick={handleExecutePromotion}
            icon={ArrowRight}
            iconPosition="right"
          >
            Promote Selected ({selectedIds.length})
          </Button>
        </div>
      </Card>

      {/* 🔄 Class Migration Configurator */}
      <Card className="p-4 sm:p-5">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
          <span>Session & Grade Mapping</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          <div className="md:col-span-2 space-y-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Source Session & Class (Current)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={fromSession}
                  onChange={(e) => setFromSession(e.target.value)}
                  options={fromSessionOptions}
                />
                <Select
                  value={fromClass}
                  onChange={(e) => setFromClass(e.target.value)}
                  options={fromClassOptions}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center clay-icon-pill shadow-xs">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Session & Class (Next Level)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={toSession}
                  onChange={(e) => setToSession(e.target.value)}
                  options={toSessionOptions}
                />
                <Select
                  value={toClass}
                  onChange={(e) => setToClass(e.target.value)}
                  options={toClassOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 📋 Student Promotion Roster */}
      <Card className="overflow-hidden p-0">
        <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">
              Student Eligibility Roster ({students.length})
            </h2>
            <Badge variant="emerald">
              {selectedIds.length} Selected for Promotion
            </Badge>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="xs"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
            <Button
              variant="secondary"
              size="xs"
              onClick={handleDeselectAll}
            >
              Deselect All
            </Button>

            <div className="w-44">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="py-8">
            <EmptyState
              title="No Matching Students"
              description="No students matched your search criteria."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3 w-10 text-center">Select</th>
                  <th className="py-2.5 px-4">Student Name</th>
                  <th className="py-2.5 px-4">Roll No</th>
                  <th className="py-2.5 px-4">Final Exam Score</th>
                  <th className="py-2.5 px-4">Attendance %</th>
                  <th className="py-2.5 px-4">Grade</th>
                  <th className="py-2.5 px-4 text-right">Promotion Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.map((st) => {
                  const isSelected = selectedIds.includes(st.id);
                  return (
                    <tr
                      key={st.id}
                      onClick={() => toggleSelect(st.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(st.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                        {st.name}
                      </td>

                      <td className="py-3 px-4 text-slate-500 font-mono">{st.rollNo}</td>

                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800 dark:text-white">{st.finalScore}%</span>
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {st.attendance}%
                      </td>

                      <td className="py-3 px-4">
                        <Badge variant="neutral">
                          {st.currentGrade}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {st.eligible ? (
                          <Badge variant="emerald" icon={CheckCircle2}>
                            Eligible for {toClass}
                          </Badge>
                        ) : (
                          <Badge variant="rose" icon={AlertCircle}>
                            Needs Remedial Exam
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentPromotion;
