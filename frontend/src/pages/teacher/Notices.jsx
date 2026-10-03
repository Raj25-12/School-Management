import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import {
  Bell,
  Search,
  Pin,
  Send,
  Mail,
  Trash2,
  Sparkles
} from 'lucide-react';

const TeacherNotices = () => {
  const { user } = useAuth();
  const {
    getNotificationsForUser,
    deleteNotification
  } = useNotifications();

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const teacherNotifications = getNotificationsForUser(user);

  // Filtered Notifications Feed
  const filteredNotifications = teacherNotifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notif.senderName && notif.senderName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterCategory === 'all') return true;
    if (filterCategory === 'admin') return notif.senderRole === 'admin';
    if (filterCategory === 'homework') return notif.type === 'homework';
    if (filterCategory === 'exam') return notif.type === 'exam';
    if (filterCategory === 'urgent') return notif.priority === 'urgent' || notif.type === 'urgent';
    return true;
  });

  const getCategoryBadge = (type, priority) => {
    if (priority === 'urgent' || type === 'urgent') {
      return { label: 'Urgent', bg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700' };
    }
    switch (type) {
      case 'exam':
        return { label: 'Examination', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'homework':
        return { label: 'Homework Task', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'events':
        return { label: 'Campus Event', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'mail':
        return { label: 'Direct Inquiry', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      default:
        return { label: 'Staff Circular', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-sand p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-[#775010] dark:text-[#ebd5ab] mb-1.5 shadow-xs border border-[#ebd5ab] dark:border-[#856326]">
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>Faculty Communications & Student Notices Hub</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Faculty Notice Board
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              View school management circulars, academic schedules, and staff notifications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/teacher/notices/broadcast"
              className="clay-btn-sand px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Notice to Students</span>
            </Link>
            <Link
              to="/teacher/notices/doubts"
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#9c6f21] dark:text-[#ebd5ab]" />
              <span>Student Doubts Desk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clay-card p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'admin', label: 'Admin Circulars' },
            { id: 'homework', label: 'Homework Alerts' },
            { id: 'exam', label: 'Exam Schedule' },
            { id: 'urgent', label: 'Urgent' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                filterCategory === tab.id
                  ? 'clay-btn-sand text-[#2b1804] dark:text-[#fff9ed] shadow-xs'
                  : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher notices..."
            className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredNotifications.length === 0 ? (
          <div className="col-span-2 clay-card p-8 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No notices found</p>
            <p className="text-xs text-slate-400 mt-0.5">You're all caught up with your notices.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const badge = getCategoryBadge(notif.type, notif.priority);
            const dateStr = notif.createdAt
              ? new Date(notif.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
              : 'Recent';

            return (
              <div
                key={notif.id}
                className="clay-card p-4 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 relative overflow-hidden"
              >
                {notif.pinned && (
                  <div className="absolute top-0 right-0">
                    <span className="inline-flex items-center gap-1 bg-[#c49646] text-[#261704] text-[9px] font-bold px-2.5 py-0.5 rounded-bl-xl shadow-xs">
                      <Pin className="w-2.5 h-2.5" /> PINNED
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {notif.targetClass || notif.targetAudience?.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug">
                    {notif.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-[#9c6f21] dark:text-[#ebd5ab]">
                      {notif.senderName}
                    </span>
                    <span>•</span>
                    <span>{dateStr}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteNotification(notif.id)}
                    className="clay-btn-secondary p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition cursor-pointer shrink-0"
                    title="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TeacherNotices;
