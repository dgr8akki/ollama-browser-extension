export const generateOllamaResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error("Error calling Ollama API:", error)
    throw new Error("Failed to get response from Ollama. Make sure Ollama is running on your machine.")
  }
}
