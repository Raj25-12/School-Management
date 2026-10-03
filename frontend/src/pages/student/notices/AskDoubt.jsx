import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import {
  Mail,
  Send,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';

const AskDoubt = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { sendMailMessage } = useNotifications();

  // Form state for student sending mail/doubt to teacher or admin
  const [mailData, setMailData] = useState({
    toRole: 'teacher',
    toName: 'Prof. Rajesh Sharma (Mathematics)',
    toEmail: 'teacher@school.com',
    category: 'Doubt', // 'Doubt' | 'Leave Application' | 'Assignment Help' | 'Exam Inquiry'
    subject: '',
    message: '',
  });

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

    showToast({
      title: 'Message Sent Successfully',
      message: `Your query has been sent to ${mailData.toName}.`,
      type: 'success',
    });

    navigate('/student/notices/inquiries');
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

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="clay-sky p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-sky-800 dark:text-sky-300 mb-1.5 shadow-xs border border-sky-200/60 dark:border-sky-800/60">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Ask Doubt & Faculty Mail</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Mail / Ask Doubt to Teacher
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Send questions, doubt clarifications, or leave applications directly to your teachers.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Compose Form */}
        <div className="lg:col-span-2 clay-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 clay-icon-pill">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">
                Compose Message to Faculty
              </h2>
              <p className="text-[11px] text-slate-400 font-normal">
                Dispatches instant direct alert to the recipient teacher's portal
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
                rows={5}
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
        <div className="clay-card p-4 sm:p-5 h-fit space-y-3">
          <h3 className="text-xs font-semibold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Quick Question Presets</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
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
    </div>
  );
};

export default AskDoubt;
