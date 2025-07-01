'use client';
import { useRef, useState } from 'react';

const ResizableBox = ({
  width = 300,
  height = 200,
  minWidth = 100,
  minHeight = 100,
  maxWidth = 800,
  maxHeight = 600,
  children,
  style = {},
}) => {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width, height });

  const isResizing = useRef(false);
  const start = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const onMouseDown = (e) => {
    isResizing.current = true;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isResizing.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;

    const newWidth = Math.min(Math.max(start.current.w + dx, minWidth), maxWidth);
    const newHeight = Math.min(Math.max(start.current.h + dy, minHeight), maxHeight);

    setSize({ width: newWidth, height: newHeight });
  };

  const onMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={boxRef}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        border: '1px solid #ccc',
        ...style,
      }}
    >
      {children}
      <div
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 16,
          height: 16,
          cursor: 'nwse-resize',
          background: 'rgba(0,0,0,0.1)',
          borderTop: '1px solid #aaa',
          borderLeft: '1px solid #aaa',
        }}
      />
    </div>
  );
};

export default ResizableBox;
