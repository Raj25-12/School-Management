export const initialTeachersList = [
  { id: 'TCH-101', name: 'Dr. Sunita Sharma', designation: 'Senior PGT Mathematics', department: 'Mathematics', qualification: 'M.Sc., Ph.D, B.Ed', email: 'sunita.sharma@school.edu', phone: '+91 98765 43210', experience: '14 Years', avatar: 'SS' },
  { id: 'TCH-102', name: 'Mr. Rajesh Verma', designation: 'PGT Physics', department: 'Science', qualification: 'M.Sc. Physics, B.Ed', email: 'rajesh.verma@school.edu', phone: '+91 98765 43211', experience: '10 Years', avatar: 'RV' },
  { id: 'TCH-103', name: 'Dr. Ananya Sen', designation: 'PGT Chemistry', department: 'Science', qualification: 'Ph.D Chemistry, B.Ed', email: 'ananya.sen@school.edu', phone: '+91 98765 43212', experience: '12 Years', avatar: 'AS' },
  { id: 'TCH-104', name: 'Mrs. Priya Nair', designation: 'PGT English & Literature', department: 'Languages', qualification: 'M.A. English, B.Ed', email: 'priya.nair@school.edu', phone: '+91 98765 43213', experience: '9 Years', avatar: 'PN' },
  { id: 'TCH-105', name: 'Mr. Vikram Rathore', designation: 'PGT Computer Science & AI', department: 'Computer Science', qualification: 'M.Tech CSE, MCA', email: 'vikram.rathore@school.edu', phone: '+91 98765 43214', experience: '8 Years', avatar: 'VR' },
  { id: 'TCH-106', name: 'Mrs. Shalini Gupta', designation: 'TGT Social Sciences', department: 'Social Studies', qualification: 'M.A. History, B.Ed', email: 'shalini.gupta@school.edu', phone: '+91 98765 43215', experience: '11 Years', avatar: 'SG' },
  { id: 'TCH-107', name: 'Mr. Amitav Ghosh', designation: 'PGT Biology & Biotech', department: 'Science', qualification: 'M.Sc. Botany, B.Ed', email: 'amitav.ghosh@school.edu', phone: '+91 98765 43216', experience: '15 Years', avatar: 'AG' },
  { id: 'TCH-108', name: 'Mrs. Kavita Joshi', designation: 'TGT Hindi & Sanskrit', department: 'Languages', qualification: 'M.A. Hindi, B.Ed', email: 'kavita.joshi@school.edu', phone: '+91 98765 43217', experience: '13 Years', avatar: 'KJ' },
  { id: 'TCH-109', name: 'Mr. Rakesh Kulkarni', designation: 'PGT Accountancy & Commerce', department: 'Commerce', qualification: 'M.Com, CA-Inter, B.Ed', email: 'rakesh.kulkarni@school.edu', phone: '+91 98765 43218', experience: '10 Years', avatar: 'RK' },
  { id: 'TCH-110', name: 'Mrs. Meenakshi Sundaram', designation: 'PGT Economics', department: 'Commerce', qualification: 'M.A. Economics, M.Phil', email: 'meenakshi.s@school.edu', phone: '+91 98765 43219', experience: '11 Years', avatar: 'MS' },
  { id: 'TCH-111', name: 'Mr. Sandeep Rawat', designation: 'TGT Physical Education', department: 'Sports & PE', qualification: 'M.P.Ed, NIS Coach', email: 'sandeep.rawat@school.edu', phone: '+91 98765 43220', experience: '7 Years', avatar: 'SR' },
  { id: 'TCH-112', name: 'Ms. Pooja Batra', designation: 'PRT Primary Lead', department: 'Primary Education', qualification: 'B.El.Ed, NTT', email: 'pooja.batra@school.edu', phone: '+91 98765 43221', experience: '6 Years', avatar: 'PB' },
];

