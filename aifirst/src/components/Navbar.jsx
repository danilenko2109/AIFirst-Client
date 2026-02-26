import { useState, useEffect } from 'react'
import { Brain, ArrowRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Услуги',     href: '#services'   },
  { label: 'Портфолио',  href: '#portfolio'  },
  { label: 'Контакты',   href: '#cta'        },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl shadow-black/40' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600
                            flex items-center justify-center shadow-lg shadow-violet-500/40
                            group-hover:shadow-violet-500/60 transition-shadow duration-300">
              <Brain size={17} className="text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full
                               bg-emerald-400 border-2 border-night-950 animate-pulse-slow" />
            </div>
            <span className="font-display font-black text-xl text-white tracking-tight">
              AI<span className="grad-text">First</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative text-sm font-medium text-slate-400 hover:text-violet-300
                           transition-colors duration-200 group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400
                                 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#cta"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-gradient-to-r from-violet-600 to-blue-600
                       text-sm font-bold text-white
                       hover:from-violet-500 hover:to-blue-500
                       hover:-translate-y-px hover:shadow-lg hover:shadow-violet-500/30
                       transition-all duration-300"
          >
            Обсудить проект <ArrowRight size={14} />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center
                       text-slate-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{  opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 glass-dark md:hidden
                       flex flex-col items-center justify-center gap-8"
          >
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-black text-white hover:text-violet-400 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 mt-4 px-8 py-4 rounded-2xl
                         bg-gradient-to-r from-violet-600 to-blue-600
                         text-lg font-bold text-white"
            >
              Обсудить проект <ArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
