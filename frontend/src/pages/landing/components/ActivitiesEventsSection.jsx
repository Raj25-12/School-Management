import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Trophy,
  Sparkles,
  Music,
  Cpu,
  Award,
  Users,
  Clock,
  ArrowRight,
  Flag,
  Palette,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Smile,
  Flame
} from 'lucide-react';
import sportsDayImg from '../../../assets/event_sports_day.webp';
import culturalFestImg from '../../../assets/event_cultural_fest.webp';
import scienceFairImg from '../../../assets/event_science_fair.webp';

const eventCategories = ['All Events', 'Sports', 'Cultural', 'Science & Tech', 'Celebrations', 'Clubs'];

const eventCards = [
  {
    id: 1,
    title: 'Annual Sports Meet & Athletics Championship',
    category: 'Sports',
    date: '18 NOV',
    time: '8:30 AM - 4:00 PM',
    venue: 'Main Athletic Stadium',
    image: sportsDayImg,
    badge: 'Flagship Event',
    badgeClass: 'clay-emerald text-emerald-800 dark:text-emerald-300',
    description: 'Inter-house 100m sprint, 4x100m relay, high jump, football finals, and presentation of the coveted Annual House Championship Trophy.',
  },
  {
    id: 2,
    title: 'Grand Annual Day & Cultural Gala Night',
    category: 'Cultural',
    date: '12 DEC',
    time: '5:00 PM - 9:30 PM',
    venue: 'Performing Arts Auditorium',
    image: culturalFestImg,
    badge: 'Celebration',
    badgeClass: 'clay-purple text-purple-800 dark:text-purple-300',
    description: 'Theatrical drama productions, live student symphony orchestra, classical & contemporary dance performances, and student merit felicitation.',
  },
  {
    id: 3,
    title: 'Inter-School Science Fair & Robo-Tech Expo',
    category: 'Science & Tech',
    date: '08 JAN',
    time: '9:30 AM - 3:30 PM',
    venue: 'STEM & Innovation Hub',
    image: scienceFairImg,
    badge: 'Innovation Expo',
    badgeClass: 'clay-sky text-sky-800 dark:text-sky-300',
    description: 'Student exhibits featuring autonomous line-follower robots, clean solar energy prototypes, live chemistry demonstrations, and AI coding challenges.',
  },
];

const schoolCelebrations = [
  {
    title: 'Investiture Ceremony',
    tag: 'Leadership',
    date: 'July Every Year',
    desc: 'Formal swearing-in of Head Boy, Head Girl, Sports Captains, and House Prefects with sash & badge investiture.',
    icon: Flag,
    clay: 'clay-amber',
    iconColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    title: 'National Celebrations (Independence & Republic Day)',
    tag: 'National Pride',
    date: '15 Aug & 26 Jan',
    desc: 'Tri-color flag unfurling, inter-house march-past, patriotic orchestral performances, and freedom homage.',
    icon: Award,
    clay: 'clay-emerald',
    iconColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    title: "Teachers' Day & Children's Day Carnivals",
    tag: 'Festivity',
    date: '05 Sept & 14 Nov',
    desc: 'Fun role-reversals, food stalls, student talent shows, friendly teacher-student sports matches, and musical games.',
    icon: Smile,
    clay: 'clay-purple',
    iconColor: 'text-purple-700 dark:text-purple-300',
  },
  {
    title: 'Graduation Day & Valedictory Gala',
    tag: 'Milestone',
    date: 'March Every Year',
    desc: 'Bidding farewell to senior graduating batches with commemorative yearbooks, alumni inductions, and awards.',
    icon: Trophy,
    clay: 'clay-sky',
    iconColor: 'text-sky-700 dark:text-sky-300',
  },
];

