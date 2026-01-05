"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    name: "Artfolio",
    description: "A platform for artists to showcase their work, track analytics, and manage galleries across web and mobile.",
    technologies: ["Next.js", "Golang", "TypeScript", "MongoDB", "Tailwind CSS"],
    image: "/artfolio.png", 
    github: "https://github.com/nerokome/artwork.git",
    live: "https://artwork-phi-swart.vercel.app/",
  },
  {
    name: "watch E-commerce",
    description: "A mobile e-commerce application featuring a responsive user interface and structured state management to support product browsing, cart functionality, and real-time updates within a scalable architecture.",
    technologies: ["Dart", "Provider", ],
    image: "/cartier.png",
    github: "https://github.com/nerokome/nerogit.git",
    live: "https://nerogit.vercel.app/",
  },
  {
    name: "Mini Real Estate Selector",
    description: "An interactive floor and apartment selection tool with dynamic UI for real estate listings.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/estate.png",
    github: "https://github.com/nerokome/ministate.git",
    live: "https://mini-state.vercel.app/",
  },
  
];

const Page = () => {
  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      
      {/* Background UI - UNCHANGED */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      {/* Content Layer */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-24 py-32">
        <div className="max-w-6xl w-full space-y-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left space-y-4 border-l-4 border-blue-500 pl-6"
          >
            <h2 className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase font-bold">Selected Works</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter ">
              PRO<span className="text-blue-500">JECTS</span>
            </h1>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.05] transition-all duration-500"
              >
               
                <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent z-10 opacity-60" />
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 font-black text-4xl uppercase tracking-tighter">
                      No Preview
                    </div>
                  )}
                  {/* Floating Tech Count */}
                  <div className="absolute top-4 right-4 z-20 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{project.technologies.length} Techs</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] uppercase tracking-tighter font-bold px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >
                      <FiGithub className="text-lg" /> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors ml-auto"
                    >
                      Live Demo <FiExternalLink className="text-lg" />
                    </a>
                  </div>
                </div>

                {/* Hover Glow Accent */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm pointer-events-none transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-12 text-center"
          >
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              More projects on <a href="https://github.com/Nerokome" className="text-white hover:text-blue-400 underline decoration-blue-500/50 underline-offset-8 transition-colors">GitHub</a>
            </p>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default Page;