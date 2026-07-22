"use client";

import { motion } from "framer-motion";

const GROUPS = [
  {
    label: "Languages",
    items: ["C", "C++", "JavaScript", "TypeScript"],
  },
  {
    label: "Web",
    items: ["React", "Next.js", "Tailwind CSS", "Three.js"],
  },
  {
    label: "Systems",
    items: ["Arduino", "ESP32", "UART / I2C / SPI", "Embedded C"],
  },
  {
    label: "Foundations",
    items: ["Data Structures", "Algorithms", "OOP", "Git"],
  },
];

const GLOW_GROUPS = ["Languages", "Web", "Systems", "Foundations"];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal-cyan"
      >
        Skills
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-4xl"
      >
        A toolkit spanning silicon and syntax.
      </motion.h2>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className={`glass group rounded-2xl p-5 transition-all ${GLOW_GROUPS.includes(group.label) ? 'hover:border-signal-cyan/40 hover:shadow-[0_0_40px_rgba(94,234,212,0.18)]' : 'hover:border-white/10'}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal-violet">
              {group.label}
            </p>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={`font-display text-sm text-ink transition-all ${['C', 'C++'].includes(item) ? 'hover:scale-105' : ''}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
