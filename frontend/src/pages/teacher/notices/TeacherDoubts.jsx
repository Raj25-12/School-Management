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
  Inbox
} from 'lucide-react';

const TeacherDoubts = () => {
  const { user } = useAuth();
  const { messages, replyToMailMessage, sendMailMessage } = useNotifications();
  const { showToast } = useToast();

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Direct Teacher to student mail compose form
  const [directMail, setDirectMail] = useState({
    toRole: 'student',
    toName: 'Alex Johnson (Class 10-A)',
    toEmail: 'student@school.com',
    category: 'Feedback',
    subject: '',
    message: '',
  });

  const teacherMessages = messages.filter(
    (m) => m.toRole === 'teacher' || m.toEmail === user?.email || m.senderEmail === user?.email
  );

  const handleSendReply = (messageId) => {
    if (!replyText.trim()) return;
    replyToMailMessage(messageId, replyText);
    setReplyText('');
    setActiveReplyId(null);
    showToast({
      title: 'Reply Sent',
      message: 'Your response was delivered to the student.',
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
      senderRole: 'teacher',
      senderName: user?.name || 'Prof. Rajesh Sharma',
      senderEmail: user?.email || 'teacher@school.com',
      senderClass: 'Class 10-A Faculty',
    });

    setDirectMail({
      toRole: 'student',
      toName: 'Alex Johnson (Class 10-A)',
      toEmail: 'student@school.com',
      category: 'Feedback',
      subject: '',
      message: '',
    });

    showToast({
      title: 'Mail Dispatched',
      message: 'Direct message sent to student.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-rose p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-amber-900 dark:text-amber-200 mb-1.5 shadow-xs border border-amber-300/60 dark:border-amber-700/60">
              <Inbox className="w-3.5 h-3.5 text-amber-700" />
              <span>Student Doubts & Communication Center</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Student Doubts & Mail Desk
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Review and answer academic doubts asked by students, and send direct feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/teacher/notices/broadcast"
              className="clay-btn-rose px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm text-white"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Send Direct Mail */}
        <div className="clay-card p-5 sm:p-6 h-fit">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 clay-icon-pill">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                Direct Message Student
              </h2>
              <p className="text-[11px] text-slate-400">
                Send personal notes, feedback, or test advice
              </p>
            </div>
          </div>

          <form onSubmit={handleSendDirectMail} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student Recipient
              </label>
              <select
                value={directMail.toName}
                onChange={(e) =>
                  setDirectMail({
                    ...directMail,
                    toName: e.target.value,
                    toEmail: e.target.value.includes('Alex') ? 'student@school.com' : 'priya@school.com',
                  })
                }
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="Alex Johnson (Class 10-A)">Alex Johnson (Class 10-A, Roll: 101)</option>
                <option value="Priya Sharma (Class 10-A)">Priya Sharma (Class 10-A, Roll: 102)</option>
                <option value="Rahul Verma (Class 10-B)">Rahul Verma (Class 10-B, Roll: 103)</option>
                <option value="Principal Administration">Principal Administration (Admin)</option>
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
                <option value="Feedback">Academic Feedback</option>
                <option value="Assignment Note">Assignment Correction Note</option>
                <option value="Attendance Notice">Attendance Warning / Note</option>
                <option value="Appreciation">Student Appreciation</option>
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
                placeholder="e.g. Feedback on Chapter 3 Test"
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
                placeholder="Type your message..."
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="clay-btn-rose w-full py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md text-white"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Direct Message</span>
            </button>
          </form>
        </div>

        {/* Student Doubts List & Instant Reply Threads */}
        <div className="lg:col-span-2 space-y-3">
          <div className="clay-card p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Student Doubts & Inquiries ({teacherMessages.length})
              </h3>
              <p className="text-[11px] text-slate-400">
                Click "Reply" to solve student doubt or leave notes
              </p>
            </div>
          </div>

          {teacherMessages.length === 0 ? (
            <div className="clay-card p-10 text-center text-slate-400 text-xs">
              <Mail className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No student doubts in inbox</p>
              <p className="text-[11px] text-slate-400 mt-0.5">When students ask questions or send leave notes, they will appear here.</p>
            </div>
          ) : (
            teacherMessages.map((msg) => (
              <div key={msg.id} className="clay-card p-4 sm:p-5 space-y-3 transition-transform duration-150 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        From: {msg.senderName} ({msg.senderClass || 'Class 10-A'})
                      </span>
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          msg.reply
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                        }`}
                      >
                        {msg.reply ? 'Resolved / Replied' : 'Pending Action'}
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
                          Your Reply:
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
                          placeholder="Type explanation, solution steps, or leave approval..."
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
                            className="clay-btn-rose px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm text-white"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Reply to Student</span>
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
                        className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-rose-600 dark:text-rose-400"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Reply / Solve Doubt</span>
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

export default TeacherDoubts;
