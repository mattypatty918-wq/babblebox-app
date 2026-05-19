import { useState, useRef, useEffect } from 'react'

const LANGUAGES = [
  { code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }, { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' }, { code: 'it', name: 'Italian' }, { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' }, { code: 'zh', name: 'Chinese' }, { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }, { code: 'ar', name: 'Arabic' }, { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' }, { code: 'pl', name: 'Polish' }, { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' }, { code: 'da', name: 'Danish' }, { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' }, { code: 'cs', name: 'Czech' }, { code: 'uk', name: 'Ukrainian' },
  { code: 'el', name: 'Greek' }, { code: 'he', name: 'Hebrew' }, { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' }, { code: 'id', name: 'Indonesian' }, { code: 'ms', name: 'Malay' },
  { code: 'tl', name: 'Tagalog' }, { code: 'bn', name: 'Bengali' }, { code: 'ur', name: 'Urdu' },
]

type Page = 'home' | 'translator' | 'voice' | 'camera' | 'keyboard' | 'documents' | 'clone' | 'chat' | 'pricing'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [isPro, setIsPro] = useState(false)

  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'translator', icon: '📝', label: 'Text' },
    { id: 'voice', icon: '🎤', label: 'Voice' },
    { id: 'camera', icon: '📷', label: 'Camera' },
    { id: 'keyboard', icon: '⌨️', label: 'Keyboard' },
    { id: 'documents', icon: '📄', label: 'Docs' },
  ]

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={setPage} onUpgrade={() => setPage('pricing')} isPro={isPro} />
      case 'translator': return <TranslatorPage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'voice': return <VoicePage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'camera': return <CameraPage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'keyboard': return <KeyboardPage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'documents': return <DocumentsPage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'clone': return <ClonePage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'chat': return <ChatPage isPro={isPro} onUpgrade={() => setPage('pricing')} />
      case 'pricing': return <PricingPage onBack={() => setPage('home')} onSelectPlan={() => setIsPro(true)} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around py-2 px-2 z-50">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${page === item.id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        ))}
        <button onClick={() => setPage('clone')} className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${page === 'clone' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <span className="text-xl">🗣️</span>
          <span className="text-[10px] mt-0.5">Clone</span>
        </button>
        <button onClick={() => setPage('chat')} className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${page === 'chat' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <span className="text-xl">💬</span>
          <span className="text-[10px] mt-0.5">AI Chat</span>
        </button>
      </nav>
    </div>
  )
}

function HomePage({ onNavigate, onUpgrade, isPro }: { onNavigate: (p: Page) => void; onUpgrade: () => void; isPro: boolean }) {
  const features = [
    { icon: '🌍', title: '100+ Languages', desc: 'Translate between any language pair' },
    { icon: '🎤', title: 'Voice Translation', desc: 'Real-time speech translation' },
    { icon: '📷', title: 'Camera Translation', desc: 'Point camera at any text' },
    { icon: '⌨️', title: 'Keyboard', desc: 'Type in any language' },
    { icon: '📄', title: 'Documents', desc: 'Translate PDF, DOC, TXT files' },
    { icon: '🗣️', title: 'Voice Clone', desc: 'Clone your voice for translations' },
  ]

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🌐</div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Translate Now</h1>
        <p className="text-slate-400 mt-2">Break language barriers everywhere</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {features.map((f, i) => (
          <button key={i} onClick={() => onNavigate(f.title === 'Voice Clone' ? 'clone' : f.title === 'Documents' ? 'documents' : f.title === 'Keyboard' ? 'keyboard' : f.title === 'Camera' ? 'camera' : f.title === 'Voice' ? 'voice' : 'translator')} className="bg-slate-800 rounded-2xl p-4 text-left hover:bg-slate-700 transition-colors border border-slate-700">
            <div className="text-3xl mb-2">{f.icon}</div>
            <div className="font-semibold text-sm">{f.title}</div>
            <div className="text-xs text-slate-400 mt-1">{f.desc}</div>
          </button>
        ))}
      </div>

      {!isPro && (
        <button onClick={onUpgrade} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl text-lg">
          Upgrade to Pro — $4.99/mo
        </button>
      )}
    </div>
  )
}

