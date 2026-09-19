"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDialog } from "./useDialog";

/** Side drawer (right on desktop, bottom sheet on mobile). */
export function Drawer({
  open,
  onClose,
  label,
  closeLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(open, ref, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[65]">
          <motion.button
            type="button"
            aria-label={closeLabel}
            tabIndex={-1}
            className="absolute inset-0 bg-[#07152b]/45 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            data-lenis-prevent
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto bg-surface shadow-[-24px_0_60px_-30px_rgb(var(--shadow)/0.5)] sm:rounded-l-[28px]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="sticky top-4 z-10 ml-auto mr-4 mt-4 grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
