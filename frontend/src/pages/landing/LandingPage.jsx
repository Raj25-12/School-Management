import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import LandingNavbar from './components/LandingNavbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SchoolLifeSection from './components/SchoolLifeSection';
import ActivitiesEventsSection from './components/ActivitiesEventsSection';
import AboutSection from './components/AboutSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ContactSection from './components/ContactSection';
import LandingFooter from './components/LandingFooter';

const DemoModal = React.lazy(() => import('./components/DemoModal'));

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const location = useLocation();

  // Update Page Title and Meta for SEO
  useEffect(() => {
    document.title = 'EduManage International School | Excellence in Education';
  }, []);

  // Smooth scroll handler
  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navOffset = 80; // approximate navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Sync route path (e.g. /about, /features, /school-life, /events, /contact) with section scroll
  useEffect(() => {
    const path = location.pathname.replace('/', '').toLowerCase();
    if (path === 'about') {
      setTimeout(() => scrollToSection('about'), 100);
    } else if (path === 'features') {
      setTimeout(() => scrollToSection('features'), 100);
    } else if (path === 'school-life' || path === 'routine') {
      setTimeout(() => scrollToSection('school-life'), 100);
    } else if (path === 'events') {
      setTimeout(() => scrollToSection('events'), 100);
    } else if (path === 'contact') {
      setTimeout(() => scrollToSection('contact'), 100);
    } else if (path === '' || path === 'home') {
      setActiveSection('home');
    }
  }, [location.pathname, scrollToSection]);

  // Observer to track visible section while scrolling
  useEffect(() => {
    const sectionIds = ['home', 'features', 'school-life', 'events', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <LandingNavbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Split Hero Section */}
        <HeroSection />

        {/* School Facilities & Features Section */}
        <FeaturesSection />

        {/* School Life: Daily Routine, Methodology & Admissions */}
        <SchoolLifeSection />

        {/* Activities, Events & School Celebrations Section */}
        <ActivitiesEventsSection />

        {/* About School Section */}
        <AboutSection scrollToSection={scrollToSection} />

        {/* Why Parents Choose Our School */}
        <WhyChooseUsSection />

        {/* Contact & Campus Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <LandingFooter scrollToSection={scrollToSection} />

      {/* Interactive Demo Preview Modal (Loaded on Demand) */}
      {isDemoOpen && (
        <React.Suspense fallback={null}>
          <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
        </React.Suspense>
      )}
    </div>
  );
};

export default LandingPage;
