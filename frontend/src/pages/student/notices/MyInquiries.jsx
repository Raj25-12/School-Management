import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import {
  Mail,
  Send,
  Clock,
  Reply,
  Inbox,
  Sparkles
} from 'lucide-react';

const MyInquiries = () => {
  const { user } = useAuth();
  const { messages } = useNotifications();

  // Student's sent messages and received replies
  const studentMessages = messages.filter(
    (m) => m.senderEmail === (user?.email || 'student@school.com') || m.toEmail === (user?.email || 'student@school.com')
  );

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-sky p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-sky-800 dark:text-sky-300 mb-1.5 shadow-xs border border-sky-200/60 dark:border-sky-800/60">
              <Inbox className="w-3.5 h-3.5 text-sky-600" />
              <span>Student Inquiries Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              My Sent Inquiries & Teacher Replies
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Track your sent questions and read answers given by your teachers.
            </p>
          </div>

          <Link
            to="/student/notices/ask-doubt"
            className="clay-btn-sky px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>+ Ask New Doubt / Mail</span>
          </Link>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {studentMessages.length === 0 ? (
          <div className="clay-card p-10 text-center text-slate-400">
            <Mail className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No sent messages yet</p>
            <p className="text-xs text-slate-400 mt-0.5 mb-4">You have not sent any doubts or leave requests yet.</p>
            <Link
              to="/student/notices/ask-doubt"
              className="clay-btn-sky px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask Doubt to Teacher</span>
            </Link>
          </div>
        ) : (
          studentMessages.map((msg) => (
            <div key={msg.id} className="clay-card p-4 sm:p-5 space-y-3 transition-transform duration-150 hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-white">
                      To: {msg.toName}
                    </h4>
                    <span
                      className={`text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                        msg.reply
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {msg.reply ? 'Replied by Teacher' : 'Awaiting Reply'}
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

              {/* Sent message content */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
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
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-normal">Your teacher has received this inquiry and will reply shortly.</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInquiries;
