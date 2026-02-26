import { motion } from 'framer-motion'
import { Calendar, MessageCircle, ArrowRight, Brain } from 'lucide-react'

export function CtaSection() {
  return (
    <section id="cta" className="relative py-28 px-6 bg-night-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[300px] rounded-full
                      bg-violet-600/[.08] blur-[110px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass
                        border-violet-500/15 mb-8">
          <MessageCircle size={12} className="text-violet-400" />
          <span className="text-xs font-semibold text-violet-300">Бесплатная консультация</span>
        </div>

        <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-5 leading-tight">
          Готовы автоматизировать{' '}
          <span className="grad-text">свой бизнес?</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Запишитесь на 30-минутный созвон с Богданом.
          Разберём ваш бизнес, покажем где ИИ сэкономит больше всего.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/bogdan_ai_first"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                       bg-gradient-to-r from-violet-600 to-blue-600
                       text-base font-bold text-white
                       hover:from-violet-500 hover:to-blue-500
                       hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25
                       transition-all duration-300"
          >
            <Calendar size={18} /> Записаться на созвон
            <ArrowRight size={15} />
          </a>
          <a
            href="https://t.me/bogdan_ai_first"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                       text-base font-semibold text-slate-300 glass
                       hover:border-violet-500/35 hover:text-white
                       transition-all duration-300"
          >
            <MessageCircle size={18} /> Написать в Telegram
          </a>
        </div>

        <p className="text-slate-600 text-sm mt-8">
          Отвечаем в течение 2 часов · Без навязывания · Первая консультация бесплатно
        </p>
      </motion.div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/[.05] bg-night-950 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row
                      items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600
                          flex items-center justify-center">
            <Brain size={14} className="text-white" />
          </div>
          <span className="font-display font-black text-lg text-white">
            AI<span className="grad-text">First</span>
          </span>
        </div>

        <p className="text-slate-600 text-sm text-center">
          © {new Date().getFullYear()} AI First · Богдан Даниленко · Все права защищены
        </p>

        <div className="flex gap-6">
          {[
            { label: 'Telegram',  href: 'https://t.me/bogdan_ai_first' },
            { label: 'Instagram', href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank" rel="noopener noreferrer"
              className="text-slate-500 hover:text-violet-400 text-sm transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
