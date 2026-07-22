"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileOrb() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 1, ease: "easeOut" }}
      className="pointer-events-none absolute left-10 top-[38%] z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:left-16"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-signal-cyan/30"
        />

        {/* hoverable photo — scales up and glows on hover */}
        <div
          className="glass-strong pointer-events-auto relative h-36 w-36 cursor-pointer overflow-hidden rounded-full p-1.5 transition-all duration-300 ease-out hover:scale-110 hover:border-signal-cyan/70 hover:shadow-[0_0_45px_12px_rgba(94,234,212,0.35)] xl:h-40 xl:w-40"
        >
          <div className="h-full w-full overflow-hidden rounded-full bg-void-soft">
            {!imgFailed ? (
              // Drop a square photo at /public/profile.jpg to replace this
              <img
                src="/profile.jpg"
                alt="Satyam"
                className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-signal-cyan/20 to-signal-violet/20">
                <span className="font-display text-3xl font-medium text-ink">
                  S
                </span>
              </div>
            )}
          </div>
        </div>

        {/* status dot */}
        <span className="pointer-events-none absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-void bg-signal-cyan xl:bottom-1.5 xl:right-1.5" />
      </motion.div>

      <div className="glass rounded-full px-3 py-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Open to work
        </p>
      </div>
    </motion.div>
  );
}
