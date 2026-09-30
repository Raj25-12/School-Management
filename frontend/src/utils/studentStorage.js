const STORAGE_KEY = 'school_students_master_v1';

export const defaultStudents = [
  {
    id: 'ADM-1042',
    rollNo: '10A-01',
    name: 'Rohan Sharma',
    class: 'Class 10',
    section: 'A',
    fatherName: 'Manoj Sharma',
    motherName: 'Sunita Sharma',
    contact: '+91 98765 43210',
    email: 'rohan.sharma@school.com',
    gender: 'Male',
    dob: '2010-04-12',
    address: '42 MG Road, Model Town',
    status: 'Active',
    avatar: 'RS',
  },
  {
    id: 'ADM-1043',
    rollNo: '10A-14',
    name: 'Alex Johnson',
    class: 'Class 10',
    section: 'A',
    fatherName: 'Robert Johnson',
    motherName: 'Sarah Johnson',
    contact: '+91 98123 45678',
    email: 'student@school.com',
    gender: 'Male',
    dob: '2010-08-25',
    address: '15 Green Valley Residency',
    status: 'Active',
    avatar: 'AJ',
  },
  {
    id: 'ADM-1044',
    rollNo: '6B-05',
    name: 'Aarav Patel',
    class: 'Class 6',
    section: 'B',
    fatherName: 'Vikram Patel',
    motherName: 'Geeta Patel',
    contact: '+91 98234 56789',
    email: 'aarav.patel@school.com',
    gender: 'Male',
    dob: '2014-01-18',
    address: '88 Navrangpura, Sector 4',
    status: 'Pending Review',
    avatar: 'AP',
  },
  {
    id: 'ADM-1045',
    rollNo: '11S-22',
    name: 'Sneha Roy',
    class: 'Class 11',
    section: 'Science',
    fatherName: 'Anil Roy',
    motherName: 'Meena Roy',
    contact: '+91 98345 67890',
    email: 'sneha.roy@school.com',
    gender: 'Female',
    dob: '2009-11-03',
    address: '102 Lake View Apartments',
    status: 'Active',
    avatar: 'SR',
  },
  {
    id: 'ADM-1046',
    rollNo: '8C-18',
    name: 'Kavya Nair',
    class: 'Class 8',
    section: 'C',
    fatherName: 'Suresh Nair',
    motherName: 'Lakshmi Nair',
    contact: '+91 98456 78901',
    email: 'kavya.nair@school.com',
    gender: 'Female',
    dob: '2012-06-15',
    address: '24 South City Enclave',
    status: 'Fees Pending',
    avatar: 'KN',
  },
  {
    id: 'ADM-1047',
    rollNo: '10A-09',
    name: 'Priya Gupta',
    class: 'Class 10',
    section: 'A',
    fatherName: 'Rajesh Gupta',
    motherName: 'Anita Gupta',
    contact: '+91 98567 89012',
    email: 'priya.gupta@school.com',
    gender: 'Female',
    dob: '2010-09-30',
    address: '56 Civil Lines',
    status: 'Active',
    avatar: 'PG',
  },
];

export const getStoredStudents = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudents));
      return defaultStudents;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultStudents;
  } catch {
    return defaultStudents;
  }
};

export const getStudentById = (id) => {
  if (!id) return null;
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const students = getStoredStudents();
  return (
    students.find(
      (s) =>
        String(s.id).trim().toLowerCase() === decodedId ||
        String(s.rollNo).trim().toLowerCase() === decodedId ||
        String(s.id).toLowerCase().includes(decodedId)
    ) || null
  );
};

export const saveNewStudent = (studentData) => {
  const students = getStoredStudents();
  const id = 'ADM-' + (1000 + students.length + Math.floor(Math.random() * 900));
  const initials = studentData.name
    ? studentData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'ST';

  const newStudent = {
    ...studentData,
    id,
    avatar: initials,
    updatedAt: new Date().toISOString(),
  };

  const updated = [newStudent, ...students];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_students_updated'));
  return newStudent;
};

export const updateStoredStudent = (id, studentData) => {
  if (!id) return null;
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const students = getStoredStudents();
  let updatedStudent = null;

  const initials = studentData.name
    ? studentData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'ST';

  const updated = students.map((st) => {
    const matchId = String(st.id).trim().toLowerCase();
    const matchRoll = String(st.rollNo).trim().toLowerCase();
    if (matchId === decodedId || matchRoll === decodedId) {
      updatedStudent = {
        ...st,
        ...studentData,
        id: st.id, // preserve immutable ID
        avatar: initials,
        updatedAt: new Date().toISOString(),
      };
      return updatedStudent;
    }
    return st;
  });

  // If not found by exact match, match partial ID
  if (!updatedStudent) {
    const idx = students.findIndex((s) =>
      String(s.id).toLowerCase().includes(decodedId)
    );
    if (idx !== -1) {
      updatedStudent = {
        ...students[idx],
        ...studentData,
        avatar: initials,
        updatedAt: new Date().toISOString(),
      };
      updated[idx] = updatedStudent;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_students_updated'));
  return updatedStudent;
};

export const deleteStoredStudent = (id) => {
  if (!id) return [];
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const students = getStoredStudents();
  const updated = students.filter(
    (s) =>
      String(s.id).trim().toLowerCase() !== decodedId &&
      String(s.rollNo).trim().toLowerCase() !== decodedId
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_students_updated'));
  return updated;
};

