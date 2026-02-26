import { motion } from 'framer-motion'
import { Globe, Bot, TrendingUp, Check, ArrowRight, Zap } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SERVICES = [
  {
    icon: Globe,
    title: 'Сайт с ИИ',
    sub: 'AI-Landing',
    price: '$400', priceMax: '$700',
    tag: '🔥 Хит',
    popular: true,
    tagGrad:  'from-violet-600 to-purple-600',
    iconBg:   'bg-violet-500/10 border-violet-500/20 text-violet-400',
    hoverGlow:'hover:shadow-violet-500/20 hover:border-violet-500/35',
    checkCol: 'bg-violet-400',
    btnGrad:  'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500',
    desc: 'Умная посадочная страница с ИИ-ассистентом, который собирает заявки и увеличивает конверсию 24/7.',
    features: [
      'GPT-ассистент на странице',
      'Автосбор лидов',
      'A/B тестирование',
      'Интеграция с CRM',
      'Аналитика конверсий',
    ],
    cta: 'Хочу такой сайт',
  },
  {
    icon: Bot,
    title: 'Telegram-бот',
    sub: 'Smart Bot',
    price: '$300', priceMax: '$500',
    tag: '🚀 Старт',
    tagGrad:  'from-blue-600 to-cyan-600',
    iconBg:   'bg-blue-500/10 border-blue-500/20 text-blue-400',
    hoverGlow:'hover:shadow-blue-500/20 hover:border-blue-500/35',
    checkCol: 'bg-blue-400',
    btnGrad:  'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
    desc: 'Умный бот для Telegram и WhatsApp, отвечает на вопросы 24/7 и передаёт горячих лидов менеджеру.',
    features: [
      'Telegram + WhatsApp',
      'База знаний бизнеса',
      'Квалификация лидов',
      'Приём заказов',
      'Уведомления менеджеру',
    ],
    cta: 'Заказать бота',
  },
  {
    icon: TrendingUp,
    title: 'ИИ-воронки',
    sub: 'Auto-Sales Lead',
    price: '$600', priceMax: '$1000',
    tag: '💎 Макс. ROI',
    tagGrad:  'from-emerald-600 to-teal-600',
    iconBg:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    hoverGlow:'hover:shadow-emerald-500/20 hover:border-emerald-500/35',
    checkCol: 'bg-emerald-400',
    btnGrad:  'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
    desc: 'Полная автоматизация продаж: ИИ дожимает клиентов, делает follow-up и передаёт готовых к покупке.',
    features: [
      'Авто-воронка под ключ',
      'Follow-up цепочки 7 дней',
      'Скоринг лидов',
      'Авто-назначение встреч',
      'Ежемесячная аналитика',
    ],
    cta: 'Автоматизировать →',
  },
]

function ServiceCard({ s, index }) {
  const Icon = s.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`relative flex flex-col rounded-3xl border border-white/8
                  bg-white/[.02] backdrop-blur-md p-7
                  shadow-xl transition-shadow duration-400
                  hover:shadow-2xl ${s.hoverGlow}`}
    >
      {/* Popular badge */}
      {s.popular && (
        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2
                         flex items-center gap-1.5 px-4 py-1 rounded-full
                         bg-gradient-to-r ${s.tagGrad} text-white text-xs font-bold
                         shadow-lg shadow-violet-500/30`}>
          <Zap size={11} /> Самый популярный
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${s.iconBg}`}>
          <Icon size={22} />
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full
                          bg-gradient-to-r ${s.tagGrad} text-white`}>
          {s.tag}
        </span>
      </div>

      <h3 className="font-display font-black text-xl text-white mb-0.5">{s.title}</h3>
      <p className="text-slate-500 text-sm mb-3">{s.sub}</p>

      <div className="mb-4 flex items-baseline gap-1.5">
        <span className="font-display font-black text-4xl text-white">{s.price}</span>
        <span className="text-slate-500 text-sm">— {s.priceMax}</span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>

      <ul className="space-y-2.5 mb-7">
        {s.features.map(f => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
            <Check size={13} className="text-current flex-shrink-0 opacity-70" />
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white
                    bg-gradient-to-r ${s.btnGrad}
                    flex items-center justify-center gap-2
                    transition-all duration-300 shadow-lg
                    hover:-translate-y-px hover:shadow-xl`}
      >
        {s.cta} <ArrowRight size={14} />
      </button>
    </motion.div>
  )
}

export default function ServicesSection() {
  const headerRef = useScrollReveal()

  return (
    <section id="services" className="relative py-28 px-6 bg-night-950 overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[350px] rounded-full
                      bg-violet-600/5 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-16 opacity-0 translate-y-7
                     [&.visible]:opacity-100 [&.visible]:translate-y-0
                     transition-all duration-700"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass
                          border-violet-500/15 mb-6">
            <Zap size={12} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">Прайс-лист</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Выберите <span className="grad-text">AI-решение</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Прозрачные цены, понятный результат — запускаем за 7–14 дней
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
        </div>

        <p className="text-center text-slate-600 text-sm mt-10">
          Не знаете что выбрать?{' '}
          <a href="#cta" className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors">
            Запишитесь на бесплатную консультацию
          </a>
        </p>
      </div>
    </section>
  )
}
