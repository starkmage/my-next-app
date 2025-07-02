'use client';
import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ triggerText = '下拉', children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 外部点击关闭逻辑
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      ref={dropdownRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button onClick={toggle}>{triggerText}</button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            marginTop: 4,
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: 4,
            zIndex: 1000,
            minWidth: 120,
            padding: 8,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
