export interface AskResponse {
  answer: string
  chunks?: Array<{ chunk: string; distance: number }>
  latency?: number
  retrieval_distance?: number
  eval?: { grounded: boolean; relevance_score: number }
}

export interface UploadResponse {
  filename: string
  num_chunks: number
  embeddings_created: number
  first_embedding_dimensions: number
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'
export type AskStatus = 'idle' | 'loading' | 'success' | 'error'
