import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'

interface NavbarProps {
  onGetStarted: () => void
}

export function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b border-white/5"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-bold text-white text-lg tracking-tight">
          Insight Engine
        </span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://insight-engine-72jw.onrender.com/docs"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:block font-body text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          API Docs
        </a>
        <button
          onClick={onGetStarted}
          className="px-4 py-2 rounded-lg font-display font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
        >
          Try Now
        </button>
      </div>
    </motion.nav>
  )
}
