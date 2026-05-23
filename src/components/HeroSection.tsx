import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[80px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-sm font-body text-blue-300/80 tracking-wide">
          Powered by Gemini + ChromaDB RAG
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-center text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
      >
        <span className="text-white">Ask Your</span>
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Documents
        </span>
        <br />
        <span className="text-white/90">Anything.</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="font-body text-center text-lg md:text-xl text-white/40 max-w-xl mb-12 leading-relaxed"
      >
        Upload any PDF or text file and get precise, AI-powered answers
        instantly — no hallucinations, grounded in your content.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <button
          onClick={onGetStarted}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-display font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
          }}
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          <Zap className="w-5 h-5" />
          Get Started
        </button>

        <a
          href="https://insight-engine-72jw.onrender.com/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-4 rounded-xl font-body text-white/50 hover:text-white/80 border border-white/8 hover:border-white/20 transition-all duration-300 text-sm"
        >
          View API Docs →
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  )
}
