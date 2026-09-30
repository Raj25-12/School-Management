const STORAGE_KEY = 'school_parents_master_v1';

export const defaultParents = [
  {
    id: 'PRN-201',
    fatherName: 'Manoj Sharma',
    motherName: 'Sunita Sharma',
    primaryContactName: 'Manoj Sharma (Father)',
    wardName: 'Rohan Sharma',
    wardRollNo: '10A-01',
    wardClass: 'Class 10-A',
    wardId: 'ADM-1042',
    phone: '+91 98765 43210',
    email: 'manoj.sharma@parent.com',
    occupation: 'Senior Software Architect',
    address: '42 MG Road, Model Town, Delhi',
    portalStatus: 'Active',
    feesStatus: 'Paid',
    relationship: 'Father',
    avatar: 'MS'
  },
  {
    id: 'PRN-202',
    fatherName: 'Robert Johnson',
    motherName: 'Sarah Johnson',
    primaryContactName: 'Robert Johnson (Father)',
    wardName: 'Alex Johnson',
    wardRollNo: '10A-14',
    wardClass: 'Class 10-A',
    wardId: 'ADM-1043',
    phone: '+91 98123 45678',
    email: 'robert.johnson@parent.com',
    occupation: 'Civil Engineer (PWD)',
    address: '15 Green Valley Residency, Block C',
    portalStatus: 'Active',
    feesStatus: 'Paid',
    relationship: 'Father',
    avatar: 'RJ'
  },
  {
    id: 'PRN-203',
    fatherName: 'Vikram Patel',
    motherName: 'Geeta Patel',
    primaryContactName: 'Geeta Patel (Mother)',
    wardName: 'Aarav Patel',
    wardRollNo: '6B-05',
    wardClass: 'Class 6-B',
    wardId: 'ADM-1044',
    phone: '+91 98234 56789',
    email: 'geeta.patel@parent.com',
    occupation: 'Professor of Economics',
    address: '88 Navrangpura, Sector 4',
    portalStatus: 'Pending Verification',
    feesStatus: 'Paid',
    relationship: 'Mother',
    avatar: 'GP'
  },
  {
    id: 'PRN-204',
    fatherName: 'Anil Roy',
    motherName: 'Meena Roy',
    primaryContactName: 'Anil Roy (Father)',
    wardName: 'Sneha Roy',
    wardRollNo: '11S-22',
    wardClass: 'Class 11-Sci',
    wardId: 'ADM-1045',
    phone: '+91 98345 67890',
    email: 'anil.roy@parent.com',
    occupation: 'Business Enterprise Director',
    address: '102 Lake View Apartments',
    portalStatus: 'Active',
    feesStatus: 'Paid',
    relationship: 'Father',
    avatar: 'AR'
  },
  {
    id: 'PRN-205',
    fatherName: 'Suresh Nair',
    motherName: 'Lakshmi Nair',
    primaryContactName: 'Suresh Nair (Father)',
    wardName: 'Kavya Nair',
    wardRollNo: '8C-18',
    wardClass: 'Class 8-C',
    wardId: 'ADM-1046',
    phone: '+91 98456 78901',
    email: 'suresh.nair@parent.com',
    occupation: 'Senior Advocate (High Court)',
    address: '24 South City Enclave',
    portalStatus: 'Active',
    feesStatus: 'Overdue (₹12,500)',
    relationship: 'Father',
    avatar: 'SN'
  },
  {
    id: 'PRN-206',
    fatherName: 'Rajesh Gupta',
    motherName: 'Anita Gupta',
    primaryContactName: 'Anita Gupta (Mother)',
    wardName: 'Priya Gupta',
    wardRollNo: '10A-09',
    wardClass: 'Class 10-A',
    wardId: 'ADM-1047',
    phone: '+91 98567 89012',
    email: 'anita.gupta@parent.com',
    occupation: 'Chartered Accountant',
    address: '56 Civil Lines, City Center',
    portalStatus: 'Active',
    feesStatus: 'Paid',
    relationship: 'Mother',
    avatar: 'AG'
  }
];

export const getStoredParents = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultParents));
      return defaultParents;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultParents;
  } catch {
    return defaultParents;
  }
};

export const getParentById = (id) => {
  if (!id) return null;
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const parents = getStoredParents();
  return (
    parents.find(
      (p) =>
        String(p.id).trim().toLowerCase() === decodedId ||
        String(p.wardRollNo).trim().toLowerCase() === decodedId ||
        String(p.fatherName).trim().toLowerCase() === decodedId ||
        String(p.motherName).trim().toLowerCase() === decodedId
    ) || null
  );
};

export const saveNewParent = (parentData) => {
  const parents = getStoredParents();
  const id = 'PRN-' + (200 + parents.length + Math.floor(Math.random() * 800));
  const initials = parentData.fatherName
    ? parentData.fatherName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'PR';

  const newParent = {
    ...parentData,
    id,
    avatar: initials,
    updatedAt: new Date().toISOString(),
  };

  const updated = [newParent, ...parents];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_parents_updated'));
  return newParent;
};

export const updateStoredParent = (id, parentData) => {
  if (!id) return null;
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const parents = getStoredParents();
  let updatedParent = null;

  const initials = (parentData.fatherName || parentData.motherName || 'PR')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const updated = parents.map((pr) => {
    const matchId = String(pr.id).trim().toLowerCase();
    const matchWard = String(pr.wardRollNo).trim().toLowerCase();
    if (matchId === decodedId || matchWard === decodedId) {
      updatedParent = {
        ...pr,
        ...parentData,
        id: pr.id,
        avatar: initials,
        updatedAt: new Date().toISOString(),
      };
      return updatedParent;
    }
    return pr;
  });

  if (!updatedParent) {
    const idx = parents.findIndex((p) =>
      String(p.id).toLowerCase().includes(decodedId)
    );
    if (idx !== -1) {
      updatedParent = {
        ...parents[idx],
        ...parentData,
        avatar: initials,
        updatedAt: new Date().toISOString(),
      };
      updated[idx] = updatedParent;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_parents_updated'));
  return updatedParent;
};

export const deleteStoredParent = (id) => {
  if (!id) return [];
  const decodedId = decodeURIComponent(String(id)).trim().toLowerCase();
  const parents = getStoredParents();
  const updated = parents.filter(
    (p) =>
      String(p.id).trim().toLowerCase() !== decodedId &&
      String(p.wardRollNo).trim().toLowerCase() !== decodedId
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('school_parents_updated'));
  return updated;
};
