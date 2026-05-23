// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Bot, Copy, Check, MessageSquare } from 'lucide-react'
// import toast from 'react-hot-toast'
// import type { AskStatus } from '../types'

// interface AnswerSectionProps {
//   answer: string | null
//   status: AskStatus
// }

// export function AnswerSection({ answer, status }: AnswerSectionProps) {
//   const [copied, setCopied] = useState(false)

//   const copyAnswer = async () => {
//     if (!answer) return
//     await navigator.clipboard.writeText(answer)
//     setCopied(true)
//     toast.success('Answer copied!')
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <div className="w-full max-w-xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden min-h-[200px]"
//       >
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-400/20 flex items-center justify-center">
//               <Bot className="w-4 h-4 text-indigo-400" />
//             </div>
//             <h2 className="font-display text-2xl font-bold text-white">Answer</h2>
//           </div>

//           <AnimatePresence>
//             {answer && (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 onClick={copyAnswer}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body text-white/40 border border-white/8 hover:border-white/20 hover:text-white/70 transition-all duration-200"
//               >
//                 {copied ? (
//                   <Check className="w-3.5 h-3.5 text-emerald-400" />
//                 ) : (
//                   <Copy className="w-3.5 h-3.5" />
//                 )}
//                 {copied ? 'Copied' : 'Copy'}
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Content */}
//         <AnimatePresence mode="wait">
//           {status === 'loading' && (
//             <motion.div
//               key="skeleton"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-3"
//             >
//               {[100, 85, 92, 60].map((w, i) => (
//                 <motion.div
//                   key={i}
//                   className="h-3 rounded-full"
//                   style={{
//                     width: `${w}%`,
//                     background:
//                       'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
//                     backgroundSize: '200% 100%',
//                   }}
//                   animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
//                   transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }}
//                 />
//               ))}
//             </motion.div>
//           )}

//           {answer && status === 'success' && (
//             <motion.div
//               key="answer"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p className="font-body text-white/75 text-sm leading-relaxed whitespace-pre-wrap">
//                 {answer}
//               </p>
//             </motion.div>
//           )}

//           {!answer && status !== 'loading' && (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex flex-col items-center justify-center py-10 gap-3"
//             >
//               <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-center">
//                 <MessageSquare className="w-5 h-5 text-white/20" />
//               </div>
//               <p className="font-body text-white/25 text-sm text-center">
//                 Your answer will appear here
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   )
// }


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Copy, Check, MessageSquare, Clock, Target, Zap, Radar } from 'lucide-react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import type { AskStatus, AskResponse } from '../types'

interface Props { response: AskResponse | null; status: AskStatus }

export function AnswerSection({ response, status }: Props) {
  const [copied, setCopied] = useState(false)

  const copyAnswer = async () => {
    if (!response?.answer) return
    await navigator.clipboard.writeText(response.answer)
    setCopied(true)
    toast.success('Answer copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const metrics = response ? [
    {
      icon: Clock,
      label: 'Latency',
      value: response.latency != null ? `${response.latency.toFixed(2)}s` : '—',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-400/20',
    },
    {
      icon: Zap,
      label: 'Grounded',
      value: response.eval?.grounded != null ? (response.eval.grounded ? 'YES' : 'NO') : '—',
      badge: response.eval?.grounded != null ? response.eval.grounded : null,
      color: response.eval?.grounded ? 'text-emerald-400' : 'text-red-400',
      bg: response.eval?.grounded ? 'bg-emerald-500/10' : 'bg-red-500/10',
      border: response.eval?.grounded ? 'border-emerald-400/20' : 'border-red-400/20',
    },
    {
      icon: Target,
      label: 'Relevance',
      value: response.eval?.relevance_score != null ? `${response.eval.relevance_score.toFixed(1)}` : '—',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-400/20',
    },
    {
      icon: Radar,
      label: 'Distance',
      value: response.retrieval_distance != null ? response.retrieval_distance.toFixed(2) : '—',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-400/20',
    },
  ] : []

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Answer card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden min-h-[200px]"
      >
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-400/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">Answer</h2>
          </div>
          <AnimatePresence>
            {response?.answer && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                onClick={copyAnswer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 border border-white/8 hover:border-white/20 hover:text-white/70 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {[100, 85, 92, 60].map((w, i) => (
                <motion.div key={i} className="h-3 rounded-full"
                  style={{ width: `${w}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%' }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} />
              ))}
            </motion.div>
          )}

          {response?.answer && status === 'success' && (
            <motion.div key="answer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert prose-sm max-w-none
                prose-p:text-white/75 prose-p:leading-relaxed
                prose-li:text-white/75 prose-ul:text-white/75
                prose-strong:text-white prose-headings:text-white
                prose-headings:font-display prose-code:text-cyan-400
                prose-code:bg-white/5 prose-code:px-1 prose-code:rounded">
              <ReactMarkdown>{response.answer}</ReactMarkdown>
            </motion.div>
          )}

          {!response?.answer && status !== 'loading' && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white/20" />
              </div>
              <p className="text-white/25 text-sm text-center">Your answer will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Metrics row */}
      <AnimatePresence>
        {response && status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4"
          >
            {metrics.map((m) => (
              <div key={m.label}
                className={`rounded-xl border ${m.border} ${m.bg} backdrop-blur-xl p-4 flex flex-col gap-2`}>
                <div className="flex items-center gap-1.5">
                  <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
                  <span className="text-white/30 text-xs font-body">{m.label}</span>
                </div>
                <span className={`font-display font-bold text-lg ${m.color}`}>
                  {m.value}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}