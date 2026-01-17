"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiLinkedin, SiWhatsapp, SiX } from "react-icons/si";
import { toast } from "react-hot-toast";
import {
  FiSend,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiClock,
} from "react-icons/fi";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      toast.error("Form service unavailable.");
      console.error("Missing NEXT_PUBLIC_WEB3FORMS_KEY");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending message...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          autoresponse: `Hi ${formData.name},

Thanks for reaching out. I've received your message and will get back to you shortly.

— Nero`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Submission rejected");
      }

      toast.success("Message sent ", { id: toastId });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
     
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
       
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

       
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse-slow" />

        
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,#030303_90%)]" />
      </div>
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-24 py-32">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
         
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-10"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none">
              Let’s <br />
              Build <br />
              <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Together.
              </span>
            </h1>

            <p className="text-gray-500 max-w-md">
              Bridge the gap between your idea and a production-ready product.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "GitHub",
                  val: "Nerokome",
                  icon: <SiGithub />,
                  link: "https://github.com/Nerokome",
                },
                {
                  label: "LinkedIn",
                  val: "Nero Oghenekome",
                  icon: <SiLinkedin />,
                  link:
                    "https://www.linkedin.com/in/oghenero-oghenekome-997360259",
                },
                {
                  label: "X",
                  val: "@Nerokome",
                  icon: <SiX />,
                  link: "https://x.com/nerokome",
                },
                {
                  label: "WhatsApp",
                  val: "+234 906 713 6520",
                  icon: <SiWhatsapp />,
                  link: "https://wa.me/2349067136520",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/40 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-xl">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        {item.label}
                      </p>
                      <p className="text-sm">{item.val}</p>
                    </div>
                  </div>
                  →
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  System.Message_Input
                </h3>
                <FiClock className="text-gray-600 text-xs" />
              </div>

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.03] border border-white/10 px-5 py-5 rounded-2xl"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.03] border border-white/10 px-5 py-5 rounded-2xl"
              />

              <textarea
                name="message"
                placeholder="Your message..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.03] border border-white/10 px-5 py-5 rounded-2xl resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 transition disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span key="loading">Sending…</motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      className="flex items-center justify-center gap-2"
                    >
                      Send Message <FiSend />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;
