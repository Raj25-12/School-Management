import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Send,
  Search,
  CreditCard,
  Layers,
  Receipt,
  Phone,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';
import { Button, Input, Badge, Card, EmptyState } from '../../../components/common';

const initialPendingList = [
  { id: 'STU-105', rollNo: '10A-05', name: 'Pooja Verma', class: 'Class 10-A', fatherName: 'Ashok Verma', contact: '+91 98012 34567', totalDue: 36000, overdueDays: 45, lastReminder: '2026-09-18' },
  { id: 'STU-103', rollNo: '10A-03', name: 'Priya Gupta', class: 'Class 10-A', fatherName: 'Rajesh Gupta', contact: '+91 98567 89012', totalDue: 24000, overdueDays: 20, lastReminder: '2026-09-24' },
  { id: 'STU-101', rollNo: '10A-01', name: 'Rohan Sharma', class: 'Class 10-A', fatherName: 'Manoj Sharma', contact: '+91 98765 43210', totalDue: 12000, overdueDays: 10, lastReminder: '2026-09-28' },
  { id: 'STU-112', rollNo: '9B-04', name: 'Aarav Mehta', class: 'Class 9-B', fatherName: 'Deepak Mehta', contact: '+91 98901 23456', totalDue: 18000, overdueDays: 32, lastReminder: '2026-09-15' },
  { id: 'STU-115', rollNo: '11S-08', name: 'Vikram Sethi', class: 'Class 11-Science', fatherName: 'Alok Sethi', contact: '+91 98345 67890', totalDue: 32500, overdueDays: 60, lastReminder: '2026-09-10' }
];

const PendingFees = () => {
  const { showToast } = useToast();
  const [list] = useState(initialPendingList);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.class.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [list, searchQuery]);

  const totalOutstanding = useMemo(() => {
    return list.reduce((acc, s) => acc + s.totalDue, 0);
  }, [list]);

  const handleSendReminder = (student) => {
    showToast({
      title: 'SMS & Email Reminder Dispatched 📲',
      message: `Payment reminder sent to ${student.fatherName} (${student.contact}).`,
      type: 'emerald'
    });
  };

  const handleSendAllReminders = () => {
    showToast({
      title: 'Bulk Reminders Sent 🚀',
      message: `SMS alerts sent to all ${list.length} parents with pending dues.`,
      type: 'emerald'
    });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <Card variant="emerald" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <img src={logo} alt="School Management" className="w-full h-full object-contain dark:brightness-0 dark:invert transition" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Outstanding Dues & Defaulters Desk • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Pending Fees & Defaulters
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Track overdue tuition installments, automated payment reminders via SMS/WhatsApp, and aging reports.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="emerald"
              size="sm"
              icon={Send}
              onClick={handleSendAllReminders}
            >
              Broadcast Reminders
            </Button>
          </div>
        </div>
      </Card>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
        <Link
          to="/admin/fees/structure"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Fee Structure</span>
        </Link>
        <Link
          to="/admin/fees/collect"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Collect Fees</span>
        </Link>
        <Link
          to="/admin/fees/pending"
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Dues</span>
        </Link>
        <Link
          to="/admin/fees/receipts"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Payment Receipts</span>
        </Link>
      </div>

      {/* Total Due Metric Bar & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-center">
        <Card className="p-4 sm:col-span-1 border-rose-200 dark:border-rose-900/50">
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400">Total Outstanding Fees</div>
          <div className="text-xl font-black text-slate-800 dark:text-white mt-1">₹{totalOutstanding.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{list.length} Defaulter Accounts</div>
        </Card>

        <Card className="p-3 sm:col-span-2 flex items-center justify-between">
          <div className="w-full">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, parent, roll number..."
              icon={Search}
            />
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        {filtered.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={Clock}
              title="No Pending Fees Found"
              description="No defaulter records matched your search query."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4">Student & Parent</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Total Due</th>
                  <th className="py-3 px-4">Overdue Days</th>
                  <th className="py-3 px-4">Last Reminder</th>
                  <th className="py-3 px-4 text-right">Send Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 dark:text-white">{s.name}</div>
                      <div className="text-[11px] text-slate-500">Parent: {s.fatherName}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{s.contact}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">{s.class}</td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                      ₹{s.totalDue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={s.overdueDays > 30 ? 'rose' : 'amber'}>
                        {s.overdueDays} Days Late
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {s.lastReminder}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="xs"
                        icon={Send}
                        onClick={() => handleSendReminder(s)}
                      >
                        Remind
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PendingFees;
