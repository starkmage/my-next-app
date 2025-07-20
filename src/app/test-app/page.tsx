'use client'

import { useState } from "react"

function App() {
  const [value, setValue] = useState("");

  const handleClick = () => {
    console.log(value); // 点击按钮时，输出的是旧值
  };

  return (
    <div>
      <input onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App