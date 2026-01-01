"use client";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  const experiences = [
    {
      role: "Frontend Developer",
      company: "Scholarguide Tech",
      period: "March 2025 - Present",
      description: [
        "Built responsive and accessible web interfaces with React and Next.js, ensuring a seamless experience across devices and screen sizes.",
        "Implemented reusable component libraries and UI patterns for consistent design and maintainable code.",
        "Collaborated closely with designers to translate Figma and Sketch mockups into pixel-perfect, high-fidelity interfaces.",
        "Optimized frontend performance, including bundle size reduction, lazy loading, and smooth animations.",
        "Integrated frontend with REST and GraphQL APIs, ensuring data consistency and real-time updates.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Educify Inc",
      period: "August 2025 - Dec 2025",
      description: [
        "Delivered multiple web and mobile applications end-to-end, managing both frontend and backend development for clients.",
        "Implemented Redux Toolkit and other state management patterns for predictable and scalable application architecture.",
        "Focused on writing clean, maintainable, and reusable code while following best practices and industry standards.",
        "Integrated third-party services such as payment gateways, cloud storage, and analytics platforms.",
        "Ensured applications were highly performant, responsive, and accessible across browsers and mobile devices.",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
     
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-24 py-32">
        <div className="max-w-4xl w-full space-y-16">
          
        
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-blue-500 font-mono text-sm tracking-widest uppercase">My Journey</h2>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 text-glow">Experience</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded-full" />
          </motion.div>

          
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                
                <div className="absolute -left-[45px] top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#030303] z-20 group-hover:scale-125 transition-transform" />
                
               
                <div className="relative bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h2>
                      <p className="text-blue-400/80 font-medium text-sm md:text-base">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-mono text-gray-400">
                      {exp.period}
                    </span>
                  </div>

                  
                  <ul className="space-y-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500/40">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </section>
    </main>
  );
};

export default Page;