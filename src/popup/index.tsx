import { useState } from "react"
import InputForm from "../components/InputForm"
import LoadingIndicator from "../components/LoadingIndicator"
import ResponseDisplay from "../components/ResponseDisplay"
import { useOllama } from "../hooks/useOllama"

import "./style.css"

export default function Popup() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const { generateResponse, isLoading, error } = useOllama()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const result = await generateResponse(input)
    if (result) {
      setResponse(result)
    }
  }

  return (
    <div className="popup-container">
      <h1>Ollama Assistant</h1>
      
      <InputForm 
        input={input} 
        setInput={setInput} 
        handleSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
      
      {isLoading && <LoadingIndicator />}
      
      {error && <div className="error-message">{error}</div>}
      
      {response && !isLoading && (
        <ResponseDisplay response={response} />
      )}
    </div>
  )
}
