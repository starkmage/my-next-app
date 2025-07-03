'use client'

import { useState } from "react"

const ClipBoard = (props) => {
  const {
    text,
    domRef,
    children,
  } = props
  const [message, setMessage] = useState(null)  

  const handleCopy = async () => {
    try {
      if (text) {
        await navigator.clipboard.writeText(text)
      } else if (domRef.current) {              
        await navigator.clipboard.writeText(domRef.current.textContent)
      }
      setMessage('Copied Successfully')
    } catch (err) {
      setMessage(err)
    }

    setTimeout(() => {
      setMessage(null)
    }, 1000)
  }


  return (<>
    <div onClick={handleCopy}>
      {children ?? <button>
        Copy
      </button>}
    </div>
    {
      message ? <p>{message}</p> : null
    }
  </>)
}

export default ClipBoard