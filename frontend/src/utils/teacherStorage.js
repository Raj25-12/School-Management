const STORAGE_KEY = 'admin_teachers_master_v1';

export const defaultTeachers = [
  {
    id: 'TCH-1001',
    name: 'Prof. Rajesh Sharma',
    employeeId: 'TCH-1001',
    email: 'rajesh.sharma@school.com',
    phone: '+91 98111 22334',
    department: 'Mathematics',
    primarySubject: 'Algebra & Calculus',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '12 Years',
    assignedClasses: ['Class 9-A', 'Class 10-A', 'Class 12-Sci'],
    status: 'Active',
    joiningDate: '2014-06-10',
    gender: 'Male',
    salary: '₹68,000 / month',
    contractType: 'Full-Time',
    address: '22 Civil Lines, Model Town',
  },
  {
    id: 'TCH-1002',
    name: 'Dr. Sunita Verma',
    employeeId: 'TCH-1002',
    email: 'sunita.verma@school.com',
    phone: '+91 98222 33445',
    department: 'Science',
    primarySubject: 'Physics & Optics',
    qualification: 'Ph.D. Physics, M.Sc.',
    experience: '9 Years',
    assignedClasses: ['Class 10-A', 'Class 11-Sci', 'Class 12-Sci'],
    status: 'Active',
    joiningDate: '2017-08-01',
    gender: 'Female',
    salary: '₹72,000 / month',
    contractType: 'Full-Time',
    address: '45 Green Avenue, Sector 8',
  },
  {
    id: 'TCH-1003',
    name: 'Amit Patel',
    employeeId: 'TCH-1003',
    email: 'amit.patel@school.com',
    phone: '+91 98333 44556',
    department: 'English',
    primarySubject: 'English Literature',
    qualification: 'M.A. English, B.Ed.',
    experience: '6 Years',
    assignedClasses: ['Class 8-A', 'Class 9-B', 'Class 10-B'],
    status: 'Active',
    joiningDate: '2020-01-15',
    gender: 'Male',
    salary: '₹54,000 / month',
    contractType: 'Full-Time',
    address: '109 Navrangpura, Central Area',
  },
  {
    id: 'TCH-1004',
    name: 'Pooja Iyer',
    employeeId: 'TCH-1004',
    email: 'pooja.iyer@school.com',
    phone: '+91 98444 55667',
    department: 'Social Science',
    primarySubject: 'History & Civics',
    qualification: 'M.A. History, B.Ed.',
    experience: '7 Years',
    assignedClasses: ['Class 7-B', 'Class 8-B', 'Class 9-A'],
    status: 'On Leave',
    joiningDate: '2019-07-20',
    gender: 'Female',
    salary: '₹58,000 / month',
    contractType: 'Full-Time',
    address: '14 Lake View Road',
  },
  {
    id: 'TCH-1005',
    name: 'Vikram Singh',
    employeeId: 'TCH-1005',
    email: 'vikram.singh@school.com',
    phone: '+91 98555 66778',
    department: 'Computer Science',
    primarySubject: 'Python & Web Tech',
    qualification: 'MCA, B.Tech CS',
    experience: '5 Years',
    assignedClasses: ['Class 9-A', 'Class 10-A', 'Class 11-Sci', 'Class 12-Sci'],
    status: 'Active',
    joiningDate: '2021-04-12',
    gender: 'Male',
    salary: '₹62,000 / month',
    contractType: 'Full-Time',
    address: '88 Cyber Heights, IT Zone',
  },
  {
    id: 'TCH-1006',
    name: 'Meenakshi Sundaram',
    employeeId: 'TCH-1006',
    email: 'meenakshi.s@school.com',
    phone: '+91 98666 77889',
    department: 'Languages (Hindi/Sanskrit)',
    primarySubject: 'Hindi Literature',
    qualification: 'M.A. Hindi, Ph.D.',
    experience: '14 Years',
    assignedClasses: ['Class 6-A', 'Class 7-A', 'Class 8-A'],
    status: 'Active',
    joiningDate: '2012-09-01',
    gender: 'Female',
    salary: '₹75,000 / month',
    contractType: 'Full-Time',
    address: '77 Heritage Colony',
  },
];

export const getStoredTeachers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTeachers));
      return defaultTeachers;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultTeachers;
  } catch {
    return defaultTeachers;
  }
};

export const getTeacherById = (id) => {
  if (!id) return null;
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const teachers = getStoredTeachers();
  return (
    teachers.find(
      (t) =>
        String(t.id).trim().toLowerCase() === decodedId ||
        String(t.employeeId).trim().toLowerCase() === decodedId ||
        String(t.id).toLowerCase().includes(decodedId) ||
        String(t.employeeId).toLowerCase().includes(decodedId)
    ) || null
  );
};

export const saveNewTeacher = (teacherData) => {
  const teachers = getStoredTeachers();
  const empId = teacherData.employeeId || `TCH-${1000 + teachers.length + 1}`;
  const id = `TCH-${Date.now()}`;

  const newTeacher = {
    ...teacherData,
    id,
    employeeId: empId,
    updatedAt: new Date().toISOString(),
  };

  const updated = [newTeacher, ...teachers];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_teachers_updated'));
  return newTeacher;
};

export const updateStoredTeacher = (id, teacherData) => {
  if (!id) return null;
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const teachers = getStoredTeachers();
  let updatedTeacher = null;

  const updated = teachers.map((t) => {
    const matchId = String(t.id).trim().toLowerCase();
    const matchEmp = String(t.employeeId).trim().toLowerCase();
    if (matchId === decodedId || matchEmp === decodedId) {
      updatedTeacher = {
        ...t,
        ...teacherData,
        id: t.id,
        employeeId: teacherData.employeeId || t.employeeId,
        updatedAt: new Date().toISOString(),
      };
      return updatedTeacher;
    }
    return t;
  });

  if (!updatedTeacher) {
    const idx = teachers.findIndex(
      (t) =>
        String(t.id).toLowerCase().includes(decodedId) ||
        String(t.employeeId).toLowerCase().includes(decodedId)
    );
    if (idx !== -1) {
      updatedTeacher = {
        ...teachers[idx],
        ...teacherData,
        updatedAt: new Date().toISOString(),
      };
      updated[idx] = updatedTeacher;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_teachers_updated'));
  return updatedTeacher;
};

export const deleteStoredTeacher = (id) => {
  if (!id) return [];
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const teachers = getStoredTeachers();
  const updated = teachers.filter(
    (t) =>
      String(t.id).trim().toLowerCase() !== decodedId &&
      String(t.employeeId).trim().toLowerCase() !== decodedId
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_teachers_updated'));
  return updated;
};
