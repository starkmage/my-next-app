'use client';
import { useState } from 'react';

const CopyToClipboard = ({
  text,                 // 要复制的字符串
  target,               // 要复制的 DOM 元素（函数返回一个 HTMLElement）
  children,             // 自定义触发按钮
  tip = '复制成功！',    // 成功提示内容
}) => {
  const [showTip, setShowTip] = useState(false);

  const copy = async () => {
    try {
      if (text !== undefined) {
        await navigator.clipboard.writeText(text);
      } else if (typeof target === 'function') {
        const el = target();
        if (el) {
          await navigator.clipboard.writeText(el.innerText || el.textContent);
        } else {
          throw new Error('无效的 DOM 元素');
        }
      } else {
        throw new Error('请传入 text 或 target');
      }

      setShowTip(true);
      setTimeout(() => setShowTip(false), 1500);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  return (
    <div>
      <button onClick={copy}>
        {children || '复制'}
      </button>
      {showTip && (
        <span>
          {tip}
        </span>
      )}
    </div>
  );
};

export default CopyToClipboard;
