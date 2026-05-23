import axios from 'axios'
import type { AskResponse, UploadResponse } from '../types'

const BASE_URL = 'https://insight-engine-72jw.onrender.com'



const api = axios.create({
  baseURL: BASE_URL,
  
})

export const uploadDocument = async (
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post<UploadResponse>('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (e.total && onProgress) {
        onProgress(Math.round((e.loaded * 100) / e.total))
      }
    },
  })
  return data
}

export const askQuestion = async (question: string): Promise<AskResponse> => {
  const { data } = await api.post<AskResponse>('/ask', { question })
  return data
}
