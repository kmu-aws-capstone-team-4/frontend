import { forwardRef, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ isOpen, onClose, title, children, className = '' }, ref) => {
    // Determine internal ref to use with dialog API
    const internalRef = useRef<HTMLDialogElement>(null);
    const dialogRef = (ref as React.MutableRefObject<HTMLDialogElement>) || internalRef;

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        if (dialog.open) {
          dialog.close();
        }
      }
    }, [isOpen, dialogRef]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      
      if (!isInDialog) {
        onClose();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        className={`backdrop:bg-black/50 bg-card-bg text-text-primary rounded-xl shadow-lg border border-border p-0 min-w-[320px] max-w-lg w-full ${className}`}
        onClick={handleBackdropClick}
        onCancel={onClose}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-muted-bg transition-colors ml-auto"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </dialog>
    );
  }
);
Modal.displayName = 'Modal';
