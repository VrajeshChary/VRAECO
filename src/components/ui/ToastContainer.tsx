import { useToastStore } from '../../store/useToastStore';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none items-center">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[300px] ${
              toast.type === 'success' ? 'bg-jade/10 border-jade/30 text-text-main' :
              toast.type === 'error' ? 'bg-ember/10 border-ember/30 text-text-main' :
              'bg-gold/10 border-gold/30 text-text-main'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-jade" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-ember" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-gold" />}
            <span className="text-[0.85rem] font-medium">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-auto text-text-muted hover:text-text-main cursor-pointer">
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
