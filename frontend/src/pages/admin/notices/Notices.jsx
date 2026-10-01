import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import {
  Bell,
  Send,
  Mail,
  Filter,
  Search,
  CheckCircle2,
  Trash2,
  Pin,
  Sparkles,
  Users,
  UserCheck,
  GraduationCap,
  Calendar,
  AlertTriangle,
  Award,
  FileText,
  CreditCard,
  MessageSquare,
  Clock,
  ArrowRight,
  Reply,
  ShieldAlert
} from 'lucide-react';

const AdminNotices = ({ initialTab = 'feed' }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const {
    notifications,
    messages,
    sendNotification,
    sendMailMessage,
    replyToMessage,
    deleteNotification,
    deleteMessage,
    markAsRead
  } = useNotifications();

  const [activeTab, setActiveTab] = useState(initialTab); // 'feed' | 'compose' | 'mail'
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Form states for broadcasting notification
  const [broadcastData, setBroadcastData] = useState({
    title: '',
    message: '',
    targetAudience: 'all', // 'all', 'teachers', 'students'
    targetClass: 'All Classes',
    type: 'general', // 'general', 'exam', 'homework', 'urgent', 'events', 'fees'
    priority: 'normal', // 'normal', 'high', 'urgent'
    pinned: false,
  });

  // Form states for Direct Mail
  const [mailData, setMailData] = useState({
    toRole: 'teacher',
    toName: 'Prof. Rajesh Sharma',
    toEmail: 'teacher@school.com',
    category: 'General Query',
    subject: '',
    message: '',
  });

  // Reply state
  const [replyTextMap, setReplyTextMap] = useState({});

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastData.title.trim() || !broadcastData.message.trim()) {
      showToast({ title: 'Validation Error', message: 'Please fill in both title and message.', type: 'error' });
      return;
    }

    sendNotification({
      title: broadcastData.title,
      message: broadcastData.message,
      targetAudience: broadcastData.targetAudience,
      targetClass: broadcastData.targetAudience === 'teachers' ? 'All Faculty' : broadcastData.targetClass,
      type: broadcastData.type,
      priority: broadcastData.priority,
      pinned: broadcastData.pinned,
      senderRole: 'admin',
      senderName: user?.name || 'Principal Administration',
      senderEmail: user?.email || 'admin@school.com',
    });

    setBroadcastData({
      title: '',
      message: '',
      targetAudience: 'all',
      targetClass: 'All Classes',
      type: 'general',
      priority: 'normal',
      pinned: false,
    });

    setActiveTab('feed');
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!mailData.subject.trim() || !mailData.message.trim()) {
      showToast({ title: 'Validation Error', message: 'Subject and message are required.', type: 'error' });
      return;
    }

    sendMailMessage({
      toRole: mailData.toRole,
      toName: mailData.toName,
      toEmail: mailData.toEmail,
      category: mailData.category,
      subject: mailData.subject,
      message: mailData.message,
      senderRole: 'admin',
      senderName: user?.name || 'Principal Administration',
      senderEmail: user?.email || 'admin@school.com',
      senderClass: 'Administration Office',
    });

    setMailData({
      toRole: 'teacher',
      toName: 'Prof. Rajesh Sharma',
      toEmail: 'teacher@school.com',
      category: 'General Query',
      subject: '',
      message: '',
    });
  };

  const handleRecipientChange = (val) => {
    if (val === 'teacher-sharma') {
      setMailData((prev) => ({ ...prev, toRole: 'teacher', toName: 'Prof. Rajesh Sharma (Mathematics)', toEmail: 'teacher@school.com' }));
    } else if (val === 'teacher-verma') {
      setMailData((prev) => ({ ...prev, toRole: 'teacher', toName: 'Dr. Sunita Verma (Science)', toEmail: 'dr.verma@school.com' }));
    } else if (val === 'student-alex') {
      setMailData((prev) => ({ ...prev, toRole: 'student', toName: 'Alex Johnson (Class 10-A)', toEmail: 'student@school.com' }));
    } else if (val === 'student-riya') {
      setMailData((prev) => ({ ...prev, toRole: 'student', toName: 'Riya Sen (Class 10-B)', toEmail: 'riya.sen@school.com' }));
    }
  };

  const handleReplySubmit = (msgId) => {
    const text = replyTextMap[msgId];
    if (!text || !text.trim()) {
      showToast({ title: 'Empty Reply', message: 'Please type a reply message first.', type: 'warning' });
      return;
    }

    replyToMessage(msgId, text, 'Principal Administration');
    setReplyTextMap((prev) => ({ ...prev, [msgId]: '' }));
  };

  // Quick broadcast template filler
  const fillBroadcastTemplate = (templateType) => {
    if (templateType === 'holiday') {
      setBroadcastData({
        title: 'School Holiday Announcement for Upcoming Festival',
        message: 'The school campus will remain closed on Monday on the auspicious occasion of National Festival. Regular classes will resume on Tuesday.',
        targetAudience: 'all',
        targetClass: 'All Classes & Staff',
        type: 'events',
        priority: 'normal',
        pinned: true,
      });
    } else if (templateType === 'meeting') {
      setBroadcastData({
        title: 'Faculty Curriculum Review Meeting',
        message: 'All department heads and teaching faculty are requested to assemble in Conference Room 1 at 3:30 PM for final examination blueprint finalization.',
        targetAudience: 'teachers',
        targetClass: 'All Faculty',
        type: 'urgent',
        priority: 'high',
        pinned: false,
      });
    } else if (templateType === 'exam') {
      setBroadcastData({
        title: 'Mid-Term Exam Hall Tickets & Seating Distribution',
        message: 'All students of Class 8 to 12 can collect their Mid-Term Hall Tickets from the administrative desk starting tomorrow 9 AM.',
        targetAudience: 'students',
        targetClass: 'Classes 8 - 12',
        type: 'exam',
        priority: 'high',
        pinned: true,
      });
    }
  };

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
        return { label: 'Examination', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'homework':
        return { label: 'Homework', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'events':
        return { label: 'Event / Holiday', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'mail':
        return { label: 'Direct Mail', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
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
      {/* 🌟 Top Welcome Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Communications & Broadcasting Hub</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Announcements & Direct Messaging
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-normal">
              Send circulars to Teachers, Students, or everyone with instant top-right toasts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('compose')}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notification</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mail')}
              className="clay-btn-secondary px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Mail Box ({totalMails})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Circulars
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">{totalNotifs}</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Live in system</span>
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


      {/* TAB 1: NOTICES FEED */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
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
                <p className="text-xs text-slate-400 mt-0.5">Try clearing your search query or create a new announcement.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const badge = getCategoryBadge(notif.type, notif.priority);
                const isTargetTeachers = notif.targetAudience === 'teachers';
                const isTargetStudents = notif.targetAudience === 'students';
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
      )}

      {/* TAB 2: COMPOSE & BROADCAST */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Compose Form */}
          <div className="lg:col-span-2 clay-card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                    Broadcast Official Circular
                  </h2>
                  <p className="text-[11px] text-slate-400">Dispatch instant notifications to campus roles</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-3.5">
              {/* Target Audience Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  1. Target Audience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastData({ ...broadcastData, targetAudience: 'all', targetClass: 'All Staff & Students' })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      broadcastData.targetAudience === 'all'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Everyone (All)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastData({ ...broadcastData, targetAudience: 'teachers', targetClass: 'All Faculty' })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      broadcastData.targetAudience === 'teachers'
                        ? 'clay-btn-rose text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Teachers Only</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastData({ ...broadcastData, targetAudience: 'students', targetClass: 'All Students' })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      broadcastData.targetAudience === 'students'
                        ? 'clay-btn-sky text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Students Only</span>
                  </button>
                </div>
              </div>

              {/* Class Scope if Target is Students */}
              {broadcastData.targetAudience === 'students' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Specific Class
                  </label>
                  <select
                    value={broadcastData.targetClass}
                    onChange={(e) => setBroadcastData({ ...broadcastData, targetClass: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="All Students">All Classes (1 to 12)</option>
                    <option value="Class 10-A">Class 10-A (Alex Johnson, etc.)</option>
                    <option value="Class 10-B">Class 10-B</option>
                    <option value="Class 9-A">Class 9-A</option>
                    <option value="Class 8-A">Class 8-A</option>
                  </select>
                </div>
              )}

              {/* Category & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Notice Category
                  </label>
                  <select
                    value={broadcastData.type}
                    onChange={(e) => setBroadcastData({ ...broadcastData, type: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="general">General Campus Circular</option>
                    <option value="events">Festival / Sports / Events</option>
                    <option value="exam">Examination & Date Sheet</option>
                    <option value="urgent">Urgent Notice</option>
                    <option value="homework">Academic / Homework Note</option>
                    <option value="fees">Fee Payment Alert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={broadcastData.priority}
                    onChange={(e) => setBroadcastData({ ...broadcastData, priority: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="normal">Normal (Standard Bulletin)</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent / Critical</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Circular Headline
                </label>
                <input
                  type="text"
                  required
                  value={broadcastData.title}
                  onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
                  placeholder="e.g. Schedule for Annual Science Exhibition 2026"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Announcement Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={broadcastData.message}
                  onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                  placeholder="Type the full message content here. It will immediately show up in recipients' notification bell and toast alert..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={broadcastData.pinned}
                    onChange={(e) => setBroadcastData({ ...broadcastData, pinned: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span>Pin this notice to top of notice board</span>
                </label>

                <button
                  type="submit"
                  className="clay-btn-emerald py-2 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Pre-made Templates */}
          <div className="space-y-4">
            <div className="clay-card p-4 sm:p-5">
              <h3 className="text-xs font-semibold text-slate-800 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>Quick Broadcast Templates</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-normal">
                Click any preset below to instantly load a formatted circular:
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => fillBroadcastTemplate('holiday')}
                  className="w-full text-left clay-card p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-white">
                    <span>Holiday Circular</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                    Campus closure announcement for upcoming festival.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => fillBroadcastTemplate('meeting')}
                  className="w-full text-left clay-card p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-white">
                    <span>Staff Meeting</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                    Faculty meeting in Conference Room 1 for review.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => fillBroadcastTemplate('exam')}
                  className="w-full text-left clay-card p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-white">
                    <span>Exam Hall Tickets</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                    Mid-Term seating plans & hall ticket collection.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIRECT MAIL & STUDENT/TEACHER MESSAGES */}
      {activeTab === 'mail' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Direct Mail Composer */}
          <div className="clay-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 dark:text-white">Send Direct Mail</h2>
                <p className="text-[11px] text-slate-400">To specific Teacher or Student</p>
              </div>
            </div>

            <form onSubmit={handleSendMail} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient
                </label>
                <select
                  onChange={(e) => handleRecipientChange(e.target.value)}
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                >
                  <option value="teacher-sharma">Prof. Rajesh Sharma (Mathematics Teacher)</option>
                  <option value="teacher-verma">Dr. Sunita Verma (Science Teacher)</option>
                  <option value="student-alex">Alex Johnson (Student - Class 10-A)</option>
                  <option value="student-riya">Riya Sen (Student - Class 10-B)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={mailData.category}
                  onChange={(e) => setMailData({ ...mailData, category: e.target.value })}
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                >
                  <option value="General Query">General Administrative Query</option>
                  <option value="Leave Application">Leave Notification / Approval</option>
                  <option value="Academic Inquiry">Academic Record Verification</option>
                  <option value="Fee Notice">Fee Reminder / Receipt Confirmation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={mailData.subject}
                  onChange={(e) => setMailData({ ...mailData, subject: e.target.value })}
                  placeholder="Subject of official email..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={mailData.message}
                  onChange={(e) => setMailData({ ...mailData, message: e.target.value })}
                  placeholder="Type mail body..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="clay-btn-emerald w-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Official Mail</span>
              </button>
            </form>
          </div>

          {/* Messages & Student Inquiries Feed */}
          <div className="lg:col-span-2 space-y-3">
            <div className="clay-card p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Student & Teacher Mails Received ({messages.length})
                </h3>
                <p className="text-[11px] text-slate-400">Review leave requests, student questions, and replies</p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="clay-card p-8 text-center text-slate-400 text-xs font-semibold">
                No mail messages in inbox
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="clay-card p-4 sm:p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs clay-icon-pill shrink-0">
                        {msg.senderName ? msg.senderName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-white">
                            {msg.senderName}
                          </h4>
                          <span className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {msg.senderRole}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                          To: <span className="font-semibold text-slate-700 dark:text-slate-300">{msg.toName}</span> ({msg.toEmail})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteMessage(msg.id)}
                        className="clay-btn-secondary p-1 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white mb-1">
                      <span>Subject: {msg.subject}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {msg.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  {/* Previous Reply if any */}
                  {msg.reply && (
                    <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-start gap-2">
                      <Reply className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                          Admin / Teacher Reply:
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                          {msg.reply}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Quick Reply Form */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={replyTextMap[msg.id] || ''}
                      onChange={(e) => setReplyTextMap({ ...replyTextMap, [msg.id]: e.target.value })}
                      placeholder={`Reply to ${msg.senderName}...`}
                      className="clay-input flex-1 px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleReplySubmit(msg.id)}
                      className="clay-btn-emerald py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