function TranslatorPage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [loading, setLoading] = useState(false)

  const translate = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(input)}&source=${sourceLang}&target=${targetLang}`)
      const data = await res.json()
      setOutput(data.translated || 'Translation unavailable')
    } catch {
      setOutput('Error translating. Try again.')
    }
    setLoading(false)
  }

  const swap = () => { const t = sourceLang; setSourceLang(targetLang); setTargetLang(t) }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📝 Text Translation</h2>
      <div className="flex gap-2 mb-3">
        <select value={sourceLang} onChange={e => setSourceLang(e.target.value)} className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-3 text-white">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
        <button onClick={swap} className="bg-slate-700 px-4 rounded-xl text-xl hover:bg-slate-600">⇄</button>
        <select value={targetLang} onChange={e => setTargetLang(e.target.value)} className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-3 text-white">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to translate..." className="w-full h-32 bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 resize-none mb-3" />
      <button onClick={translate} disabled={loading} className="w-full bg-purple-600 font-bold py-3 rounded-xl disabled:opacity-50">
        {loading ? 'Translating...' : 'Translate →'}
      </button>
      {output && <div className="mt-4 bg-slate-800 rounded-xl p-4 border border-slate-600"><div className="text-xs text-slate-400 mb-1">Translation:</div><div className="text-lg">{output}</div></div>}
      {!isPro && <button onClick={onUpgrade} className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function VoicePage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [recording, setRecording] = useState(false)
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [transcript, setTranscript] = useState('')
  const [translation, setTranslation] = useState('')
  const mediaRef = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRef.current = new MediaRecorder(stream)
      mediaRef.current.start()
      setRecording(true)
    } catch { alert('Microphone access denied') }
  }

  const stopRecording = () => {
    if (mediaRef.current) {
      mediaRef.current.stop()
      setRecording(false)
    }
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">🎤 Voice Translation</h2>
      <div className="flex gap-2 mb-6 justify-center">
        <select value={sourceLang} onChange={e => setSourceLang(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-white">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
        <span className="self-center text-slate-400">→</span>
        <select value={targetLang} onChange={e => setTargetLang(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-white">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </div>
      <button onClick={recording ? stopRecording : startRecording} className={`w-32 h-32 rounded-full text-6xl mx-auto flex items-center justify-center transition-all ${recording ? 'bg-red-500 animate-pulse' : 'bg-purple-600'}`}>
        {recording ? '⏹️' : '🎤'}
      </button>
      <p className="text-slate-400 mt-4">{recording ? 'Tap to stop recording' : 'Tap to start recording'}</p>
      {transcript && <div className="mt-6 bg-slate-800 rounded-xl p-4 text-left"><div className="text-xs text-slate-400">You said:</div><div className="text-lg">{transcript}</div><div className="text-xs text-slate-400 mt-2">Translation:</div><div className="text-lg text-purple-300">{translation}</div></div>}
      {!isPro && <button onClick={onUpgrade} className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function CameraPage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [image, setImage] = useState<string | null>(null)
  const [translation, setTranslation] = useState('')
  const [targetLang, setTargetLang] = useState('en')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async () => {
        setImage(reader.result as string)
        // Simulated OCR - in production, send to OCR API
        setTranslation('Text detected from image. Upgrade to Pro for full OCR translation.')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📷 Camera Translation</h2>
      <div className="bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600 p-8 text-center mb-4">
        {image ? <img src={image} alt="Captured" className="max-h-64 mx-auto rounded-xl" /> : (
          <>
            <div className="text-5xl mb-4">📷</div>
            <p className="text-slate-400">Take a photo or select an image</p>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImage} className="hidden" />
      <div className="flex gap-3">
        <button onClick={() => fileRef.current?.click()} className="flex-1 bg-purple-600 font-bold py-3 rounded-xl">📷 Take Photo</button>
        <select value={targetLang} onChange={e => setTargetLang(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-white">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </div>
      {translation && <div className="mt-4 bg-slate-800 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">Detected Text:</div><div className="text-lg">{translation}</div></div>}
      {!isPro && <button onClick={onUpgrade} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function KeyboardPage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [text, setText] = useState('')
  const [translated, setTranslated] = useState('')
  const [targetLang, setTargetLang] = useState('es')

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">⌨️ Global Keyboard</h2>
      <p className="text-slate-400 text-center mb-4">Type in any language with auto-translation</p>
      <select value={targetLang} onChange={e => setTargetLang(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white mb-4">
        {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
      </select>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type message..." className="w-full h-32 bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 resize-none" />
      <button onClick={() => setTranslated('Translation: ' + text)} className="w-full mt-3 bg-purple-600 font-bold py-3 rounded-xl">Translate →</button>
      {translated && <div className="mt-4 bg-slate-800 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">Translation:</div><div className="text-lg">{translated}</div></div>}
      {!isPro && <button onClick={onUpgrade} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function DocumentsPage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [translated, setTranslated] = useState('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📄 Document Translation</h2>
      <div className="bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600 p-8 text-center mb-4">
        <div className="text-5xl mb-4">📄</div>
        <p className="text-slate-400 mb-4">Supports PDF, DOC, TXT, and more</p>
        <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} className="hidden" />
        <button onClick={() => document.querySelector<HTMLInputElement>('input[type=file]')?.click()} className="bg-purple-600 font-bold py-3 px-8 rounded-xl">Select Document</button>
      </div>
      {file && <div className="bg-slate-800 rounded-xl p-4 mb-4"><div className="font-semibold">{file.name}</div><div className="text-sm text-slate-400">{ (file.size / 1024).toFixed(1) } KB</div></div>}
      <button onClick={() => setTranslated('Document translation ready. Upgrade to Pro for full translation.')} className="w-full bg-purple-600 font-bold py-3 rounded-xl" disabled={!file}>Translate Document →</button>
      {translated && <div className="mt-4 bg-slate-800 rounded-xl p-4"><div className="text-xs text-slate-400 mb-1">Translation:</div><div className="text-lg">{translated}</div></div>}
      {!isPro && <button onClick={onUpgrade} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function ClonePage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [recording, setRecording] = useState(false)
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = e => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioUrl(URL.createObjectURL(blob))
      }
      mediaRecorder.start()
      setRecording(true)
      setTimeout(() => mediaRecorder.stop(), 10000)
    } catch { alert('Microphone access denied') }
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">🗣️ Voice Clone</h2>
      <p className="text-slate-400 mb-6">Record 30 seconds of your voice, then type any text to hear it spoken in your voice</p>
      <button onClick={recording ? () => {} : startRecording} className={`w-32 h-32 rounded-full text-6xl mx-auto flex items-center justify-center transition-all ${recording ? 'bg-red-500 animate-pulse' : 'bg-purple-600'}`}>
        {recording ? '⏺️' : '🎤'}
      </button>
      <p className="text-slate-400 mt-4">{recording ? 'Recording... (10s)' : 'Tap to record your voice'}</p>
      {audioUrl && <>
        <audio src={audioUrl} controls className="mx-auto mt-4 w-full" />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type text to speak in your cloned voice..." className="w-full mt-4 bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 resize-none h-24" />
        <button className="w-full mt-3 bg-purple-600 font-bold py-3 rounded-xl">Generate Clone Voice →</button>
      </>}
      {!isPro && <button onClick={onUpgrade} className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function ChatPage({ isPro, onUpgrade }: { isPro: boolean; onUpgrade: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { role: 'user', text: input }])
    setTimeout(() => setMessages(m => [...m, { role: 'ai', text: 'I can help translate this. Upgrade to Pro for AI chat with translation.' }]), 1000)
    setInput('')
  }

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-140px)]">
      <h2 className="text-xl font-bold mb-4">💬 AI Chat Translator</h2>
      <div className="flex-1 bg-slate-800 rounded-2xl p-4 overflow-y-auto mb-4">
        {messages.length === 0 && <p className="text-slate-400 text-center mt-20">Ask me anything to translate</p>}
        {messages.map((m, i) => <div key={i} className={`mb-3 ${m.role === 'user' ? 'text-right' : 'text-left'}`}><span className={`inline-block px-4 py-2 rounded-xl ${m.role === 'user' ? 'bg-purple-600' : 'bg-slate-700'}`}>{m.text}</span></div>)}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400" />
        <button onClick={send} className="bg-purple-600 px-6 rounded-xl font-bold">Send</button>
      </div>
      {!isPro && <button onClick={onUpgrade} className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-3 rounded-xl">Upgrade to Pro — $4.99/mo</button>}
    </div>
  )
}

function PricingPage({ onBack, onSelectPlan }: { onBack: () => void; onSelectPlan: () => void }) {
  return (
    <div className="p-6">
      <button onClick={onBack} className="text-purple-400 mb-4">← Back</button>
      <h2 className="text-2xl font-bold text-center mb-6">💎 Translate Now Pro</h2>
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-2xl p-6 border border-purple-500">
          <div className="text-sm text-purple-400">Monthly</div>
          <div className="text-4xl font-bold">$4.99<span className="text-lg text-slate-400">/mo</span></div>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>✅ Unlimited translations</li>
            <li>✅ Voice translation</li>
            <li>✅ Camera translation</li>
            <li>✅ Document translation</li>
            <li>✅ Voice clone</li>
            <li>✅ AI chat translator</li>
          </ul>
          <button onClick={onSelectPlan} className="w-full mt-4 bg-purple-600 font-bold py-3 rounded-xl">Get Started</button>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-600">
          <div className="text-sm text-slate-400">Annual</div>
          <div className="text-4xl font-bold">$39.99<span className="text-lg text-slate-400">/yr</span></div>
          <div className="text-purple-400 text-sm mt-1">Save 33%</div>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>✅ Everything in Monthly</li>
            <li>✅ Best value</li>
          </ul>
          <button className="w-full mt-4 bg-slate-700 font-bold py-3 rounded-xl">Get Annual Plan</button>
        </div>
      </div>
    </div>
  )
}