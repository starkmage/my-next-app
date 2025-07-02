'use client'
import Dropdown from "./Dropdown"

const App = () => {
  return <Dropdown triggerText="操作">
    <ul>
      <li>编辑</li>
      <li>删除</li>
      <li>详情</li>
    </ul>
  </Dropdown>
}

export default App