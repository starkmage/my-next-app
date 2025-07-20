'use client'

import { useEffect, useState } from "react"

const ClipBoard = (props) => {
  const {
    text,
    domRef,
    children,
  } = props

  const [message, setMessage] = useState(null)

  const copy = () => {
    try {
      if (domRef?.current) {
        navigator.clipboard.writeText(domRef?.current?.textContent)
      } else if (text) {
        navigator.clipboard.writeText(text)
      }
      setMessage('copy successfully')
    } catch (err) {
      setMessage('Error, please try again later')
    }

    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  return <>
    <div
      style={{
        width: '100px',
        height: '20px',
        cursor: 'pointer'
      }}
      onClick={copy}
    >
      Copy
    </div>
    {message ? <p>{message}</p> : null}
  </>
}

export default ClipBoard