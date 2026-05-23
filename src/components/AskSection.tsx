import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Loader2 } from 'lucide-react'
import type { AskStatus } from '../types'

interface AskSectionProps {
  status: AskStatus
  onAsk: (question: string) => void
  hasDocument: boolean
}

const SUGGESTIONS = [
  'What are the main topics covered?',
  'Summarize the key findings.',
  'What conclusions are drawn?',
]

export function AskSection({ status, onAsk, hasDocument }: AskSectionProps) {
  const [question, setQuestion] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isLoading = status === 'loading'
  const canAsk = question.trim().length > 0 && !isLoading

  const submit = () => {
    if (canAsk) onAsk(question)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit()
  }

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }, [question])

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden"
      >
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        <div className="mb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Ask a Question</h2>
            <p className="font-body text-sm text-white/40">
              {hasDocument ? 'Your document is ready' : 'Upload a document first'}
            </p>
          </div>
        </div>

        {/* Suggestions */}
        {hasDocument && !question && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQuestion(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-body text-white/40 border border-white/8 hover:border-blue-400/30 hover:text-white/70 transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}

        {/* Textarea */}
        <div className="relative rounded-xl border border-white/8 bg-white/[0.03] focus-within:border-blue-400/40 transition-colors duration-200 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              hasDocument
                ? 'Ask anything about your document…'
                : 'Upload a document to get started…'
            }
            disabled={!hasDocument || isLoading}
            rows={3}
            className="w-full resize-none bg-transparent px-4 pt-4 pb-12 font-body text-white/80 placeholder-white/20 text-sm outline-none disabled:opacity-40 disabled:cursor-not-allowed leading-relaxed"
          />
          {/* Toolbar */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/20 hidden sm:block">
              ⌘↵ to send
            </span>
            <motion.button
              onClick={submit}
              disabled={!canAsk || !hasDocument}
              whileHover={{ scale: canAsk ? 1.05 : 1 }}
              whileTap={{ scale: canAsk ? 0.95 : 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-display font-semibold text-xs transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background:
                  canAsk && hasDocument
                    ? 'linear-gradient(135deg, #3b82f6, #06b6d4)'
                    : 'rgba(255,255,255,0.05)',
                color: 'white',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Thinking…
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Ask
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Loading shimmer hint */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-3"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <span className="font-body text-xs text-white/30">
              Searching your document and generating answer…
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
