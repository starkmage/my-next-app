'use client'

import React, { useState, useEffect, useLayoutEffect } from "react";

function Child({ value }) {
  console.log("Child 渲染了！");
  return <div>{value}</div>;
}

const MemoChild = React.memo(Child)

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <MemoChild value="固定值" /> {/* 即使 value 不变，也会重新渲染 */}
    </div>
  );
}

export default Parent