import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  GraduationCap,
  User,
  MessageSquare
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const ContactSection = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'demo_notice'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters)';
    }

    const phoneClean = formData.mobileNumber.replace(/[\s\-()]/g, '');
    const phoneRegex = /^[+]?[0-9]{8,15}$/;
    if (!formData.mobileNumber.trim() || !phoneRegex.test(phoneClean)) {
      newErrors.mobileNumber = 'Please provide a valid mobile number (e.g. 9876543210)';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please provide a message (minimum 5 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast({
        title: 'Validation Error',
        message: 'Please fill in Name, Mobile Number, and Message correctly.',
        type: 'rose',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus('demo_notice');
      showToast({
        title: 'Inquiry Validated',
        message: 'Your inquiry has been recorded successfully.',
        type: 'emerald',
      });
    }, 500);
  };

  const handleReset = () => {
    setFormData({ name: '', mobileNumber: '', message: '' });
    setSubmissionStatus(null);
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-slate-50/70 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="clay-emerald inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Connect with EduManage Team
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Have questions about system setup, institutional customization, or onboarding? Send an inquiry or reach us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Campus Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="clay-card rounded-2xl p-6 sm:p-7">
              {/* Brand Logo at top of Office Info */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                  <GraduationCap className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    Edu<span className="text-teal-600 dark:text-teal-400">Manage</span> Campus Office
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official Admissions & Support Center
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                      Campus Headquarters
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      100 Knowledge Way, Suite 400
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Metro Tech Park, Boston MA 02115
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                      Direct Email
                    </p>
                    <a
                      href="mailto:support@edumanage.io"
                      className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      support@edumanage.io
                    </a>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Inquiries: admissions@edumanage.io
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                      Support Helpline
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      +1 (800) 555-EDUSCHOOL
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Mon-Fri, 8:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                      Average Response Time
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Under 2 Hours
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      For registered institutional accounts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Logo at the Top */}
          <div className="lg:col-span-7 clay-card rounded-2xl p-6 sm:p-8">
            {/* Logo at the top of the form */}
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-200/70 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/25">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  Edu<span className="text-teal-600 dark:text-teal-400">Manage</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Send an Inquiry • We will contact your mobile number
                </p>
              </div>
            </div>

            {submissionStatus === 'demo_notice' ? (
              <div className="py-8 px-4 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  Inquiry Validated Successfully!
                </h3>
                <div className="max-w-md clay-amber rounded-xl p-4 text-left my-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed">
                    <strong>Demo Notice:</strong> No backend mailing endpoint is currently connected to this public form. Your submission of <span className="font-semibold">{formData.name}</span> (Mobile: <span className="font-semibold">{formData.mobileNumber}</span>) has been validated locally. In production, this dispatches directly to the institutional inbox.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="clay-btn-secondary mt-2 px-6 py-2.5 text-sm font-bold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Name Field */}
                <div className="mb-4">
                  <label
                    htmlFor="contact-name"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Your Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`clay-input w-full px-3.5 py-2.5 text-sm ${
                      errors.name ? 'border-rose-400' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Mobile Number Field */}
                <div className="mb-4">
                  <label
                    htmlFor="contact-mobile"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Mobile Number</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-mobile"
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210 or 9876543210"
                    className={`clay-input w-full px-3.5 py-2.5 text-sm ${
                      errors.mobileNumber ? 'border-rose-400' : ''
                    }`}
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* 3. Message Field */}
                <div className="mb-6">
                  <label
                    htmlFor="contact-message"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Message</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your inquiry or question here..."
                    className={`clay-input w-full px-3.5 py-2.5 text-sm resize-none ${
                      errors.message ? 'border-rose-400' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="clay-btn-emerald btn-shine w-full sm:w-auto px-8 py-3.5 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
