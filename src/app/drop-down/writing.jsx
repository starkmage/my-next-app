'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const Dropdown = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)

  const handleOpen = useCallback(() => {
    setIsOpen((pre) => !pre)
  }, [])

  const handleSelect = useCallback((option) => {
    if (option.value === selectedValue?.value) {
      setIsOpen(false)
      return
    }

    setSelectedValue(option)
    setIsOpen(false)
    onChange(option)
  }, [selectedValue])

  const containerRef = useRef(null)

  useEffect(() => {
    const handleClose = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClose)

    return () => {
      document.removeEventListener('click', handleClose)
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '300px'
      }}
      ref={containerRef}
    >
      <div
        onClick={handleOpen}
        style={{
          width: '300px',
          height: '30px',
          border: '1px solid #000000',
          cursor: 'pointer'
        }}>
        {selectedValue?.label ?? placeholder}
      </div>
      {
        isOpen && <ul
          style={{
            position: 'absolute',
            top: '40px',
            width: '300px',
            backgroundColor: 'gray',
            border: '1px solid #000000',
          }}
        >
          {options.map((option) => {
            return <li
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{
                width: '300px',
                height: '30px',
                border: '1px solid #000000',
                cursor: 'pointer',
              }}
            >
              {option.label}
            </li>
          })}
        </ul>
      }
    </div>
  )
};

export default Dropdown;