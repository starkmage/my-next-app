'use client'

import Draggable from "./Drag"

const App = () => {
  return <Draggable>
    <div style={{ width: 120, height: 60, background: '#f90' }}>拖我</div>
  </Draggable>
}

export default App