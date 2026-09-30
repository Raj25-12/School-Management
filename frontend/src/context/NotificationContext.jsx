import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const NotificationContext = createContext(null);

const STORAGE_KEY_NOTIFS = 'school_notifications_data_v2';
const STORAGE_KEY_MSGS = 'school_messages_data_v2';

const stripEmojis = (str) => {
  if (!str) return '';
  return str.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '').trim();
};

const defaultNotifications = [
  {
    id: 'ntf-admin-all-1',
    title: 'Annual Sports Day Registrations Open',
    message: 'Registrations are now open for track & field, football, and basketball events. Contact sports coordinator before Oct 15th.',
    senderRole: 'admin',
    senderName: 'Principal Administration',
    senderEmail: 'admin@school.com',
    targetAudience: 'all', // 'all' | 'teachers' | 'students'
    targetClass: 'All Classes',
    type: 'events',
    priority: 'normal',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    readBy: [],
    pinned: true,
  },
  {
    id: 'ntf-admin-teacher-1',
    title: 'Faculty Academic Review Meeting',
    message: 'All teaching faculty members are requested to attend the term curriculum review in Conference Room B this Friday at 3:30 PM.',
    senderRole: 'admin',
    senderName: 'Admin Academic Cell',
    senderEmail: 'admin@school.com',
    targetAudience: 'teachers',
    targetClass: 'All Teachers',
    type: 'urgent',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    readBy: [],
    pinned: false,
  },
  {
    id: 'ntf-admin-student-1',
    title: 'Mid-Term Examination Date Sheet Released',
    message: 'The official schedule for Semester 1 Mid-Term examinations has been published. Please check your exam portal for seating plans.',
    senderRole: 'admin',
    senderName: 'Examination Board',
    senderEmail: 'admin@school.com',
    targetAudience: 'students',
    targetClass: 'All Students',
    type: 'exam',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    readBy: [],
    pinned: true,
  },
  {
    id: 'ntf-teacher-student-1',
    title: 'Mathematics Chapter 4 Assignment Due',
    message: 'Class 10-A students: Please complete Exercise 4.2 (Quadratic Equations, Q1 to Q12) and upload to the homework portal by Thursday 5 PM.',
    senderRole: 'teacher',
    senderName: 'Prof. Rajesh Sharma',
    senderEmail: 'teacher@school.com',
    targetAudience: 'students',
    targetClass: 'Class 10-A',
    type: 'homework',
    priority: 'normal',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    readBy: [],
    pinned: false,
  },
  {
    id: 'ntf-teacher-student-2',
    title: 'Physics Lab Practical Session Reminder',
    message: 'Bring your completed lab manuals for the Optics experiment session scheduled for period 3 tomorrow.',
    senderRole: 'teacher',
    senderName: 'Dr. Sunita Verma',
    senderEmail: 'dr.verma@school.com',
    targetAudience: 'students',
    targetClass: 'Class 10-A',
    type: 'general',
    priority: 'normal',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    readBy: [],
    pinned: false,
  },
];

const defaultMessages = [
  {
    id: 'msg-1',
    subject: 'Doubt regarding Quadratic Formula step in Exercise 4.2',
    message: 'Respected Prof. Sharma, in Question 7, when discriminant is negative, should we stop at no real roots or write imaginary roots format? Thank you, Alex.',
    senderRole: 'student',
    senderName: 'Alex Johnson',
    senderEmail: 'student@school.com',
    senderClass: 'Class 10-A',
    toRole: 'teacher',
    toName: 'Prof. Rajesh Sharma',
    toEmail: 'teacher@school.com',
    category: 'Doubt',
    status: 'replied',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    reply: 'Hello Alex, for Class 10 curriculum, simply mention "No real roots exist". We will cover complex roots in Class 11.',
    repliedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'msg-2',
    subject: 'Request for 2-Day Sick Leave for Medical Recovery',
    message: 'Dear Admin & Class Teacher, I am down with viral flu and the doctor has advised 2 days bed rest (Oct 2 - Oct 3). Medical certificate attached in portal.',
    senderRole: 'student',
    senderName: 'Alex Johnson',
    senderEmail: 'student@school.com',
    senderClass: 'Class 10-A',
    toRole: 'admin',
    toName: 'Principal Administration',
    toEmail: 'admin@school.com',
    category: 'Leave Application',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
    reply: 'Leave approved. Take care and catch up on missed homework once recovered.',
    repliedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
  },
];

