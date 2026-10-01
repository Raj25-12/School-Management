import React from 'react';
import { AlertTriangle, Trash2, HelpCircle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

const iconVariants = {
  danger: Trash2,
  warning: AlertTriangle,
  info: HelpCircle,
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  const Icon = iconVariants[variant] || AlertTriangle;
  const iconTheme = variant === 'danger' ? 'rose' : variant === 'warning' ? 'amber' : 'sky';
  const confirmBtnVariant = variant === 'danger' ? 'danger' : variant === 'warning' ? 'warning' : 'primary';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={Icon}
      iconTheme={iconTheme}
      maxWidth="sm"
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmBtnVariant}
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {message}
      </p>
    </Modal>
  );
};

export default React.memo(ConfirmDialog);
