import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Bell,
  Send,
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Pin,
  Sparkles,
  Users,
  GraduationCap,
  Award,
  FileText,
  Clock,
  Reply,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Filter
} from 'lucide-react';

const TeacherNotices = ({ initialTab = 'feed' }) => {
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
    getNotificationsForUser
  } = useNotifications();

  const [activeTab, setActiveTab] = useState(initialTab); // 'feed' | 'broadcast' | 'mail'
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Form state for broadcasting notification to students
  const [broadcastData, setBroadcastData] = useState({
    title: '',
    message: '',
    targetClass: 'Class 10-A',
    type: 'homework', // 'homework', 'exam', 'general', 'urgent'
    priority: 'normal',
    pinned: false,
  });

  // Form state for sending mail to student or admin
  const [mailData, setMailData] = useState({
    toRole: 'student',
    toName: 'Alex Johnson',
    toEmail: 'student@school.com',
    category: 'Academic Feedback',
    subject: '',
    message: '',
  });

  // Quick reply map
  const [replyTextMap, setReplyTextMap] = useState({});

  const teacherNotifications = getNotificationsForUser(user);

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastData.title.trim() || !broadcastData.message.trim()) {
      showToast({ title: 'Validation Error', message: 'Title and message details are required.', type: 'error' });
      return;
    }

    sendNotification({
      title: broadcastData.title,
      message: broadcastData.message,
      targetAudience: 'students',
      targetClass: broadcastData.targetClass,
      type: broadcastData.type,
      priority: broadcastData.priority,
      pinned: broadcastData.pinned,
      senderRole: 'teacher',
      senderName: user?.name || 'Prof. Rajesh Sharma',
      senderEmail: user?.email || 'teacher@school.com',
    });

    setBroadcastData({
      title: '',
      message: '',
      targetClass: 'Class 10-A',
      type: 'homework',
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
      senderRole: 'teacher',
      senderName: user?.name || 'Prof. Rajesh Sharma',
      senderEmail: user?.email || 'teacher@school.com',
      senderClass: 'Mathematics Faculty',
    });

    setMailData({
      toRole: 'student',
      toName: 'Alex Johnson',
      toEmail: 'student@school.com',
      category: 'Academic Feedback',
      subject: '',
      message: '',
    });
  };

  const handleRecipientChange = (val) => {
    if (val === 'student-alex') {
      setMailData((prev) => ({ ...prev, toRole: 'student', toName: 'Alex Johnson (Class 10-A)', toEmail: 'student@school.com' }));
    } else if (val === 'student-riya') {
      setMailData((prev) => ({ ...prev, toRole: 'student', toName: 'Riya Sen (Class 10-B)', toEmail: 'riya.sen@school.com' }));
    } else if (val === 'admin-office') {
      setMailData((prev) => ({ ...prev, toRole: 'admin', toName: 'Principal Administration', toEmail: 'admin@school.com' }));
    }
  };

  const handleReplySubmit = (msgId) => {
    const text = replyTextMap[msgId];
    if (!text || !text.trim()) {
      showToast({ title: 'Empty Reply', message: 'Please write a reply message first.', type: 'warning' });
      return;
    }

    replyToMessage(msgId, text, user?.name || 'Prof. Rajesh Sharma');
    setReplyTextMap((prev) => ({ ...prev, [msgId]: '' }));
  };

  const fillTemplate = (templateType) => {
    if (templateType === 'homework') {
      setBroadcastData({
        title: 'Mathematics Chapter 4 Problem Set Due Thursday',
        message: 'Class 10-A: Complete Exercise 4.2 Quadratic Equations (Questions 1 to 12). Step-by-step solutions must be uploaded to student portal by Thursday 5 PM.',
        targetClass: 'Class 10-A',
        type: 'homework',
        priority: 'normal',
        pinned: true,
      });
    } else if (templateType === 'test') {
      setBroadcastData({
        title: 'Class Revision Test: Linear Equations & Polynomials',
        message: 'There will be a 30-minute revision test during Friday period 2. Please revise Chapters 2 and 3 thoroughly. Calculators are allowed.',
        targetClass: 'Class 10-A',
        type: 'exam',
        priority: 'high',
        pinned: false,
      });
    } else if (templateType === 'lab') {
      setBroadcastData({
        title: 'Bring Practical Notebooks & Geometry Instruments',
        message: 'Tomorrow period 4 will be dedicated to graphical solutions. Please ensure everyone brings graph sheets, rulers, and geometric compass.',
        targetClass: 'Class 10-A',
        type: 'general',
        priority: 'normal',
        pinned: false,
      });
    }
  };

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
      return { label: 'Urgent Circular', bg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700' };
    }
    switch (type) {
      case 'exam':
        return { label: 'Exam Notice', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'homework':
        return { label: 'Homework Alert', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'events':
        return { label: 'School Event', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      case 'mail':
        return { label: 'Direct Message', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
      default:
        return { label: 'General Notice', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    }
  };

  // Messages addressed to this teacher
  const teacherMessages = messages.filter(
    (m) => m.toRole === 'teacher' || m.toEmail === user?.email || m.senderEmail === user?.email
  );

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
              Teacher Notices & Student Mail Desk
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Send announcements to your classes, solve student doubts, and view school circulars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('broadcast')}
              className="clay-btn-sand px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-[#2b1804] dark:text-[#fff9ed]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Notice to Students</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mail')}
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#9c6f21] dark:text-[#ebd5ab]" />
              <span>Student Doubts ({teacherMessages.length})</span>
            </button>
          </div>
        </div>
      </div>


      {/* TAB 1: FEED */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
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
      )}

      {/* TAB 2: BROADCAST NOTICE TO STUDENTS */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 clay-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-[#ebd5ab]/40 dark:bg-[#856326]/60 text-[#9c6f21] dark:text-[#ebd5ab] clay-icon-pill">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                  Send Notice to Your Students
                </h2>
                <p className="text-[11px] text-slate-400">
                  Instantly sends a live notification & toaster to enrolled students
                </p>
              </div>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Target Class
                  </label>
                  <select
                    value={broadcastData.targetClass}
                    onChange={(e) => setBroadcastData({ ...broadcastData, targetClass: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Class 10-A">Class 10-A (Mathematics)</option>
                    <option value="Class 10-B">Class 10-B (Mathematics)</option>
                    <option value="Class 9-A">Class 9-A (Mathematics)</option>
                    <option value="All My Classes">All My Assigned Classes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Notice Category
                  </label>
                  <select
                    value={broadcastData.type}
                    onChange={(e) => setBroadcastData({ ...broadcastData, type: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="homework">Homework Due Alert</option>
                    <option value="exam">Class Test / Exam Notice</option>
                    <option value="general">Class Announcement</option>
                    <option value="urgent">Urgent Note</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Notice Headline
                </label>
                <input
                  type="text"
                  required
                  value={broadcastData.title}
                  onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
                  placeholder="e.g. Mathematics Chapter 4 Problem Set Due Thursday"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Notice Details for Students
                </label>
                <textarea
                  rows={4}
                  required
                  value={broadcastData.message}
                  onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                  placeholder="Type full instructions, exercises to complete, and submission deadlines..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={broadcastData.pinned}
                    onChange={(e) => setBroadcastData({ ...broadcastData, pinned: e.target.checked })}
                    className="rounded border-slate-300 text-[#9c6f21] focus:ring-[#c49646] w-3.5 h-3.5"
                  />
                  <span>Pin to student notice board</span>
                </label>

                <button
                  type="submit"
                  className="clay-btn-sand py-2 px-5 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md text-[#2b1804] dark:text-[#fff9ed]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Notice to Students</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Presets */}
          <div className="clay-card p-4 sm:p-5 h-fit">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>Quick Class Presets</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Load pre-formatted homework & exam alerts with 1 click:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillTemplate('homework')}
                className="w-full text-left clay-card p-3 hover:bg-[#ebd5ab]/20 dark:hover:bg-[#856326]/30 transition cursor-pointer border border-[#ebd5ab]/50 dark:border-[#856326]/50"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#8d6016] dark:text-[#ebd5ab]">
                  <span>Homework Due Alert</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Chapter 4 Quadratic Equations due Thursday.
                </p>
              </button>

              <button
                type="button"
                onClick={() => fillTemplate('test')}
                className="w-full text-left clay-card p-3 hover:bg-amber-50/60 dark:hover:bg-amber-950/30 transition cursor-pointer border border-amber-200/50 dark:border-amber-800/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span>Revision Class Test</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Surprise 30-min test during Friday period 2.
                </p>
              </button>

              <button
                type="button"
                onClick={() => fillTemplate('lab')}
                className="w-full text-left clay-card p-3 hover:bg-sky-50/60 dark:hover:bg-sky-950/30 transition cursor-pointer border border-sky-200/50 dark:border-sky-800/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400">
                  <span>Practical Instruments Note</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Reminder to bring graph sheets & geometry box.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT DOUBTS & MAIL CENTER */}
      {activeTab === 'mail' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Send mail to student or admin */}
          <div className="clay-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-[#ebd5ab]/40 dark:bg-[#856326]/60 text-[#9c6f21] dark:text-[#ebd5ab] clay-icon-pill">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 dark:text-white">Compose Direct Mail</h2>
                <p className="text-[11px] text-slate-400">Send message to Student or Principal</p>
              </div>
            </div>

            <form onSubmit={handleSendMail} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient
                </label>
                <select
                  onChange={(e) => handleRecipientChange(e.target.value)}
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                >
                  <option value="student-alex">Alex Johnson (Student - Class 10-A)</option>
                  <option value="student-riya">Riya Sen (Student - Class 10-B)</option>
                  <option value="admin-office">Principal Administration (Admin Office)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mail Subject
                </label>
                <input
                  type="text"
                  required
                  value={mailData.subject}
                  onChange={(e) => setMailData({ ...mailData, subject: e.target.value })}
                  placeholder="Subject of message..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={mailData.message}
                  onChange={(e) => setMailData({ ...mailData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="clay-btn-sand w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md text-[#2b1804] dark:text-[#fff9ed]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Mail Message</span>
              </button>
            </form>
          </div>

          {/* Student Doubts Feed & Quick Reply */}
          <div className="lg:col-span-2 space-y-3">
            <div className="clay-card p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Student Questions & Queries ({teacherMessages.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Reply to students; replies immediately trigger a student notification & toast!
                </p>
              </div>
            </div>

            {teacherMessages.length === 0 ? (
              <div className="clay-card p-8 text-center text-slate-400 text-xs font-semibold">
                No student inquiries right now
              </div>
            ) : (
              teacherMessages.map((msg) => (
                <div key={msg.id} className="clay-card p-4 sm:p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-center text-xs border border-slate-200 dark:border-slate-700 clay-icon-pill shrink-0">
                        {msg.senderName ? msg.senderName.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-white">
                            {msg.senderName}
                          </h4>
                          <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#ebd5ab]/40 text-[#775010] dark:bg-[#856326]/50 dark:text-[#ebd5ab] border border-[#ebd5ab] dark:border-[#856326]">
                            {msg.senderClass || msg.senderRole}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          To: <span className="font-medium text-slate-700 dark:text-slate-300">{msg.toName}</span>
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
                        className="clay-btn-secondary p-1 rounded-lg text-slate-400 hover:text-red-600 transition cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-white mb-1">
                      <span>Subject: {msg.subject}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ebd5ab]/40 text-[#775010] dark:bg-[#856326]/50 dark:text-[#ebd5ab] border border-[#ebd5ab] dark:border-[#856326]">
                        {msg.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  {/* Previous Reply */}
                  {msg.reply && (
                    <div className="p-3 rounded-xl bg-[#ebd5ab]/25 dark:bg-[#856326]/30 border border-[#ebd5ab] dark:border-[#856326]/70 flex items-start gap-2">
                      <Reply className="w-4 h-4 text-[#9c6f21] dark:text-[#ebd5ab] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-[#8d6016] dark:text-[#ebd5ab]">
                          Teacher Reply:
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                          {msg.reply}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Reply Composer */}
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
                      className="clay-btn-sand py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 text-[#2b1804] dark:text-[#fff9ed]"
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

export default TeacherNotices;
