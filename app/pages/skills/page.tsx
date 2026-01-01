"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, 
  SiRedux, SiNodedotjs, SiExpress, SiTailwindcss, 
  SiFramer, SiMysql, SiMongodb, SiGithub, SiFigma,
  SiPostgresql, SiFlutter, SiGo, SiSupabase, SiFirebase 
} from "react-icons/si";

const Page = () => {
  const skillCategories = [
    {
      title: "Frontend",
      description: "I craft responsive and modern interfaces using the latest frontend frameworks and libraries. My focus is on clean code, reusable components, and delivering seamless experiences for users.",
      skills: [
        { name: "Next.js", icon: <SiNextdotjs />, color: "group-hover:text-white" },
        { name: "React", icon: <SiReact />, color: "group-hover:text-cyan-400" },
        { name: "TypeScript", icon: <SiTypescript />, color: "group-hover:text-blue-500" },
        { name: "JavaScript", icon: <SiJavascript />, color: "group-hover:text-yellow-400" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "group-hover:text-sky-400" },
        { name: "Framer Motion", icon: <SiFramer />, color: "group-hover:text-pink-500" },
      ],
    },
    {
  title: "Backend & Cloud",
  description: "I design and build reliable backend systems and cloud architectures that power web and mobile applications. Security, performance, and scalability are always my top priorities.",
  skills: [
    { name: "Supabase", icon: <SiSupabase />, color: "group-hover:text-emerald-500" },
    { name: "Firebase", icon: <SiFirebase />, color: "group-hover:text-orange-500" },
    { name: "Golang", icon: <SiGo />, color: "group-hover:text-cyan-500" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "group-hover:text-green-500" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "group-hover:text-blue-400" },
    { name: "MySQL", icon: <SiMysql />, color: "group-hover:text-blue-600" }, 
    { name: "MongoDB", icon: <SiMongodb />, color: "group-hover:text-green-600" },
  ],
},
    {
      title: "Mobile & Tools",
      description: "I build mobile apps and leverage modern tools to ensure development is smooth, collaborative, and produces high-quality, maintainable code.",
      skills: [
        { name: "Flutter", icon: <SiFlutter />, color: "group-hover:text-blue-400" },
        { name: "Redux Toolkit", icon: <SiRedux />, color: "group-hover:text-purple-500" },
        { name: "GitHub", icon: <SiGithub />, color: "group-hover:text-white" },
        { name: "Figma", icon: <SiFigma />, color: "group-hover:text-orange-400" },
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
        <div className="max-w-5xl w-full space-y-16">
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h2 className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase font-bold">Expertise</h2>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
              Tech <span className="text-blue-500">Stack</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Modern tools and BaaS platforms I use to ship scalable products rapidly.
            </p>
          </motion.div>

          {/* Categorized Skills Grid */}
          <div className="space-y-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div 
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="space-y-6"
              >
                {/* Category Title & Divider */}
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-gray-200">{category.title}</h3>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>

                {/* Category Description */}
                <p className="text-gray-400 text-sm md:text-base max-w-3xl">
                  {category.description}
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300"
                    >
                      <div className={`text-3xl mb-3 text-gray-400 transition-colors duration-300 ${skill.color}`}>
                        {skill.icon}
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-gray-400 group-hover:text-white transition-colors duration-300 text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
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