import React, { useState } from 'react';
import {
  User,
  Award,
  Calendar,
  Save,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button, Input, Badge, Card, AvatarUpload } from '../../components/common';

const TeacherProfile = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [avatar, setAvatar] = useState(() => user?.avatar || localStorage.getItem('teacher_avatar_photo') || null);
  const [profile, setProfile] = useState({
    name: user?.name || 'Prof. Rajesh Sharma',
    email: user?.email || 'teacher@school.com',
    phone: '+91 98765 43210',
    department: 'Department of Mathematics & Science',
    designation: 'Senior Faculty & Class Incharge (Class 10-A)',
    qualification: 'M.Sc (Mathematics), B.Ed, Ph.D Scholar',
    joiningDate: '15 July 2018',
    employeeId: 'EMP-FAC-2018-042',
    address: 'Faculty Residence Block B, Campus Greens, New Delhi',
    bio: 'Dedicated mathematics educator with 12+ years of experience in secondary and higher secondary CBSE curriculum coaching and Olympiad mentorship.'
  });

  const handleAvatarChange = (newPhoto) => {
    setAvatar(newPhoto);
    if (newPhoto) {
      localStorage.setItem('teacher_avatar_photo', newPhoto);
      if (updateUser) updateUser({ avatar: newPhoto });
      showToast({ title: 'Photo Uploaded', message: 'Profile picture updated successfully.', type: 'success' });
    } else {
      localStorage.removeItem('teacher_avatar_photo');
      if (updateUser) updateUser({ avatar: null });
      showToast({ title: 'Photo Removed', message: 'Profile picture reset to default.', type: 'info' });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        name: profile.name,
        email: profile.email,
        designation: profile.designation,
        avatar: avatar
      });
    }
    showToast({
      title: 'Profile Updated',
      message: 'Faculty credentials and contact information saved.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sand" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 mb-1 shadow-xs border border-amber-300/60">
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span>Faculty Dossier & Personal Bio</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Teacher Profile & Academic Credentials
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Faculty employment dossier, contact details, assigned department, and educational qualifications.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Card Summary */}
        <Card className="p-5 text-center flex flex-col items-center justify-between">
          <div>
            <div className="mb-3">
              <AvatarUpload
                image={avatar}
                initials="RS"
                name={profile.name}
                variant="amber"
                size="md"
                onImageChange={handleAvatarChange}
              />
            </div>
            <h2 className="text-base font-black text-slate-800 dark:text-white">{profile.name}</h2>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mt-0.5">{profile.designation}</p>
            <div className="mt-2">
              <Badge variant="teacher">
                {profile.employeeId}
              </Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{profile.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{profile.qualification}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Joined: {profile.joiningDate}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Edit Details Form */}
        <Card className="md:col-span-2 p-5">
          <form onSubmit={handleSave} className="space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Edit Personal & Contact Details</h3>
              <Button
                type="submit"
                variant="sand"
                size="sm"
                icon={Save}
              >
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />

              <Input
                label="Email Address (Portal ID)"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />

              <Input
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />

              <Input
                label="Department"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              />

              <Input
                label="Academic Qualifications"
                value={profile.qualification}
                onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
              />

              <Input
                label="Campus Address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Faculty Biography & Mentorship Note
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;
