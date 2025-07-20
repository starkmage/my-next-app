'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const DebouncedButton = (props) => {
  const {
    text = 'Click',
    delay = 5000,
    onClick = () => { console.log('click') }
  } = props
  const [processing, setProcessing] = useState(false)
  const timerRef = useRef(null)

  const handleClick = useCallback(() => {
    if (processing) {
      return
    }

    setProcessing(true)
    onClick()
    
    timerRef.current = setTimeout(() => {
      setProcessing(false)
    }, delay)
  }, [delay, processing, onClick, setProcessing])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef?.current)
    }
  }, [])

  return <div
    disabled={processing}
    style={{
      width: '200px',
      height: '100px',
      border: '1px solid #000000',
      cursor: processing ? 'not-allowed' : 'pointer'
    }}
    onClick={handleClick}
  >
    {processing ? 'processing' : text}
  </div>
}

export default DebouncedButton