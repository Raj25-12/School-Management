import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  BookOpen,
  CalendarCheck,
  Send
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { MaleIcon, FemaleIcon } from '../../components/common/GenderIcons';


const teacherStudents = [
  {
    id: 'STU-1042',
    rollNo: '10A-01',
    name: 'Rohan Sharma',
    class: 'Class 10-A',
    subject: 'Mathematics',
    fatherName: 'Manoj Sharma',
    motherName: 'Sunita Sharma',
    contact: '+91 98765 43210',
    attendance: '96%',
    status: 'Active',
    avatar: 'RS',
  },
  {
    id: 'STU-1043',
    rollNo: '10A-14',
    name: 'Alex Johnson',
    class: 'Class 10-A',
    subject: 'Mathematics',
    fatherName: 'Robert Johnson',
    motherName: 'Sarah Johnson',
    contact: '+91 98123 45678',
    attendance: '94.8%',
    status: 'Active',
    avatar: 'AJ',
  },
  {
    id: 'STU-1047',
    rollNo: '10A-09',
    name: 'Priya Gupta',
    class: 'Class 10-A',
    subject: 'Mathematics',
    fatherName: 'Rajesh Gupta',
    motherName: 'Anita Gupta',
    contact: '+91 98567 89012',
    attendance: '98%',
    status: 'Active',
    avatar: 'PG',
  },
  {
    id: 'STU-1051',
    rollNo: '9B-04',
    name: 'Aarav Mehta',
    class: 'Class 9-B',
    subject: 'Algebra',
    fatherName: 'Deepak Mehta',
    motherName: 'Kiran Mehta',
    contact: '+91 98901 23456',
    attendance: '91%',
    status: 'Active',
    avatar: 'AM',
  },
  {
    id: 'STU-1052',
    rollNo: '9B-12',
    name: 'Pooja Verma',
    class: 'Class 9-B',
    subject: 'Algebra',
    fatherName: 'Ashok Verma',
    motherName: 'Rekha Verma',
    contact: '+91 98012 34567',
    attendance: '93%',
    status: 'Active',
    avatar: 'PV',
  },
];

const MyStudents = () => {
  const { showToast } = useToast();
  const [students] = useState(teacherStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.motherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.contact.includes(searchQuery);

    if (!matchesSearch) return false;
    if (selectedClass === 'all') return true;
    return st.class === selectedClass;
  });

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-sand p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-[#775010] dark:text-[#ebd5ab] mb-1.5 shadow-xs border border-[#ebd5ab] dark:border-[#856326]">
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>Teacher Portal • Enrolled Students Directory</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              My Class Students
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Full student directory with Roll No, Class, Father & Mother Names, and Parent Contact info.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/teacher/notices"
              className="clay-btn-sand px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Class Notice</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="clay-card p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="clay-input px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-white"
          >
            <option value="all">All My Classes</option>
            <option value="Class 10-A">Class 10-A (Mathematics)</option>
            <option value="Class 9-B">Class 9-B (Algebra)</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, roll, father, contact..."
            className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="clay-card p-4 sm:p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-slate-500 uppercase bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="px-3 py-2.5 rounded-l-lg">Student Profile & Roll No</th>
                <th className="px-3 py-2.5">Class</th>
                <th className="px-3 py-2.5">Father's Name</th>
                <th className="px-3 py-2.5">Mother's Name</th>
                <th className="px-3 py-2.5">Contact Number</th>
                <th className="px-3 py-2.5">Attendance</th>
                <th className="px-3 py-2.5 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-normal">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 text-xs font-semibold">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#ebd5ab]/40 dark:bg-[#856326]/50 text-[#775010] dark:text-[#ebd5ab] font-bold text-xs flex items-center justify-center clay-icon-pill shrink-0">
                          {st.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-white leading-snug">{st.name}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#ebd5ab]/40 text-[#775010] dark:bg-[#856326]/50 dark:text-[#ebd5ab] border border-[#ebd5ab] dark:border-[#856326]">
                              Roll: {st.rollNo}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">({st.id})</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-2.5">
                      <span className="font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        {st.class}
                      </span>
                    </td>

                    <td className="px-3 py-2.5">
                      <div className="text-xs font-medium text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <MaleIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{st.fatherName}</span>
                      </div>
                    </td>

                    <td className="px-3 py-2.5">
                      <div className="text-xs font-normal text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <FemaleIcon className="w-3.5 h-3.5 text-[#9c6f21] shrink-0" />
                        <span>{st.motherName}</span>
                      </div>
                    </td>

                    <td className="px-3 py-2.5">
                      <a
                        href={`tel:${st.contact}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#8d6016] dark:hover:text-[#ebd5ab] bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60 transition"
                      >
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{st.contact}</span>
                      </a>
                    </td>

                    <td className="px-3 py-2.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                        {st.attendance}
                      </span>
                    </td>

                    <td className="px-3 py-2.5 text-right">
                      <Link
                        to="/teacher/notices"
                        className="clay-btn-secondary px-2 py-1 rounded-lg text-[11px] font-bold text-[#8d6016] dark:text-[#ebd5ab] hover:bg-[#ebd5ab]/20 inline-flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Mail</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyStudents;
