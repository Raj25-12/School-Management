import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import {
  Mail,
  Send,
  Reply,
  CheckCircle2,
  Clock,
  Sparkles,
  Inbox,
  User,
  GraduationCap,
  UserCheck
} from 'lucide-react';

const AdminMailbox = () => {
  const { user } = useAuth();
  const { messages, replyToMailMessage, sendMailMessage } = useNotifications();
  const { showToast } = useToast();

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Compose Direct Mail state
  const [directMail, setDirectMail] = useState({
    toRole: 'teacher',
    toName: 'Prof. Rajesh Sharma (Faculty)',
    toEmail: 'teacher@school.com',
    category: 'Administrative Note',
    subject: '',
    message: '',
  });

  const handleSendReply = (messageId) => {
    if (!replyText.trim()) return;
    replyToMailMessage(messageId, replyText);
    setReplyText('');
    setActiveReplyId(null);
    showToast({
      title: 'Reply Sent Successfully',
      message: 'Your official response was delivered.',
      type: 'success',
    });
  };

  const handleSendDirectMail = (e) => {
    e.preventDefault();
    if (!directMail.subject.trim() || !directMail.message.trim()) return;

    sendMailMessage({
      toRole: directMail.toRole,
      toName: directMail.toName,
      toEmail: directMail.toEmail,
      category: directMail.category,
      subject: directMail.subject,
      message: directMail.message,
      senderRole: 'admin',
      senderName: user?.name || 'Principal Administration',
      senderEmail: user?.email || 'admin@school.com',
      senderClass: 'School Administration Office',
    });

    setDirectMail({
      toRole: 'teacher',
      toName: 'Prof. Rajesh Sharma (Faculty)',
      toEmail: 'teacher@school.com',
      category: 'Administrative Note',
      subject: '',
      message: '',
    });

    showToast({
      title: 'Mail Dispatched',
      message: 'Official message sent to recipient.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Inbox className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Mailbox & Inquiries Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              School Mailbox & Grievance Desk
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Manage leave applications, faculty inquiries, and send direct administrative messages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/notices/broadcast"
              className="clay-btn-emerald px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-white"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Circular</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Send Direct Message Form */}
        <div className="clay-card p-5 sm:p-6 h-fit">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                Dispatch Direct Mail
              </h2>
              <p className="text-[11px] text-slate-400">
                Send personal communication to any teacher or student
              </p>
            </div>
          </div>

          <form onSubmit={handleSendDirectMail} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Recipient
              </label>
              <select
                value={directMail.toName}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.includes('Sharma')) {
                    setDirectMail({ ...directMail, toRole: 'teacher', toName: val, toEmail: 'teacher@school.com' });
                  } else if (val.includes('Verma')) {
                    setDirectMail({ ...directMail, toRole: 'teacher', toName: val, toEmail: 'dr.verma@school.com' });
                  } else {
                    setDirectMail({ ...directMail, toRole: 'student', toName: val, toEmail: 'student@school.com' });
                  }
                }}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="Prof. Rajesh Sharma (Faculty)">Prof. Rajesh Sharma (Teacher / Math Dept)</option>
                <option value="Dr. Sunita Verma (Faculty)">Dr. Sunita Verma (Teacher / Science Dept)</option>
                <option value="Alex Johnson (Student Class 10-A)">Alex Johnson (Student, Class 10-A)</option>
                <option value="Priya Sharma (Student Class 10-A)">Priya Sharma (Student, Class 10-A)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={directMail.category}
                onChange={(e) => setDirectMail({ ...directMail, category: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="Administrative Note">Administrative Note</option>
                <option value="Leave Approval">Leave Approval / Status</option>
                <option value="Fee Notice">Fee Reminder Notice</option>
                <option value="Appreciation">Official Commendation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={directMail.subject}
                onChange={(e) => setDirectMail({ ...directMail, subject: e.target.value })}
                placeholder="e.g. Schedule for Academic Audit"
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Message Body
              </label>
              <textarea
                rows={3}
                required
                value={directMail.message}
                onChange={(e) => setDirectMail({ ...directMail, message: e.target.value })}
                placeholder="Type official communication..."
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="clay-btn-emerald w-full py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md text-white"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Inquiries & Threads List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="clay-card p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                All Campus Mail Records ({messages.length})
              </h3>
              <p className="text-[11px] text-slate-400">
                Review student inquiries, teacher notes, and dispatch official replies
              </p>
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="clay-card p-10 text-center text-slate-400 text-xs">
              <Mail className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">Mailbox is currently empty</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Direct messages between staff and students will appear here.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="clay-card p-4 sm:p-5 space-y-3 transition-transform duration-150 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        From: {msg.senderName} ({msg.senderRole?.toUpperCase()})
                      </span>
                      <span className="text-[10px] text-slate-500">➔ To: {msg.toName}</span>
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          msg.reply
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        {msg.reply ? 'Resolved / Replied' : 'Open Inquiry'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Category: <span className="font-semibold text-slate-700 dark:text-slate-300">{msg.category}</span>
                    </p>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-800 dark:text-white mb-1">
                    Subject: {msg.subject}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {msg.message}
                  </p>
                </div>

                {/* Reply display or form */}
                {msg.reply ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                          Official Reply Recorded:
                        </span>
                        {msg.repliedAt && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
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
                  <div>
                    {activeReplyId === msg.id ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type official administrative reply or leave approval..."
                          className="clay-input w-full p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveReplyId(null);
                              setReplyText('');
                            }}
                            className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReply(msg.id)}
                            className="clay-btn-emerald px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm text-white"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Dispatch Reply</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReplyId(msg.id);
                          setReplyText('');
                        }}
                        className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-emerald-700 dark:text-emerald-400"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Send Official Reply</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMailbox;
