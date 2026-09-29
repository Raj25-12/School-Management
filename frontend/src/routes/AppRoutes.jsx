import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from '../layouts/AdminLayout';
import TeacherLayout from '../layouts/TeacherLayout';
import StudentLayout from '../layouts/StudentLayout';

// Auth Pages (optional/available directly)
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import StudentList from '../pages/admin/students/StudentList';
import AddStudent from '../pages/admin/students/AddStudent';
import EditStudent from '../pages/admin/students/EditStudent';
import StudentDetails from '../pages/admin/students/StudentDetails';
import StudentPromotion from '../pages/admin/students/StudentPromotion';

import TeacherList from '../pages/admin/teachers/TeacherList';
import AddTeacher from '../pages/admin/teachers/AddTeacher';
import EditTeacher from '../pages/admin/teachers/EditTeacher';
import TeacherDetails from '../pages/admin/teachers/TeacherDetails';

import ParentList from '../pages/admin/parents/ParentList';

import ClassList from '../pages/admin/classes/ClassList';
import SectionList from '../pages/admin/classes/SectionList';
import SubjectList from '../pages/admin/classes/SubjectList';

import StudentAttendance from '../pages/admin/attendance/StudentAttendance';
import TeacherAttendance from '../pages/admin/attendance/TeacherAttendance';
import AttendanceReport from '../pages/admin/attendance/AttendanceReport';

import AdminTimetable from '../pages/admin/timetable/Timetable';

import ExamList from '../pages/admin/exams/ExamList';
import AdminMarks from '../pages/admin/exams/Marks';
import AdminResults from '../pages/admin/exams/Results';
import ReportCard from '../pages/admin/exams/ReportCard';

import FeeStructure from '../pages/admin/fees/FeeStructure';
import CollectFees from '../pages/admin/fees/CollectFees';
import PendingFees from '../pages/admin/fees/PendingFees';
import Receipts from '../pages/admin/fees/Receipts';

import AdminHomework from '../pages/admin/homework/Homework';
import AdminNotices from '../pages/admin/notices/Notices';
import AdminReports from '../pages/admin/reports/Reports';
import AdminSettings from '../pages/admin/settings/Settings';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherMyClasses from '../pages/teacher/MyClasses';
import TeacherMyStudents from '../pages/teacher/MyStudents';
import TeacherAttendancePage from '../pages/teacher/Attendance';
import TeacherTimetable from '../pages/teacher/Timetable';
import TeacherHomework from '../pages/teacher/Homework';
import TeacherExams from '../pages/teacher/Exams';
import TeacherMarks from '../pages/teacher/Marks';
import TeacherNotices from '../pages/teacher/Notices';
import TeacherProfile from '../pages/teacher/Profile';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import MyProfile from '../pages/student/MyProfile';
import MyAttendance from '../pages/student/MyAttendance';
import MyTimetable from '../pages/student/MyTimetable';
import MyHomework from '../pages/student/MyHomework';
import MyExams from '../pages/student/MyExams';
import MyResults from '../pages/student/MyResults';
import MyFees from '../pages/student/MyFees';
import StudentNotices from '../pages/student/Notices';

// Common Pages
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to Login page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin Routes (Directly Accessible) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* Students */}
        <Route path="students" element={<StudentList />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/edit/:id" element={<EditStudent />} />
        <Route path="students/details/:id" element={<StudentDetails />} />
        <Route path="students/promotion" element={<StudentPromotion />} />

        {/* Teachers */}
        <Route path="teachers" element={<TeacherList />} />
        <Route path="teachers/add" element={<AddTeacher />} />
        <Route path="teachers/edit/:id" element={<EditTeacher />} />
        <Route path="teachers/details/:id" element={<TeacherDetails />} />

        {/* Parents */}
        <Route path="parents" element={<ParentList />} />

        {/* Classes, Sections, Subjects */}
        <Route path="classes" element={<ClassList />} />
        <Route path="classes/sections" element={<SectionList />} />
        <Route path="classes/subjects" element={<SubjectList />} />

        {/* Attendance */}
        <Route path="attendance/student" element={<StudentAttendance />} />
        <Route path="attendance/teacher" element={<TeacherAttendance />} />
        <Route path="attendance/report" element={<AttendanceReport />} />

        {/* Timetable */}
        <Route path="timetable" element={<AdminTimetable />} />

        {/* Examinations */}
        <Route path="exams" element={<ExamList />} />
        <Route path="exams/marks" element={<AdminMarks />} />
        <Route path="exams/results" element={<AdminResults />} />
        <Route path="exams/report-card" element={<ReportCard />} />

        {/* Fees Management */}
        <Route path="fees/structure" element={<FeeStructure />} />
        <Route path="fees/collect" element={<CollectFees />} />
        <Route path="fees/pending" element={<PendingFees />} />
        <Route path="fees/receipts" element={<Receipts />} />

        {/* Homework, Notices, Reports, Settings */}
        <Route path="homework" element={<AdminHomework />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Teacher Routes (Directly Accessible) */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="classes" element={<TeacherMyClasses />} />
        <Route path="students" element={<TeacherMyStudents />} />
        <Route path="attendance" element={<TeacherAttendancePage />} />
        <Route path="timetable" element={<TeacherTimetable />} />
        <Route path="homework" element={<TeacherHomework />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="marks" element={<TeacherMarks />} />
        <Route path="notices" element={<TeacherNotices />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* Student Routes (Directly Accessible) */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="attendance" element={<MyAttendance />} />
        <Route path="timetable" element={<MyTimetable />} />
        <Route path="homework" element={<MyHomework />} />
        <Route path="exams" element={<MyExams />} />
        <Route path="results" element={<MyResults />} />
        <Route path="fees" element={<MyFees />} />
        <Route path="notices" element={<StudentNotices />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
