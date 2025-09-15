'use client';

import { useEffect, useRef, useState } from "react";

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Countdown Timer Component
 * @param {number} initialSeconds - The total number of seconds to count down from.
 */
const Countdown= ({ initialSeconds = 60 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  // 使用 useRef 来存储 interval ID，这样它不会在每次重渲染时丢失
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      // 如果计时器激活且时间未到，设置 interval
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!isActive || secondsLeft === 0) {
      // 如果计时器暂停或时间到0，清除 interval
      clearInterval(intervalRef.current);
      if (secondsLeft === 0) {
        setIsActive(false); // 时间到了自动暂停
      }
    }

    // 清理函数：组件卸载时清除 interval
    return () => clearInterval(intervalRef.current);
  }, [isActive, secondsLeft]); // 依赖 isActive 和 secondsLeft

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current); // 先清除旧的 interval
    setIsActive(false);
    setSecondsLeft(initialSeconds);
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        {formatTime(secondsLeft)}
      </div>
      <div className="timer-controls">
        <button
          className={`button-start-pause ${isActive ? 'active' : ''}`}
          onClick={handleStartPause}
        >
          {isActive ? '暂停' : '开始'}
        </button>
        <button className="button-reset" onClick={handleReset}>
          重置
        </button>
      </div>
    </div>
  );
};

export default Countdown
