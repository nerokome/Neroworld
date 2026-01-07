"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

const words = ["Full-Stack Developer", "Software Engineer", "Mobile Engineer"];

// --- GITHUB SECTION COMPONENT ---
const GitHubActivity = () => {
  const username = "nerokome";

  return (
    <div className="w-full max-w-4xl mt-16 md:mt-24 pb-20">
      {/* Header */}
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

      {/* Calendar */}
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
                  dark: [
                    "#161b22",
                    "#003366",
                    "#004d99",
                    "#0066cc",
                    "#3399ff",
                  ],
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Hint */}
        <div className="md:hidden flex justify-center mt-3 text-[10px] text-gray-600 uppercase tracking-widest">
          <span className="animate-pulse">← Swipe to see activity →</span>
        </div>
      </motion.div>

      {/* Footer */}
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

// --- MAIN HOME PAGE ---
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
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      {/* Content */}
      <section className="relative z-10 flex flex-col items-center px-6 md:px-24 pt-24 md:pt-48">
        <div className="max-w-4xl w-full mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs md:text-sm font-medium text-blue-400">
              Available for work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-gray-500 font-mono text-lg md:text-2xl mb-4 tracking-widest"
          >
            &gt; HELLO_WORLD I AM NERO
          </motion.h2>

          <h1 className="text-3xl md:text-6xl font-bold mb-8 min-h-[100px]">
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="inline-block w-[4px] h-[0.8em] bg-blue-500 ml-2 animate-pulse" />
          </h1>

          <p className="text-base md:text-xl text-gray-400 max-w-xl mb-12">
            I build high-performance web applications with precision and speed.
            Specializing in modern stacks that turn ideas into reality.
          </p>

          <a
            href="https://drive.google.com/file/d/1NHFKHCwgJ2v9g9Cds7_e0w4bHyumpAym/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 transition"
          >
            <span className="text-blue-400 font-bold">View My CV</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10">
              
            </span>
          </a>

          <GitHubActivity />
        </div>
      </section>
    </main>
  );
}
