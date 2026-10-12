import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowUp, Heart, Shield } from 'lucide-react';

const LandingFooter = ({ scrollToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer group mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <GraduationCap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Edu<span className="text-teal-400">Manage</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              Complete, modern school management software designed for K-12 schools, colleges, and educational academies. Empowering teachers, students, and administrators worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>FERPA Compliant • 256-bit Encrypted Architecture</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('events')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Events & Activities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('school-life')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  School Life
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Role Portals (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Direct Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Admin Portal Login</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-950 text-teal-400 border border-teal-800">Direct</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Teacher Portal Login
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Student Portal Login
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Register New Account
                </Link>
              </li>
              <li>
                <Link
                  to="/forgot-password"
                  className="text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Forgot Password Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Security (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Security Standards
                </span>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EduManage Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
