import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  Edit3,
  Trash2,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  SlidersHorizontal,
  X,
  UserPlus,
  BookMarked,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  List,
  Maximize2
} from 'lucide-react';
import { initialClassesData, initialTeachersList, wingsList } from './classData';

const ClassList = () => {
  // Local storage synced state
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('school_classes_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved classes', e);
      }
    }
    return initialClassesData;
  });

  const [teachers] = useState(initialTeachersList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('All Wings');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsTab, setDetailsTab] = useState('sections'); // 'sections' | 'subjects' | 'teacher' | 'students'
  
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [isManageSectionsModalOpen, setIsManageSectionsModalOpen] = useState(false);
  const [isManageSubjectsModalOpen, setIsManageSubjectsModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);

  // Form states
  const [classForm, setClassForm] = useState({
    name: '',
    numericGrade: 1,
    wing: 'Secondary (9-10)',
    room: '',
    academicYear: '2026-2027',
    teacherId: 'TCH-101',
    colorTheme: 'emerald',
    initialSections: 'A, B'
  });

  const [newSectionForm, setNewSectionForm] = useState({
    name: '',
    room: '',
    sectionTeacher: '',
    studentCount: 30,
    boys: 15,
    girls: 15,
    capacity: 40,
    cr: '',
    attendanceToday: '96.0%'
  });

  const [newSubjectForm, setNewSubjectForm] = useState({
    name: '',
    code: '',
    teacher: '',
    periodsPerWeek: 5,
    type: 'Core Theory',
    syllabusProgress: 75,
    textbook: ''
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('school_classes_data', JSON.stringify(classes));
  }, [classes]);

  // Calculations & Metrics
  const totalClasses = classes.length;
  const totalSections = classes.reduce((sum, cls) => sum + (cls.sections ? cls.sections.length : 0), 0);
  const totalStudents = classes.reduce((sum, cls) => {
    return sum + (cls.sections ? cls.sections.reduce((sSum, sec) => sSum + (Number(sec.studentCount) || 0), 0) : 0);
  }, 0);
  const totalCapacity = classes.reduce((sum, cls) => {
    return sum + (cls.sections ? cls.sections.reduce((sSum, sec) => sSum + (Number(sec.capacity) || 0), 0) : 0);
  }, 0);
  const totalBoys = classes.reduce((sum, cls) => {
    return sum + (cls.sections ? cls.sections.reduce((sSum, sec) => sSum + (Number(sec.boys) || 0), 0) : 0);
  }, 0);
  const totalGirls = classes.reduce((sum, cls) => {
    return sum + (cls.sections ? cls.sections.reduce((sSum, sec) => sSum + (Number(sec.girls) || 0), 0) : 0);
  }, 0);
  const assignedTeachersCount = classes.filter(cls => cls.classTeacher && cls.classTeacher.name).length;

  // Filtered classes
  const filteredClasses = classes.filter((cls) => {
    const matchesWing = selectedWing === 'All Wings' || cls.wing === selectedWing;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesWing;

    const matchesName = cls.name.toLowerCase().includes(query);
    const matchesTeacher = cls.classTeacher?.name?.toLowerCase().includes(query);
    const matchesSubject = cls.subjects?.some((sub) => sub.name.toLowerCase().includes(query));
    const matchesSection = cls.sections?.some((sec) => sec.name.toLowerCase().includes(query) || sec.sectionTeacher?.toLowerCase().includes(query));
    const matchesRoom = cls.room?.toLowerCase().includes(query);

    return matchesWing && (matchesName || matchesTeacher || matchesSubject || matchesSection || matchesRoom);
  });

  // Action handlers
  const handleOpenAddClass = () => {
    setClassForm({
      name: '',
      numericGrade: 10,
      wing: 'Secondary (9-10)',
      room: 'Block B - Room 101',
      academicYear: '2026-2027',
      teacherId: teachers[0]?.id || '',
      colorTheme: 'emerald',
      initialSections: 'A, B'
    });
    setIsAddClassModalOpen(true);
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    const assignedTeacher = teachers.find(t => t.id === classForm.teacherId) || teachers[0];
    
    // Create initial sections
    const sectionNames = classForm.initialSections.split(',').map(s => s.trim()).filter(Boolean);
    const sectionsCreated = sectionNames.map((sName, idx) => ({
      id: `SEC-${Date.now()}-${idx}`,
      name: sName.startsWith('Section') ? sName : `Section ${sName}`,
      room: `Room ${101 + idx}`,
      sectionTeacher: assignedTeacher.name,
      studentCount: 30,
      boys: 15,
      girls: 15,
      capacity: 40,
      cr: 'Student Monitor',
      attendanceToday: '96.5%'
    }));

    const newClass = {
      id: `CLS-${Date.now()}`,
      name: classForm.name || `Class ${classForm.numericGrade}`,
      numericGrade: Number(classForm.numericGrade),
      wing: classForm.wing,
      room: classForm.room,
      academicYear: classForm.academicYear,
      colorTheme: classForm.colorTheme,
      classTeacher: {
        id: assignedTeacher.id,
        name: assignedTeacher.name,
        designation: assignedTeacher.designation,
        department: assignedTeacher.department,
        email: assignedTeacher.email,
        phone: assignedTeacher.phone,
        avatar: assignedTeacher.avatar,
        experience: assignedTeacher.experience,
        qualification: assignedTeacher.qualification
      },
      sections: sectionsCreated.length > 0 ? sectionsCreated : [
        { id: `SEC-${Date.now()}-A`, name: 'Section A', room: 'Room 101', sectionTeacher: assignedTeacher.name, studentCount: 30, boys: 15, girls: 15, capacity: 40, cr: 'CR 1', attendanceToday: '96.0%' }
      ],
      subjects: [
        { id: `SUB-${Date.now()}-1`, name: 'Mathematics', code: 'MATH-101', teacher: assignedTeacher.name, periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 60, textbook: 'Standard Textbook' },
        { id: `SUB-${Date.now()}-2`, name: 'English', code: 'ENG-101', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Language', syllabusProgress: 75, textbook: 'Literature Reader' },
        { id: `SUB-${Date.now()}-3`, name: 'Science', code: 'SCI-101', teacher: 'Mr. Rajesh Verma', periodsPerWeek: 6, type: 'Science & Lab', syllabusProgress: 68, textbook: 'General Science' }
      ]
    };

    setClasses([newClass, ...classes]);
    setIsAddClassModalOpen(false);
  };

  const handleOpenEditClass = (cls) => {
    setSelectedClass(cls);
    setClassForm({
      name: cls.name,
      numericGrade: cls.numericGrade,
      wing: cls.wing,
      room: cls.room,
      academicYear: cls.academicYear,
      teacherId: cls.classTeacher?.id || teachers[0]?.id,
      colorTheme: cls.colorTheme || 'emerald'
    });
    setIsEditClassModalOpen(true);
  };

  const handleSaveEditClass = (e) => {
    e.preventDefault();
    const assignedTeacher = teachers.find(t => t.id === classForm.teacherId) || selectedClass.classTeacher;

    const updated = classes.map(c => {
      if (c.id === selectedClass.id) {
        return {
          ...c,
          name: classForm.name,
          numericGrade: Number(classForm.numericGrade),
          wing: classForm.wing,
          room: classForm.room,
          academicYear: classForm.academicYear,
          colorTheme: classForm.colorTheme,
          classTeacher: {
            ...assignedTeacher
          }
        };
      }
      return c;
    });

    setClasses(updated);
    if (selectedClass) {
      setSelectedClass({
        ...selectedClass,
        name: classForm.name,
        numericGrade: Number(classForm.numericGrade),
        wing: classForm.wing,
        room: classForm.room,
        academicYear: classForm.academicYear,
        colorTheme: classForm.colorTheme,
        classTeacher: { ...assignedTeacher }
      });
    }
    setIsEditClassModalOpen(false);
  };

  const handleDeleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class and all associated section/subject records?')) {
      setClasses(classes.filter(c => c.id !== id));
      if (selectedClass?.id === id) {
        setIsDetailsModalOpen(false);
        setSelectedClass(null);
      }
    }
  };

  const handleOpenAssignTeacher = (cls) => {
    setSelectedClass(cls);
    setClassForm(prev => ({ ...prev, teacherId: cls.classTeacher?.id || teachers[0]?.id }));
    setIsAssignTeacherModalOpen(true);
  };

  const handleSaveTeacherAssignment = (teacherId) => {
    const assignedTeacher = teachers.find(t => t.id === teacherId);
    if (!assignedTeacher || !selectedClass) return;

    const updated = classes.map(c => {
      if (c.id === selectedClass.id) {
        return {
          ...c,
          classTeacher: { ...assignedTeacher }
        };
      }
      return c;
    });

    setClasses(updated);
    setSelectedClass(prev => ({
      ...prev,
      classTeacher: { ...assignedTeacher }
    }));
    setIsAssignTeacherModalOpen(false);
  };

  // Section Management Handlers
  const handleOpenManageSections = (cls) => {
    setSelectedClass(cls);
    setNewSectionForm({
      name: '',
      room: cls.room || 'Room 101',
      sectionTeacher: cls.classTeacher?.name || teachers[0]?.name,
      studentCount: 30,
      boys: 15,
      girls: 15,
      capacity: 40,
      cr: '',
      attendanceToday: '96.0%'
    });
    setIsManageSectionsModalOpen(true);
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    if (!newSectionForm.name) return;

    const newSec = {
      id: `SEC-${Date.now()}`,
      name: newSectionForm.name.startsWith('Section') ? newSectionForm.name : `Section ${newSectionForm.name}`,
      room: newSectionForm.room,
      sectionTeacher: newSectionForm.sectionTeacher,
      studentCount: Number(newSectionForm.studentCount),
      boys: Number(newSectionForm.boys),
      girls: Number(newSectionForm.girls),
      capacity: Number(newSectionForm.capacity),
      cr: newSectionForm.cr || 'Assigned Monitor',
      attendanceToday: newSectionForm.attendanceToday || '95.0%'
    };

    const updatedClasses = classes.map(c => {
      if (c.id === selectedClass.id) {
        const updatedSecs = [...(c.sections || []), newSec];
        return { ...c, sections: updatedSecs };
      }
      return c;
    });

    setClasses(updatedClasses);
    setSelectedClass(prev => ({
      ...prev,
      sections: [...(prev.sections || []), newSec]
    }));

    setNewSectionForm({
      name: '',
      room: selectedClass.room || 'Room 101',
      sectionTeacher: selectedClass.classTeacher?.name || teachers[0]?.name,
      studentCount: 30,
      boys: 15,
      girls: 15,
      capacity: 40,
      cr: '',
      attendanceToday: '96.0%'
    });
  };

  const handleDeleteSection = (sectionId) => {
    if (window.confirm('Delete this section? Students data will be unlinked.')) {
      const updatedClasses = classes.map(c => {
        if (c.id === selectedClass.id) {
          const updatedSecs = (c.sections || []).filter(s => s.id !== sectionId);
          return { ...c, sections: updatedSecs };
        }
        return c;
      });
      setClasses(updatedClasses);
      setSelectedClass(prev => ({
        ...prev,
        sections: (prev.sections || []).filter(s => s.id !== sectionId)
      }));
    }
  };

  // Subject Management Handlers
  const handleOpenManageSubjects = (cls) => {
    setSelectedClass(cls);
    setNewSubjectForm({
      name: '',
      code: '',
      teacher: teachers[0]?.name || '',
      periodsPerWeek: 5,
      type: 'Core Theory',
      syllabusProgress: 75,
      textbook: ''
    });
    setIsManageSubjectsModalOpen(true);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectForm.name) return;

    const newSub = {
      id: `SUB-${Date.now()}`,
      name: newSubjectForm.name,
      code: newSubjectForm.code || `SUB-${Math.floor(100 + Math.random() * 900)}`,
      teacher: newSubjectForm.teacher || teachers[0]?.name,
      periodsPerWeek: Number(newSubjectForm.periodsPerWeek) || 5,
      type: newSubjectForm.type || 'Core Theory',
      syllabusProgress: Number(newSubjectForm.syllabusProgress) || 70,
      textbook: newSubjectForm.textbook || 'Standard Course Curriculum'
    };

    const updatedClasses = classes.map(c => {
      if (c.id === selectedClass.id) {
        return { ...c, subjects: [...(c.subjects || []), newSub] };
      }
      return c;
    });

    setClasses(updatedClasses);
    setSelectedClass(prev => ({
      ...prev,
      subjects: [...(prev.subjects || []), newSub]
    }));

    setNewSubjectForm({
      name: '',
      code: '',
      teacher: teachers[0]?.name || '',
      periodsPerWeek: 5,
      type: 'Core Theory',
      syllabusProgress: 75,
      textbook: ''
    });
  };

  const handleDeleteSubject = (subjectId) => {
    if (window.confirm('Remove this subject from the class curriculum?')) {
      const updatedClasses = classes.map(c => {
        if (c.id === selectedClass.id) {
          return { ...c, subjects: (c.subjects || []).filter(s => s.id !== subjectId) };
        }
        return c;
      });
      setClasses(updatedClasses);
      setSelectedClass(prev => ({
        ...prev,
        subjects: (prev.subjects || []).filter(s => s.id !== subjectId)
      }));
    }
  };

  // Export Data as JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(classes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `School_Classes_Directory_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Academic Session 2026-2027 • Master Directory</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Class & Curriculum Management
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Manage class structures, assigned Class Teachers, section capacities, student strength, and Subject-wise faculty assignments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportData}
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Directory</span>
            </button>
            <button
              onClick={handleOpenAddClass}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Class</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Metrics (4 Clay Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Classes */}
        <div className="clay-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 clay-icon-pill">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Classes</span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalClasses} Grades</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Across 4 Grade Wings</span>
          </div>
        </div>

        {/* Total Sections */}
        <div className="clay-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 clay-icon-pill">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Sections</span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalSections} Sections</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Avg ~36 students/sec</span>
          </div>
        </div>

        {/* Total Enrolled Students */}
        <div className="clay-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 clay-icon-pill">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Students</span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalStudents.toLocaleString()}</div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              {totalBoys} Boys • {totalGirls} Girls ({Math.round((totalStudents / (totalCapacity || 1)) * 100)}% Cap.)
            </span>
          </div>
        </div>

        {/* Class Teachers Assigned */}
        <div className="clay-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 clay-icon-pill">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Class Teachers</span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">
              {assignedTeachersCount} / {totalClasses}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 inline" /> 100% Assigned
            </span>
          </div>
        </div>
      </div>

      {/* 🔍 Search, Wing Filter & View Switcher */}
      <div className="clay-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search class, teacher, subject, room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-800 dark:text-white placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
                title="Table List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wing Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Wings:
          </span>
          {wingsList.map((wing) => {
            const count = wing === 'All Wings' 
              ? classes.length 
              : classes.filter(c => c.wing === wing).length;
            const isSelected = selectedWing === wing;
            return (
              <button
                key={wing}
                onClick={() => setSelectedWing(wing)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{wing}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 📋 Classes View (Grid or Table) */}
      {filteredClasses.length === 0 ? (
        <div className="clay-card p-12 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">No classes found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            No matching classes found for "{searchQuery}". Try clearing search or select a different grade wing.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedWing('All Wings'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => {
            const classTotalStudents = cls.sections.reduce((acc, s) => acc + (Number(s.studentCount) || 0), 0);
            const classTotalCapacity = cls.sections.reduce((acc, s) => acc + (Number(s.capacity) || 0), 0);
            const classBoys = cls.sections.reduce((acc, s) => acc + (Number(s.boys) || 0), 0);
            const classGirls = cls.sections.reduce((acc, s) => acc + (Number(s.girls) || 0), 0);
            const capacityPercentage = Math.min(100, Math.round((classTotalStudents / (classTotalCapacity || 1)) * 100));

            return (
              <div
                key={cls.id}
                className="clay-card p-5 relative flex flex-col justify-between group hover:border-emerald-400/40 transition-all duration-300"
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-base flex items-center justify-center clay-icon-pill shrink-0">
                        {cls.numericGrade || 'C'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-800 dark:text-white">
                            {cls.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                            {cls.wing}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            • {cls.room || 'Main Block'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Menu */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setSelectedClass(cls); setDetailsTab('sections'); setIsDetailsModalOpen(true); }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all"
                        title="View Complete Class Details"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditClass(cls)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-all"
                        title="Edit Class"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClass(cls.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all"
                        title="Delete Class"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 👨‍🏫 Class Teacher Box (Detailed & Highlighted) */}
                  <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/70 to-slate-50 dark:from-slate-800/80 dark:to-slate-900 border border-emerald-100/80 dark:border-slate-700/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> Designated Class Teacher
                      </span>
                      <button
                        onClick={() => handleOpenAssignTeacher(cls)}
                        className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                      >
                        Reassign
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                        {cls.classTeacher?.avatar || (cls.classTeacher?.name ? cls.classTeacher.name.split(' ').map(n=>n[0]).join('').slice(0, 2) : 'CT')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {cls.classTeacher?.name || 'Not Assigned'}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {cls.classTeacher?.designation || 'Class Incharge'}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                          {cls.classTeacher?.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-2.5 h-2.5 text-slate-400" /> {cls.classTeacher.phone}
                            </span>
                          )}
                          {cls.classTeacher?.experience && (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                              <Award className="w-2.5 h-2.5" /> {cls.classTeacher.experience}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 🏫 Section-Wise Breakdown */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-emerald-500" />
                        Sections Breakdown ({cls.sections?.length || 0})
                      </span>
                      <button
                        onClick={() => handleOpenManageSections(cls)}
                        className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Manage Sections
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {cls.sections?.map((sec) => (
                        <div
                          key={sec.id}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-400/50 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-white">
                              {sec.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                              {sec.room || 'Room'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1.5">
                            <div className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                              {sec.studentCount} <span className="text-[10px] font-normal text-slate-400">/ {sec.capacity}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              {sec.boys}B • {sec.girls}G
                            </span>
                          </div>
                          {/* Progress bar for section capacity */}
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                (sec.studentCount / sec.capacity) > 0.9 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, Math.round((sec.studentCount / sec.capacity) * 100))}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 📚 Subject-Wise Curriculum Preview */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                        Subjects & Faculty ({cls.subjects?.length || 0})
                      </span>
                      <button
                        onClick={() => handleOpenManageSubjects(cls)}
                        className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Manage Subjects
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {cls.subjects?.slice(0, 3).map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between text-xs p-1.5 px-2 rounded-lg bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {sub.name}
                            </span>
                            <span className="text-[10px] text-slate-400">({sub.code})</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-[120px] text-right font-medium">
                            {sub.teacher}
                          </div>
                        </div>
                      ))}
                      {cls.subjects && cls.subjects.length > 3 && (
                        <p className="text-[10px] text-slate-400 text-center pt-0.5">
                          + {cls.subjects.length - 3} more subjects taught
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Total Students & Action CTA */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Total Enrollment</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span>{classTotalStudents} Students</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                        {capacityPercentage}% Full
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setSelectedClass(cls); setDetailsTab('sections'); setIsDetailsModalOpen(true); }}
                    className="clay-btn-emerald px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Class Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 📋 Table View */
        <div className="clay-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Class & Wing</th>
                  <th className="py-3 px-4">Class Teacher</th>
                  <th className="py-3 px-4">Sections & Students</th>
                  <th className="py-3 px-4">Subjects & Faculty</th>
                  <th className="py-3 px-4">Total Capacity</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredClasses.map((cls) => {
                  const classTotalStudents = cls.sections.reduce((acc, s) => acc + (Number(s.studentCount) || 0), 0);
                  const classTotalCapacity = cls.sections.reduce((acc, s) => acc + (Number(s.capacity) || 0), 0);
                  const classBoys = cls.sections.reduce((acc, s) => acc + (Number(s.boys) || 0), 0);
                  const classGirls = cls.sections.reduce((acc, s) => acc + (Number(s.girls) || 0), 0);

                  return (
                    <tr key={cls.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Class Name & Wing */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-800 dark:text-white text-sm">
                          {cls.name}
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          {cls.wing} • {cls.room}
                        </div>
                      </td>

                      {/* Class Teacher */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                            {cls.classTeacher?.avatar || 'CT'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-white">
                              {cls.classTeacher?.name || 'Not Assigned'}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {cls.classTeacher?.designation || 'Class Incharge'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Section-Wise breakdown */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {cls.sections.map((s) => (
                            <span
                              key={s.id}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                            >
                              <strong>{s.name.replace('Section ', 'Sec ')}:</strong> {s.studentCount} ({s.boys}B/{s.girls}G)
                            </span>
                          ))}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Total {classTotalStudents} students ({classBoys} Boys, {classGirls} Girls)
                        </div>
                      </td>

                      {/* Subjects */}
                      <td className="py-3.5 px-4">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {cls.subjects?.length || 0} Subjects
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-xs">
                          {cls.subjects?.map(s => s.name).join(', ')}
                        </div>
                      </td>

                      {/* Capacity Bar */}
                      <td className="py-3.5 px-4">
                        <div className="text-xs font-extrabold text-slate-800 dark:text-white">
                          {classTotalStudents} / {classTotalCapacity}
                        </div>
                        <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full"
                            style={{ width: `${Math.min(100, Math.round((classTotalStudents / (classTotalCapacity || 1)) * 100))}%` }}
                          ></div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => { setSelectedClass(cls); setDetailsTab('sections'); setIsDetailsModalOpen(true); }}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-100 transition-all flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> Details
                          </button>
                          <button
                            onClick={() => handleOpenEditClass(cls)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-all"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: 🌟 COMPREHENSIVE CLASS DETAILS DRAWER / MODAL (360° View)
          ========================================================================= */}
      {isDetailsModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex items-start justify-between gap-4 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
                  {selectedClass.numericGrade || 'C'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-white">{selectedClass.name}</h2>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200">
                      {selectedClass.wing}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200/90 mt-0.5 font-normal">
                    Academic Year {selectedClass.academicYear} • Primary Location: {selectedClass.room}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Navigation */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto text-xs">
              <button
                onClick={() => setDetailsTab('sections')}
                className={`pb-3 px-3 font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                  detailsTab === 'sections'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Sections & Student Counts ({selectedClass.sections?.length || 0})</span>
              </button>

              <button
                onClick={() => setDetailsTab('subjects')}
                className={`pb-3 px-3 font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                  detailsTab === 'subjects'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Subject-wise Faculty ({selectedClass.subjects?.length || 0})</span>
              </button>

              <button
                onClick={() => setDetailsTab('teacher')}
                className={`pb-3 px-3 font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                  detailsTab === 'teacher'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Class Teacher Profile</span>
              </button>
            </div>

            {/* Modal Tab Content (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: SECTIONS & STUDENT STRENGTH */}
              {detailsTab === 'sections' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">Section-wise Roster Breakdown</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Total {selectedClass.sections?.reduce((a,b)=>a+(Number(b.studentCount)||0),0)} students registered across {selectedClass.sections?.length} sections</p>
                    </div>
                    <button
                      onClick={() => handleOpenManageSections(selectedClass)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add / Edit Sections
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedClass.sections?.map((sec) => (
                      <div
                        key={sec.id}
                        className="clay-card p-4 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            {sec.name}
                          </h5>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                            {sec.room}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                          <div>
                            <div className="text-[10px] text-slate-400">Total Students</div>
                            <div className="text-base font-black text-slate-800 dark:text-white">{sec.studentCount}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Boys / Girls</div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                              {sec.boys}B / {sec.girls}G
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Attendance</div>
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                              {sec.attendanceToday || '96%'}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Section Incharge:</span>
                            <span className="font-semibold text-slate-800 dark:text-white">{sec.sectionTeacher || 'Assigned Staff'}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Class Representative:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{sec.cr || 'None'}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Capacity Utilization:</span>
                            <span className="font-bold text-slate-700 dark:text-slate-200">{Math.round((sec.studentCount / sec.capacity) * 100)}% ({sec.studentCount}/{sec.capacity})</span>
                          </div>
                        </div>

                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2.5 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, Math.round((sec.studentCount / sec.capacity) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SUBJECT-WISE FACULTY & SYLLABUS */}
              {detailsTab === 'subjects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">Curriculum & Assigned Subject Teachers</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Complete subject-wise lecture allocation, codes, and syllabus tracking</p>
                    </div>
                    <button
                      onClick={() => handleOpenManageSubjects(selectedClass)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add / Edit Subjects
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                        <tr>
                          <th className="py-2.5 px-3">Subject Name & Code</th>
                          <th className="py-2.5 px-3">Assigned Faculty</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Periods / Wk</th>
                          <th className="py-2.5 px-3">Syllabus Progress</th>
                          <th className="py-2.5 px-3 text-right">Textbook</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {selectedClass.subjects?.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-800 dark:text-white">{sub.name}</div>
                              <span className="text-[10px] font-mono text-slate-400">{sub.code}</span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                                {sub.teacher}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
                                {sub.type}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-extrabold text-slate-800 dark:text-white">
                              {sub.periodsPerWeek} periods/wk
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${sub.syllabusProgress || 75}%` }}
                                  ></div>
                                </div>
                                <span className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400">
                                  {sub.syllabusProgress || 75}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right text-[11px] text-slate-500 dark:text-slate-400">
                              {sub.textbook || 'Standard Text'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: CLASS TEACHER PROFILE */}
              {detailsTab === 'teacher' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xl flex items-center justify-center clay-icon-pill">
                        {selectedClass.classTeacher?.avatar || 'CT'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-800 dark:text-white">
                            {selectedClass.classTeacher?.name}
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            Active Incharge
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {selectedClass.classTeacher?.designation} • {selectedClass.classTeacher?.department}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                          {selectedClass.classTeacher?.qualification}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenAssignTeacher(selectedClass)}
                      className="clay-btn-emerald px-4 py-2 text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                    >
                      Assign Different Teacher
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="clay-card p-4 space-y-3">
                      <h5 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-500" /> Contact & Office Details
                      </h5>
                      <div className="space-y-2 text-slate-600 dark:text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Direct Phone:</span>
                          <span className="font-semibold text-slate-800 dark:text-white">{selectedClass.classTeacher?.phone || '+91 98765 43210'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Official Email:</span>
                          <span className="font-semibold text-slate-800 dark:text-white">{selectedClass.classTeacher?.email || 'teacher@school.edu'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Teaching Experience:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedClass.classTeacher?.experience || '10+ Years'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Staff Room / Desk:</span>
                          <span className="font-semibold text-slate-800 dark:text-white">{selectedClass.room} Incharge Desk</span>
                        </div>
                      </div>
                    </div>

                    <div className="clay-card p-4 space-y-3">
                      <h5 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" /> Primary Responsibilities
                      </h5>
                      <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 list-disc list-inside">
                        <li>Daily student attendance monitoring & parent communication</li>
                        <li>Coordinating term examination schedules & report card preparation</li>
                        <li>Conducting weekly mentor-mentee counseling sessions</li>
                        <li>Overseeing section discipline, dress code & morning assembly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Class ID: <strong className="text-slate-700 dark:text-slate-200">{selectedClass.id}</strong>
              </span>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-xs font-bold transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: ➕ ADD NEW CLASS MODAL
          ========================================================================= */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
            <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Plus className="w-5 h-5" />
                <h3 className="text-base font-bold">Add New School Class</h3>
              </div>
              <button onClick={() => setIsAddClassModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Class Display Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Class 10 or Class 11 - Arts"
                    value={classForm.name}
                    onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Numeric Grade Level *</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    required
                    value={classForm.numericGrade}
                    onChange={(e) => setClassForm({ ...classForm, numericGrade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Grade Wing *</label>
                  <select
                    value={classForm.wing}
                    onChange={(e) => setClassForm({ ...classForm, wing: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  >
                    <option value="Primary (1-5)">Primary (1-5)</option>
                    <option value="Middle (6-8)">Middle (6-8)</option>
                    <option value="Secondary (9-10)">Secondary (9-10)</option>
                    <option value="Senior Secondary (11-12)">Senior Secondary (11-12)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Classroom / Block</label>
                  <input
                    type="text"
                    placeholder="e.g. Block B - Room 201"
                    value={classForm.room}
                    onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Assign Class Teacher (Head Faculty) *
                </label>
                <select
                  value={classForm.teacherId}
                  onChange={(e) => setClassForm({ ...classForm, teacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.designation} • {t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Initial Sections to Create (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Section A, Section B, Section C"
                  value={classForm.initialSections}
                  onChange={(e) => setClassForm({ ...classForm, initialSections: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                />
                <p className="text-[10px] text-slate-400 mt-1">Each section will be initialized with a default capacity of 40 students.</p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddClassModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30 transition-all"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: ✏️ EDIT CLASS MODAL
          ========================================================================= */}
      {isEditClassModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
            <div className="p-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5" />
                <h3 className="text-base font-bold">Edit Class Details: {selectedClass.name}</h3>
              </div>
              <button onClick={() => setIsEditClassModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditClass} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Class Name *</label>
                  <input
                    type="text"
                    required
                    value={classForm.name}
                    onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Grade Level *</label>
                  <input
                    type="number"
                    required
                    value={classForm.numericGrade}
                    onChange={(e) => setClassForm({ ...classForm, numericGrade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Wing</label>
                  <select
                    value={classForm.wing}
                    onChange={(e) => setClassForm({ ...classForm, wing: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  >
                    <option value="Primary (1-5)">Primary (1-5)</option>
                    <option value="Middle (6-8)">Middle (6-8)</option>
                    <option value="Secondary (9-10)">Secondary (9-10)</option>
                    <option value="Senior Secondary (11-12)">Senior Secondary (11-12)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Classroom Location</label>
                  <input
                    type="text"
                    value={classForm.room}
                    onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Designated Class Teacher
                </label>
                <select
                  value={classForm.teacherId}
                  onChange={(e) => setClassForm({ ...classForm, teacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditClassModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: 👥 MANAGE SECTIONS MODAL (Add / Delete / Change Section Capacity)
          ========================================================================= */}
      {isManageSectionsModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Manage Sections: {selectedClass.name}</h3>
                <p className="text-xs text-emerald-100 font-normal">Add, remove, or modify section capacities and room assignments</p>
              </div>
              <button onClick={() => setIsManageSectionsModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Existing Sections Table */}
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Existing Sections ({selectedClass.sections?.length || 0})</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
                      <tr>
                        <th className="py-2 px-3">Section</th>
                        <th className="py-2 px-3">Room</th>
                        <th className="py-2 px-3">Incharge</th>
                        <th className="py-2 px-3">Students (B/G)</th>
                        <th className="py-2 px-3">Cap.</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedClass.sections?.map((sec) => (
                        <tr key={sec.id}>
                          <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-white">{sec.name}</td>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{sec.room}</td>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{sec.sectionTeacher}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-white">{sec.studentCount} ({sec.boys}B/{sec.girls}G)</td>
                          <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{sec.capacity}</td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => handleDeleteSection(sec.id)}
                              className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                              title="Delete Section"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add New Section Sub-Form */}
              <form onSubmit={handleAddSection} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-500" /> Add Another Section
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Section Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Section E"
                      value={newSectionForm.name}
                      onChange={(e) => setNewSectionForm({ ...newSectionForm, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Room Number</label>
                    <input
                      type="text"
                      placeholder="e.g. Room 205"
                      value={newSectionForm.room}
                      onChange={(e) => setNewSectionForm({ ...newSectionForm, room: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Max Capacity</label>
                    <input
                      type="number"
                      value={newSectionForm.capacity}
                      onChange={(e) => setNewSectionForm({ ...newSectionForm, capacity: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Total Students</label>
                    <input
                      type="number"
                      value={newSectionForm.studentCount}
                      onChange={(e) => {
                        const count = Number(e.target.value);
                        setNewSectionForm({
                          ...newSectionForm,
                          studentCount: count,
                          boys: Math.ceil(count / 2),
                          girls: Math.floor(count / 2)
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Section Teacher</label>
                    <select
                      value={newSectionForm.sectionTeacher}
                      onChange={(e) => setNewSectionForm({ ...newSectionForm, sectionTeacher: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    >
                      {teachers.map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all"
                    >
                      + Add Section
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 text-right">
              <button
                onClick={() => setIsManageSectionsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: 📖 MANAGE SUBJECTS MODAL (Add / Delete Subjects & Faculty)
          ========================================================================= */}
      {isManageSubjectsModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Manage Subjects: {selectedClass.name}</h3>
                <p className="text-xs text-emerald-100 font-normal">Configure subject codes, assigned faculty, and weekly periods</p>
              </div>
              <button onClick={() => setIsManageSubjectsModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Existing Subjects */}
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Assigned Curriculum Subjects ({selectedClass.subjects?.length || 0})</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
                      <tr>
                        <th className="py-2 px-3">Subject & Code</th>
                        <th className="py-2 px-3">Faculty Teacher</th>
                        <th className="py-2 px-3">Periods/Wk</th>
                        <th className="py-2 px-3">Syllabus %</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedClass.subjects?.map((sub) => (
                        <tr key={sub.id}>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-800 dark:text-white">{sub.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{sub.code}</div>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-200">{sub.teacher}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-white">{sub.periodsPerWeek} p/wk</td>
                          <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{sub.syllabusProgress}%</td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => handleDeleteSubject(sub.id)}
                              className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                              title="Delete Subject"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Subject Sub-Form */}
              <form onSubmit={handleAddSubject} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-500" /> Assign New Subject
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Subject Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Physics Lab"
                      value={newSubjectForm.name}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Subject Code</label>
                    <input
                      type="text"
                      placeholder="e.g. PHY-042"
                      value={newSubjectForm.code}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, code: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Subject Teacher</label>
                    <select
                      value={newSubjectForm.teacher}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, teacher: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    >
                      {teachers.map(t => (
                        <option key={t.id} value={t.name}>{t.name} ({t.department})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Periods / Week</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={newSubjectForm.periodsPerWeek}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, periodsPerWeek: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1 font-semibold">Syllabus % Completed</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newSubjectForm.syllabusProgress}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, syllabusProgress: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all"
                    >
                      + Assign Subject
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 text-right">
              <button
                onClick={() => setIsManageSubjectsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 6: 👩‍🏫 QUICK ASSIGN CLASS TEACHER MODAL
          ========================================================================= */}
      {isAssignTeacherModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
            <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Assign Class Teacher</h3>
                <p className="text-xs text-emerald-200 font-normal">For {selectedClass.name} ({selectedClass.wing})</p>
              </div>
              <button onClick={() => setIsAssignTeacherModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Select a qualified faculty member to assign as the primary Class Teacher for <strong className="text-emerald-600 dark:text-emerald-400">{selectedClass.name}</strong>:
              </p>

              <div className="space-y-2">
                {teachers.map((t) => {
                  const isCurrent = selectedClass.classTeacher?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleSaveTeacherAssignment(t.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-sm'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center">
                          {t.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white">{t.name}</h4>
                          <p className="text-[11px] text-slate-400">{t.designation} • {t.experience}</p>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Current
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold"
                        >
                          Select
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 text-right">
              <button
                onClick={() => setIsAssignTeacherModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
