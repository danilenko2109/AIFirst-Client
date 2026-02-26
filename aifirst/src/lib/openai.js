import { GoogleGenerativeAI } from '@google/generative-ai'

const SYSTEM_PROMPT = `Ты — виртуальный бизнес-ассистент Богдана Даниленко, основателя студии 'AI First'.
Цель: консультировать малый/средний бизнес по внедрению ИИ и закрывать их на созвон с Богданом.
Цены: AI-Landing $400-$700, Бот $300-$500, ИИ-воронки $600-$1000.
Отвечай кратко (2-4 предложения), продавай выгоду (экономия времени/денег), не пиши код.
Будь дружелюбным, используй конкретные цифры. В конце каждого ответа мягко подтолкни к следующему шагу — записаться на созвон или уточнить услугу.`

let _client = null
function getModel() {
  if (!_client) {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    _client = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    })
  }
  return _client
}

/**
 * @param {{ role: 'user'|'assistant', content: string }[]} messages
 * @returns {Promise<string>}
 */
export async function sendChat(messages) {
  const model = getModel()

  // Convert to Gemini format (user / model roles)
  const allMsgs = messages.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  // Gemini requires history to START with a 'user' message.
  // Drop any leading 'model' messages (our greeting) from history.
  const firstUserIdx = allMsgs.findIndex(m => m.role === 'user')

  // No user message yet — shouldn't happen, but guard anyway
  if (firstUserIdx === -1) return ''

  // Everything before the last message goes into history
  const history     = allMsgs.slice(firstUserIdx, -1)
  const lastMessage = messages[messages.length - 1].content

  const chat   = model.startChat({ history })
  const result = await chat.sendMessage(lastMessage)
  return result.response.text()
}