export const initialClassesData = [
  {
    id: 'CLS-10',
    name: 'Class 10',
    numericGrade: 10,
    wing: 'Secondary (9-10)',
    room: 'Block B - Wing 2',
    academicYear: '2026-2027',
    colorTheme: 'indigo',
    classTeacher: {
      id: 'TCH-101',
      name: 'Dr. Sunita Sharma',
      designation: 'Senior PGT Mathematics',
      department: 'Mathematics',
      email: 'sunita.sharma@school.edu',
      phone: '+91 98765 43210',
      avatar: 'SS',
      experience: '14 Years',
      qualification: 'M.Sc., Ph.D, B.Ed'
    },
    sections: [
      { id: 'SEC-10A', name: 'Section A', room: 'Room 201', sectionTeacher: 'Dr. Sunita Sharma', studentCount: 38, boys: 20, girls: 18, capacity: 40, cr: 'Aarav Mehra', attendanceToday: '97.4%' },
      { id: 'SEC-10B', name: 'Section B', room: 'Room 202', sectionTeacher: 'Mr. Rajesh Verma', studentCount: 36, boys: 19, girls: 17, capacity: 40, cr: 'Diya Rastogi', attendanceToday: '94.4%' },
      { id: 'SEC-10C', name: 'Section C', room: 'Room 203', sectionTeacher: 'Mrs. Priya Nair', studentCount: 37, boys: 18, girls: 19, capacity: 40, cr: 'Kabir Singhania', attendanceToday: '95.1%' },
      { id: 'SEC-10D', name: 'Section D', room: 'Room 204', sectionTeacher: 'Mrs. Shalini Gupta', studentCount: 35, boys: 17, girls: 18, capacity: 40, cr: 'Ananya Deshmukh', attendanceToday: '96.2%' }
    ],
    subjects: [
      { id: 'SUB-M10', name: 'Mathematics', code: 'MATH-041', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 82, textbook: 'NCERT Class 10 Maths' },
      { id: 'SUB-S10', name: 'Science & Lab', code: 'SCI-086', teacher: 'Mr. Rajesh Verma', periodsPerWeek: 6, type: 'Theory + Lab', syllabusProgress: 75, textbook: 'NCERT Science X' },
      { id: 'SUB-E10', name: 'English Language & Lit', code: 'ENG-184', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Core Language', syllabusProgress: 88, textbook: 'First Flight & Footprints' },
      { id: 'SUB-SS10', name: 'Social Science', code: 'SST-087', teacher: 'Mrs. Shalini Gupta', periodsPerWeek: 5, type: 'Social Studies', syllabusProgress: 79, textbook: 'India & Contemporary World II' },
      { id: 'SUB-H10', name: 'Hindi Course A', code: 'HIN-002', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 4, type: 'Language Elective', syllabusProgress: 90, textbook: 'Kshitij & Kritika II' },
      { id: 'SUB-IT10', name: 'Information Tech (AI)', code: 'IT-402', teacher: 'Mr. Vikram Rathore', periodsPerWeek: 3, type: 'Skill Elective', syllabusProgress: 85, textbook: 'CBSE Skill Curriculum AI' },
      { id: 'SUB-PE10', name: 'Physical & Health Ed', code: 'PHE-502', teacher: 'Mr. Sandeep Rawat', periodsPerWeek: 2, type: 'Activity', syllabusProgress: 95, textbook: 'Comprehensive PE Guide' }
    ]
  },
  {
    id: 'CLS-12-SCI',
    name: 'Class 12 - Science',
    numericGrade: 12,
    wing: 'Senior Secondary (11-12)',
    room: 'Block A - 3rd Floor',
    academicYear: '2026-2027',
    colorTheme: 'emerald',
    classTeacher: {
      id: 'TCH-102',
      name: 'Mr. Rajesh Verma',
      designation: 'PGT Physics',
      department: 'Science',
      email: 'rajesh.verma@school.edu',
      phone: '+91 98765 43211',
      avatar: 'RV',
      experience: '10 Years',
      qualification: 'M.Sc. Physics, B.Ed'
    },
    sections: [
      { id: 'SEC-12SA', name: 'Section A (PCM)', room: 'Room 301', sectionTeacher: 'Mr. Rajesh Verma', studentCount: 42, boys: 25, girls: 17, capacity: 45, cr: 'Rohan Kapoor', attendanceToday: '98.1%' },
      { id: 'SEC-12SB', name: 'Section B (PCB)', room: 'Room 302', sectionTeacher: 'Mr. Amitav Ghosh', studentCount: 38, boys: 16, girls: 22, capacity: 40, cr: 'Sneha Chawla', attendanceToday: '96.0%' },
      { id: 'SEC-12SC', name: 'Section C (PCMB)', room: 'Room 303', sectionTeacher: 'Dr. Ananya Sen', studentCount: 34, boys: 18, girls: 16, capacity: 35, cr: 'Tanmay Saxena', attendanceToday: '94.8%' }
    ],
    subjects: [
      { id: 'SUB-P12', name: 'Physics & Experimental Lab', code: 'PHY-042', teacher: 'Mr. Rajesh Verma', periodsPerWeek: 7, type: 'Core Theory + Practical', syllabusProgress: 84, textbook: 'NCERT Physics Part I & II' },
      { id: 'SUB-C12', name: 'Chemistry & Lab', code: 'CHE-043', teacher: 'Dr. Ananya Sen', periodsPerWeek: 7, type: 'Core Theory + Practical', syllabusProgress: 80, textbook: 'NCERT Chemistry Part I & II' },
      { id: 'SUB-M12', name: 'Advanced Mathematics', code: 'MTH-041', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 76, textbook: 'NCERT Mathematics Class 12' },
      { id: 'SUB-B12', name: 'Biology & Biotech Lab', code: 'BIO-044', teacher: 'Mr. Amitav Ghosh', periodsPerWeek: 7, type: 'Core Theory + Practical', syllabusProgress: 82, textbook: 'NCERT Biology Class 12' },
      { id: 'SUB-CS12', name: 'Computer Science (Python & SQL)', code: 'CS-083', teacher: 'Mr. Vikram Rathore', periodsPerWeek: 5, type: 'Elective Lab', syllabusProgress: 91, textbook: 'Computer Science with Python XII' },
      { id: 'SUB-E12', name: 'English Core', code: 'ENG-301', teacher: 'Mrs. Priya Nair', periodsPerWeek: 4, type: 'Language Core', syllabusProgress: 89, textbook: 'Flamingo & Vistas' }
    ]
  },
  {
    id: 'CLS-12-COM',
    name: 'Class 12 - Commerce',
    numericGrade: 12,
    wing: 'Senior Secondary (11-12)',
    room: 'Block A - 2nd Floor',
    academicYear: '2026-2027',
    colorTheme: 'purple',
    classTeacher: {
      id: 'TCH-109',
      name: 'Mr. Rakesh Kulkarni',
      designation: 'PGT Accountancy & Commerce',
      department: 'Commerce',
      email: 'rakesh.kulkarni@school.edu',
      phone: '+91 98765 43218',
      avatar: 'RK',
      experience: '10 Years',
      qualification: 'M.Com, CA-Inter, B.Ed'
    },
    sections: [
      { id: 'SEC-12CA', name: 'Section A (Maths)', room: 'Room 211', sectionTeacher: 'Mr. Rakesh Kulkarni', studentCount: 39, boys: 21, girls: 18, capacity: 42, cr: 'Kunal Malhotra', attendanceToday: '95.5%' },
      { id: 'SEC-12CB', name: 'Section B (Applied)', room: 'Room 212', sectionTeacher: 'Mrs. Meenakshi Sundaram', studentCount: 36, boys: 19, girls: 17, capacity: 40, cr: 'Pooja Agarwal', attendanceToday: '96.2%' }
    ],
    subjects: [
      { id: 'SUB-ACC12', name: 'Accountancy & Audit', code: 'ACC-055', teacher: 'Mr. Rakesh Kulkarni', periodsPerWeek: 7, type: 'Core Theory', syllabusProgress: 85, textbook: 'Double Entry Book Keeping' },
      { id: 'SUB-ECO12', name: 'Economics (Macro & Micro)', code: 'ECO-030', teacher: 'Mrs. Meenakshi Sundaram', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 81, textbook: 'NCERT Indian Eco & Macro' },
      { id: 'SUB-BST12', name: 'Business Studies', code: 'BST-054', teacher: 'Mr. Rakesh Kulkarni', periodsPerWeek: 5, type: 'Core Theory', syllabusProgress: 78, textbook: 'NCERT Business Studies XII' },
      { id: 'SUB-MTH12C', name: 'Applied Mathematics', code: 'MTH-241', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 5, type: 'Elective', syllabusProgress: 73, textbook: 'CBSE Applied Mathematics XII' },
      { id: 'SUB-ENG12C', name: 'English Core', code: 'ENG-301', teacher: 'Mrs. Priya Nair', periodsPerWeek: 4, type: 'Language Core', syllabusProgress: 88, textbook: 'Flamingo & Vistas' },
      { id: 'SUB-ENT12', name: 'Entrepreneurship', code: 'ENT-066', teacher: 'Mrs. Meenakshi Sundaram', periodsPerWeek: 3, type: 'Elective', syllabusProgress: 86, textbook: 'CBSE Entrepreneurship XII' }
    ]
  },
  {
    id: 'CLS-9',
    name: 'Class 9',
    numericGrade: 9,
    wing: 'Secondary (9-10)',
    room: 'Block B - Wing 1',
    academicYear: '2026-2027',
    colorTheme: 'sky',
    classTeacher: {
      id: 'TCH-104',
      name: 'Mrs. Priya Nair',
      designation: 'PGT English & Literature',
      department: 'Languages',
      email: 'priya.nair@school.edu',
      phone: '+91 98765 43213',
      avatar: 'PN',
      experience: '9 Years',
      qualification: 'M.A. English, B.Ed'
    },
    sections: [
      { id: 'SEC-9A', name: 'Section A', room: 'Room 101', sectionTeacher: 'Mrs. Priya Nair', studentCount: 39, boys: 21, girls: 18, capacity: 40, cr: 'Ayush Goel', attendanceToday: '96.8%' },
      { id: 'SEC-9B', name: 'Section B', room: 'Room 102', sectionTeacher: 'Dr. Ananya Sen', studentCount: 38, boys: 20, girls: 18, capacity: 40, cr: 'Simran Walia', attendanceToday: '93.5%' },
      { id: 'SEC-9C', name: 'Section C', room: 'Room 103', sectionTeacher: 'Mrs. Kavita Joshi', studentCount: 36, boys: 19, girls: 17, capacity: 40, cr: 'Tushar Sethi', attendanceToday: '95.0%' },
      { id: 'SEC-9D', name: 'Section D', room: 'Room 104', sectionTeacher: 'Mr. Vikram Rathore', studentCount: 35, boys: 18, girls: 17, capacity: 40, cr: 'Meera Rajput', attendanceToday: '97.2%' }
    ],
    subjects: [
      { id: 'SUB-M9', name: 'Mathematics', code: 'MATH-041', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 80, textbook: 'NCERT Class 9 Mathematics' },
      { id: 'SUB-S9', name: 'Science & Experiments', code: 'SCI-086', teacher: 'Dr. Ananya Sen', periodsPerWeek: 6, type: 'Theory + Lab', syllabusProgress: 74, textbook: 'NCERT Science IX' },
      { id: 'SUB-E9', name: 'English Language & Lit', code: 'ENG-184', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Language Core', syllabusProgress: 86, textbook: 'Beehive & Moments' },
      { id: 'SUB-SS9', name: 'Social Science', code: 'SST-087', teacher: 'Mrs. Shalini Gupta', periodsPerWeek: 5, type: 'Social Studies', syllabusProgress: 78, textbook: 'Contemporary India & Democratic Politics' },
      { id: 'SUB-H9', name: 'Hindi Course A', code: 'HIN-002', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 4, type: 'Language Elective', syllabusProgress: 92, textbook: 'Kshitij & Kritika I' },
      { id: 'SUB-AI9', name: 'Artificial Intelligence', code: 'AI-417', teacher: 'Mr. Vikram Rathore', periodsPerWeek: 3, type: 'Skill Subject', syllabusProgress: 88, textbook: 'CBSE AI Foundation' }
    ]
  },
  {
    id: 'CLS-8',
    name: 'Class 8',
    numericGrade: 8,
    wing: 'Middle (6-8)',
    room: 'Block C - 2nd Floor',
    academicYear: '2026-2027',
    colorTheme: 'amber',
    classTeacher: {
      id: 'TCH-106',
      name: 'Mrs. Shalini Gupta',
      designation: 'TGT Social Sciences',
      department: 'Social Studies',
      email: 'shalini.gupta@school.edu',
      phone: '+91 98765 43215',
      avatar: 'SG',
      experience: '11 Years',
      qualification: 'M.A. History, B.Ed'
    },
    sections: [
      { id: 'SEC-8A', name: 'Section A', room: 'Room 205', sectionTeacher: 'Mrs. Shalini Gupta', studentCount: 36, boys: 19, girls: 17, capacity: 40, cr: 'Devansh Pandey', attendanceToday: '97.0%' },
      { id: 'SEC-8B', name: 'Section B', room: 'Room 206', sectionTeacher: 'Mr. Sandeep Rawat', studentCount: 35, boys: 18, girls: 17, capacity: 40, cr: 'Isha Mittal', attendanceToday: '94.8%' },
      { id: 'SEC-8C', name: 'Section C', room: 'Room 207', sectionTeacher: 'Mrs. Kavita Joshi', studentCount: 34, boys: 17, girls: 17, capacity: 40, cr: 'Parth Singhal', attendanceToday: '96.3%' }
    ],
    subjects: [
      { id: 'SUB-M8', name: 'Mathematics', code: 'MATH-008', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 83, textbook: 'NCERT Class 8 Mathematics' },
      { id: 'SUB-S8', name: 'General Science', code: 'SCI-008', teacher: 'Mr. Amitav Ghosh', periodsPerWeek: 6, type: 'Science', syllabusProgress: 79, textbook: 'NCERT Science VIII' },
      { id: 'SUB-E8', name: 'English Literature & Grammar', code: 'ENG-008', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Language', syllabusProgress: 85, textbook: 'Honeydew & It So Happened' },
      { id: 'SUB-SS8', name: 'Social Studies', code: 'SST-008', teacher: 'Mrs. Shalini Gupta', periodsPerWeek: 5, type: 'Social Studies', syllabusProgress: 82, textbook: 'Our Pasts III & Resources' },
      { id: 'SUB-H8', name: 'Hindi & Vyakaran', code: 'HIN-008', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 4, type: 'Language', syllabusProgress: 89, textbook: 'Vasant Part 3' },
      { id: 'SUB-SAN8', name: 'Sanskrit / Foreign Lang', code: 'SAN-008', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 3, type: '3rd Language', syllabusProgress: 77, textbook: 'Ruchira Part 3' },
      { id: 'SUB-CS8', name: 'Coding & Computers', code: 'CS-008', teacher: 'Mr. Vikram Rathore', periodsPerWeek: 2, type: 'Computer Lab', syllabusProgress: 90, textbook: 'Touchpad Plus Class 8' }
    ]
  },
  {
    id: 'CLS-7',
    name: 'Class 7',
    numericGrade: 7,
    wing: 'Middle (6-8)',
    room: 'Block C - 1st Floor',
    academicYear: '2026-2027',
    colorTheme: 'rose',
    classTeacher: {
      id: 'TCH-108',
      name: 'Mrs. Kavita Joshi',
      designation: 'TGT Hindi & Sanskrit',
      department: 'Languages',
      email: 'kavita.joshi@school.edu',
      phone: '+91 98765 43217',
      avatar: 'KJ',
      experience: '13 Years',
      qualification: 'M.A. Hindi, B.Ed'
    },
    sections: [
      { id: 'SEC-7A', name: 'Section A', room: 'Room 105', sectionTeacher: 'Mrs. Kavita Joshi', studentCount: 35, boys: 18, girls: 17, capacity: 40, cr: 'Vedant Bhatt', attendanceToday: '96.5%' },
      { id: 'SEC-7B', name: 'Section B', room: 'Room 106', sectionTeacher: 'Dr. Ananya Sen', studentCount: 34, boys: 17, girls: 17, capacity: 40, cr: 'Riya Sengupta', attendanceToday: '95.2%' },
      { id: 'SEC-7C', name: 'Section C', room: 'Room 107', sectionTeacher: 'Mr. Rajesh Verma', studentCount: 35, boys: 19, girls: 16, capacity: 40, cr: 'Akshat Jain', attendanceToday: '94.0%' }
    ],
    subjects: [
      { id: 'SUB-M7', name: 'Mathematics', code: 'MATH-007', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 81, textbook: 'NCERT Class 7 Maths' },
      { id: 'SUB-S7', name: 'General Science', code: 'SCI-007', teacher: 'Dr. Ananya Sen', periodsPerWeek: 6, type: 'Science', syllabusProgress: 76, textbook: 'NCERT Science VII' },
      { id: 'SUB-E7', name: 'English Grammar & Prose', code: 'ENG-007', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Language', syllabusProgress: 84, textbook: 'Honeycomb & An Alien Hand' },
      { id: 'SUB-SS7', name: 'Social Studies', code: 'SST-007', teacher: 'Mrs. Shalini Gupta', periodsPerWeek: 5, type: 'Social Studies', syllabusProgress: 80, textbook: 'Our Pasts II & Our Environment' },
      { id: 'SUB-H7', name: 'Hindi & Vyakaran', code: 'HIN-007', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 4, type: 'Language', syllabusProgress: 88, textbook: 'Vasant Part 2' }
    ]
  },
  {
    id: 'CLS-6',
    name: 'Class 6',
    numericGrade: 6,
    wing: 'Middle (6-8)',
    room: 'Block C - Ground Floor',
    academicYear: '2026-2027',
    colorTheme: 'indigo',
    classTeacher: {
      id: 'TCH-107',
      name: 'Mr. Amitav Ghosh',
      designation: 'PGT Biology & Biotech',
      department: 'Science',
      email: 'amitav.ghosh@school.edu',
      phone: '+91 98765 43216',
      avatar: 'AG',
      experience: '15 Years',
      qualification: 'M.Sc. Botany, B.Ed'
    },
    sections: [
      { id: 'SEC-6A', name: 'Section A', room: 'Room 005', sectionTeacher: 'Mr. Amitav Ghosh', studentCount: 34, boys: 17, girls: 17, capacity: 38, cr: 'Kartik Somani', attendanceToday: '97.2%' },
      { id: 'SEC-6B', name: 'Section B', room: 'Room 006', sectionTeacher: 'Mrs. Priya Nair', studentCount: 33, boys: 16, girls: 17, capacity: 38, cr: 'Anvi Saxena', attendanceToday: '96.1%' },
      { id: 'SEC-6C', name: 'Section C', room: 'Room 007', sectionTeacher: 'Mr. Sandeep Rawat', studentCount: 34, boys: 18, girls: 16, capacity: 38, cr: 'Manav Kaushik', attendanceToday: '95.5%' }
    ],
    subjects: [
      { id: 'SUB-M6', name: 'Mathematics', code: 'MATH-006', teacher: 'Dr. Sunita Sharma', periodsPerWeek: 6, type: 'Core Theory', syllabusProgress: 80, textbook: 'NCERT Class 6 Mathematics' },
      { id: 'SUB-S6', name: 'General Science', code: 'SCI-006', teacher: 'Mr. Amitav Ghosh', periodsPerWeek: 6, type: 'Science', syllabusProgress: 78, textbook: 'NCERT Science VI' },
      { id: 'SUB-E6', name: 'English Literature', code: 'ENG-006', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Language', syllabusProgress: 85, textbook: 'Honeysuckle & A Pact with the Sun' },
      { id: 'SUB-SS6', name: 'Social Studies', code: 'SST-006', teacher: 'Mrs. Shalini Gupta', periodsPerWeek: 5, type: 'Social Studies', syllabusProgress: 79, textbook: 'Our Pasts I & The Earth Our Habitat' },
      { id: 'SUB-H6', name: 'Hindi & Vyakaran', code: 'HIN-006', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 4, type: 'Language', syllabusProgress: 87, textbook: 'Vasant Part 1' }
    ]
  },
  {
    id: 'CLS-5',
    name: 'Class 5',
    numericGrade: 5,
    wing: 'Primary (1-5)',
    room: 'Primary Wing - 2nd Floor',
    academicYear: '2026-2027',
    colorTheme: 'emerald',
    classTeacher: {
      id: 'TCH-112',
      name: 'Ms. Pooja Batra',
      designation: 'PRT Primary Lead',
      department: 'Primary Education',
      email: 'pooja.batra@school.edu',
      phone: '+91 98765 43221',
      avatar: 'PB',
      experience: '6 Years',
      qualification: 'B.El.Ed, NTT'
    },
    sections: [
      { id: 'SEC-5A', name: 'Section A', room: 'Room P201', sectionTeacher: 'Ms. Pooja Batra', studentCount: 30, boys: 15, girls: 15, capacity: 35, cr: 'Reyansh Arora', attendanceToday: '98.0%' },
      { id: 'SEC-5B', name: 'Section B', room: 'Room P202', sectionTeacher: 'Mrs. Kavita Joshi', studentCount: 29, boys: 14, girls: 15, capacity: 35, cr: 'Avni Srivastava', attendanceToday: '96.4%' },
      { id: 'SEC-5C', name: 'Section C', room: 'Room P203', sectionTeacher: 'Mr. Sandeep Rawat', studentCount: 30, boys: 16, girls: 14, capacity: 35, cr: 'Samarth Roy', attendanceToday: '95.8%' }
    ],
    subjects: [
      { id: 'SUB-M5', name: 'Primary Mathematics', code: 'MATH-P05', teacher: 'Ms. Pooja Batra', periodsPerWeek: 6, type: 'Maths Magic', syllabusProgress: 86, textbook: 'Math Magic Book 5' },
      { id: 'SUB-EVS5', name: 'Environmental Studies (EVS)', code: 'EVS-P05', teacher: 'Ms. Pooja Batra', periodsPerWeek: 6, type: 'Science & Environment', syllabusProgress: 84, textbook: 'Looking Around Book 5' },
      { id: 'SUB-E5', name: 'English (Marigold)', code: 'ENG-P05', teacher: 'Mrs. Priya Nair', periodsPerWeek: 5, type: 'Language', syllabusProgress: 88, textbook: 'Marigold Book 5' },
      { id: 'SUB-H5', name: 'Hindi (Rimjhim)', code: 'HIN-P05', teacher: 'Mrs. Kavita Joshi', periodsPerWeek: 5, type: 'Language', syllabusProgress: 90, textbook: 'Rimjhim Book 5' },
      { id: 'SUB-ART5', name: 'Art, Craft & Sports', code: 'ART-P05', teacher: 'Mr. Sandeep Rawat', periodsPerWeek: 3, type: 'Co-Curricular', syllabusProgress: 96, textbook: 'Creative Expressions 5' }
    ]
  }
];

export const wingsList = [
  'All Wings',
  'Primary (1-5)',
  'Middle (6-8)',
  'Secondary (9-10)',
  'Senior Secondary (11-12)'
];
