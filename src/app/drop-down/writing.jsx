'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const Dropdown = (props) => {
  const { children, triggerText } = props
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const handleClick = useCallback(() => {
    setOpen((pre) => !pre)
  }, [setOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current) {
        return
      }

      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])


  return (
    <div ref={ref}>
      <div onClick={handleClick}>{triggerText}</div>
      {open ? children : null}
    </div>
  )
}

export default Dropdown