export const NotificationProvider = ({ children }) => {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(n => ({ ...n, title: stripEmojis(n.title), message: stripEmojis(n.message) }));
      }
      return defaultNotifications;
    } catch {
      return defaultNotifications;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MSGS);
      return saved ? JSON.parse(saved) : defaultMessages;
    } catch {
      return defaultMessages;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages', e);
    }
  }, [messages]);

  // Send Broadcast Notification (Admin or Teacher)
  const sendNotification = ({
    title,
    message,
    targetAudience = 'all', // 'all', 'teachers', 'students', 'class-10-a'
    targetClass = 'All Classes',
    type = 'general', // 'general', 'exam', 'homework', 'urgent', 'events', 'fees'
    priority = 'normal', // 'normal', 'high', 'urgent'
    senderRole = 'admin',
    senderName = 'Administrator',
    senderEmail = 'admin@school.com',
    pinned = false,
  }) => {
    const cleanTitle = stripEmojis(title);
    const cleanMessage = stripEmojis(message);

    const newNotif = {
      id: 'ntf-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      title: cleanTitle,
      message: cleanMessage,
      targetAudience,
      targetClass,
      type,
      priority,
      senderRole,
      senderName,
      senderEmail,
      pinned,
      createdAt: new Date().toISOString(),
      readBy: [],
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Show top-right toaster
    showToast({
      title: 'Notification Broadcasted',
      message: `Sent to ${targetAudience.toUpperCase()} (${targetClass})`,
      type: 'success',
    });

    return newNotif;
  };

  // Send Direct Mail / Message (Student <-> Teacher <-> Admin)
  const sendMailMessage = ({
    subject,
    message,
    category = 'General Query',
    toRole = 'teacher',
    toName = 'Prof. Rajesh Sharma',
    toEmail = 'teacher@school.com',
    senderRole = 'student',
    senderName = 'Alex Johnson',
    senderEmail = 'student@school.com',
    senderClass = 'Class 10-A',
  }) => {
    const cleanSubject = stripEmojis(subject);
    const cleanMsg = stripEmojis(message);

    const newMsg = {
      id: 'msg-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      subject: cleanSubject,
      message: cleanMsg,
      category,
      toRole,
      toName,
      toEmail,
      senderRole,
      senderName,
      senderEmail,
      senderClass,
      status: 'pending',
      createdAt: new Date().toISOString(),
      reply: null,
      repliedAt: null,
    };

    setMessages((prev) => [newMsg, ...prev]);

    // Automatically create an alert notification for recipient
    const alertNotif = {
      id: 'ntf-mail-' + Date.now().toString(36),
      title: `New Mail from ${senderName} (${senderRole.toUpperCase()})`,
      message: `${cleanSubject}: "${cleanMsg.length > 70 ? cleanMsg.substring(0, 70) + '...' : cleanMsg}"`,
      targetAudience: toRole === 'admin' ? 'admin' : toRole === 'teacher' ? 'teachers' : 'students',
      recipientEmail: toEmail,
      targetClass: senderClass || 'Direct Mail',
      type: 'mail',
      priority: category === 'Leave Application' ? 'high' : 'normal',
      senderRole,
      senderName,
      senderEmail,
      pinned: false,
      createdAt: new Date().toISOString(),
      readBy: [],
      mailId: newMsg.id,
    };

    setNotifications((prev) => [alertNotif, ...prev]);

    // Show top-right success toast
    showToast({
      title: 'Mail Sent Successfully',
      message: `Delivered to ${toName} (${toEmail})`,
      type: 'info',
    });

    return newMsg;
  };

  // Reply to a message
  const replyToMessage = (messageId, replyText, replierName = 'Teacher') => {
    let targetMsg = null;
    const cleanReply = stripEmojis(replyText);

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          targetMsg = { ...msg, reply: cleanReply, status: 'replied', repliedAt: new Date().toISOString() };
          return targetMsg;
        }
        return msg;
      })
    );

    if (targetMsg) {
      // Create notification for original sender
      const alertNotif = {
        id: 'ntf-reply-' + Date.now().toString(36),
        title: `Reply from ${replierName} regarding "${targetMsg.subject.substring(0, 30)}"`,
        message: `Reply: "${cleanReply.length > 80 ? cleanReply.substring(0, 80) + '...' : cleanReply}"`,
        targetAudience: targetMsg.senderRole === 'student' ? 'students' : 'teachers',
        recipientEmail: targetMsg.senderEmail,
        targetClass: targetMsg.senderClass || 'Direct Reply',
        type: 'mail',
        priority: 'normal',
        senderRole: 'teacher',
        senderName: replierName,
        senderEmail: targetMsg.toEmail,
        pinned: false,
        createdAt: new Date().toISOString(),
        readBy: [],
        mailId: targetMsg.id,
      };

      setNotifications((prev) => [alertNotif, ...prev]);

      showToast({
        title: 'Reply Sent',
        message: `Reply sent to ${targetMsg.senderName}`,
        type: 'success',
      });
    }
  };

  // Filter notifications relevant to current user role & email
  const getNotificationsForUser = (currentUser) => {
    if (!currentUser) return notifications;

    const role = currentUser.role || 'student';
    const email = currentUser.email || '';

    return notifications.filter((notif) => {
      // Specific recipient email
      if (notif.recipientEmail && notif.recipientEmail.toLowerCase() === email.toLowerCase()) {
        return true;
      }

      // If sent to all
      if (notif.targetAudience === 'all') return true;

      // Admin sees everything
      if (role === 'admin') return true;

      // Role match
      if (role === 'teacher' && (notif.targetAudience === 'teachers' || notif.targetAudience === 'teacher')) {
        return true;
      }

      if (role === 'student' && (notif.targetAudience === 'students' || notif.targetAudience === 'student' || notif.targetAudience === 'class-10-a')) {
        return true;
      }

      return false;
    });
  };

  // Mark a single notification as read
  const markAsRead = (notificationId, userEmail = '') => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === notificationId) {
          const currentReadBy = notif.readBy || [];
          if (!currentReadBy.includes(userEmail)) {
            return { ...notif, readBy: [...currentReadBy, userEmail], read: true };
          }
          return { ...notif, read: true };
        }
        return notif;
      })
    );
  };

  // Mark all notifications for user as read
  const markAllAsRead = (userEmail = '') => {
    setNotifications((prev) =>
      prev.map((notif) => {
        const currentReadBy = notif.readBy || [];
        return {
          ...notif,
          read: true,
          readBy: currentReadBy.includes(userEmail) ? currentReadBy : [...currentReadBy, userEmail],
        };
      })
    );

    showToast({
      title: 'Notifications Updated',
      message: 'All notifications marked as read',
      type: 'success',
    });
  };

  // Delete notification
  const deleteNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    showToast({
      title: 'Notification Removed',
      message: 'Notification was deleted from history',
      type: 'info',
    });
  };

  // Delete message
  const deleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
    showToast({
      title: 'Message Deleted',
      message: 'Message was removed from records',
      type: 'info',
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        messages,
        sendNotification,
        sendMailMessage,
        replyToMessage,
        getNotificationsForUser,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
