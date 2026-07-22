"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <nav className="glass-strong flex w-[92%] max-w-3xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="font-display text-sm font-medium tracking-tight">
          S<span className="text-signal-cyan">.</span>
        </a>

        <ul className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-ink-muted sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-signal-cyan">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className="glass hidden items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:border-signal-cyan/50 sm:flex"
          >
            <Download size={12} />
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
