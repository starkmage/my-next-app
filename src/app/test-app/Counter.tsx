// app/counter/Counter.tsx
'use client'; // 必须标记为客户端组件

import { useState } from 'react';

export default function Counter({ initialCount }: { initialCount: number }) {
  // 使用服务端传递的初始值
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>当前值: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      
      {/* 调试信息 */}
      <div style={{ marginTop: 20, color: 'gray' }}>
        <p>服务端初始值: {initialCount}</p>
        <p>客户端当前值: {count}</p>
      </div>
    </div>
  );
}