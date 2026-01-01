"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiLinkedin, SiWhatsapp, SiX } from "react-icons/si";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiClock } from "react-icons/fi";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "YOUR_ACCESS_KEY_HERE", // Get one at web3forms.com
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `New Portfolio Message from ${formData.name}`,
        to: "nerooghenekome@gmail.com",
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Message Received! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Something went wrong. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      
      {/* Background UI */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-24 py-32">
        <div className="max-w-6xl w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] uppercase tracking-widest animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Available for new projects
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none  uppercase">
                  Let's <br /> Build <br /> <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Together.</span>
                </h1>
                
                <p className="text-gray-500 text-lg max-w-md font-medium leading-relaxed">
                  Bridge the gap between your idea and a production-ready product. Reach out for consultations or collaborations.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Github", val: "Nerokome", icon: <SiGithub />, link: "https://github.com/Nerokome", color: "hover:border-white/40" },
                  { label: "LinkedIn", val: "Nero oghenekome", icon: <SiLinkedin />, link: "#", color: "hover:border-blue-500/40" },
                  { label: "X / Twitter", val: "@yourhandle", icon: <SiX />, link: "#", color: "hover:border-white/60" },
                  { label: "WhatsApp", val: "+234 09067136520", icon: <SiWhatsapp />, link: "https://wa.me/2349067136520", color: "hover:border-green-500/40" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target="_blank"
                    whileHover={{ x: 10 }}
                    className={`flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-300 ${item.color} group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl text-gray-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-300">{item.val}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Content: Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-7 relative"
            >
              <form
                onSubmit={handleSubmit}
                className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-scan" />

                <div className="space-y-6">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-[0.3em]">System.Message_Input</h3>
                    <FiClock className="text-gray-600 text-xs" />
                  </div>

                  <div className="space-y-4">
                    <div className="group relative">
                      <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 px-14 py-5 rounded-2xl text-sm font-medium focus:outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="group relative">
                      <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 px-14 py-5 rounded-2xl text-sm font-medium focus:outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="group relative">
                      <FiMessageSquare className="absolute left-5 top-6 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <textarea
                        name="message"
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-white/[0.03] border border-white/10 px-14 py-6 rounded-2xl text-sm font-medium focus:outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all resize-none placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px]"
                        >
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="normal"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px]"
                        >
                          Initiate Connection <FiSend className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default Page;