'use client';

import { useEffect, useRef, useState } from "react";

const CountDown = ({ onFinish = () => console.log('finished') }) => {
  const mRef = useRef(null);
  const sRef = useRef(null);
  const [time, setTime] = useState(0); // 秒
  const [running, setRunning] = useState(false);

  // 控制倒计时
  useEffect(() => {
    if (!running || time <= 0) return;

    const timer = setInterval(() => {
      setTime(prev => {
        const next = prev - 1;

        // 同步输入框显示
        if (mRef.current && sRef.current) {
          mRef.current.value = Math.floor(next / 60);
          sRef.current.value = next % 60;
        }

        if (next <= 0) {
          clearInterval(timer);
          setRunning(false);
          onFinish();
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, time]);

  const onStart = () => {
    if (running) return;

    const minutes = Math.max(0, Number(mRef.current?.value ?? 0));
    const seconds = Math.max(0, Math.min(59, Number(sRef.current?.value ?? 0)));
    const total = minutes * 60 + seconds;

    if (total <= 0) {
      alert("请输入大于 0 的时间（秒数 0-59）");
      return;
    }

    setTime(total);
    setRunning(true);

    // 开始时同步填入时间
    mRef.current.value = Math.floor(total / 60);
    sRef.current.value = total % 60;
  };

  const onPause = () => {
    setRunning(false);
  };

  const onReset = () => {
    setRunning(false);
    setTime(0);
    if (mRef.current) mRef.current.value = '';
    if (sRef.current) sRef.current.value = '';
  };

  return (
    <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
      <p>倒计时</p>
      <div style={{ marginBottom: 10 }}>
        <input
          ref={mRef}
          type="number"
          min={0}
          disabled={running}
          placeholder="分钟"
          style={{ width: 100, fontSize: 20 }}
        />
        <span style={{ margin: '0 8px' }}>m</span>
        <input
          ref={sRef}
          type="number"
          min={0}
          max={59}
          disabled={running}
          placeholder="秒钟"
          style={{ width: 100, fontSize: 20 }}
        />
        <span>s</span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onStart} disabled={running}>Start</button>
        <button onClick={onPause} disabled={!running}>Pause</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default CountDown;
