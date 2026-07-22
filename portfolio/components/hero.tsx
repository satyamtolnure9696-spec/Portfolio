"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import TypingEffect from "./typing-effect";
import ProfileOrb from "./profile-orb";
import IDCard from "./id-card";

const SceneCanvas = dynamic(() => import("./scene/scene-canvas"), {
  ssr: false,
});

const SOCIALS = [
  { href: "https://github.com/", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    // Ambient, always-visible pulse — not gated behind scroll position,
    // so it can never leave content stuck in a hidden state.
    const tween = gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.08,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      <SceneCanvas />
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 bg-grid-glow"
      />

      <ProfileOrb />
      <IDCard />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="glass mb-6 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-signal-cyan"
        >
          Computer Engineering · VIT Pune
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          welcome
          <br />
          <span className="text-gradient">Satyam Tolnure</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-mono text-sm text-ink-muted sm:text-base"
        >
          <TypingEffect
            words={[
              "web developer.",
              "embedded systems tinkerer.",
              "DSA problem solver.",
              "3D interface builder.",
            ]}
          />
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-ink-muted sm:text-base"
        >
          I design and ship interfaces that sit close to the hardware they
          run on — from access-control circuits to real-time 3D on the web.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex items-center gap-4">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
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
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-ink-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
