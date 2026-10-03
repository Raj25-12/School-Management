import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Receipt,
  Search,
  Printer,
  CreditCard,
  Layers,
  Clock
} from 'lucide-react';
import logo from '../../../assets/logo_clean.png';
import {
  Button,
  Input,
  Card,
  Modal,
  EmptyState
} from '../../../components/common';

const initialReceipts = [
  { id: 'REC-9042', receiptNo: 'GPHS/2026/0942', student: 'Alex Johnson', rollNo: '10A-02', class: 'Class 10-A', amount: 12000, mode: 'UPI / PhonePe', date: '2026-09-28', txnId: 'TXN8912783948', term: 'Quarter 3 Installment' },
  { id: 'REC-9041', receiptNo: 'GPHS/2026/0941', student: 'Rohan Sharma', rollNo: '10A-01', class: 'Class 10-A', amount: 12000, mode: 'Net Banking NEFT', date: '2026-09-25', txnId: 'NEFT49102840', term: 'Quarter 3 Installment' },
  { id: 'REC-9040', receiptNo: 'GPHS/2026/0940', student: 'Aarav Mehta', rollNo: '10A-04', class: 'Class 10-A', amount: 24000, mode: 'Debit Card (POS)', date: '2026-09-20', txnId: 'POS89123019', term: 'Quarter 2 & 3 Installment' },
  { id: 'REC-9039', receiptNo: 'GPHS/2026/0939', student: 'Ananya Roy', rollNo: '10A-07', class: 'Class 10-A', amount: 12000, mode: 'Cash at Counter', date: '2026-09-15', txnId: 'CSH-0939', term: 'Quarter 3 Installment' }
];

const Receipts = () => {
  const [receipts] = useState(initialReceipts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return receipts;
    return receipts.filter(
      (r) =>
        (r.student && r.student.toLowerCase().includes(q)) ||
        (r.receiptNo && r.receiptNo.toLowerCase().includes(q)) ||
        (r.txnId && r.txnId.toLowerCase().includes(q))
    );
  }, [receipts, searchQuery]);

  const handleSelectReceipt = useCallback((r) => {
    setSelectedReceipt(r);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedReceipt(null);
  }, []);

  const handlePrintDocument = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <Card variant="emerald">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <img src={logo} alt="School Management" className="w-full h-full object-contain dark:brightness-0 dark:invert transition" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                <Receipt className="w-3.5 h-3.5 text-emerald-500" />
                <span>Financial Receipts & Transaction Audit • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Payment Receipts & Invoices
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Generate official fee payment receipts with school tax headers, GST number, and student stamp.
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
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
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
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Payment Receipts</span>
        </Link>
      </div>

      {/* Search */}
      <Card padding="p-3.5">
        <div className="w-80">
          <Input
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search receipt no, student, transaction ID..."
          />
        </div>
      </Card>

      {/* Receipts Table */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Receipt Number</th>
                <th className="py-3 px-4">Student & Class</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Payment Mode & Txn ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Print Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      title="No receipts found"
                      description="No payment transactions match your query."
                    />
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      {r.receiptNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 dark:text-white">{r.student}</div>
                      <div className="text-[10px] text-slate-400">{r.class} • {r.rollNo}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                      ₹{r.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-700 dark:text-slate-300">{r.mode}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.txnId}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{r.date}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="xs"
                        icon={Printer}
                        onClick={() => handleSelectReceipt(r)}
                        className="text-emerald-700 dark:text-emerald-300"
                      >
                        Print Slip
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Printable Receipt Modal */}
      <Modal
        isOpen={Boolean(selectedReceipt)}
        onClose={handleCloseModal}
        title="Greenwood Public High School"
        subtitle={selectedReceipt ? `Official Fee Receipt • ${selectedReceipt.receiptNo}` : ''}
        icon={Receipt}
        iconTheme="emerald"
        maxWidth="md"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button
              variant="emerald"
              size="sm"
              icon={Printer}
              onClick={handlePrintDocument}
            >
              Print Document
            </Button>
          </>
        }
      >
        {selectedReceipt && (
          <div className="space-y-2 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl">
            <div className="flex justify-between">
              <span className="text-slate-400">Student:</span>
              <span className="font-bold text-slate-800 dark:text-white">{selectedReceipt.student} ({selectedReceipt.rollNo})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Class:</span>
              <span className="font-semibold">{selectedReceipt.class}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Description:</span>
              <span className="font-semibold">{selectedReceipt.term}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Mode:</span>
              <span className="font-semibold">{selectedReceipt.mode} ({selectedReceipt.txnId})</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2 text-sm font-black text-emerald-700 dark:text-emerald-300">
              <span>Amount Paid:</span>
              <span>₹{selectedReceipt.amount.toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Receipts;
