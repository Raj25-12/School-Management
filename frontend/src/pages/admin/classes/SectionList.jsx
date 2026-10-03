import React, { useState } from 'react';
import {
  Layers,
  Search,
  UserCheck
} from 'lucide-react';
import { initialClassesData } from './classData';
import { Button, Input, Select, Badge, Card, EmptyState } from '../../../components/common';

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

  const classFilterOptions = [
    { value: 'All Classes', label: 'All Classes' },
    ...classes.map(c => ({ value: c.name, label: c.name }))
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner */}
      <Card variant="emerald" className="p-4 sm:p-5 relative overflow-hidden">
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
            <Card className="px-4 py-2 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Sections</div>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{totalSections}</div>
            </Card>
            <Card className="px-4 py-2 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Students</div>
              <div className="text-lg font-bold text-slate-800 dark:text-white">{totalStudents}</div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Filter & Search Bar */}
      <Card className="p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:w-80">
          <Input
            placeholder="Search section, room, incharge..."
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

      {/* Sections Grid */}
      {filteredSections.length === 0 ? (
        <Card className="py-12">
          <EmptyState
            icon={Layers}
            title="No Sections Found"
            description="Try changing your search query or filter selection."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSections.map((sec, idx) => (
            <Card key={idx} className="p-4 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                    {sec.name}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">{sec.className} - Section {sec.name}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Wing: {sec.wing || 'Main'}</p>
                  </div>
                </div>
                <Badge variant="emerald">
                  {sec.studentCount || 0} Students
                </Badge>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Section Incharge:</span>
                  <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {sec.sectionTeacher || 'Unassigned'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Room Number:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{sec.room || 'TBD'}</span>
                </div>
                {sec.cr && (
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Class Rep (CR):</span>
                    <span className="font-semibold text-slate-800 dark:text-white">{sec.cr}</span>
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

export default SectionList;
