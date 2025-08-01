'use client'

import React, { useEffect, useState } from "react"
import ReactDom from 'react-dom'

export const MessageContainer = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    window._showMessage = ({ type, content, duration }) => {
      const id = Symbol('messageId')
      setMessages((preValue) => {
        return [
          ...preValue,
          { id, type, content, duration }
        ]
      })

      setTimeout(() => {
        setMessages((preValue) => {
          return preValue.filter((item) => item.id !== id)
        })
      }, duration)
    }
  }, [])

  return ReactDom.createPortal(
    <div>
      {messages.map((message, index) => {
        return <p 
        style={{
          position: 'absolute',
          width: '200px',
          height: '100px',
          border: '1px solid #000000',
          top: '20px',
          right: '10px'
        }}
        key={index}>{message.content}</p>
      })}
    </div>,
    document?.body)
}

export const Message = {
  info(content, duration) {
    window._showMessage({
      type: 'info',
      content,
      duration
    })
  }
}
