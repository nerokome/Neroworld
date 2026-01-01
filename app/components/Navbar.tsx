'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/pages/about' },
  { name: 'Experience', href: '/pages/experience' },
  { name: 'Skills', href: '/pages/skills' },
  { name: 'Projects', href: '/pages/projects' },
  { name: 'Contact', href: '/pages/contact' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-black tracking-tighter text-white uppercase italic"
          >
            Nero Oghenekome<span className="text-blue-500">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                    active
                      ? 'text-blue-500'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Toggle - Placed on the right, but drawer opens from left */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar System */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />

            {/* Side Drawer - Opening from Left */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-[#070707] z-[70] border-r border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between px-8 h-24 border-b border-white/5">
                <span className="text-md italic font-bold text-white uppercase ">
                  NERO OGHENEKOME
                </span>
                <button 
                  onClick={() => setOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-8 py-12 flex flex-col gap-8">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-4 text-2xl font-black  uppercase tracking-tighter transition-all ${
                          active
                            ? 'text-blue-500'
                            : 'text-gray-700 hover:text-white'
                        }`}
                      >
                        <span className={`text-[10px] font-mono font-bold transition-colors ${active ? 'text-blue-500' : 'text-gray-800 group-hover:text-blue-500/50'}`}>
                          0{i + 1}
                        </span>
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-10 left-8">
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest leading-loose">
                  Nero_Oghenekome // 2026 <br />
                  Ready for Collaboration
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar