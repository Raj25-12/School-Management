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
  Sparkles
} from 'lucide-react';

const StudentNotices = () => {
  const { user } = useAuth();
  const { getNotificationsForUser } = useNotifications();

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const studentNotifications = getNotificationsForUser(user);

  // Filtered Notifications Feed
  const filteredNotifications = studentNotifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notif.senderName && notif.senderName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterCategory === 'all') return true;
    if (filterCategory === 'exam') return notif.type === 'exam';
    if (filterCategory === 'homework') return notif.type === 'homework';
    if (filterCategory === 'events') return notif.type === 'events';
    if (filterCategory === 'urgent') return notif.priority === 'urgent' || notif.type === 'urgent';
    return true;
  });

  const getCategoryBadge = (type, priority) => {
    if (priority === 'urgent' || type === 'urgent') {
      return { label: 'Urgent Alert', bg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700' };
    }
    switch (type) {
      case 'exam':
        return { label: 'Exam Notice', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'homework':
        return { label: 'Homework Due', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'events':
        return { label: 'School Event', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'mail':
        return { label: 'Direct Message', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      default:
        return { label: 'School Circular', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-sky p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-sky-800 dark:text-sky-300 mb-1.5 shadow-xs border border-sky-200/60 dark:border-sky-800/60">
              <Bell className="w-3.5 h-3.5 text-sky-600" />
              <span>Student Notice Board</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              School Circulars & Announcements
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Stay updated on exam schedules, school events, holidays, and classroom circulars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/student/notices/ask-doubt"
              className="clay-btn-sky px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask Doubt to Teacher</span>
            </Link>
            <Link
              to="/student/notices/inquiries"
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>My Sent Inquiries</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clay-card p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'exam', label: 'Exams & Dates' },
            { id: 'homework', label: 'Homework Due' },
            { id: 'events', label: 'Events & Holidays' },
            { id: 'urgent', label: 'Urgent Alerts' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                filterCategory === tab.id
                  ? 'clay-btn-sky text-white shadow-xs'
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
            placeholder="Search circulars..."
            className="clay-input w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredNotifications.length === 0 ? (
          <div className="col-span-2 clay-card p-8 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No notices found</p>
            <p className="text-xs text-slate-400 mt-0.5">No circulars match the selected category or search filter.</p>
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
                    <span className="inline-flex items-center gap-1 bg-sky-500 text-white text-[9px] font-semibold px-2.5 py-0.5 rounded-bl-xl shadow-xs">
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
                      {notif.targetClass || 'All Students'}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white leading-snug">
                    {notif.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-normal">
                    {notif.message}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sky-600 dark:text-sky-400">
                      {notif.senderName}
                    </span>
                    <span>•</span>
                    <span>{dateStr}</span>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400">
                    Class 10-A
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentNotices;
