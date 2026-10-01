import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  Building,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  Filter,
  Layers,
  X,
  Save,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Search,
  ArrowRightLeft
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';

const initialTimetableData = {
  '10-A': {
    Monday: [
      { id: 'TT-1', period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-2', period: 2, time: '08:45 - 09:30 AM', subject: 'Physics', teacher: 'Dr. Sunita Verma', room: 'Physics Lab 1', type: 'Practical' },
      { id: 'TT-3', period: 3, time: '09:30 - 10:15 AM', subject: 'English Literature', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-4', period: 4, time: '10:30 - 11:15 AM', subject: 'Chemistry', teacher: 'Dr. Sunita Verma', room: 'Chem Lab', type: 'Practical' },
      { id: 'TT-5', period: 5, time: '11:15 - 12:00 PM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
      { id: 'TT-6', period: 6, time: '12:45 - 01:30 PM', subject: 'History & Civics', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-7', period: 7, time: '01:30 - 02:15 PM', subject: 'Physical Education', teacher: 'Anand Kumar', room: 'Sports Ground', type: 'Activity' },
    ],
    Tuesday: [
      { id: 'TT-8', period: 1, time: '08:00 - 08:45 AM', subject: 'Physics', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-9', period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-10', period: 3, time: '09:30 - 10:15 AM', subject: 'Biology', teacher: 'Dr. Meera Nambiar', room: 'Bio Lab', type: 'Practical' },
      { id: 'TT-11', period: 4, time: '10:30 - 11:15 AM', subject: 'English Grammar', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-12', period: 5, time: '11:15 - 12:00 PM', subject: 'Hindi / Sanskrit', teacher: 'Meenakshi S.', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-13', period: 6, time: '12:45 - 01:30 PM', subject: 'Mathematics Tutorial', teacher: 'Prof. Rajesh Sharma', room: 'Math Lab', type: 'Tutorial' },
      { id: 'TT-14', period: 7, time: '01:30 - 02:15 PM', subject: 'Art & Craft', teacher: 'Kavita Menon', room: 'Art Studio', type: 'Activity' },
    ],
    Wednesday: [
      { id: 'TT-15', period: 1, time: '08:00 - 08:45 AM', subject: 'Chemistry', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-16', period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-17', period: 3, time: '09:30 - 10:15 AM', subject: 'Geography', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-18', period: 4, time: '10:30 - 11:15 AM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
      { id: 'TT-19', period: 5, time: '11:15 - 12:00 PM', subject: 'English Literature', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-20', period: 6, time: '12:45 - 01:30 PM', subject: 'Physics Tutorial', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Tutorial' },
      { id: 'TT-21', period: 7, time: '01:30 - 02:15 PM', subject: 'Library & Reading', teacher: 'Suresh Raina', room: 'Central Library', type: 'Activity' },
    ],
    Thursday: [
      { id: 'TT-22', period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-23', period: 2, time: '08:45 - 09:30 AM', subject: 'English Grammar', teacher: 'Amit Patel', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-24', period: 3, time: '09:30 - 10:15 AM', subject: 'Biology', teacher: 'Dr. Meera Nambiar', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-25', period: 4, time: '10:30 - 11:15 AM', subject: 'Chemistry Lab', teacher: 'Dr. Sunita Verma', room: 'Chem Lab', type: 'Practical' },
      { id: 'TT-26', period: 5, time: '11:15 - 12:00 PM', subject: 'Economics', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-27', period: 6, time: '12:45 - 01:30 PM', subject: 'General Knowledge', teacher: 'Meenakshi S.', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-28', period: 7, time: '01:30 - 02:15 PM', subject: 'Yoga & Wellness', teacher: 'Anand Kumar', room: 'Yoga Hall', type: 'Activity' },
    ],
    Friday: [
      { id: 'TT-29', period: 1, time: '08:00 - 08:45 AM', subject: 'Physics', teacher: 'Dr. Sunita Verma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-30', period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-31', period: 3, time: '09:30 - 10:15 AM', subject: 'History & Civics', teacher: 'Pooja Iyer', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-32', period: 4, time: '10:30 - 11:15 AM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
      { id: 'TT-33', period: 5, time: '11:15 - 12:00 PM', subject: 'Environmental Science', teacher: 'Dr. Meera Nambiar', room: 'Room 201', type: 'Lecture' },
      { id: 'TT-34', period: 6, time: '12:45 - 01:30 PM', subject: 'English Debate', teacher: 'Amit Patel', room: 'Auditorium', type: 'Activity' },
      { id: 'TT-35', period: 7, time: '01:30 - 02:15 PM', subject: 'Clubs & Projects', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Activity' },
    ],
    Saturday: [
      { id: 'TT-36', period: 1, time: '08:00 - 08:45 AM', subject: 'Weekly Unit Test', teacher: 'All Faculty', room: 'Examination Hall', type: 'Exam' },
      { id: 'TT-37', period: 2, time: '08:45 - 09:30 AM', subject: 'Doubt Clearing Session', teacher: 'Prof. Rajesh Sharma', room: 'Room 201', type: 'Tutorial' },
      { id: 'TT-38', period: 3, time: '09:30 - 10:15 AM', subject: 'Science Quiz', teacher: 'Dr. Sunita Verma', room: 'AV Room', type: 'Activity' },
      { id: 'TT-39', period: 4, time: '10:30 - 11:30 AM', subject: 'Sports Inter-House', teacher: 'Anand Kumar', room: 'Playground', type: 'Activity' },
    ]
  },
  '10-B': {
    Monday: [
      { id: 'TT-40', period: 1, time: '08:00 - 08:45 AM', subject: 'English Literature', teacher: 'Amit Patel', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-41', period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-42', period: 3, time: '09:30 - 10:15 AM', subject: 'Chemistry', teacher: 'Dr. Sunita Verma', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-43', period: 4, time: '10:30 - 11:15 AM', subject: 'Physics', teacher: 'Dr. Ramesh Bose', room: 'Physics Lab 1', type: 'Practical' },
      { id: 'TT-44', period: 5, time: '11:15 - 12:00 PM', subject: 'History', teacher: 'Pooja Iyer', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-45', period: 6, time: '12:45 - 01:30 PM', subject: 'Computer Science', teacher: 'Vikram Singh', room: 'IT Lab 2', type: 'Practical' },
      { id: 'TT-46', period: 7, time: '01:30 - 02:15 PM', subject: 'Physical Education', teacher: 'Anand Kumar', room: 'Sports Ground', type: 'Activity' }
    ],
    Tuesday: [
      { id: 'TT-47', period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-48', period: 2, time: '08:45 - 09:30 AM', subject: 'Physics', teacher: 'Dr. Ramesh Bose', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-49', period: 3, time: '09:30 - 10:15 AM', subject: 'Chemistry Lab', teacher: 'Dr. Sunita Verma', room: 'Chem Lab', type: 'Practical' },
      { id: 'TT-50', period: 4, time: '10:30 - 11:15 AM', subject: 'Biology', teacher: 'Dr. Meera Nambiar', room: 'Room 202', type: 'Lecture' },
      { id: 'TT-51', period: 5, time: '11:15 - 12:00 PM', subject: 'English Grammar', teacher: 'Amit Patel', room: 'Room 202', type: 'Lecture' }
    ]
  }
};

const classesList = ['10-A', '10-B', '9-A', '9-B', '8-A', '11-Science', '12-Commerce'];
const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const teachersList = [
  'Prof. Rajesh Sharma',
  'Dr. Sunita Verma',
  'Dr. Ramesh Bose',
  'Amit Patel',
  'Pooja Iyer',
  'Vikram Singh',
  'Dr. Meera Nambiar',
  'Meenakshi S.',
  'Anand Kumar',
  'Kavita Menon',
  'Suresh Raina'
];
const subjectsList = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English Literature',
  'English Grammar',
  'Computer Science',
  'History & Civics',
  'Geography',
  'Hindi / Sanskrit',
  'Physical Education',
  'Art & Craft',
  'Library & Reading'
];
const roomsList = [
  'Room 201',
  'Room 202',
  'Physics Lab 1',
  'Chem Lab',
  'Bio Lab',
  'IT Lab 2',
  'Math Lab',
  'Central Library',
  'Sports Ground',
  'Art Studio',
  'Auditorium',
  'AV Room'
];

const AdminTimetable = ({ initialScope = 'class' }) => {
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current scope from URL route or initialScope prop
  const getScopeFromUrl = () => {
    if (location.pathname.includes('/teacher')) return 'teacher';
    if (location.pathname.includes('/room')) return 'room';
    if (location.pathname.includes('/conflicts')) return 'conflicts';
    return initialScope || 'class';
  };

  const [scheduleScope, setScheduleScope] = useState(getScopeFromUrl);

  // Sync state whenever the route changes (e.g. sidebar navigation)
  useEffect(() => {
    setScheduleScope(getScopeFromUrl());
  }, [location.pathname, initialScope]);

  const handleScopeChange = (newScope) => {
    setScheduleScope(newScope);
    if (newScope === 'class') {
      navigate('/admin/timetable');
    } else {
      navigate(`/admin/timetable/${newScope}`);
    }
  };

  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedTeacher, setSelectedTeacher] = useState('Prof. Rajesh Sharma');
  const [selectedRoom, setSelectedRoom] = useState('Room 201');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'
  const [timetableData, setTimetableData] = useState(initialTimetableData);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [activeDayForModal, setActiveDayForModal] = useState('Monday');
  const [slotForm, setSlotForm] = useState({
    id: '',
    period: 1,
    time: '08:00 - 08:45 AM',
    subject: 'Mathematics',
    teacher: 'Prof. Rajesh Sharma',
    room: 'Room 201',
    type: 'Lecture'
  });

  const currentClassSchedule = timetableData[selectedClass] || timetableData['10-A'] || {};
  const currentDayPeriods = currentClassSchedule[selectedDay] || [];

  // Teacher Schedule aggregator
  const teacherSchedule = useMemo(() => {
    const res = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
    Object.entries(timetableData).forEach(([clsName, days]) => {
      Object.entries(days).forEach(([day, slots]) => {
        slots.forEach((s) => {
          if (s.teacher === selectedTeacher) {
            res[day].push({ ...s, className: clsName });
          }
        });
      });
    });
    daysList.forEach((d) => res[d].sort((a, b) => a.period - b.period));
    return res;
  }, [timetableData, selectedTeacher]);

  // Room Schedule aggregator
  const roomSchedule = useMemo(() => {
    const res = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
    Object.entries(timetableData).forEach(([clsName, days]) => {
      Object.entries(days).forEach(([day, slots]) => {
        slots.forEach((s) => {
          if (s.room === selectedRoom) {
            res[day].push({ ...s, className: clsName });
          }
        });
      });
    });
    daysList.forEach((d) => res[d].sort((a, b) => a.period - b.period));
    return res;
  }, [timetableData, selectedRoom]);

  // Conflict Detector (Find if any teacher or room is double-booked at the same Day and Period)
  const conflicts = useMemo(() => {
    const list = [];
    daysList.forEach((day) => {
      const teacherMap = {};
      const roomMap = {};

      Object.entries(timetableData).forEach(([clsName, days]) => {
        const slots = days[day] || [];
        slots.forEach((s) => {
          // Teacher collision check
          const tKey = `${s.teacher}_P${s.period}`;
          if (teacherMap[tKey]) {
            list.push({
              type: 'Teacher Collision',
              day,
              period: s.period,
              time: s.time,
              name: s.teacher,
              class1: teacherMap[tKey].className,
              class2: clsName,
              subject: s.subject
            });
          } else {
            teacherMap[tKey] = { ...s, className: clsName };
          }

          // Room collision check (except ground/hall)
          if (!s.room.includes('Ground') && !s.room.includes('Playground')) {
            const rKey = `${s.room}_P${s.period}`;
            if (roomMap[rKey]) {
              list.push({
                type: 'Room Collision',
                day,
                period: s.period,
                time: s.time,
                name: s.room,
                class1: roomMap[rKey].className,
                class2: clsName,
                subject: s.subject
              });
            } else {
              roomMap[rKey] = { ...s, className: clsName };
            }
          }
        });
      });
    });
    return list;
  }, [timetableData]);

  // Stats calculation
  const stats = useMemo(() => {
    let totalPeriods = 0;
    let labCount = 0;
    let activityCount = 0;
    const uniqueTeachers = new Set();

    Object.values(currentClassSchedule).forEach((daySlots) => {
      daySlots.forEach((slot) => {
        totalPeriods += 1;
        uniqueTeachers.add(slot.teacher);
        if (slot.type === 'Practical') labCount += 1;
        if (slot.type === 'Activity') activityCount += 1;
      });
    });

    return {
      totalWeekly: totalPeriods,
      teacherCount: uniqueTeachers.size,
      labs: labCount,
      activities: activityCount
    };
  }, [currentClassSchedule]);

  const openCreateModal = (day) => {
    setModalMode('create');
    setActiveDayForModal(day || selectedDay);
    const existing = currentClassSchedule[day || selectedDay] || [];
    const nextPeriod = existing.length + 1;
    setSlotForm({
      id: `TT-${Date.now().toString().slice(-4)}`,
      period: nextPeriod,
      time: nextPeriod === 1 ? '08:00 - 08:45 AM' : nextPeriod === 2 ? '08:45 - 09:30 AM' : '10:30 - 11:15 AM',
      subject: 'Mathematics',
      teacher: 'Prof. Rajesh Sharma',
      room: 'Room 201',
      type: 'Lecture'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (day, slot) => {
    setModalMode('edit');
    setActiveDayForModal(day);
    setSlotForm({ ...slot });
    setIsModalOpen(true);
  };

  const handleSaveSlot = (e) => {
    e.preventDefault();
    setTimetableData((prev) => {
      const clsData = { ...(prev[selectedClass] || prev['10-A']) };
      const daySlots = [...(clsData[activeDayForModal] || [])];

      if (modalMode === 'create') {
        daySlots.push({ ...slotForm, id: slotForm.id || `TT-${Date.now().toString().slice(-4)}` });
      } else {
        const idx = daySlots.findIndex((s) => s.id === slotForm.id);
        if (idx !== -1) {
          daySlots[idx] = { ...slotForm };
        }
      }

      // Sort by period number
      daySlots.sort((a, b) => a.period - b.period);
      clsData[activeDayForModal] = daySlots;

      return {
        ...prev,
        [selectedClass]: clsData
      };
    });

    showToast({
      title: modalMode === 'create' ? 'Period Added' : 'Period Updated',
      message: `${slotForm.subject} on ${activeDayForModal} saved successfully.`,
      type: 'emerald'
    });
    setIsModalOpen(false);
  };

  const handleDeleteSlot = (day, slotId) => {
    setTimetableData((prev) => {
      const clsData = { ...(prev[selectedClass] || prev['10-A']) };
      const daySlots = (clsData[day] || []).filter((s) => s.id !== slotId);
      clsData[day] = daySlots;
      return {
        ...prev,
        [selectedClass]: clsData
      };
    });
    showToast({
      title: 'Slot Removed',
      message: 'Period removed from timetable.',
      type: 'rose'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Exam':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Practical':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-bold';
      case 'Tutorial':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Activity':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-4 pb-8 print:p-0">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden print:hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <img
                src={logo}
                alt="School Management"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>Academic Timetable & Schedule Desk • Master Control</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Class, Teacher & Room Schedules
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Manage weekly period schedules, lab allocations, room assignments, and automatic conflict detection.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
            <button
              type="button"
              onClick={() => openCreateModal(selectedDay)}
              className="clay-btn-emerald px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Period Slot</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4">
        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Weekly Lectures
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              {stats.totalWeekly} Periods
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Across Mon - Sat schedule
            </div>
          </div>
        </div>

        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Assigned Faculty
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              {stats.teacherCount} Teachers
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Teaching Class {selectedClass}
            </div>
          </div>
        </div>

        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Practical & Lab Hours
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
              {stats.labs} Practical Slots
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              Science & IT Laboratories
            </div>
          </div>
        </div>

        <div className="clay-card p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Schedule Conflicts
            </span>
            <div className={`p-1.5 rounded-lg clay-icon-pill ${
              conflicts.length > 0
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
            }`}>
              {conflicts.length > 0 ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            </div>
          </div>
          <div className="mt-2">
            <div className={`text-lg sm:text-xl font-black ${conflicts.length > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
              {conflicts.length === 0 ? '0 Collisions' : `${conflicts.length} Conflicts Detected`}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              {conflicts.length === 0 ? '100% Conflict Free' : 'Teacher/Room overlap'}
            </div>
          </div>
        </div>
      </div>


      {/* 🔍 Controls Bar for Class Schedule */}
      {scheduleScope === 'class' && (
        <div className="clay-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
              Select Class:
            </span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="clay-input px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
            >
              {classesList.map((cls) => (
                <option key={cls} value={cls} className="dark:bg-slate-900">
                  Class {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                viewMode === 'day'
                  ? 'clay-btn-emerald text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              Day View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                viewMode === 'week'
                  ? 'clay-btn-emerald text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              Full Week Grid
            </button>
          </div>
        </div>
      )}

      {/* 🔍 Controls Bar for Teacher Schedule */}
      {scheduleScope === 'teacher' && (
        <div className="clay-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
              Select Teacher:
            </span>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="clay-input px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
            >
              {teachersList.map((tch) => (
                <option key={tch} value={tch} className="dark:bg-slate-900">
                  {tch}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Shows all class lectures assigned to {selectedTeacher}
          </span>
        </div>
      )}

      {/* 🔍 Controls Bar for Room Schedule */}
      {scheduleScope === 'room' && (
        <div className="clay-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
              Select Room / Laboratory:
            </span>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="clay-input px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
            >
              {roomsList.map((rm) => (
                <option key={rm} value={rm} className="dark:bg-slate-900">
                  {rm}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Room occupancy tracker across all periods
          </span>
        </div>
      )}

      {/* Day Selector Tabs (When in Day View or Class Scope) */}
      {scheduleScope === 'class' && viewMode === 'day' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 print:hidden">
          {daysList.map((day) => {
            const count = (currentClassSchedule[day] || []).length;
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'clay-btn-emerald text-white shadow-sm'
                    : 'clay-card text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <span>{day}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/30 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* SCOPE 1: CLASS DAY VIEW */}
      {scheduleScope === 'class' && viewMode === 'day' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <span>{selectedDay} Schedule • Class {selectedClass}</span>
              <span className="text-xs font-normal text-slate-400">({currentDayPeriods.length} Periods)</span>
            </h2>
            <button
              type="button"
              onClick={() => openCreateModal(selectedDay)}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Period</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentDayPeriods.length === 0 ? (
              <div className="col-span-2 clay-card p-10 text-center text-slate-400">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                <p className="font-bold text-slate-700 dark:text-slate-300">No periods scheduled for {selectedDay}.</p>
                <button
                  type="button"
                  onClick={() => openCreateModal(selectedDay)}
                  className="clay-btn-emerald px-3 py-1.5 rounded-xl font-bold text-xs mt-2 cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Period</span>
                </button>
              </div>
            ) : (
              currentDayPeriods.map((slot) => (
                <div
                  key={slot.id}
                  className="clay-card p-4 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-black text-sm flex items-center justify-center clay-icon-pill shrink-0">
                        P{slot.period}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                            {slot.subject}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTypeBadge(slot.type)}`}>
                            {slot.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{slot.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            <span>{slot.room}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            <span>{slot.time}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 print:hidden">
                      <button
                        type="button"
                        onClick={() => openEditModal(selectedDay, slot)}
                        className="clay-btn-secondary p-1.5 rounded-xl text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                        title="Edit Slot"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlot(selectedDay, slot.id)}
                        className="clay-btn-secondary p-1.5 rounded-xl text-slate-500 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SCOPE 1: CLASS FULL WEEK GRID VIEW */}
      {scheduleScope === 'class' && viewMode === 'week' && (
        <div className="clay-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4 w-28">Day</th>
                  <th className="py-3 px-3">P1 (08:00)</th>
                  <th className="py-3 px-3">P2 (08:45)</th>
                  <th className="py-3 px-3">P3 (09:30)</th>
                  <th className="py-3 px-3">P4 (10:30)</th>
                  <th className="py-3 px-3">P5 (11:15)</th>
                  <th className="py-3 px-3">P6 (12:45)</th>
                  <th className="py-3 px-3">P7 (01:30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {daysList.map((day) => {
                  const slots = currentClassSchedule[day] || [];
                  return (
                    <tr key={day} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-extrabold text-slate-800 dark:text-white bg-slate-50/40 dark:bg-slate-900/40">
                        {day}
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7].map((pNum) => {
                        const slot = slots.find((s) => s.period === pNum);
                        if (!slot) {
                          return (
                            <td key={pNum} className="py-2.5 px-2 text-center text-slate-300 dark:text-slate-600">
                              -
                            </td>
                          );
                        }
                        return (
                          <td key={pNum} className="py-2.5 px-2">
                            <div
                              onClick={() => openEditModal(day, slot)}
                              className="p-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:border-emerald-400 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer transition shadow-2xs group"
                            >
                              <div className="font-bold text-slate-800 dark:text-white truncate">
                                {slot.subject}
                              </div>
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                                {slot.teacher.split(' ').pop()}
                              </div>
                              <div className="text-[9px] text-slate-400 truncate">
                                {slot.room}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCOPE 2: TEACHER-WISE SCHEDULE GRID */}
      {scheduleScope === 'teacher' && (
        <div className="clay-card overflow-hidden">
          <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Weekly Teaching Routine for {selectedTeacher}</span>
            </h2>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200">
              Department of Mathematics & Science
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4 w-28">Day</th>
                  <th className="py-3 px-3">P1 (08:00)</th>
                  <th className="py-3 px-3">P2 (08:45)</th>
                  <th className="py-3 px-3">P3 (09:30)</th>
                  <th className="py-3 px-3">P4 (10:30)</th>
                  <th className="py-3 px-3">P5 (11:15)</th>
                  <th className="py-3 px-3">P6 (12:45)</th>
                  <th className="py-3 px-3">P7 (01:30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {daysList.map((day) => {
                  const slots = teacherSchedule[day] || [];
                  return (
                    <tr key={day} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-extrabold text-slate-800 dark:text-white bg-slate-50/40 dark:bg-slate-900/40">
                        {day}
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7].map((pNum) => {
                        const slot = slots.find((s) => s.period === pNum);
                        if (!slot) {
                          return (
                            <td key={pNum} className="py-2.5 px-2 text-center text-slate-300 dark:text-slate-600">
                              <span className="text-[10px] text-slate-400 italic">Free</span>
                            </td>
                          );
                        }
                        return (
                          <td key={pNum} className="py-2.5 px-2">
                            <div className="p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
                              <div className="font-bold text-emerald-900 dark:text-emerald-200 truncate">
                                {slot.subject}
                              </div>
                              <div className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 truncate mt-0.5">
                                Class {slot.className}
                              </div>
                              <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                                {slot.room}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCOPE 3: ROOM-WISE SCHEDULE GRID */}
      {scheduleScope === 'room' && (
        <div className="clay-card overflow-hidden">
          <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>Room Occupancy Schedule for {selectedRoom}</span>
            </h2>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200">
              Capacity: 40 Seats
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4 w-28">Day</th>
                  <th className="py-3 px-3">P1 (08:00)</th>
                  <th className="py-3 px-3">P2 (08:45)</th>
                  <th className="py-3 px-3">P3 (09:30)</th>
                  <th className="py-3 px-3">P4 (10:30)</th>
                  <th className="py-3 px-3">P5 (11:15)</th>
                  <th className="py-3 px-3">P6 (12:45)</th>
                  <th className="py-3 px-3">P7 (01:30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {daysList.map((day) => {
                  const slots = roomSchedule[day] || [];
                  return (
                    <tr key={day} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-extrabold text-slate-800 dark:text-white bg-slate-50/40 dark:bg-slate-900/40">
                        {day}
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7].map((pNum) => {
                        const slot = slots.find((s) => s.period === pNum);
                        if (!slot) {
                          return (
                            <td key={pNum} className="py-2.5 px-2 text-center text-slate-300 dark:text-slate-600">
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Available</span>
                            </td>
                          );
                        }
                        return (
                          <td key={pNum} className="py-2.5 px-2">
                            <div className="p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
                              <div className="font-bold text-emerald-900 dark:text-emerald-200 truncate">
                                Class {slot.className}
                              </div>
                              <div className="text-[10px] text-slate-600 dark:text-slate-300 truncate mt-0.5">
                                {slot.subject}
                              </div>
                              <div className="text-[9px] text-emerald-700 dark:text-emerald-400 truncate">
                                {slot.teacher}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCOPE 4: CONFLICT DETECTOR */}
      {scheduleScope === 'conflicts' && (
        <div className="clay-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Automated Timetable Conflict & Overlap Inspector</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Detects double-booked teachers or rooms scheduled at the identical day and period across different classes.
              </p>
            </div>
          </div>

          {conflicts.length === 0 ? (
            <div className="p-8 text-center text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60">
              <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
              <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">No Scheduling Conflicts Found!</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                All faculty members and lab classrooms are uniquely booked with zero overlapping collisions.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {conflicts.map((conf, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                        {conf.type}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-white text-xs">{conf.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Booked for both <strong className="text-rose-600">Class {conf.class1}</strong> and <strong className="text-rose-600">Class {conf.class2}</strong> on {conf.day} at Period {conf.period} ({conf.time}).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSelectedClass(conf.class2); setScheduleScope('class'); }}
                    className="clay-btn-emerald py-1.5 px-3 text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Resolve in Class {conf.class2}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Period Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 clay-icon-pill">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800 dark:text-white">
                    {modalMode === 'create' ? 'Add Period Slot' : 'Edit Period Slot'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activeDayForModal} • Class {selectedClass}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Period Number
                  </label>
                  <select
                    value={slotForm.period}
                    onChange={(e) => setSlotForm({ ...slotForm, period: Number(e.target.value) })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>Period {num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    value={slotForm.time}
                    onChange={(e) => setSlotForm({ ...slotForm, time: e.target.value })}
                    placeholder="e.g. 08:00 - 08:45 AM"
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={slotForm.subject}
                    onChange={(e) => setSlotForm({ ...slotForm, subject: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    {subjectsList.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Assigned Teacher
                  </label>
                  <select
                    value={slotForm.teacher}
                    onChange={(e) => setSlotForm({ ...slotForm, teacher: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    {teachersList.map((tch) => (
                      <option key={tch} value={tch}>{tch}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Classroom / Lab
                  </label>
                  <select
                    value={slotForm.room}
                    onChange={(e) => setSlotForm({ ...slotForm, room: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    {roomsList.map((rm) => (
                      <option key={rm} value={rm}>{rm}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Session Type
                  </label>
                  <select
                    value={slotForm.type}
                    onChange={(e) => setSlotForm({ ...slotForm, type: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Practical">Practical (Lab)</option>
                    <option value="Tutorial">Tutorial / Doubt</option>
                    <option value="Activity">Activity / Sports</option>
                    <option value="Exam">Unit Test / Exam</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="clay-btn-secondary px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-2 text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Period</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTimetable;
