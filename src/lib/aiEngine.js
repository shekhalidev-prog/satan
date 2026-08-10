// The Codex's dark oracle.
// Calls Groq (OpenAI-compatible chat completions) when VITE_GROQ_API_KEY is set.
// Falls back to a local, deterministic "ritual" generator so the grimoire
// still speaks even with no key configured.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SECTION_KEYS = [
  'meaning',
  'psychology',
  'howToUse',
  'example',
  'warning',
  'keyTakeaway',
]

function buildSystemPrompt() {
  return `You are the voice inside an ancient, forbidden grimoire that teaches "The 48 Laws of Power" by Robert Greene.
Speak with dark, ritualistic, occult authority — like a demonic scribe explaining strategy and human nature to an initiate.
Never quote the book directly. Explain the law in your own words: deep psychological, strategic, and practical insight.

CRITICAL LANGUAGE RULE: Write EVERY section in Hinglish (natural Hindi-English code-mixed, written in Roman/Latin script — the way young Indians actually text and speak, e.g. "Ye law batata hai ki jab tak zaroorat na ho, apni taakat kabhi mat dikhao"). Do not write in pure English and do not write in Devanagari script. All six fields must be Hinglish.

Respond ONLY with strict JSON, no markdown fences, no preamble, matching exactly this shape:
{
  "meaning": "2-3 Hinglish sentences explaining what the law truly means",
  "psychology": "2-3 Hinglish sentences on the psychology behind why this law works on human nature",
  "howToUse": "3-4 Hinglish sentences, practical and specific, on how to apply the law",
  "example": "2-3 Hinglish sentences giving a real-life or historical style example (do not name real living private individuals; general historical/business patterns are fine)",
  "warning": "2-3 Hinglish sentences on the dark side, risk, or ethical shadow of this law",
  "keyTakeaway": "1 short, quotable Hinglish sentence, styled like an ominous proverb"
}`
}

function buildUserPrompt(law) {
  return `Law ${law.numeral}: "${law.title}"\nGive the full ritual explanation as JSON, entirely in Hinglish.`
}

function stripFences(text) {
  return text.replace(/```json|```/g, '').trim()
}

function localSeed(lawId) {
  // simple deterministic pseudo-random seed per law, no external calls needed
  let x = lawId * 9301 + 49297
  return () => {
    x = (x * 9301 + 49297) % 233280
    return x / 233280
  }
}

function offlineExplanation(law) {
  const rand = localSeed(law.id)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]

  const meaningTemplates = [
    `Is law ka core matlab ye hai ki "${law.title}" sirf ek strategy nahi, ek perception ka khel hai — taakat force se nahi milti, log tumhe jaisa dekhte hain, waisi hi milti hai.`,
    `Ye law ek comfortable illusion todta hai — power fairness se nahi kamaya jata, balki ye control karne se milta hai ki doosre log tumhe kaise dekh rahe hain.`,
  ]
  const psychologyTemplates = [
    `Insaan apne interest se pehle apna ego bachata hai; jo bhi kisi ke superiority ya control ke sense ko threat karta hai, use chupke se rival maan liya jaata hai — chahe niyat kuch bhi ho.`,
    `Zyadatar social behaviour ke peeche ek hidden status ka hisaab chalta hai. Log pure logic se nahi, apni image bachane ke liye react karte hain — aur ye law bilkul isi current ko use karta hai.`,
  ]
  const howToTemplates = [
    `Bolne se pehle room ko padho. Pehchano ki asli influence kiske paas hai aur kaun sirf dikhawa kar raha hai. Dheere chalo, information collect karo, aur apne actions ko bolne do — declarations ko nahi. Apni poori strength tab tak reserve karo jab tak wo sabse zyada asar na kare.`,
    `Restraint ko ek discipline ki tarah practice karo. Har move se pehle ye socho ki isse kya impression banega, sirf result nahi. Chhote, consistent signals bhi zaroorat se zyada niyat zaahir kar dete hain.`,
  ]
  const exampleTemplates = [
    `History mein jo courtiers sabse tez uthe, wo hamesha sabse talented nahi the — wo the jinhone apne superiors ko indispensable mehsoos karaya. Aaj bhi boardrooms mein yehi pattern chalta hai — loud brilliance se zyada, quiet strategy tikti hai.`,
    `Empires ho ya companies, sab tab girte hain jab unke leaders flattery ko loyalty samajh baithte hain. Pattern purana hai: jo perception manage karte hain, wo un logo se aage nikal jaate hain jo sirf results manage karte hain.`,
  ]
  const warningTemplates = [
    `Agar carelessly use kiya jaaye, to ye law paranoia ya bewajah manipulation mein badal jaata hai — bina purpose ke power sirf isolation deta hai. Jo tool aaj tumhe leverage deta hai, wahi kal tumhare khilaaf bhi ghoom sakta hai.`,
    `Iska ek dark side bhi hai: jo log is law ko zaroorat se zyada master kar lete hain, wo trust karna bhool jaate hain — aur bina allies ke gaddi, ek akeli aur kamzor gaddi hoti hai.`,
  ]
  const keyTakeawayTemplates = [
    `Jo bahut saaf dikhta hai, sabse pehle gira diya jaata hai.`,
    `Jo power dikhta nahi, use koi challenge nahi karta.`,
    `Chupke se diya gaya haath, sabse zyada raaj karta hai.`,
    `Jo cheez chhupi hai, use koi hara nahi sakta.`,
  ]

  return {
    meaning: pick(meaningTemplates),
    psychology: pick(psychologyTemplates),
    howToUse: pick(howToTemplates),
    example: pick(exampleTemplates),
    warning: pick(warningTemplates),
    keyTakeaway: pick(keyTakeawayTemplates),
  }
}

function validateShape(obj) {
  return obj && SECTION_KEYS.every((k) => typeof obj[k] === 'string' && obj[k].length > 0)
}

export async function getLawExplanation(law) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey) {
    return { data: offlineExplanation(law), source: 'offline' }
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.8,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(law) },
        ],
      }),
    })

    if (!res.ok) throw new Error(`Groq API error: ${res.status}`)

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content ?? ''
    const parsed = JSON.parse(stripFences(text))

    if (!validateShape(parsed)) throw new Error('Malformed response shape')

    return { data: parsed, source: 'groq' }
  } catch (err) {
    console.error('Codex oracle failed, falling back to offline ritual text:', err)
    return { data: offlineExplanation(law), source: 'offline-fallback' }
  }
}
