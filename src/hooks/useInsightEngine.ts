import { useState } from 'react'
import toast from 'react-hot-toast'
import { uploadDocument, askQuestion } from '../services/api'
import type { UploadStatus, AskStatus } from '../types'

export function useInsightEngine() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const [askStatus, setAskStatus] = useState<AskStatus>('idle')
  const [answer, setAnswer] = useState<string | null>(null)

  const handleUpload = async (file: File) => {
    setUploadStatus('uploading')
    setUploadProgress(0)
    try {
      const result = await uploadDocument(file, setUploadProgress)
      setUploadedFile(result.filename)
      setUploadStatus('success')
      setAnswer(null)
      toast.success(`"${result.filename}" uploaded — ${result.num_chunks} chunks indexed`)
    } catch (err: unknown) {
      setUploadStatus('error')
      const msg =
        axios_msg(err) ?? 'Upload failed. Check your connection and try again.'
      toast.error(msg)
    }
  }

  const handleAsk = async (question: string) => {
    if (!question.trim()) {
      toast.error('Please enter a question first')
      return
    }
    setAskStatus('loading')
    setAnswer(null)
    try {
      const result = await askQuestion(question)
      setAnswer(result.answer)
      setAskStatus('success')
    } catch (err: unknown) {
      setAskStatus('error')
      const msg = axios_msg(err) ?? 'Failed to get answer. Please try again.'
      toast.error(msg)
    }
  }

  return {
    uploadStatus,
    uploadProgress,
    uploadedFile,
    askStatus,
    answer,
    handleUpload,
    handleAsk,
  }
}

function axios_msg(err: unknown): string | null {
  if (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as { response?: { data?: { detail?: string } } }).response
      ?.data?.detail === 'string'
  ) {
    return (err as { response: { data: { detail: string } } }).response.data
      .detail
  }
  return null
}
