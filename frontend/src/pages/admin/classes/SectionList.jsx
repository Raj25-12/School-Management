import React, { useState } from 'react';
import {
  Layers,
  Users,
  Search,
  UserCheck
} from 'lucide-react';
import { initialClassesData } from './classData';

const SectionList = () => {
  const [classes] = useState(() => {
    const saved = localStorage.getItem('school_classes_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialClassesData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All Classes');

  // Flatten sections with class reference
  const allSections = classes.flatMap(cls => 
    (cls.sections || []).map(sec => ({
      ...sec,
      className: cls.name,
      classId: cls.id,
      wing: cls.wing,
      classTeacher: cls.classTeacher?.name
    }))
  );

  const filteredSections = allSections.filter(sec => {
    const matchesClass = selectedClassFilter === 'All Classes' || sec.className === selectedClassFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesClass;
    return matchesClass && (
      sec.name.toLowerCase().includes(q) ||
      sec.className.toLowerCase().includes(q) ||
      sec.sectionTeacher?.toLowerCase().includes(q) ||
      sec.room?.toLowerCase().includes(q) ||
      sec.cr?.toLowerCase().includes(q)
    );
  });

  const totalSections = allSections.length;
  const totalStudents = allSections.reduce((s, sec) => s + (Number(sec.studentCount) || 0), 0);

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Section Directory & Classroom Roster</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Class Sections & Student Roster
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Track section-wise strength, classroom allocations, incharge teachers, and student capacity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="clay-card px-4 py-2 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Sections</div>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{totalSections}</div>
            </div>
            <div className="clay-card px-4 py-2 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Students</div>
              <div className="text-lg font-bold text-slate-800 dark:text-white">{totalStudents}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="clay-card p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search section, room, incharge..."
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

      {/* Sections Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Section & Class</th>
                <th className="py-3 px-4">Room / Location</th>
                <th className="py-3 px-4">Section Incharge</th>
                <th className="py-3 px-4">Students (Boys / Girls)</th>
                <th className="py-3 px-4">Capacity Utilization</th>
                <th className="py-3 px-4">Class Monitor (CR)</th>
                <th className="py-3 px-4 text-right">Today's Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSections.map((sec) => (
                <tr key={sec.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-white text-xs">
                      {sec.className} - {sec.name}
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {sec.wing}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200/50">
                      {sec.room}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 dark:text-white flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {sec.sectionTeacher}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal">Class Head: {sec.classTeacher}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-white text-xs">
                      {sec.studentCount} Students
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      {sec.boys} Boys • {sec.girls} Girls
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((sec.studentCount / sec.capacity) * 100))}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {Math.round((sec.studentCount / sec.capacity) * 100)}%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Max: {sec.capacity} seats</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-normal text-slate-700 dark:text-slate-300">
                      {sec.cr || 'Not assigned'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {sec.attendanceToday || '96.5%'}
                    </span>
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

export default SectionList;
