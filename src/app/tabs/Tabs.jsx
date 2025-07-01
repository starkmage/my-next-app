'use client'

import { useState } from "react";

const Tabs = ({
  items = [],
  activeKey,            // 受控：当前激活 tab key
  onChange,             // 受控：切换回调
  defaultActiveKey,     // 非受控：默认激活 key
}) => {
  const isControlled = activeKey !== undefined;
  const [innerActiveKey, setInnerActiveKey] = useState(defaultActiveKey || items[0]?.key);

  const currentKey = isControlled ? activeKey : innerActiveKey;

  const handleTabClick = (key) => {
    if (!isControlled) {
      setInnerActiveKey(key);
    }
    onChange?.(key);
  };

  const activeContent = items.find(item => item.key === currentKey)?.content;

  return (
    <div className="tabs">
      <div className="tab-header" style={{ display: 'flex', gap: 12 }}>
        {items.map(item => (
          <div
            key={item.key}
            onClick={() => handleTabClick(item.key)}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              borderBottom: item.key === currentKey ? '2px solid blue' : '2px solid transparent'
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="tab-content" style={{ padding: '12px' }}>
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
