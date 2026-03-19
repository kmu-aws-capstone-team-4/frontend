import { useToast } from './useToast';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: <CheckCircle className="text-success" size={20} />,
  error: <AlertCircle className="text-error" size={20} />,
  info: <Info className="text-blue-500" size={20} />,
  warning: <AlertTriangle className="text-warning" size={20} />,
};

export const ToastProvider = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start gap-3 w-[350px] bg-card-bg border border-border rounded-lg shadow-lg p-4 pointer-events-auto transform transition-all duration-300 translate-y-0 opacity-100"
        >
          <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
          <div className="flex-1 flex flex-col gap-1">
            {toast.title && <h4 className="text-sm font-semibold text-text-primary">{toast.title}</h4>}
            <p className="text-sm text-text-secondary">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
