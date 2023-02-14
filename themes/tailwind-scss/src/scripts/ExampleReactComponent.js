import React, { useState } from "react"

function ExampleReactComponent() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="example-react-component" onClick={() => setClickCount(prev => prev + 1)}>
      <h1>Hello from React!</h1>
      <p>You have clicked on this component {clickCount} times.</p>

      <h1 class="text-3xl font-bold underline bg-red-500">
        tailwind
      </h1>
    </div>
  )
}

export default ExampleReactComponent
