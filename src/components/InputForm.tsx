import React from "react"

interface InputFormProps {
  input: string
  setInput: (input: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

const InputForm: React.FC<InputFormProps> = ({ 
  input, 
  setInput, 
  handleSubmit, 
  isLoading 
}) => {
  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt here..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? "Processing..." : "Generate Response"}
      </button>
    </form>
  )
}

export default InputForm
