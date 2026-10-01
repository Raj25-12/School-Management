import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  Search,
  ChevronRight,
  Save,
  Layers,
  Clock,
  Receipt
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';
import { Button, Input, Badge, Card, Modal, EmptyState } from '../../../components/common';

const initialFeeStructures = [
  {
    id: 'FEE-10',
    className: 'Class 10 (Secondary)',
    tuitionFee: 32000,
    labFee: 6500,
    libraryFee: 2500,
    sportsFee: 3000,
    examFee: 4000,
    totalAnnual: 48000,
    paymentTerms: 'Quarterly (4 Installments)',
    studentsEnrolled: 84
  },
  {
    id: 'FEE-09',
    className: 'Class 9 (Secondary)',
    tuitionFee: 30000,
    labFee: 5500,
    libraryFee: 2500,
    sportsFee: 3000,
    examFee: 3500,
    totalAnnual: 44500,
    paymentTerms: 'Quarterly (4 Installments)',
    studentsEnrolled: 78
  },
  {
    id: 'FEE-11S',
    className: 'Class 11 (Science Stream)',
    tuitionFee: 42000,
    labFee: 12000,
    libraryFee: 3500,
    sportsFee: 3000,
    examFee: 4500,
    totalAnnual: 65000,
    paymentTerms: 'Quarterly (4 Installments)',
    studentsEnrolled: 62
  },
  {
    id: 'FEE-12C',
    className: 'Class 12 (Commerce Stream)',
    tuitionFee: 38000,
    labFee: 5000,
    libraryFee: 3500,
    sportsFee: 3000,
    examFee: 4500,
    totalAnnual: 54000,
    paymentTerms: 'Quarterly (4 Installments)',
    studentsEnrolled: 55
  }
];

const FeeStructure = () => {
  const { showToast } = useToast();
  const [structures, setStructures] = useState(initialFeeStructures);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    id: '',
    className: 'Class 10 (Secondary)',
    tuitionFee: 30000,
    labFee: 5000,
    libraryFee: 2000,
    sportsFee: 2000,
    examFee: 3000,
    paymentTerms: 'Quarterly (4 Installments)',
    studentsEnrolled: 50
  });

  const filtered = structures.filter(
    (s) =>
      s.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: `FEE-${Date.now().toString().slice(-3)}`,
      className: '',
      tuitionFee: 30000,
      labFee: 5000,
      libraryFee: 2000,
      sportsFee: 2000,
      examFee: 3000,
      paymentTerms: 'Quarterly (4 Installments)',
      studentsEnrolled: 40
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const totalAnnual =
      Number(formData.tuitionFee) +
      Number(formData.labFee) +
      Number(formData.libraryFee) +
      Number(formData.sportsFee) +
      Number(formData.examFee);

    if (modalMode === 'create') {
      setStructures([{ ...formData, totalAnnual, id: formData.id || `FEE-${Date.now().toString().slice(-3)}` }, ...structures]);
      showToast({ title: 'Fee Structure Added', message: `${formData.className} fees configured.`, type: 'emerald' });
    } else {
      setStructures(structures.map((s) => (s.id === formData.id ? { ...formData, totalAnnual } : s)));
      showToast({ title: 'Fee Structure Updated', message: `${formData.className} fees updated.`, type: 'emerald' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setStructures(structures.filter((s) => s.id !== id));
    showToast({ title: 'Structure Deleted', message: 'Fee tier removed.', type: 'rose' });
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
                <span>Financial & Fee Management Controller • Admin Portal</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Fee Structure & Tuitions
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Configure grade-level annual fees, tuition brackets, lab dues, and instalment terms.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link to="/admin/fees/collect">
              <Button variant="secondary" size="sm" icon={CreditCard}>
                Collect Fees
              </Button>
            </Link>
            <Button
              variant="emerald"
              size="sm"
              icon={Plus}
              onClick={openCreateModal}
            >
              New Fee Tier
            </Button>
          </div>
        </div>
      </Card>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
        <Link
          to="/admin/fees/structure"
          className="clay-btn-emerald px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-2"
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
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-2"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Payment Receipts</span>
        </Link>
      </div>

      {/* Fee Structure Cards Grid */}
      {filtered.length === 0 ? (
        <Card className="py-12">
          <EmptyState
            icon={CreditCard}
            title="No Fee Tiers Found"
            description="No fee tier matched your search query. Add a new tier above."
            actionLabel="Create Fee Tier"
            actionIcon={Plus}
            onAction={openCreateModal}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="p-5 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition relative space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {item.id}
                  </span>
                  <Badge variant="emerald" size="sm">
                    {item.studentsEnrolled} Students Active
                  </Badge>
                </div>

                <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                  {item.className}
                </h3>
                <p className="text-xs text-slate-400">{item.paymentTerms}</p>

                {/* Breakdown */}
                <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Tuition Fee:</span>
                    <span className="font-semibold">₹{item.tuitionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Laboratory & Tech:</span>
                    <span className="font-semibold">₹{item.labFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Library & Reading:</span>
                    <span className="font-semibold">₹{item.libraryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Sports & Activities:</span>
                    <span className="font-semibold">₹{item.sportsFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Annual Exam Fees:</span>
                    <span className="font-semibold">₹{item.examFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-sm font-black text-emerald-700 dark:text-emerald-300">
                    <span>Total Annual Fee:</span>
                    <span className="font-mono">₹{item.totalAnnual.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="secondary"
                    size="xs"
                    icon={Edit2}
                    onClick={() => openEditModal(item)}
                  />
                  <Button
                    variant="secondary"
                    size="xs"
                    icon={Trash2}
                    onClick={() => handleDelete(item.id)}
                    className="hover:text-rose-600"
                  />
                </div>

                <Link to="/admin/fees/collect">
                  <Button
                    variant="emerald"
                    size="xs"
                    icon={ChevronRight}
                    iconPosition="right"
                  >
                    Collect Payments
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Configure Fee Structure' : 'Edit Fee Structure'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-3.5">
          <Input
            label="Class / Grade Level *"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            placeholder="e.g. Class 10 (Secondary)"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tuition Fee (₹)"
              type="number"
              required
              value={formData.tuitionFee}
              onChange={(e) => setFormData({ ...formData, tuitionFee: Number(e.target.value) })}
            />
            <Input
              label="Laboratory Fee (₹)"
              type="number"
              required
              value={formData.labFee}
              onChange={(e) => setFormData({ ...formData, labFee: Number(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Library (₹)"
              type="number"
              value={formData.libraryFee}
              onChange={(e) => setFormData({ ...formData, libraryFee: Number(e.target.value) })}
            />
            <Input
              label="Sports (₹)"
              type="number"
              value={formData.sportsFee}
              onChange={(e) => setFormData({ ...formData, sportsFee: Number(e.target.value) })}
            />
            <Input
              label="Exam Fee (₹)"
              type="number"
              value={formData.examFee}
              onChange={(e) => setFormData({ ...formData, examFee: Number(e.target.value) })}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="emerald"
              size="md"
              icon={Save}
            >
              Save Fee Structure
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FeeStructure;
