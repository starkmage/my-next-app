'use client'

import Tabs from "./writing"

const App = () => {
  return <Tabs
    defaultActiveKey="tab2" // 非受控
    // activeKey="tab2"     // 控制切换（受控）
    // onChange={(key) => console.log("切换到", key)}
    items={[
      { key: 'tab1', label: 'Tab 1', content: <div>内容1</div> },
      { key: 'tab2', label: 'Tab 2', content: <div>内容2</div> },
      { key: 'tab3', label: 'Tab 3', content: <div>内容3</div> },
    ]}
  />
}

export default App