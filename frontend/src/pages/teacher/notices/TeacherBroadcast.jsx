import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import {
  Send,
  Sparkles,
  ArrowRight,
  Bell,
  MessageSquare
} from 'lucide-react';

const TeacherBroadcast = () => {
  const { user } = useAuth();
  const { sendNotification } = useNotifications();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [broadcastData, setBroadcastData] = useState({
    targetClass: 'Class 10-A',
    type: 'homework', // 'homework' | 'exam' | 'general' | 'urgent'
    title: '',
    message: '',
    pinned: false,
  });

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastData.title.trim() || !broadcastData.message.trim()) {
      showToast({ title: 'Validation Error', message: 'Notice headline and details are required.', type: 'error' });
      return;
    }

    sendNotification({
      title: broadcastData.title,
      message: broadcastData.message,
      targetAudience: 'students',
      targetClass: broadcastData.targetClass,
      type: broadcastData.type,
      priority: broadcastData.type === 'urgent' ? 'urgent' : 'normal',
      pinned: broadcastData.pinned,
      senderRole: 'teacher',
      senderName: user?.name || 'Prof. Rajesh Sharma',
      senderEmail: user?.email || 'teacher@school.com',
    });

    showToast({
      title: 'Notice Broadcasted',
      message: `Notice sent to ${broadcastData.targetClass} students.`,
      type: 'success',
    });

    navigate('/teacher/notices');
  };

  const fillTemplate = (templateType) => {
    if (templateType === 'homework') {
      setBroadcastData({
        targetClass: 'Class 10-A',
        type: 'homework',
        title: 'Mathematics Chapter 4 Quadratic Equations Problem Set Due',
        message: 'Dear students, please solve Exercise 4.2 Questions 1 through 10 in your class notebook. Submission deadline is Thursday 8:00 AM.',
        pinned: true,
      });
    } else if (templateType === 'test') {
      setBroadcastData({
        targetClass: 'Class 10-A',
        type: 'exam',
        title: 'Class Revision Test: Coordinate Geometry on Friday',
        message: 'There will be a 30-minute revision test on Friday during Period 2 covering Distance Formula and Section Formula. Bring graph sheets.',
        pinned: true,
      });
    } else if (templateType === 'lab') {
      setBroadcastData({
        targetClass: 'Class 10-B',
        type: 'general',
        title: 'Bring Geometry & Graph Notebook for Lab Session',
        message: 'All students of Class 10-B must carry their practical manuals and complete geometric drawing sets for tomorrow\'s lab session.',
        pinned: false,
      });
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-rose p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-amber-900 dark:text-amber-200 mb-1.5 shadow-xs border border-amber-300/60 dark:border-amber-700/60">
              <Send className="w-3.5 h-3.5 text-amber-700" />
              <span>Faculty Broadcast Desk</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Broadcast Notice to Students
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Send announcements, homework alerts, and test notifications directly to your enrolled classes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/teacher/notices"
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>View Notice Board</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Broadcast Form */}
        <div className="lg:col-span-2 clay-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 clay-icon-pill">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Create Class Notice
              </h2>
              <p className="text-[11px] text-slate-400">
                Instantly dispatches a live notification alert to student devices
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
                rows={5}
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
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
                />
                <span>Pin to student notice board</span>
              </label>

              <button
                type="submit"
                className="clay-btn-rose py-2 px-5 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md text-white"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Notice to Students</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Presets */}
        <div className="clay-card p-4 sm:p-5 h-fit space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Quick Class Presets</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Load pre-formatted homework & exam alerts with 1 click:
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => fillTemplate('homework')}
              className="w-full text-left clay-card p-3 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 transition cursor-pointer border border-rose-200/50 dark:border-rose-800/50"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-400">
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
    </div>
  );
};

export default TeacherBroadcast;
