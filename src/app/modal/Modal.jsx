'use client'
import React, { useEffect } from "react"
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const { isOpen, onClose, children } = props

  // 禁止滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [])


  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '99999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '50vw',
          height: '50vh',
          position: 'relative',
          backgroundColor: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            cursor: 'pointer'
          }}>X</div>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal