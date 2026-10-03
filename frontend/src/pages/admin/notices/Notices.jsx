import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import {
  Bell,
  Search,
  Pin,
  Send,
  Mail,
  Trash2,
  Sparkles,
  Users,
  UserCheck,
  GraduationCap,
  MessageSquare
} from 'lucide-react';

const AdminNotices = () => {
  const { user } = useAuth();
  const {
    notifications,
    deleteNotification,
    messages
  } = useNotifications();

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered Notifications Feed
  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notif.senderName && notif.senderName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterCategory === 'all') return true;
    if (filterCategory === 'teachers') return notif.targetAudience === 'teachers';
    if (filterCategory === 'students') return notif.targetAudience === 'students';
    if (filterCategory === 'urgent') return notif.priority === 'urgent' || notif.type === 'urgent';
    if (filterCategory === 'exam') return notif.type === 'exam';
    if (filterCategory === 'events') return notif.type === 'events';
    return true;
  });

  const getCategoryBadge = (type, priority) => {
    if (priority === 'urgent' || type === 'urgent') {
      return { label: 'Urgent Alert', bg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700' };
    }
    switch (type) {
      case 'exam':
        return { label: 'Exam Notice', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'events':
        return { label: 'Campus Event', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'homework':
        return { label: 'Homework Alert', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'fee':
        return { label: 'Fee Reminder', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'mail':
        return { label: 'Direct Inquiry', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      default:
        return { label: 'General Circular', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    }
  };

  const totalNotifs = notifications.length;
  const teacherNotifsCount = notifications.filter((n) => n.targetAudience === 'teachers').length;
  const studentNotifsCount = notifications.filter((n) => n.targetAudience === 'students').length;
  const totalMails = messages.length;

  return (
    <div className="space-y-4 pb-8">
      {/* Top Welcome Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Communication Headquarters</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              School Notice Board & Circulars Feed
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Live broadcast feed of all school circulars, examinations schedules, and campus announcements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/notices/broadcast"
              className="clay-btn-emerald px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-white"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </Link>
            <Link
              to="/admin/notices/mailbox"
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Mailbox Desk ({totalMails})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Notices
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalNotifs}</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Active campus posts</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <Bell className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Teacher Broadcasts
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{teacherNotifsCount}</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Staff circulars</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Student Broadcasts
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{studentNotifsCount}</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Classes 1 - 12</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Direct Mail Inquiries
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalMails}</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Leave & doubts</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="clay-card p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'teachers', label: 'Teachers Only' },
            { id: 'students', label: 'Students Only' },
            { id: 'urgent', label: 'Urgent' },
            { id: 'exam', label: 'Exams' },
            { id: 'events', label: 'Events' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                filterCategory === tab.id
                  ? 'clay-btn-emerald text-white shadow-xs'
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
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No circulars match your filter</p>
            <p className="text-xs text-slate-400 mt-0.5">Try clearing your search query or broadcast a new announcement.</p>
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
                {/* Pinned Ribbon */}
                {notif.pinned && (
                  <div className="absolute top-0 right-0">
                    <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-semibold px-2.5 py-0.5 rounded-bl-xl shadow-xs">
                      <Pin className="w-2.5 h-2.5" /> PINNED
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Target: {notif.targetClass || notif.targetAudience?.toUpperCase()}
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
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {notif.senderName || 'Admin Office'}
                    </span>
                    <span>•</span>
                    <span>{dateStr}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteNotification(notif.id)}
                    className="clay-btn-secondary p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer shrink-0"
                    title="Delete announcement"
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

export default AdminNotices;
