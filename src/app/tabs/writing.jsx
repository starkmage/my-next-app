'use client'

import { useCallback, useMemo, useState } from "react";

/* 
items={[
  { key: 'tab1', label: 'Tab 1', content: <div>内容1</div> },
  { key: 'tab2', label: 'Tab 2', content: <div>内容2</div> },
  { key: 'tab3', label: 'Tab 3', content: <div>内容3</div> },
]}
*/

const Tabs = ({
  items = [],
  activeKey,            // 受控：当前激活 tab key
  onChange,             // 受控：切换回调
  defaultActiveKey,     // 非受控：默认激活 key
}) => {
  const isControlled = activeKey !== undefined ? true : false
  const [innerKey, setInnerKey] = useState(defaultActiveKey ?? items[0].key)

  const currentKey = useMemo(() => {
    if (isControlled) {
      return activeKey
    } else {
      return innerKey
    }
  }, [isControlled, innerKey, activeKey])

  const activeContent = useMemo(() => {
    return items.find((item) => {
      return item.key === currentKey
    }).content
  }, [currentKey])

  const handleChange = useCallback((key) => {
    if (typeof onChange === 'function') {
      onChange(key)
    }
    setInnerKey(key)
  }, [onChange])

  return <div>
    <div
      style={{
        display: 'flex',
        gap: '20px'
      }}
    >
      {items.map((item) => {
        return (
          <div
            onClick={() => handleChange(item.key)}
            key={item.key}
            style={{
              width: '100px',
              cursor: 'pointer',
              borderBottom: currentKey === item.key ? '2px solid #000000' : 'none'
            }}
          >{item.label}</div>
        )
      })}
    </div>
    <div>
      {activeContent}
    </div>
  </div>
};

export default Tabs;
