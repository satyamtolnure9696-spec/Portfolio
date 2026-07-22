"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  "INIT // SATYAM.SYS",
  "LOADING RENDER PIPELINE",
  "CALIBRATING PARTICLE FIELD",
  "LINKING SIGNAL / VIOLET",
  "READY",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18 + 6, 100);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const step = Math.floor((progress / 100) * (BOOT_LINES.length - 1));
    setLineIndex(step);
    if (progress >= 100) {
      const t = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative h-16 w-16">
              <motion.div
                className="absolute inset-0 rounded-full border border-signal-cyan/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-signal-violet/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-signal-cyan">
                {Math.floor(progress)}%
              </div>
            </div>

            <p className="font-mono text-[11px] tracking-[0.25em] text-ink-muted">
              {BOOT_LINES[lineIndex]}
            </p>

            <div className="h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-signal-cyan via-signal-violet to-signal-amber"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
