import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { RGBOrbitLink } from '../../../components/common/RGBOrbitButton';
import {
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Search,
  User,
  Sparkles
} from 'lucide-react';

const LandingNavbar = ({ activeSection, scrollToSection, onOpenDemo }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Facilities', id: 'features' },
    { name: 'School Life', id: 'school-life' },
    { name: 'Events & Activities', id: 'events' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800 py-3.5'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: EduManage Logo with RGB Iridescent Effect */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl rgb-logo-badge flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 dark:from-slate-950 dark:to-slate-900 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-teal-300 stroke-[2.4]" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
              Edu<span className="rgb-text ml-0.5">Manage</span>
            </span>
          </div>

          {/* Center: Navigation Links with Active Underline Indicator */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 text-sm font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-teal-500 animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Theme Toggle, and Login Button with Rotating Rainbow Aura on Hover */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Login Button with Rotating Rainbow Aura on hover (Image 2) */}
            <RGBOrbitLink
              to="/login"
              rounded="rounded-2xl"
              innerClassName="clay-btn-emerald btn-shine inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all group cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </RGBOrbitLink>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-slate-900/98 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1.5 mb-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 text-base font-semibold rounded-xl cursor-pointer transition-colors ${
                  activeSection === link.id
                    ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="clay-btn-secondary w-full py-2.5 px-4 text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>Interactive Demo</span>
            </button>
            <RGBOrbitLink
              to="/login"
              rounded="rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
              innerClassName="clay-btn-emerald py-2.5 text-center text-sm font-bold text-white flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Login to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </RGBOrbitLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
