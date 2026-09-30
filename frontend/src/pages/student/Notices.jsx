import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Bell,
  Mail,
  Send,
  Search,
  Pin,
  Clock,
  Reply,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const StudentNotices = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const {
    messages,
    sendMailMessage,
    getNotificationsForUser
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('board'); // 'board' | 'compose' | 'inbox'
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for student sending mail/doubt to teacher or admin
  const [mailData, setMailData] = useState({
    toRole: 'teacher',
    toName: 'Prof. Rajesh Sharma (Mathematics)',
    toEmail: 'teacher@school.com',
    category: 'Doubt', // 'Doubt' | 'Leave Application' | 'Assignment Help' | 'Exam Inquiry'
    subject: '',
    message: '',
  });

  const studentNotifications = getNotificationsForUser(user);

  // Student's sent messages and received replies
  const studentMessages = messages.filter(
    (m) => m.senderEmail === (user?.email || 'student@school.com') || m.toEmail === (user?.email || 'student@school.com')
  );

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!mailData.subject.trim() || !mailData.message.trim()) {
      showToast({ title: 'Validation Error', message: 'Subject and message details are required.', type: 'error' });
      return;
    }

    sendMailMessage({
      toRole: mailData.toRole,
      toName: mailData.toName,
      toEmail: mailData.toEmail,
      category: mailData.category,
      subject: mailData.subject,
      message: mailData.message,
      senderRole: 'student',
      senderName: user?.name || 'Alex Johnson',
      senderEmail: user?.email || 'student@school.com',
      senderClass: 'Class 10-A',
    });

    setMailData({
      toRole: 'teacher',
      toName: 'Prof. Rajesh Sharma (Mathematics)',
      toEmail: 'teacher@school.com',
      category: 'Doubt',
      subject: '',
      message: '',
    });

    setActiveTab('inbox');
  };

  const handleRecipientSelect = (val) => {
    if (val === 'math-sharma') {
      setMailData((prev) => ({ ...prev, toRole: 'teacher', toName: 'Prof. Rajesh Sharma (Mathematics)', toEmail: 'teacher@school.com' }));
    } else if (val === 'phys-verma') {
      setMailData((prev) => ({ ...prev, toRole: 'teacher', toName: 'Dr. Sunita Verma (Science)', toEmail: 'dr.verma@school.com' }));
    } else if (val === 'cs-alex') {
      setMailData((prev) => ({ ...prev, toRole: 'teacher', toName: 'Mr. Alex (Computer Science)', toEmail: 'alex.cs@school.com' }));
    } else if (val === 'admin-office') {
      setMailData((prev) => ({ ...prev, toRole: 'admin', toName: 'Principal Administration', toEmail: 'admin@school.com' }));
    }
  };

  const fillTemplate = (templateType) => {
    if (templateType === 'math-doubt') {
      setMailData({
        toRole: 'teacher',
        toName: 'Prof. Rajesh Sharma (Mathematics)',
        toEmail: 'teacher@school.com',
        category: 'Doubt',
        subject: 'Doubt regarding Exercise 4.2 Quadratic Equations Question #7',
        message: 'Respected Prof. Sharma, while solving Question 7 using the quadratic formula, the discriminant value is negative (-16). How should we state the solution according to board format? Thank you, Alex.',
      });
    } else if (templateType === 'leave') {
      setMailData({
        toRole: 'admin',
        toName: 'Principal Administration',
        toEmail: 'admin@school.com',
        category: 'Leave Application',
        subject: 'Application for 2-Day Medical Leave (Viral Recovery)',
        message: 'Respected Admin & Class Teacher, I am suffering from viral fever and doctor has advised 2 days of bed rest. Kindly grant me leave for Thursday & Friday. Medical certificate will be submitted upon resuming classes.',
      });
    } else if (templateType === 'lab-help') {
      setMailData({
        toRole: 'teacher',
        toName: 'Dr. Sunita Verma (Science)',
        toEmail: 'dr.verma@school.com',
        category: 'Assignment Help',
        subject: 'Clarification regarding Optics Practical Lab Manual format',
        message: 'Respected Dr. Verma, should we draw ray diagrams on the blank graph sheet or the ruled page of the practical notebook? Thank you.',
      });
    }
  };

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
              <span>Student Circulars & Communication</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              School Circulars & Mail Teacher
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Stay updated on exam schedules and homework, or mail your subject teachers directly with doubts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('compose')}
              className="clay-btn-sky px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Mail Teacher</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>My Sent Mails & Replies ({studentMessages.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('board')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'board'
              ? 'clay-btn-sky text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-sky-600'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notice Board ({filteredNotifications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('compose')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'compose'
              ? 'clay-btn-sky text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-sky-600'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Mail / Ask Doubt to Teacher</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inbox')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'inbox'
              ? 'clay-btn-sky text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-sky-600'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>My Inquiries & Replies ({studentMessages.length})</span>
        </button>
      </div>

      {/* TAB 1: NOTICE BOARD */}
      {activeTab === 'board' && (
        <div className="space-y-4">
          <div className="clay-card p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Notices' },
                { id: 'exam', label: 'Exams & Dates' },
                { id: 'homework', label: 'Homework Due' },
                { id: 'events', label: 'Events & Holidays' },
                { id: 'urgent', label: 'Urgent' },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredNotifications.length === 0 ? (
              <div className="col-span-2 clay-card p-8 text-center text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No notices for you right now</p>
                <p className="text-xs text-slate-400 mt-0.5">You're all caught up with your school announcements.</p>
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
      )}

      {/* TAB 2: MAIL / ASK DOUBT TO TEACHER */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 clay-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 clay-icon-pill">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">
                  Mail / Message Your Subject Teacher
                </h2>
                <p className="text-[11px] text-slate-400 font-normal">
                  Sends direct mail and notification alert to the teacher
                </p>
              </div>
            </div>

            <form onSubmit={handleSendMail} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Teacher / Recipient
                  </label>
                  <select
                    onChange={(e) => handleRecipientSelect(e.target.value)}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="math-sharma">Prof. Rajesh Sharma (Mathematics)</option>
                    <option value="phys-verma">Dr. Sunita Verma (Science / Physics)</option>
                    <option value="cs-alex">Mr. Alex (Computer Science)</option>
                    <option value="admin-office">Principal Administration (Admin Office)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Query Category
                  </label>
                  <select
                    value={mailData.category}
                    onChange={(e) => setMailData({ ...mailData, category: e.target.value })}
                    className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
                  >
                    <option value="Doubt">Academic Doubt / Question</option>
                    <option value="Leave Application">Leave Application (Sick / Personal)</option>
                    <option value="Assignment Help">Assignment Clarification</option>
                    <option value="Exam Inquiry">Exam / Marks Verification</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={mailData.subject}
                  onChange={(e) => setMailData({ ...mailData, subject: e.target.value })}
                  placeholder="e.g. Doubt regarding Exercise 4.2 Quadratic Equations Question #7"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={mailData.message}
                  onChange={(e) => setMailData({ ...mailData, message: e.target.value })}
                  placeholder="Explain your doubt, question, or leave reason clearly..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="clay-btn-sky w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Mail to Teacher</span>
              </button>
            </form>
          </div>

          {/* Quick Presets */}
          <div className="clay-card p-4 sm:p-5 h-fit">
            <h3 className="text-xs font-semibold text-slate-800 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>Quick Question Presets</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-normal">
              Load ready-to-send draft messages with 1 click:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillTemplate('math-doubt')}
                className="w-full text-left clay-card p-3 hover:bg-sky-50/60 dark:hover:bg-sky-950/30 transition cursor-pointer border border-sky-200/50 dark:border-sky-800/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400">
                  <span>Math Doubt (Ex 4.2 Q7)</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                  Ask Prof. Sharma regarding negative discriminant step.
                </p>
              </button>

              <button
                type="button"
                onClick={() => fillTemplate('leave')}
                className="w-full text-left clay-card p-3 hover:bg-sky-50/60 dark:hover:bg-sky-950/30 transition cursor-pointer border border-sky-200/50 dark:border-sky-800/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400">
                  <span>2-Day Sick Leave Note</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                  Apply for medical recovery leave to Principal/Teacher.
                </p>
              </button>

              <button
                type="button"
                onClick={() => fillTemplate('lab-help')}
                className="w-full text-left clay-card p-3 hover:bg-sky-50/60 dark:hover:bg-sky-950/30 transition cursor-pointer border border-sky-200/50 dark:border-sky-800/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400">
                  <span>Science Lab Record Help</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                  Ask Dr. Verma regarding practical record format.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INBOX & REPLIES */}
      {activeTab === 'inbox' && (
        <div className="space-y-3">
          <div className="clay-card p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                My Inquiries & Teacher Replies ({studentMessages.length})
              </h3>
              <p className="text-[11px] text-slate-400 font-normal">
                Track status of your doubts and read teacher responses
              </p>
            </div>
          </div>

          {studentMessages.length === 0 ? (
            <div className="clay-card p-8 text-center text-slate-400 text-xs font-semibold">
              You haven't sent any mails yet. Use the "Mail / Ask Doubt" tab to get started!
            </div>
          ) : (
            studentMessages.map((msg) => (
              <div key={msg.id} className="clay-card p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-white">
                        To: {msg.toName}
                      </h4>
                      <span
                        className={`text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                          msg.reply
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {msg.reply ? 'Replied by Teacher' : 'Awaiting Reply'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Category: <span className="font-semibold text-slate-700 dark:text-slate-300">{msg.category}</span>
                    </p>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>

                {/* Sent message */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-800 dark:text-white mb-1">
                    Subject: {msg.subject}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {msg.message}
                  </p>
                </div>

                {/* Teacher Reply */}
                {msg.reply ? (
                  <div className="p-3.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/60 flex items-start gap-2.5">
                    <Reply className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-sky-800 dark:text-sky-300">
                          Teacher's Answer / Response:
                        </span>
                        {msg.repliedAt && (
                          <span className="text-[10px] text-sky-600 dark:text-sky-400">
                            {new Date(msg.repliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-normal">
                        {msg.reply}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-normal">Your teacher has received this notification and will reply shortly.</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentNotices;
