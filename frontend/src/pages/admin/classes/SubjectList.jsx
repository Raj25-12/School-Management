import React, { useState } from 'react';
import {
  BookOpen,
  UserCheck,
  Search,
  BookMarked,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { initialClassesData } from './classData';

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

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
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
            <div className="clay-card px-4 py-2 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Courses</div>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{allSubjects.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="clay-card p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subject name, code, teacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="clay-input w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Filter Class:</span>
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="clay-input px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-white"
          >
            <option value="All Classes">All Classes</option>
            {classes.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Subject Name & Code</th>
                <th className="py-3 px-4">Class & Wing</th>
                <th className="py-3 px-4">Assigned Subject Teacher</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Periods / Wk</th>
                <th className="py-3 px-4">Syllabus Completion</th>
                <th className="py-3 px-4 text-right">Prescribed Book</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSubjects.map((sub) => (
                <tr key={`${sub.classId}-${sub.id}`} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-white text-xs">
                      {sub.name}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {sub.code}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-white">{sub.className}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{sub.wing}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 dark:text-white flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {sub.teacher}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
                      {sub.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-white">
                    {sub.periodsPerWeek} periods/wk
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${sub.syllabusProgress || 75}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {sub.syllabusProgress || 75}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    {sub.textbook || 'NCERT / Prescribed Guide'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
