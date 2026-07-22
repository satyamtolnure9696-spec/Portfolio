"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "Year", value: "S.Y. B.Tech" },
  { label: "SGPA", value: "9.05" },
  { label: "Branch", value: "CSE(AI/ML)" },
  { label: "Address", value: "Pune, Maharashtra" },
  { label: "Interest", value: "Embedded + Web" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const line = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-4xl px-6 py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={line}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal-cyan"
        >
          About
        </motion.p>
        <motion.h2
          variants={line}
          className="mt-4 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl"
        >
          I like systems where the hardware and the interface have to agree
          with each other.
        </motion.h2>
        <motion.p
          variants={line}
          className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base"
        >
          I&apos;m a Computer Engineering student at VIT Pune, currently in my
          second year. My interest in building things started with C and
          microcontrollers — wiring up an ESP32-CAM, getting boards to talk to
          each other over UART, I2C, and SPI — before it moved onto the web.
          That order still shapes how I build: I think in terms of signals,
          state, and what happens at the edges before I think about how
          something looks.
        </motion.p>
        <motion.p
          variants={line}
          className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base"
        >
          Right now I split my time between two things. One is a structured
          90-day pass through data structures and algorithms in C++ — daily
          problems, tracked properly, not just solved and forgotten. The other
          is shipping real, used software: a website for VIT&apos;s student
          clubs, and this portfolio, built from scratch rather than a template
          because I wanted to actually understand the render pipeline
          underneath it.
        </motion.p>
        <motion.p
          variants={line}
          className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base"
        >
          I&apos;m most interested in the seam between the two worlds — places
          where a physical system needs a good interface, or a web interface
          needs to behave like it understands hardware constraints. That&apos;s
          the kind of problem I want to keep working on.
        </motion.p>

        <motion.div
          variants={container}
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={line}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-signal-cyan/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(94,234,212,0.18)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                {stat.label}
              </p>
              <p className="mt-1.5 font-display text-sm text-ink sm:text-base">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
