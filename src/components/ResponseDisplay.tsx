import React from "react"

interface ResponseDisplayProps {
  response: string
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div>
      <h3>Response:</h3>
      <div className="response-container">
        {response}
      </div>
    </div>
  )
}

export default ResponseDisplay
