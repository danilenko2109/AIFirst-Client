import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, MessageCircle, X, Send, RefreshCw, AlertCircle } from 'lucide-react'
import { sendChat } from '../lib/openai'

// ── Initial messages ───────────────────────────────────────────────
const INIT = [
  { id: 'i1', role: 'assistant', text: 'Привет! 👋 Я — AI-ассистент Богдана Даниленко из студии AI First.' },
  { id: 'i2', role: 'assistant', text: 'Помогу подобрать ИИ-решение для вашего бизнеса и отвечу на вопросы по ценам и срокам. 🚀' },
]

const QUICK = [
  'Чем поможет ИИ моему бизнесу?',
  'Сколько стоит Telegram-бот?',
  'Как быстро окупается?',
  'Что такое AI-Landing?',
]

// ── Sub-components ─────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full flex-shrink-0
                      bg-gradient-to-br from-violet-600 to-blue-600
                      flex items-center justify-center shadow-lg shadow-violet-500/30">
        <Brain size={13} className="text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm
                      bg-white/[.06] border border-white/[.08]
                      flex items-center gap-1.5">
        {[0, 0.2, 0.4].map(d => (
          <span
            key={d}
            className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400 block"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function Bubble({ msg }) {
  const isUser  = msg.role === 'user'
  const isError = !!msg.error

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2 px-1"
      >
        <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-red-400 text-xs leading-relaxed">{msg.text}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full flex-shrink-0
                        bg-gradient-to-br from-violet-600 to-blue-600
                        flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Brain size={13} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed
          ${isUser
            ? 'rounded-2xl rounded-br-sm text-white bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20'
            : 'rounded-2xl rounded-bl-sm text-slate-200 bg-white/[.06] border border-white/[.08]'
          }`}
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function ChatWidget() {
  const [open,     setOpen]    = useState(false)
  const [msgs,     setMsgs]    = useState(INIT)
  const [input,    setInput]   = useState('')
  const [loading,  setLoading] = useState(false)
  const [notif,    setNotif]   = useState(false)

  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // scroll to bottom on new message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading, open])

  // focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  // show notification bubble after 6s
  useEffect(() => {
    const t = setTimeout(() => setNotif(true), 6000)
    return () => clearTimeout(t)
  }, [])

  const userMsgCount = msgs.filter(m => m.role === 'user').length

  const send = useCallback(async (text) => {
    const t = (text || input).trim()
    if (!t || loading) return

    setInput('')
    setNotif(false)

    const userMsg = { id: Date.now().toString(), role: 'user', text: t }
    setMsgs(prev => [...prev, userMsg])
    setLoading(true)

    try {
      // build history for API (exclude error messages)
      const history = [...msgs, userMsg]
        .filter(m => !m.error)
        .map(m => ({
          role:    m.role === 'assistant' ? 'assistant' : 'user',
          content: m.text,
        }))

      const reply = await sendChat(history)

      setMsgs(prev => [...prev, {
        id:   Date.now().toString() + 'ai',
        role: 'assistant',
        text: reply,
      }])
    } catch (err) {
      setMsgs(prev => [...prev, {
        id:    Date.now().toString() + 'err',
        role:  'assistant',
        error: true,
        text:  err.message || 'Произошла ошибка. Попробуйте ещё раз.',
      }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, msgs])

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const reset = () => { setMsgs(INIT); setInput(''); setLoading(false) }

  return (
    <>
      {/* ── FAB ────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Notif bubble */}
        <AnimatePresence>
          {notif && !open && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0  }}
              exit={{   opacity: 0, x: 12  }}
              onClick={() => { setOpen(true); setNotif(false) }}
              className="glass-dark rounded-2xl rounded-br-sm px-4 py-3
                         max-w-[210px] cursor-pointer border-violet-500/25
                         shadow-xl"
            >
              <p className="text-slate-200 text-xs leading-relaxed">
                💬 Есть вопросы? Помогу подобрать ИИ-решение!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{  scale: 0.94 }}
          onClick={() => { setOpen(v => !v); setNotif(false) }}
          className="relative w-14 h-14 rounded-2xl
                     bg-gradient-to-br from-violet-600 to-blue-600
                     flex items-center justify-center
                     shadow-2xl shadow-violet-500/45
                     hover:shadow-violet-500/65 transition-shadow"
          aria-label={open ? 'Закрыть чат' : 'Открыть чат'}
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x"   initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:.18 }}><X size={22} className="text-white" /></motion.div>
              : <motion.div key="msg" initial={{ rotate: 90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:.18 }}><MessageCircle size={22} className="text-white" /></motion.div>
            }
          </AnimatePresence>
          {!open && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full
                             bg-emerald-400 border-2 border-night-950 animate-pulse-slow" />
          )}
        </motion.button>
      </div>

      {/* ── Chat window ────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: .93 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{   opacity: 0, y: 14, scale: .93  }}
            transition={{ duration: .35, ease: [.22,1,.36,1] }}
            className="fixed bottom-24 right-6 z-50
                       w-[350px] max-h-[540px]
                       flex flex-col rounded-3xl overflow-hidden
                       shadow-2xl shadow-black/60"
            style={{
              background: 'rgba(6,6,20,.93)',
              backdropFilter: 'blur(44px)',
              WebkitBackdropFilter: 'blur(44px)',
              border: '1px solid rgba(124,58,237,.22)',
            }}
            role="dialog"
            aria-label="AI First чат"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4
                            border-b border-white/[.07] flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full
                                bg-gradient-to-br from-violet-600 to-blue-600
                                flex items-center justify-center
                                shadow-lg shadow-violet-500/30">
                  <Brain size={18} className="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full
                                 bg-emerald-400 border-2 border-[#06060f]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-white truncate">
                  AI First Assistant
                </p>
                <p className="text-emerald-400 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                  Онлайн · отвечает за секунды
                </p>
              </div>
              <button
                onClick={reset}
                title="Сбросить диалог"
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-slate-500 hover:text-slate-300
                           hover:bg-white/[.06] transition-all"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3
                            chat-scroll min-h-0">
              {msgs.map(m => <Bubble key={m.id} msg={m} />)}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {userMsgCount === 0 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {QUICK.map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium
                               text-violet-300 border border-violet-500/22
                               bg-violet-500/8
                               hover:bg-violet-500/18 hover:border-violet-500/45
                               transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/[.07] flex-shrink-0">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl
                              bg-white/[.05] border border-white/[.09]
                              focus-within:border-violet-500/40 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Написать сообщение..."
                  disabled={loading}
                  maxLength={500}
                  className="flex-1 bg-transparent text-sm text-white
                             placeholder-slate-600 outline-none disabled:opacity-50
                             font-body"
                  aria-label="Введите сообщение"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{  scale: 0.9 }}
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center
                             bg-gradient-to-br from-violet-600 to-blue-600
                             disabled:opacity-30 disabled:cursor-not-allowed
                             hover:enabled:shadow-lg hover:enabled:shadow-violet-500/35
                             transition-all"
                  aria-label="Отправить"
                >
                  <Send size={14} className="text-white" />
                </motion.button>
              </div>
              <p className="text-center text-slate-700 text-[10px] mt-2">
                AI First · Богдан Даниленко
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
