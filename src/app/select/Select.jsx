'use client';

import { useEffect, useRef, useState } from 'react';

const Select = ({
  options = [],
  multiple = false,
  value = multiple ? [] : null,
  onChange = () => {},
  placeholder = '请选择...',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val) => {
    if (multiple) {
      const newVal = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      onChange(newVal);
    } else {
      onChange(val);
      setOpen(false);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : null);
    setSearch('');
  };

  const isSelected = (val) =>
    multiple ? value.includes(val) : value === val;

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: 300 }}>
      {/* 选择框 */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: 8,
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        {multiple ? (
          value.length > 0 ? value.map(v => {
            const item = options.find(opt => opt.value === v);
            return (
              <span key={v} style={{ marginRight: 6 }}>
                {item?.label}
              </span>
            );
          }) : <span style={{ color: '#aaa' }}>{placeholder}</span>
        ) : (
          value
            ? options.find(opt => opt.value === value)?.label
            : <span style={{ color: '#aaa' }}>{placeholder}</span>
        )}
        {/* 清空按钮 */}
        <span
          onClick={handleClear}
          style={{ float: 'right', cursor: 'pointer', color: '#999' }}
        >✕</span>
      </div>

      {/* 下拉面板 */}
      {open && (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: 4,
            marginTop: 4,
            background: '#fff',
            maxHeight: 200,
            overflowY: 'auto',
            position: 'absolute',
            width: '100%',
            zIndex: 999,
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索..."
            style={{
              width: '100%',
              padding: 6,
              boxSizing: 'border-box',
              border: 'none',
              borderBottom: '1px solid #eee',
              outline: 'none',
            }}
          />
          {filteredOptions.length === 0 ? (
            <div style={{ padding: 10, color: '#999' }}>无匹配选项</div>
          ) : filteredOptions.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                padding: 8,
                background: isSelected(opt.value) ? '#f0f0f0' : '#fff',
                cursor: 'pointer',
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
