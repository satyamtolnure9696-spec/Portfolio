"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "VIT Club Website",
    tag: "Client-side web app",
    description:
      "A web platform for VIT Pune's student clubs — event listings, member info, and club pages in one place.",
    href: "#",
  },
  {
    title: "ESP32 Access Control",
    tag: "Embedded systems",
    description:
      "An ESP32-CAM based access-control concept, exploring UART, I2C, and SPI communication between microcontrollers.",
    href: "#",
  },
  {
    title: "DSA Journey",
    tag: "Problem solving",
    description:
      "A structured 90-day roadmap through data structures and algorithms in C++, tracked across LeetCode and GfG.",
    href: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-5xl px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal-cyan"
      >
        Projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-4xl"
      >
        Things I&apos;ve shipped and taken apart.
      </motion.h2>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass group flex flex-col justify-between rounded-2xl p-6 transition-colors hover:border-signal-cyan/40"
          >
            <div>
              <div className="flex items-start justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal-violet">
                  {project.tag}
                </p>
                <ArrowUpRight
                  size={16}
                  className="text-ink-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-cyan"
                />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
