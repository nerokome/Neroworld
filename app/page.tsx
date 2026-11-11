"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { FaArrowRight } from "react-icons/fa";

const words = ["Full-Stack Developer", "Software Engineer", "Mobile Engineer"];

/* =====================================================================
   DRAGGABLE LANYARD BADGE
   ===================================================================== */

/* ---------- EDIT THESE ---------- */
const CV_URL =
  "https://drive.google.com/file/d/1WZj1R0FWTJqB-Jfi2H0C7Lw-IGxfJueF/view?usp=sharing";
const PROFILE = {
  first: "Nero",
  last: "Kome",
  role: "Full-Stack Developer",
  links: [
    { label: "GitHub", href: "https://github.com/nerokome" },
    { label: "CV", href: CV_URL },
  ],
};
/* -------------------------------- */

// badge size multiplier per screen width (make bigger/smaller here)
const pickScale = () => {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w >= 1024) return 1.25; // desktop
  if (w >= 640) return 1; // tablet
  return 0.85; // phone
};
const BASE_W = 220;
const BASE_H = 300;
const BASE_SEG = 30;
const ROPE_SEGS = 6; // lanyard segments
const GRAVITY = 0.55;
const DAMPING = 0.992;
const ITERATIONS = 10;
const MAX_SPEED = 60;
const STEP = 1000 / 60;

type Particle = { x: number; y: number; px: number; py: number };

