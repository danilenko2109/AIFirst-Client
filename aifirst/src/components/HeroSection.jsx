import { motion } from 'framer-motion'
import { Zap, BarChart3, ChevronDown, Sparkles } from 'lucide-react'
import { useParticles } from '../hooks/useParticles'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const STATS = [
  { value: '80%',  label: 'экономия времени'   },
  { value: '3×',   label: 'скорость лидов'     },
  { value: '7 дн', label: 'до первых результатов' },
]

export default function HeroSection() {
  const canvasRef = useParticles()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center
                 overflow-hidden bg-night-950 pt-20 pb-16 px-6"
    >
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,.07) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Orbs */}
      <div className="orb-pulse absolute -top-40 -left-40 w-[600px] h-[600px]
                      rounded-full bg-violet-600/[.12] blur-[120px] pointer-events-none" />
      <div className="orb-pulse-delay absolute top-1/4 -right-20 w-[480px] h-[480px]
                      rounded-full bg-blue-600/[.10] blur-[110px] pointer-events-none" />
      <div className="orb-pulse-delay2 absolute bottom-0 left-1/3 w-[360px] h-[360px]
                      rounded-full bg-cyan-600/[.08] blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass
                          border-violet-500/20">
            <Sparkles size={13} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">
              Студия ИИ-разработки · Богдан Даниленко
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display font-black text-white leading-[1.06]
                     tracking-tight mb-5"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)' }}
        >
          Внедряем{' '}
          <span className="grad-text relative">
            ИИ-систему
            {/* animated underline */}
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full
                         bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </span>
          ,<br />
          которая работает{' '}
          <span className="text-slate-400">вместо ваших менеджеров</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto
                     leading-relaxed mb-10"
        >
          Автоматизируем продажи, поддержку и маркетинг.
          Первые результаты —{' '}
          <span className="text-slate-200 font-semibold">уже через 7 дней</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#services"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                       bg-gradient-to-r from-violet-600 to-blue-600
                       text-base font-bold text-white
                       hover:from-violet-500 hover:to-blue-500
                       hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25
                       transition-all duration-300"
          >
            <Zap size={18} /> Смотреть решения
          </a>
          <a
            href="#cta"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                       text-base font-semibold text-slate-300 glass
                       hover:border-violet-500/40 hover:text-white hover:bg-violet-500/10
                       transition-all duration-300"
          >
            <BarChart3 size={18} /> Наши цены
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.45)}
          className="grid grid-cols-3 gap-3 max-w-md mx-auto"
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col gap-1 p-4 rounded-2xl glass
                         hover:border-violet-500/25 transition-all duration-300"
            >
              <span className="font-display font-black text-2xl md:text-3xl grad-text">
                {value}
              </span>
              <span className="text-slate-500 text-[11px] leading-snug">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        className="absolute bottom-7 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1
                   text-slate-600 hover:text-slate-400 transition-colors"
      >
        <span className="text-[11px] font-medium">прокрутите вниз</span>
        <ChevronDown size={20} className="animate-bounce" style={{ animationDuration: '2s' }} />
      </a>

      {/* Fade to next */}
      <div className="absolute bottom-0 left-0 right-0 h-28
                      bg-gradient-to-t from-night-950 to-transparent pointer-events-none" />
    </section>
  )
}
