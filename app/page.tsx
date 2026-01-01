'use client'

import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const words = ["Full-Stack Developer", "Software Engineer", "Mobile Engineer"]

export default function Home() {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const typingSpeed = isDeleting ? 40 : 80
    const pauseTime = isDeleting ? 200 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setText(currentWord.substring(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      } else if (isDeleting && charIndex > 0) {
        setText(currentWord.substring(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  return (
    <main className="relative min-h-screen bg-[#030303] text-white selection:bg-blue-500/30 overflow-hidden">
   

      {/* FIXED Full-Screen Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 
          bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
              linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
          bg-[size:40px_40px]"
        />

        {/* Glows */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse-slow" />

        {/* Full-screen radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      {/* Content Layer */}
      <section className="relative z-10 flex flex-col items-start justify-center min-h-screen px-6 md:px-24">
        <div className="max-w-4xl text-left">

          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-400">Available for work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-gray-500 font-mono text-2xl mb-4 tracking-widest"
          >
            &gt; HELLO_WORLD I AM NERO
          </motion.h2>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            <span className="inline-block min-h-[1.2em] bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="inline-block w-[4px] h-[0.8em] bg-blue-500 ml-3 animate-pulse align-middle" />
          </h1>

          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl mb-12 leading-relaxed"
          >
            I build high-performance web applications with precision and speed.
            Specializing in modern stacks that turn ideas into reality.
          </motion.p>

        </div>
      </section>
    </main>
  )
}
