'use client'

import { useEffect, useRef, useState } from "react"

const CountDown = (props) => {
  const { onFinish } = props
  const mRef = useRef(null)
  const sRef = useRef(null)
  const [time, setTime] = useState(0)
  const timerRef = useRef(null)

  const [running, setRunning] = useState(false)

  const onStart = () => {
    if (running) {
      return
    }
    setTime(Number(mRef.current.value ?? 0) * 60 + Number(sRef.current.value ?? 0))
    setRunning(true)
    timerRef.current = setInterval(() => {
      if (mRef.current.value == 0 && sRef.current.value == 1) {
        clearInterval(timerRef.current)
      }
      setTime((preTime) => {
        const now = preTime - 1
        mRef.current.value  = Math.floor(now / 60)
        sRef.current.value = now % 60
        return now
      })
    }, 1000)
  }

  const onPause = () => {
    setRunning(false)
  }

  const onRest = () => {

  }


  return <div>
    <p>Please input time</p>
    <div>
      <input type="text" ref={mRef} /><span>m</span>
      <input type="text" ref={sRef} /><span>s</span>
    </div>
    <div>
      <div onClick={onStart}>Start</div>
      <div>Pause</div>
      <div>Reset</div>
    </div>
  </div>
}

export default CountDown