import { motion } from 'framer-motion'
import { Upload, MessageCircle, Sparkles } from 'lucide-react'

const STEPS = [
  { icon: Upload, label: 'Upload', desc: 'Drop your PDF or TXT' },
  { icon: MessageCircle, label: 'Ask', desc: 'Type your question' },
  { icon: Sparkles, label: 'Answer', desc: 'AI answers instantly' },
]

export function StepsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 max-w-2xl mx-auto"
    >
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center gap-0">
          <div className="flex flex-col items-center gap-2 px-8">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <step.icon className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-white text-sm">{step.label}</p>
              <p className="font-body text-white/30 text-xs">{step.desc}</p>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className="hidden sm:block w-16 h-px bg-gradient-to-r from-white/10 to-white/5" />
          )}
        </div>
      ))}
    </motion.div>
  )
}
