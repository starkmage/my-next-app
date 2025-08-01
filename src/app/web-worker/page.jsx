'use client'

import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const worker = new Worker(new URL('./worker.js', import.meta.url)); // 动态导入方式

      worker.postMessage(10);

      worker.onmessage = function (e) {
        console.log('从 worker 收到数据：', e.data);
      };

      return () => worker.terminate(); // 清理
    }
  }, []);
}

export default App