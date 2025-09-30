'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const Dropdown = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const containerRef = useRef(null)
  const handleToggle = () => {
    setIsOpen((pre) => !pre)
  }

  const handleSelect = (item) => {
    setSelectedItem(item)
    setIsOpen(false)
    onChange(item)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current.contains(e.target)) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '300px'
    }}
      ref={containerRef}
    >
      <div
        onClick={handleToggle}
        style={{
          width: '100%',
          cursor: 'pointer',
          border: '1px solid #000000'
        }}
      >{selectedItem?.label ?? placeholder}</div>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'skyblue',
          width: '100%'
        }}
      >
        {isOpen ?
          options.map((item) => {
            return <div
              style={{
                borderBottom: '1px solid #000000',
                backgroundColor: item.value === selectedItem.value ? 'yellow' : 'transparent'
              }}
              key={item.value}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          }) : null
        }
      </div>
    </div>
  )
};

export default Dropdown;