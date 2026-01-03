"use client";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  const skills = [
    "Full-stack web applications",
    "Mobile applications",
    "Scalable frontend architecture",
    "Backend APIs & systems",
    "Analytics-driven features",
    "Production-ready software",
  ];

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      {/* FIXED Background Layer (Unchanged) */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-24 py-32">
        <div className="max-w-4xl w-full space-y-16">
          
          {/* Header with High-Visibility Accent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              About <span className="text-blue-500">Me</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-blue-600 rounded-full" />
              <p className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em] font-bold">
                Software Engineer
              </p>
            </div>
          </motion.div>

          {/* Bio Section with Glassmorphism Card */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="bg-white/[0.03] p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl space-y-6 text-gray-400 leading-relaxed text-lg"
>
  <p>
    I’m a <span className="text-white font-medium">full-stack developer</span> and software engineer who enjoys turning ideas into real products for both web and mobile. I like bridging the gap between what users see and how systems work behind the scenes, always keeping structure and performance in mind.
  </p>

  <p>
    On the frontend, I mainly work with React and Next.js to craft clean, friendly interfaces. I care about predictable state, reusable components, and layouts that scale as the app grows.
  </p>

  <p>
    Mobile isn’t an afterthought  it’s part of the product experience. I build apps that feel fast, work smoothly, and prioritize usability and performance across every device.
  </p>

  <p>
    On the backend, I design APIs and services that actually work for real users: handling authentication, data modeling, integrations, and analytics. I treat backend architecture with the same care as the frontend experience.
  </p>
</motion.div>


          {/* "What I Do" Bento-Style Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold tracking-tight">Core Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
          <div className="border-t border-white/10 pt-8 flex justify-between items-center text-sm font-mono text-gray-500">
            <span>Building for the future</span>
            <span>2025</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;