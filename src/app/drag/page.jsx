'use client'

import Draggable from "./writing"

const App = () => {
  return <Draggable>
    <div style={{ width: 120, height: 60, background: '#f90' }}>Drag me</div>
  </Draggable>
}

export default App