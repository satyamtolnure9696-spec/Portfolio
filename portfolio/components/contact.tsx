"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, Send, Check, X } from "lucide-react";
import { Button } from "./ui/button";

const WEB3FORMS_ACCESS_KEY = "cf7e2d0b-855b-4fec-ad55-a5627fb65f04";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${form.name || "a visitor"}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-signal-cyan"
      >
        Contact
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-4 text-center font-display text-3xl font-medium tracking-tight sm:text-4xl"
      >
        Let&apos;s build something.
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass mt-12 flex flex-col gap-4 rounded-2xl p-6"
        onSubmit={handleSubmit}
      >
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-dim focus:border-signal-cyan/50"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-dim focus:border-signal-cyan/50"
        />
        <textarea
          required
          rows={4}
          placeholder="What are you thinking of building?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-dim focus:border-signal-cyan/50"
        />

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={status === "sending"} className="self-start">
            <Send size={13} />
            {status === "sending" ? "Sending..." : "Send message"}
          </Button>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-signal-cyan"
              >
                <Check size={13} /> Message sent
              </motion.span>
            )}
            {status === "error" && (
              <motion.span
                key="error"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-red-400"
              >
                <X size={13} /> Something went wrong, try again
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.form>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink transition-all hover:-translate-y-0.5 hover:border-signal-cyan/50 hover:text-signal-cyan"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:border-signal-cyan/50"
        >
          <Download size={13} />
          Download résumé
        </a>
      </div>

      <p className="mt-20 text-center font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        Built by Satyam · {new Date().getFullYear()}
      </p>
    </section>
  );
}
