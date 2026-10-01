import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  BookMarked,
  Calendar
} from 'lucide-react';
import { initialClassesData } from './classData';
import { Button, Input, Select, Badge, Card, EmptyState } from '../../../components/common';

const SubjectList = () => {
  const [classes] = useState(() => {
    const saved = localStorage.getItem('school_classes_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialClassesData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All Classes');

  // Flatten subjects with class info
  const allSubjects = classes.flatMap(cls =>
    (cls.subjects || []).map(sub => ({
      ...sub,
      className: cls.name,
      classId: cls.id,
      wing: cls.wing,
      classTeacher: cls.classTeacher?.name
    }))
  );

  const filteredSubjects = allSubjects.filter(sub => {
    const matchesClass = selectedClassFilter === 'All Classes' || sub.className === selectedClassFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesClass;
    return matchesClass && (
      sub.name.toLowerCase().includes(q) ||
      sub.code.toLowerCase().includes(q) ||
      sub.teacher.toLowerCase().includes(q) ||
      sub.className.toLowerCase().includes(q) ||
      sub.type?.toLowerCase().includes(q)
    );
  });

  const classFilterOptions = [
    { value: 'All Classes', label: 'All Classes' },
    ...classes.map(c => ({ value: c.name, label: c.name }))
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <Card variant="emerald" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Academic Curriculum & Subject Directory</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Subject Directory & Faculty Assignments
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Track course subjects, assigned faculty teachers, weekly lecture periods, and syllabus completion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Card className="px-4 py-2 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Courses</div>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{allSubjects.length}</div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Search & Filter */}
      <Card className="p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:w-80">
          <Input
            placeholder="Search subject name, code, teacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Filter Class:</span>
          <Select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            options={classFilterOptions}
          />
        </div>
      </Card>

      {/* Subject Cards Grid */}
      {filteredSubjects.length === 0 ? (
        <Card className="py-12">
          <EmptyState
            icon={BookOpen}
            title="No Subjects Found"
            description="Try changing your search term or selecting a different class filter."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSubjects.map((sub, idx) => (
            <Card key={idx} className="p-4 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {sub.code || 'SUB-00'}
                    </span>
                    <Badge variant="emerald" size="sm">
                      {sub.className}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug">{sub.name}</h3>
                </div>
                <Badge variant={sub.type === 'Practical' ? 'amber' : 'sky'} size="sm">
                  {sub.type || 'Theory'}
                </Badge>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Faculty Incharge:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{sub.teacher || 'Unassigned'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Weekly Lectures:</span>
                  <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {sub.periods || '5'} Periods/wk
                  </span>
                </div>
                {sub.syllabusProgress !== undefined && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Syllabus Progress:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{sub.syllabusProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${sub.syllabusProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectList;