const coCurricularClubs = [
  {
    name: 'Sports Academy',
    icon: Trophy,
    category: 'Sports',
    members: '450+ Athletes',
    desc: 'Football, Basketball, Cricket, Swimming, and Track training under certified NIS coaches.',
    clay: 'clay-emerald',
    iconColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    name: 'Robotics & STEM Lab',
    icon: Cpu,
    category: 'Science & Tech',
    members: '280+ Builders',
    desc: 'Microcontrollers, IoT sensor projects, 3D printing prototyping, and national hackathon prep.',
    clay: 'clay-sky',
    iconColor: 'text-sky-700 dark:text-sky-300',
  },
  {
    name: 'Performing Arts & Choir',
    icon: Music,
    category: 'Cultural',
    members: '320+ Artists',
    desc: 'Vocal music, classical orchestra, drama society, and contemporary school dance troop.',
    clay: 'clay-purple',
    iconColor: 'text-purple-700 dark:text-purple-300',
  },
  {
    name: 'Leadership & MUN Debate',
    icon: Award,
    category: 'Clubs',
    members: '190+ Speakers',
    desc: 'Model United Nations, parliamentary style debates, creative writing, and public oratory.',
    clay: 'clay-amber',
    iconColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    name: 'Visual Arts & Craft Studio',
    icon: Palette,
    category: 'Cultural',
    members: '210+ Creators',
    desc: 'Canvas oil painting, clay pottery, calligraphy, digital graphic design, and annual art gallery.',
    clay: 'clay-rose',
    iconColor: 'text-rose-700 dark:text-rose-300',
  },
  {
    name: 'Eco-Green & Community Club',
    icon: CheckCircle2,
    category: 'Clubs',
    members: '310+ Volunteers',
    desc: 'Organic campus garden, tree-plantation drives, solar awareness, and neighborhood social service.',
    clay: 'clay-emerald',
    iconColor: 'text-emerald-700 dark:text-emerald-300',
  },
];

const ActivitiesEventsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Events');

  const filteredEvents =
    selectedCategory === 'All Events'
      ? eventCards
      : selectedCategory === 'Celebrations'
      ? eventCards.filter((e) => e.badge === 'Celebration' || e.badge === 'Flagship Event')
      : selectedCategory === 'Clubs'
      ? eventCards
      : eventCards.filter((e) => e.category === selectedCategory);

  const filteredClubs =
    selectedCategory === 'All Events' || selectedCategory === 'Clubs'
      ? coCurricularClubs
      : coCurricularClubs.filter((c) => c.category === selectedCategory);

  return (
    <section
      id="events"
      className="py-20 md:py-28 bg-slate-50/70 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="clay-emerald inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Vibrant Campus Life
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Activities, Events & Celebrations
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Nurturing athletic prowess, creative expressions, scientific inquiry, and annual traditions that make school life memorable.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'clay-btn-emerald text-white scale-102 shadow-sm'
                    : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Featured Event Showcase Cards with Live Photos & Claymorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16 items-stretch">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="clay-card rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer"
            >
              <div>
                {/* Event Photo Header with Date Badge */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Date Badge (Top-Left) */}
                  <div className="absolute top-3.5 left-3.5 clay-card py-1.5 px-3 rounded-xl flex flex-col items-center leading-tight shadow-md">
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400">
                      {event.date.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                      {event.date.split(' ')[1]}
                    </span>
                  </div>

                  {/* Category Pill (Top-Right) */}
                  <div
                    className={`absolute top-3.5 right-3.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider shadow-sm ${event.badgeClass}`}
                  >
                    {event.badge}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2.5 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 mb-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Micro-link */}
              <div className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-700">
                  <span>View event schedule</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* School Annual Celebrations & Traditions */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <div className="text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Flame className="w-3.5 h-3.5" />
                Annual Traditions
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                School Celebrations & Grand Ceremonies
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Honoring heritage, building community, and acknowledging milestones together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {schoolCelebrations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl ${item.clay} flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill ${item.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 shadow-xs">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                      {item.title}
                    </h4>

                    <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-2.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-600" />
                      <span>{item.date}</span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-300/40 dark:border-slate-700/50 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                    <span>Celebration highlights</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Co-Curricular Activities & Clubs Showcase (Claymorphic Grid) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <div className="text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5" />
                Student Development
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Student Clubs & Co-Curricular Hub
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Over 20+ after-school clubs encouraging teamwork, creative discovery, and problem solving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClubs.map((club, idx) => {
              const ClubIcon = club.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl ${club.clay} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-900/90 clay-icon-pill ${club.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <ClubIcon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 shadow-xs">
                        {club.members}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {club.name}
                    </h4>

                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {club.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-300/40 dark:border-slate-700/50 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                    <span>Explore club roster</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesEventsSection;
