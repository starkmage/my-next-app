'use client'

import { useEffect, useMemo, useState } from "react"
import ReactDom from 'react-dom'

export const MessageContainer = () => {
  const [message, setMessage] = useState([])

  useEffect(() => {
    window._showMessage = (messageItem) => {
      const id = Date.now()

      setMessage((preMessage) => {
        return [
          ...preMessage,
          { id, ...messageItem }
        ]
      })

      setTimeout(() => {
        setMessage((preMessage) => {
          const newMessage = preMessage.filter((item) => item.id !== id)

          return newMessage
        })
      }, messageItem.duration)
    }
  }, [])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return ReactDom.createPortal(<div>
    {
      message.map((item) => {
        return <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '100px',
            border: '1px solid #000000',
            top: '20px',
            right: '10px'
          }}
          key={item.id}>
          {item.content}
        </div>
      })
    }
  </div>, document.body
  )
}

export const Message = {
  info: (content, duration) => {
    window._showMessage({
      content,
      duration: duration ?? 2000,
    })
  }
}