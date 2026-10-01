import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no items matching your criteria at this time.',
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center space-y-3 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center clay-icon-pill">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">{title}</h4>
        {description && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-sm mt-0.5">
            {description}
          </p>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
};

export default React.memo(EmptyState);
