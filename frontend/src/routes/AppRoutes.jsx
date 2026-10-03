import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts (Loaded eagerly for rapid shell rendering)
import AdminLayout from '../layouts/AdminLayout';
import TeacherLayout from '../layouts/TeacherLayout';
import StudentLayout from '../layouts/StudentLayout';
import Loader from '../components/common/Loader';


// Loading fallback component
const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full py-12">
    <Loader size="md" variant="primary" />
  </div>
);

// Auth Pages (Lazy)
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// Admin Pages (Lazy)
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const StudentList = lazy(() => import('../pages/admin/students/StudentList'));
const AddStudent = lazy(() => import('../pages/admin/students/AddStudent'));
const EditStudent = lazy(() => import('../pages/admin/students/EditStudent'));
const StudentDetails = lazy(() => import('../pages/admin/students/StudentDetails'));
const StudentPromotion = lazy(() => import('../pages/admin/students/StudentPromotion'));

const TeacherList = lazy(() => import('../pages/admin/teachers/TeacherList'));
const AddTeacher = lazy(() => import('../pages/admin/teachers/AddTeacher'));
const EditTeacher = lazy(() => import('../pages/admin/teachers/EditTeacher'));
const TeacherDetails = lazy(() => import('../pages/admin/teachers/TeacherDetails'));

const ParentList = lazy(() => import('../pages/admin/parents/ParentList'));

const ClassList = lazy(() => import('../pages/admin/classes/ClassList'));
const SectionList = lazy(() => import('../pages/admin/classes/SectionList'));
const SubjectList = lazy(() => import('../pages/admin/classes/SubjectList'));

const StudentAttendance = lazy(() => import('../pages/admin/attendance/StudentAttendance'));
const TeacherAttendance = lazy(() => import('../pages/admin/attendance/TeacherAttendance'));
const AttendanceReport = lazy(() => import('../pages/admin/attendance/AttendanceReport'));

const AdminTimetable = lazy(() => import('../pages/admin/timetable/Timetable'));

const ExamList = lazy(() => import('../pages/admin/exams/ExamList'));
const AdminMarks = lazy(() => import('../pages/admin/exams/Marks'));
const AdminResults = lazy(() => import('../pages/admin/exams/Results'));
const ReportCard = lazy(() => import('../pages/admin/exams/ReportCard'));

const FeeStructure = lazy(() => import('../pages/admin/fees/FeeStructure'));
const CollectFees = lazy(() => import('../pages/admin/fees/CollectFees'));
const PendingFees = lazy(() => import('../pages/admin/fees/PendingFees'));
const Receipts = lazy(() => import('../pages/admin/fees/Receipts'));

const AdminHomework = lazy(() => import('../pages/admin/homework/Homework'));
const AdminNotices = lazy(() => import('../pages/admin/notices/Notices'));
const AdminBroadcast = lazy(() => import('../pages/admin/notices/AdminBroadcast'));
const AdminMailbox = lazy(() => import('../pages/admin/notices/AdminMailbox'));
const AdminReports = lazy(() => import('../pages/admin/reports/Reports'));
const AdminSettings = lazy(() => import('../pages/admin/settings/Settings'));

// Teacher Pages (Lazy)
const TeacherDashboard = lazy(() => import('../pages/teacher/Dashboard'));
const TeacherMyClasses = lazy(() => import('../pages/teacher/MyClasses'));
const TeacherMyStudents = lazy(() => import('../pages/teacher/MyStudents'));
const TeacherAttendancePage = lazy(() => import('../pages/teacher/Attendance'));
const TeacherTimetable = lazy(() => import('../pages/teacher/Timetable'));
const TeacherHomework = lazy(() => import('../pages/teacher/Homework'));
const TeacherExams = lazy(() => import('../pages/teacher/Exams'));
const TeacherMarks = lazy(() => import('../pages/teacher/Marks'));
const TeacherNotices = lazy(() => import('../pages/teacher/Notices'));
const TeacherBroadcast = lazy(() => import('../pages/teacher/notices/TeacherBroadcast'));
const TeacherDoubts = lazy(() => import('../pages/teacher/notices/TeacherDoubts'));
const TeacherProfile = lazy(() => import('../pages/teacher/Profile'));

// Student Pages (Lazy)
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const MyProfile = lazy(() => import('../pages/student/MyProfile'));
const MyAttendance = lazy(() => import('../pages/student/MyAttendance'));
const MyTimetable = lazy(() => import('../pages/student/MyTimetable'));
const MyHomework = lazy(() => import('../pages/student/MyHomework'));
const MyExams = lazy(() => import('../pages/student/MyExams'));
const MyResults = lazy(() => import('../pages/student/MyResults'));
const MyFees = lazy(() => import('../pages/student/MyFees'));
const StudentNotices = lazy(() => import('../pages/student/Notices'));
const AskDoubt = lazy(() => import('../pages/student/notices/AskDoubt'));
const MyInquiries = lazy(() => import('../pages/student/notices/MyInquiries'));

// Common Pages (Lazy)
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* Root redirect to Login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Register />} />
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
          <Route path="timetable" element={<AdminTimetable initialScope="class" />} />
          <Route path="timetable/teacher" element={<AdminTimetable initialScope="teacher" />} />
          <Route path="timetable/room" element={<AdminTimetable initialScope="room" />} />
          <Route path="timetable/conflicts" element={<AdminTimetable initialScope="conflicts" />} />

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
          <Route path="notices/broadcast" element={<AdminBroadcast />} />
          <Route path="notices/mailbox" element={<AdminMailbox />} />
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
          <Route path="notices/broadcast" element={<TeacherBroadcast />} />
          <Route path="notices/doubts" element={<TeacherDoubts />} />
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
          <Route path="notices/ask-doubt" element={<AskDoubt />} />
          <Route path="notices/inquiries" element={<MyInquiries />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
