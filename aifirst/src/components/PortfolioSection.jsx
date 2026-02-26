import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'

const CASES = [
  {
    cat: 'AI-Landing',
    client: 'E-commerce · Интернет-магазин',
    result: '+340% конверсия, −70% стоимость лида',
    grad: 'from-violet-900/25 to-night-900/60',
    dot: 'bg-violet-400',
    hoverBorder: 'hover:border-violet-500/30',
  },
  {
    cat: 'Smart Bot',
    client: 'B2B · SaaS-платформа',
    result: '800+ диалогов/день без менеджера',
    grad: 'from-blue-900/25 to-night-900/60',
    dot: 'bg-blue-400',
    hoverBorder: 'hover:border-blue-500/30',
  },
  {
    cat: 'Auto-Sales Lead',
    client: 'Агентство недвижимости',
    result: '×2.3 к продажам за первый месяц',
    grad: 'from-emerald-900/25 to-night-900/60',
    dot: 'bg-emerald-400',
    hoverBorder: 'hover:border-emerald-500/30',
  },
  {
    cat: 'AI-Landing + Bot',
    client: 'Юридическая фирма',
    result: 'Авто-квалификация клиентов 24/7',
    grad: 'from-amber-900/20 to-night-900/60',
    dot: 'bg-amber-400',
    hoverBorder: 'hover:border-amber-500/30',
  },
]

function PlaceholderCard({ c, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/7
                  bg-gradient-to-br ${c.grad}
                  min-h-[240px] cursor-pointer
                  transition-all duration-400
                  hover:shadow-2xl ${c.hoverBorder}`}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br from-violet-900/10 to-blue-900/10" />

      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* top row */}
        <div className="flex items-start justify-between">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-200
                           bg-white/8 border border-white/10">
            {c.cat}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                           text-slate-500 bg-white/4 border border-white/6">
            🕒 Скоро
          </span>
        </div>

        {/* bottom */}
        <div>
          <p className="text-slate-500 text-xs mb-1.5">{c.client}</p>
          <p className="text-slate-200 font-semibold text-[15px] leading-snug mb-4">
            {c.result}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500
                          group-hover:text-slate-400 transition-colors">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
            Кейс появится здесь
            <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-28 px-6 bg-night-900">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass
                          border-blue-500/15 mb-6">
            <Star size={12} className="text-blue-400" />
            <span className="text-xs font-semibold text-blue-300">Портфолио</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Наши{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              кейсы
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Реальные результаты для реального бизнеса.{' '}
            <span className="text-slate-300">Кейсы добавляются по мере завершения проектов.</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {CASES.map((c, i) => <PlaceholderCard key={c.cat + c.client} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}
