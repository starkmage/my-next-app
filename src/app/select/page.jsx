'use client'

import { useState } from "react";
import Select from "./Select"

const App = () => {
  const [val, setVal] = useState(null)
  const [list, setList] = useState([])
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橘子', value: 'orange' },
  ];

  return (
    <>
      <Select value={val} onChange={setVal} options={options} />
      <Select multiple value={list} onChange={setList} options={options} />
    </>
  )
}

export default App