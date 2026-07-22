# Satyam — Portfolio

A futuristic 3D developer portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS, Framer Motion, React Three Fiber, GSAP, and shadcn/ui conventions.

## Design concept

**Signal / Circuit** — a dark, instrument-panel aesthetic that reflects a background
spanning embedded systems and web development. A drifting particle field in the hero
forms and breaks constellation-like connections (echoing circuit traces), Space
Grotesk carries the display type, and JetBrains Mono is used for eyebrows and labels
to reinforce the engineering register.

## Features

- Interactive 3D particle constellation (React Three Fiber) that responds to cursor movement
- Animated gradient text and ambient glow
- Scroll-triggered reveals (GSAP ScrollTrigger + Framer Motion `whileInView`)
- Typing effect that cycles through roles
- Dark / light mode via `next-themes`, no flash on load
- Resume download button (drop your PDF into `public/resume.pdf`)
- Social links (GitHub, LinkedIn, Email)
- Boot-sequence style loading screen
- Glassmorphism navigation and cards throughout
- Fully responsive, respects `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before you ship

1. Replace the placeholder GitHub / LinkedIn / email links in
   `components/hero.tsx` and `components/contact.tsx`.
2. Add your real `resume.pdf` to the `public/` folder (remove `RESUME_README.txt`).
3. Update project cards in `components/projects.tsx` with real links and descriptions.
4. Swap the contact form's `mailto:` handler for a real backend (e.g. Formspree,
   Resend, or a Next.js API route) if you want submissions without opening the
   user's mail client.
5. Update the `metadata` block in `app/layout.tsx` (title, description, and add
   Open Graph/social preview images if desired).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (+ `tailwindcss-animate`)
- Framer Motion — component-level transitions and page choreography
- GSAP + ScrollTrigger — scroll-driven reveal in the About section
- React Three Fiber + drei — the hero's 3D particle scene
- next-themes — dark/light mode
- lucide-react — icons
- shadcn/ui conventions (`class-variance-authority`, `tailwind-merge`, `cn` helper)
