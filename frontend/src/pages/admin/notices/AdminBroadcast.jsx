import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import {
  Send,
  Users,
  UserCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Bell
} from 'lucide-react';

const AdminBroadcast = () => {
  const { user } = useAuth();
  const { sendNotification } = useNotifications();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [broadcastData, setBroadcastData] = useState({
    targetAudience: 'all', // 'all' | 'teachers' | 'students'
    targetClass: 'All Staff & Students',
    type: 'general', // 'general' | 'urgent' | 'events' | 'exam' | 'fee'
    priority: 'normal', // 'normal' | 'urgent'
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
      targetAudience: broadcastData.targetAudience,
      targetClass: broadcastData.targetClass,
      type: broadcastData.type,
      priority: broadcastData.priority,
      pinned: broadcastData.pinned,
      senderRole: 'admin',
      senderName: user?.name || 'School Principal Administration',
      senderEmail: user?.email || 'admin@school.com',
    });

    showToast({
      title: 'Broadcast Dispatched',
      message: `Circular sent to ${broadcastData.targetAudience.toUpperCase()} recipients.`,
      type: 'success',
    });

    navigate('/admin/notices');
  };

  const fillTemplate = (templateType) => {
    if (templateType === 'holiday') {
      setBroadcastData({
        targetAudience: 'all',
        targetClass: 'All Staff & Students',
        type: 'events',
        priority: 'normal',
        title: 'Campus Closure: National Holiday Observed This Friday',
        message: 'The school campus, administrative offices, and academic activities will remain closed this Friday on account of the public holiday. Regular classes resume Monday at 08:00 AM.',
        pinned: true,
      });
    } else if (templateType === 'ptm') {
      setBroadcastData({
        targetAudience: 'students',
        targetClass: 'All Students',
        type: 'general',
        priority: 'urgent',
        title: 'Upcoming Parent-Teacher Interaction Meet (PTM)',
        message: 'Quarterly Parent-Teacher Meeting for all classes is scheduled for Saturday, 9:00 AM to 1:00 PM. Parents are requested to collect student progress reports.',
        pinned: true,
      });
    } else if (templateType === 'staff') {
      setBroadcastData({
        targetAudience: 'teachers',
        targetClass: 'All Faculty',
        type: 'general',
        priority: 'normal',
        title: 'Faculty Curriculum Review & Moderation Session',
        message: 'All Department Heads and Subject Teachers are requested to attend the term curriculum evaluation session in Conference Hall B on Wednesday at 3:30 PM.',
        pinned: false,
      });
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>Administrative Communication Console</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Broadcast Official Notice
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Dispatch official circulars, urgent notifications, and announcements across teachers and students.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/notices"
              className="clay-btn-secondary px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Notice Board</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Compose Form */}
        <div className="lg:col-span-2 clay-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Compose Circular
              </h2>
              <p className="text-[11px] text-slate-400">Dispatch live notifications and toaster alerts</p>
            </div>
          </div>

          <form onSubmit={handleBroadcastSubmit} className="space-y-3.5">
            {/* Target Audience Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Audience
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
                  <option value="Class 10-A">Class 10-A</option>
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
                  <option value="exam">Examination & Assessment</option>
                  <option value="fee">Fee Invoices & Dues Alert</option>
                  <option value="urgent">Urgent Campus Alert</option>
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
                  <option value="normal">Normal Announcement</option>
                  <option value="urgent">High Priority / Urgent</option>
                </select>
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Circular Headline
              </label>
              <input
                type="text"
                required
                value={broadcastData.title}
                onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
                placeholder="e.g. Schedule for Mid-Term Examination 2026-27"
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Notice Content & Details
              </label>
              <textarea
                rows={5}
                required
                value={broadcastData.message}
                onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                placeholder="Type circular details, guidelines, and key instructions..."
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={broadcastData.pinned}
                  onChange={(e) => setBroadcastData({ ...broadcastData, pinned: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span>Pin to top of notice board</span>
              </label>

              <button
                type="submit"
                className="clay-btn-emerald py-2 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Circular Now</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Presets */}
        <div className="clay-card p-4 sm:p-5 h-fit space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Quick Announcement Presets</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any template to auto-populate the broadcast form:
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => fillTemplate('holiday')}
              className="w-full text-left clay-card p-3 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition cursor-pointer border border-emerald-200/50 dark:border-emerald-800/50"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>Public Holiday Declaration</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Campus closure notice for students & staff.
              </p>
            </button>

            <button
              type="button"
              onClick={() => fillTemplate('ptm')}
              className="w-full text-left clay-card p-3 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition cursor-pointer border border-emerald-200/50 dark:border-emerald-800/50"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>Parent-Teacher Meeting (PTM)</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Quarterly report card discussion schedule.
              </p>
            </button>

            <button
              type="button"
              onClick={() => fillTemplate('staff')}
              className="w-full text-left clay-card p-3 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition cursor-pointer border border-emerald-200/50 dark:border-emerald-800/50"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>Staff Curriculum Review</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Faculty moderation & syllabus evaluation meeting.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBroadcast;