const LanyardBadge = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const stitchRef = useRef<SVGPathElement>(null);

  // physics state lives in refs so React never re-renders while animating
  const particles = useRef<Particle[]>([]);
  const size = useRef({ w: 0, h: 0 });
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(0.85);
  const drag = useRef<{ t: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const total = ROPE_SEGS + 2; // anchor + rope points (last = clip) + badge bottom
    const CLIP = ROPE_SEGS;
    const BOTTOM = ROPE_SEGS + 1;

    const init = () => {
      const ax = size.current.w / 2;
      const ps: Particle[] = [];
      for (let i = 0; i < total; i++) {
        const x = ax + i * 1.5;
        const y = i * 3;
        ps.push({ x, y, px: x, py: y });
      }
      ps[BOTTOM].px -= 14; // sideways kick so it swings on arrival
      ps[CLIP].px -= 6;
      particles.current = ps;
    };

    const measure = () => {
      scaleRef.current = pickScale();
      setScale(scaleRef.current);
      const r = wrap.getBoundingClientRect();
      const first = size.current.w === 0;
      size.current = { w: r.width, h: r.height };
      if (r.width === 0) return;
      if (first || particles.current.length === 0) init();
      const a = particles.current[0];
      a.x = a.px = r.width / 2;
      a.y = a.py = 0;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    const constrain = (
      a: Particle,
      b: Particle,
      len: number,
      pinA: boolean,
    ) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.0001;
      const diff = (dist - len) / dist;
      if (pinA) {
        b.x -= dx * diff;
        b.y -= dy * diff;
      } else {
        a.x += dx * diff * 0.5;
        a.y += dy * diff * 0.5;
        b.x -= dx * diff * 0.5;
        b.y -= dy * diff * 0.5;
      }
    };

    const step = () => {
      const ps = particles.current;
      const { w, h } = size.current;

      for (let i = 1; i < ps.length; i++) {
        const p = ps[i];
        let vx = (p.x - p.px) * DAMPING;
        let vy = (p.y - p.py) * DAMPING;
        const sp = Math.hypot(vx, vy);
        if (sp > MAX_SPEED) {
          vx = (vx / sp) * MAX_SPEED;
          vy = (vy / sp) * MAX_SPEED;
        }
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }

      for (let it = 0; it < ITERATIONS; it++) {
        const d = drag.current;
        if (d) {
          const c = ps[CLIP];
          const b = ps[BOTTOM];
          const gx = c.x + (b.x - c.x) * d.t;
          const gy = c.y + (b.y - c.y) * d.t;
          const k = 0.12;
          const dx = (d.x - gx) * k;
          const dy = (d.y - gy) * k;
          c.x += dx * (1 - d.t);
          c.y += dy * (1 - d.t);
          b.x += dx * d.t;
          b.y += dy * d.t;
        }

        for (let i = 0; i < ROPE_SEGS; i++)
          constrain(ps[i], ps[i + 1], BASE_SEG * scaleRef.current, i === 0);
        constrain(ps[CLIP], ps[BOTTOM], BASE_H * scaleRef.current, false);

        for (let i = 1; i < ps.length; i++) {
          const p = ps[i];
          if (p.x < 12) p.x = 12;
          if (p.x > w - 12) p.x = w - 12;
          if (p.y > h - 12) p.y = h - 12;
        }
      }
    };

    const render = () => {
      const ps = particles.current;
      const c = ps[CLIP];
      const b = ps[BOTTOM];
      const angle = Math.atan2(-(b.x - c.x), b.y - c.y);

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate(${c.x}px, ${c.y}px) rotate(${angle}rad)`;
      }

      const pts = ps.slice(0, ROPE_SEGS + 1);
      let d = `M${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q${pts[i].x},${pts[i].y} ${mx},${my}`;
      }
      const last = pts[pts.length - 1];
      d += ` L${last.x},${last.y}`;
      ropeRef.current?.setAttribute("d", d);
      stitchRef.current?.setAttribute("d", d);
    };

    let raf = 0;
    let lastT = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (size.current.w === 0 || particles.current.length === 0) {
        lastT = now;
        return;
      }
      acc += Math.min(now - lastT, 100);
      lastT = now;
      while (acc >= STEP) {
        step();
        acc -= STEP;
      }
      render();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const local = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return; // let links work
    const ps = particles.current;
    const c = ps[ROPE_SEGS];
    const b = ps[ROPE_SEGS + 1];
    const m = local(e);
    const vx = b.x - c.x;
    const vy = b.y - c.y;
    const bh = BASE_H * scaleRef.current;
    let t = ((m.x - c.x) * vx + (m.y - c.y) * vy) / (bh * bh);
    t = Math.max(0.05, Math.min(1, t));
    drag.current = { t, x: m.x, y: m.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const m = local(e);
    drag.current.x = m.x;
    drag.current.y = m.y;
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div
      ref={wrapRef}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] h-[480px] sm:h-[560px] lg:w-[460px] lg:h-[780px] z-20 pointer-events-none"
    >
      {/* lanyard: wide strap with the name printed along it */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        {/* blue edge */}
        <path
          ref={stitchRef}
          fill="none"
          stroke="#3399ff"
          strokeOpacity={0.45}
          strokeWidth={26 * scale}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {/* strap */}
        <path
          id="lanyard-path"
          ref={ropeRef}
          fill="none"
          stroke="#0b1a2e"
          strokeWidth={23 * scale}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {/* name on the strap, follows the curve while it swings */}
        <text
          fill="#ffffff"
          fontSize={12 * scale}
          fontWeight={800}
          letterSpacing={3 * scale}
          dy={`${0.35 * 12 * scale}px`}
        >
          <textPath href="#lanyard-path" startOffset="50%" textAnchor="middle">
            {PROFILE.first.toUpperCase()}
            <tspan fill="#3399ff"> {PROFILE.last.toUpperCase()}</tspan>
          </textPath>
        </text>
      </svg>

      {/* badge */}
      <div
        ref={badgeRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="absolute left-0 top-0 pointer-events-auto touch-none select-none cursor-grab active:cursor-grabbing will-change-transform"
        style={{
          width: BASE_W * scale,
          height: BASE_H * scale,
          marginLeft: (-BASE_W * scale) / 2,
          transformOrigin: "50% 0",
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: 220,
            height: 300,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* metal clip */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-7 h-10 rounded-md bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 border border-white/10 shadow-md" />

          {/* black ID card */}
          <div className="lanyard-card relative h-full rounded-3xl border border-white/15 bg-black shadow-[0_0_50px_rgba(51,153,255,0.2),0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="relative h-full p-5 flex flex-col">
              <div className="mx-auto w-10 h-1.5 rounded-full bg-white/10" />

              <div className="mt-5 inline-flex self-start items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                <span className="text-[9px] font-medium text-blue-400">
                  Available for work
                </span>
              </div>

              <h3 className="mt-4 text-[44px] leading-[0.95] font-bold tracking-tight">
                <span className="text-white">{PROFILE.first}</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  {PROFILE.last}
                </span>
              </h3>

              <div className="mt-auto">
                <p className="text-gray-500 font-mono text-[9px] tracking-[0.3em] uppercase">
                  &gt; Role
                </p>
                <p className="text-[12px] text-gray-400 mb-3">{PROFILE.role}</p>
                <div className="flex gap-1.5">
                  {PROFILE.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-bold hover:bg-blue-500/20 transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =====================================================================
   GITHUB ACTIVITY
   ===================================================================== */

const GitHubActivity = () => {
  const username = "nerokome";

  return (
    <div className="w-full max-w-4xl mt-16 md:mt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-gray-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
          Activity
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative group"
      >
        <div className="bg-white/[0.02] border border-white/5 p-4 md:p-6 rounded-3xl backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="min-w-[700px] md:min-w-full">
              <GitHubCalendar
                username={username}
                blockSize={12}
                blockMargin={5}
                fontSize={14}
                theme={{
                  dark: ["#161b22", "#003366", "#004d99", "#0066cc", "#3399ff"],
                }}
              />
            </div>
          </div>
        </div>

        <div className="md:hidden flex justify-center mt-3 text-[10px] text-gray-600 uppercase tracking-widest">
          <span className="animate-pulse">← Swipe to see activity →</span>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center gap-2 text-xs md:text-sm text-gray-500">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <p>
          Live GitHub activity •{" "}
          <span className="text-blue-400 font-medium">@{username}</span>
        </p>
      </div>
    </div>
  );
};

/* =====================================================================
   PAGE
   ===================================================================== */

export default function Home() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      <section className="relative z-10 flex flex-col items-center px-6 md:px-24 lg:px-12 xl:px-20 pt-24 md:pt-48">
        {/* Draggable swinging badge (all screens) */}
        <LanyardBadge />

        <div className="max-w-4xl w-full mx-auto mt-[390px] sm:mt-[380px] md:mt-[290px] lg:mt-0 lg:mx-0 lg:mr-auto lg:w-[calc(50%-190px)] lg:min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md items-center gap-3"
          ></motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-gray-500 font-mono text-lg md:text-2xl lg:text-xl xl:text-2xl mb-4 tracking-widest"
          >
            &gt; HELLO_WORLD I AM NERO
          </motion.h2>

          <h1 className="text-3xl md:text-6xl lg:text-5xl xl:text-6xl font-bold mb-8 min-h-[100px] break-words">
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="inline-block w-[4px] h-[0.8em] bg-blue-500 ml-2 animate-pulse" />
          </h1>

          <p className="text-base md:text-xl text-gray-400 max-w-xl mx-auto mb-12">
            I build high-performance web applications with precision and speed.
            Specializing in modern stacks that turn ideas into reality.
          </p>

          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 transition"
          >
            <span className="text-blue-400 font-bold">View My CV</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10">
              <FaArrowRight />
            </span>
          </a>
        </div>

        {/* full-width below the hero so the calendar has room */}
        <GitHubActivity />
      </section>
    </main>
  );
}
