import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Receipt,
  Layers,
  Clock
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';
import { Button, Input, Select, Badge, Card, Modal, EmptyState } from '../../../components/common';

const initialStudentsFeeData = [
  { id: 'STU-101', rollNo: '10A-01', name: 'Rohan Sharma', class: 'Class 10-A', totalFee: 48000, paidAmount: 36000, dueAmount: 12000, lastPaymentDate: '2026-07-15', status: 'Partially Paid' },
  { id: 'STU-102', rollNo: '10A-02', name: 'Alex Johnson', class: 'Class 10-A', totalFee: 48000, paidAmount: 48000, dueAmount: 0, lastPaymentDate: '2026-09-05', status: 'Paid in Full' },
  { id: 'STU-103', rollNo: '10A-03', name: 'Priya Gupta', class: 'Class 10-A', totalFee: 48000, paidAmount: 24000, dueAmount: 24000, lastPaymentDate: '2026-06-10', status: 'Due (Quarter 2)' },
  { id: 'STU-104', rollNo: '10A-04', name: 'Aarav Mehta', class: 'Class 10-A', totalFee: 48000, paidAmount: 48000, dueAmount: 0, lastPaymentDate: '2026-08-28', status: 'Paid in Full' },
  { id: 'STU-105', rollNo: '10A-05', name: 'Pooja Verma', class: 'Class 10-A', totalFee: 48000, paidAmount: 12000, dueAmount: 36000, lastPaymentDate: '2026-04-12', status: 'Overdue' }
];

const payModeOptions = [
  { value: 'UPI / QR Code', label: 'UPI / QR Code (PhonePe, GPay, Paytm)' },
  { value: 'Net Banking / NEFT', label: 'Net Banking / NEFT / IMPS' },
  { value: 'Debit / Credit Card', label: 'Debit / Credit Card (POS)' },
  { value: 'Cash at Counter', label: 'Cash at Counter' },
  { value: 'Cheque / DD', label: 'Bank Cheque / Demand Draft' },
];

const CollectFees = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(initialStudentsFeeData);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectModalStudent, setCollectModalStudent] = useState(null);
  const [payAmount, setPayAmount] = useState(12000);
  const [payMode, setPayMode] = useState('UPI / QR Code');

  const filtered = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!collectModalStudent) return;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === collectModalStudent.id) {
          const newPaid = s.paidAmount + Number(payAmount);
          const newDue = Math.max(0, s.totalFee - newPaid);
          return {
            ...s,
            paidAmount: newPaid,
            dueAmount: newDue,
            lastPaymentDate: new Date().toISOString().split('T')[0],
            status: newDue === 0 ? 'Paid in Full' : 'Partially Paid'
          };
        }
        return s;
      })
    );

    showToast({
      title: 'Payment Received ✅',
      message: `₹${payAmount.toLocaleString()} received for ${collectModalStudent.name} via ${payMode}.`,
      type: 'emerald'
    });
    setCollectModalStudent(null);
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
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant Fee Collection & POS Desk • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Collect Student Fees
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Process tuition instalments, online UPI payments, bank transfers, and print instant receipts.
              </p>
            </div>
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
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Collect Fees</span>
        </Link>
        <Link
          to="/admin/fees/pending"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
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

      {/* Search Bar */}
      <Card className="p-3.5 flex items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name, roll number, ID..."
            icon={Search}
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        {filtered.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={CreditCard}
              title="No Student Fee Records Found"
              description="No matching student accounts found for your search query."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Total Annual Fee</th>
                  <th className="py-3 px-4">Paid So Far</th>
                  <th className="py-3 px-4">Remaining Due</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Collect Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 dark:text-white">{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.rollNo} • {s.id}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{s.class}</td>
                    <td className="py-3 px-4 font-mono font-semibold">₹{s.totalFee.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{s.paidAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">
                      ₹{s.dueAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={s.dueAmount === 0 ? 'emerald' : 'amber'}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {s.dueAmount > 0 ? (
                        <Button
                          variant="emerald"
                          size="xs"
                          icon={CreditCard}
                          onClick={() => {
                            setCollectModalStudent(s);
                            setPayAmount(Math.min(12000, s.dueAmount));
                          }}
                        >
                          Collect
                        </Button>
                      ) : (
                        <Link to="/admin/fees/receipts">
                          <Button variant="secondary" size="xs" icon={Receipt}>
                            Receipt
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Collect Fee Modal */}
      <Modal
        isOpen={Boolean(collectModalStudent)}
        onClose={() => setCollectModalStudent(null)}
        title={`Collect Fees • ${collectModalStudent?.name || ''}`}
        size="md"
      >
        {collectModalStudent && (
          <form onSubmit={handlePaySubmit} className="space-y-4">
            <p className="text-xs text-slate-500">
              Roll No: {collectModalStudent.rollNo} • Remaining Due: ₹{collectModalStudent.dueAmount.toLocaleString()}
            </p>

            <Input
              label="Payment Amount (₹)"
              type="number"
              required
              max={collectModalStudent.dueAmount}
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
            />

            <Select
              label="Payment Mode"
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
              options={payModeOptions}
            />

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setCollectModalStudent(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="emerald"
                size="md"
                icon={CheckCircle2}
              >
                Confirm Payment
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CollectFees;
