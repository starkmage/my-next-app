'use client';

import { useEffect, useRef, useState } from 'react';

const Carousel = ({ images = [], interval = 3000 }) => {
  const [current, setCurrent] = useState(1); // 中间图索引从 1 开始（因为首尾有克隆图）
  const [transitioning, setTransitioning] = useState(true);
  const timerRef = useRef(null);

  // 构造无限循环：克隆首尾
  const displayImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  const slideTo = (index) => {
    setCurrent(index);
    setTransitioning(true);
  };

  const next = () => slideTo(current + 1);
  const prev = () => slideTo(current - 1);

  // 自动轮播
  useEffect(() => {
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [current, interval]);

  // 轮播结束后判断是否跳转回真实图片
  const handleTransitionEnd = () => {
    if (current === displayImages.length - 1) {
      setTransitioning(false);
      setCurrent(1); // 跳回第一张
    } else if (current === 0) {
      setTransitioning(false);
      setCurrent(displayImages.length - 2); // 跳回最后一张
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 600,
      aspectRatio: '2 / 1', // 保持宽高比
      overflow: 'hidden',
      margin: '0 auto',
    }}>
      <div
        style={{
          display: 'flex',
          width: `${displayImages.length * 100}%`,
          transform: `translateX(-${current * (100 / displayImages.length)}%)`,
          transition: transitioning ? 'transform 0.5s ease' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {displayImages.map((src, i) => (
          <div
            key={i}
            style={{
              width: `${100 / displayImages.length}%`, // 修复点：均分宽度
              height: '100%',
              flexShrink: 0,
            }}
          >
            <img
              src={src}
              alt={`slide-${i}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // 保证图片不变形
              }}
            />
          </div>
        ))}
      </div>

      {/* 左右按钮 */}
      <button
        onClick={prev}
        style={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
        }}
      >‹</button>
      <button
        onClick={next}
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
        }}
      >›</button>

      {/* 底部指示点 */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
      }}>
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => slideTo(i + 1)}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: current === i + 1 ? '#333' : '#ccc',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
