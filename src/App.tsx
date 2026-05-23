import { useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { UploadSection } from './components/UploadSection'
import { AskSection } from './components/AskSection'
import { AnswerSection } from './components/AnswerSection'
import { StepsBar } from './components/StepsBar'
import { useInsightEngine } from './hooks/useInsightEngine'

export default function App() {
  const appRef = useRef<HTMLDivElement>(null)

  const {
    uploadStatus,
    uploadProgress,
    uploadedFile,
    askStatus,
    response,
    handleUpload,
    handleAsk,
  } = useInsightEngine()

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const hasDocument = uploadStatus === 'success'

  return (
    <div className="min-h-screen bg-[#050a18] text-white overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(10,22,40,0.95)',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22d3ee', secondary: '#050a18' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#050a18' },
          },
        }}
      />

      <Navbar onGetStarted={scrollToApp} />

      {/* Hero */}
      <HeroSection onGetStarted={scrollToApp} />

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-blue-400/60 mb-4">
            How it works
          </p>
          <h2 className="font-display text-4xl font-bold text-white">
            Three steps to insight
          </h2>
        </div>
        <StepsBar />
      </section>

      {/* App section */}
      <section ref={appRef} className="py-20 px-4 relative">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400/60 mb-4">
              Get started
            </p>
            <h2 className="font-display text-4xl font-bold text-white">
              Try it now
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <UploadSection
              status={uploadStatus}
              progress={uploadProgress}
              uploadedFile={uploadedFile}
              onUpload={handleUpload}
            />
            <AskSection
              status={askStatus}
              onAsk={handleAsk}
              hasDocument={hasDocument}
            />
          </div>

          {/* Answer full width */}
          <AnswerSection response={response} status={askStatus} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/5 text-center">
        <p className="font-body text-white/20 text-sm">
          Built with FastAPI · ChromaDB · Gemini · LangSmith
        </p>
      </footer>
    </div>
  )
}
