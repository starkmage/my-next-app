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
      {messages.map((message) => {
        return <p key={message.content}>{message.content}</p>
      })}
    </div>,
    document.body)
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
