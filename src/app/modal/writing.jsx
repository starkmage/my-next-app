'use client'
import React, { useEffect } from "react"
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const { isOpen, onClose, children } = props

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return ReactDOM.createPortal((
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9,
        position: 'absolute',
        top: 0,
        left: 0
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '600px',
          height: '600px',
          opacity: '1',
          position: 'relative',
        }}
        onClick={handleModalClick}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer'
          }}
          onClick={onClose}
        >X</div>
        {children}
      </div>
    </div>
  ), document.body)
}

export default Modal