import { useState } from "react"
import { generateOllamaResponse } from "../utils/api"

export const useOllama = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateResponse = async (prompt: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await generateOllamaResponse(prompt)
      setIsLoading(false)
      return response
    } catch (err) {
      setIsLoading(false)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      return null
    }
  }

  return {
    generateResponse,
    isLoading,
    error
  }
}
