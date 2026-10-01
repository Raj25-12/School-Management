import React from 'react';
import {
  CreditCard,
  Printer,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button, Badge, Card } from '../../components/common';

const feeInstallments = [
  { term: 'Quarter 1 (Apr - Jun 2026)', amount: 14500, dueDate: '2026-04-10', paidDate: '2026-04-05', status: 'Paid', receiptNo: 'REC-2026-0418', mode: 'UPI' },
  { term: 'Quarter 2 (Jul - Sep 2026)', amount: 14500, dueDate: '2026-07-10', paidDate: '2026-07-08', status: 'Paid', receiptNo: 'REC-2026-0782', mode: 'NetBanking' },
  { term: 'Quarter 3 (Oct - Dec 2026)', amount: 14500, dueDate: '2026-10-10', paidDate: null, status: 'Due Soon', receiptNo: '—', mode: '—' },
  { term: 'Quarter 4 (Jan - Mar 2027)', amount: 14500, dueDate: '2027-01-10', paidDate: null, status: 'Upcoming', receiptNo: '—', mode: '—' },
];

const MyFees = () => {
  const { showToast } = useToast();

  const handlePayNow = (term) => {
    showToast({
      title: 'Payment Gateway',
      message: `Redirecting to payment desk for ${term} (₹14,500)...`,
      type: 'info'
    });
  };

  const handlePrintReceipt = (recNo) => {
    showToast({
      title: 'Downloading Tax Invoice',
      message: `Receipt ${recNo} downloaded.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <Card variant="sky" className="p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[11px] font-bold text-sky-900 dark:text-sky-200 mb-1 shadow-xs border border-sky-300/60">
              <CreditCard className="w-3.5 h-3.5 text-sky-700" />
              <span>Student Account & Fee Ledger</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              School Fees Ledger & Receipts
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Annual fee structure breakdown, installment payments, pending invoices, and tax receipts.
            </p>
          </div>
        </div>
      </Card>

      {/* 📊 KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Annual Total Fee</span>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">₹58,000</div>
            <span className="text-[10px] font-semibold text-slate-500">Class 10-A (Session 26-27)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 clay-icon-pill">
            <CreditCard className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Paid YTD</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₹29,000</div>
            <span className="text-[10px] font-semibold text-slate-500">2 Installments Cleared</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 clay-icon-pill">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Current Due Amount</span>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">₹14,500</div>
            <span className="text-[10px] font-semibold text-slate-500">Due by 10 Oct 2026</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 clay-icon-pill">
            <Clock className="w-4 h-4" />
          </div>
        </Card>
      </div>

      {/* 📋 Installments Table */}
      <Card className="overflow-hidden p-0">
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white">
            Quarterly Installment Schedule
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Fee Installment Term</th>
                <th className="py-3 px-4">Amount Due</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {feeInstallments.map((inst, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">{inst.term}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-white">₹{inst.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{inst.dueDate}</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{inst.paidDate || '—'}</td>
                  <td className="py-3 px-4">
                    <Badge variant={inst.status === 'Paid' ? 'emerald' : inst.status === 'Due Soon' ? 'amber' : 'neutral'}>
                      {inst.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inst.status === 'Paid' ? (
                      <Button
                        variant="secondary"
                        size="xs"
                        icon={Printer}
                        onClick={() => handlePrintReceipt(inst.receiptNo)}
                      >
                        Receipt
                      </Button>
                    ) : inst.status === 'Due Soon' ? (
                      <Button
                        variant="sky"
                        size="xs"
                        icon={CreditCard}
                        onClick={() => handlePayNow(inst.term)}
                      >
                        Pay Online
                      </Button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-semibold">Not Due Yet</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MyFees;
