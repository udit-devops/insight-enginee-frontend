import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react'
import type { UploadStatus } from '../types'

interface UploadSectionProps {
  status: UploadStatus
  progress: number
  uploadedFile: string | null
  onUpload: (file: File) => void
}

const ACCEPTED = ['.pdf', '.txt', 'application/pdf', 'text/plain']

export function UploadSection({
  status,
  progress,
  uploadedFile,
  onUpload,
}: UploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validate = (file: File): boolean => {
    const ok =
      file.type === 'application/pdf' ||
      file.type === 'text/plain' ||
      file.name.endsWith('.pdf') ||
      file.name.endsWith('.txt')
    if (!ok) setError('Only PDF and TXT files are supported.')
    else setError(null)
    return ok
  }

  const pick = useCallback(
    (file: File) => {
      if (!validate(file)) return
      setSelectedFile(file)
    },
    []
  )

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) pick(file)
  }

  const handleUploadClick = () => {
    if (selectedFile) onUpload(selectedFile)
  }

  const clearFile = () => {
    setSelectedFile(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden"
      >
        {/* Glow top */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-white mb-1">
            Upload Document
          </h2>
          <p className="font-body text-sm text-white/40">
            PDF or TXT — we'll index it and make it queryable
          </p>
        </div>

        {/* Drop zone */}
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !selectedFile && inputRef.current?.click()}
          animate={{
            borderColor: dragging
              ? 'rgba(59,130,246,0.6)'
              : selectedFile
              ? 'rgba(34,211,238,0.3)'
              : 'rgba(255,255,255,0.08)',
            backgroundColor: dragging
              ? 'rgba(59,130,246,0.05)'
              : 'rgba(255,255,255,0.02)',
          }}
          className="relative rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer min-h-[160px]"
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) pick(f)
            }}
          />

          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                key="file"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="font-body text-white/80 text-sm font-medium">
                  {selectedFile.name}
                </span>
                <span className="font-mono text-white/30 text-xs">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile() }}
                  className="mt-1 flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  <X className="w-3 h-3" /> Remove
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-blue-400" />
                </div>
                <div className="text-center">
                  <p className="font-body text-white/60 text-sm">
                    <span className="text-blue-400 font-medium">Click to browse</span>{' '}
                    or drag & drop
                  </p>
                  <p className="font-body text-white/25 text-xs mt-1">PDF, TXT supported</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center gap-2 text-red-400 text-sm font-body"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <AnimatePresence>
          {status === 'uploading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-body text-xs text-white/40">Uploading & indexing…</span>
                <span className="font-mono text-xs text-white/40">{progress}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success badge */}
        <AnimatePresence>
          {status === 'success' && uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/8 border border-emerald-400/20"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-body text-emerald-300 text-sm">
                <span className="font-medium">{uploadedFile}</span> indexed successfully
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload button */}
        <motion.button
          onClick={handleUploadClick}
          disabled={!selectedFile || status === 'uploading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5 w-full py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background:
              selectedFile && status !== 'uploading'
                ? 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
                : 'rgba(255,255,255,0.05)',
            color: 'white',
          }}
        >
          {status === 'uploading' ? 'Indexing document…' : 'Upload & Index'}
        </motion.button>
      </motion.div>
    </div>
  )
}
