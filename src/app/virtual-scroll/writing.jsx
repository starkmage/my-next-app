'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const VirtualScroll = (props) => {
  const {
    containerHeight,
    itemHeight,
    renderItem,
    dataSource,
    bufferSize = 2
  } = props

  const [top, setTop] = useState(0)
  const containerRef = useRef(null)
  let rafRef = useRef(null)

  const startIndex = Math.max(Math.floor(top / itemHeight), 0)
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + bufferSize, dataSource.length - 1)

  const visibleData = useMemo(() => {
    return dataSource.slice(startIndex, endIndex + 1)
  }, [startIndex, endIndex, dataSource])

  const handleScroll = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      setTop(containerRef.current.scrollTop)
    })
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])


  return <div
    ref={containerRef}
    onScroll={handleScroll}
    style={{
      height: `${containerHeight}px`,
      overflowY: 'auto'
    }}
  >
    <div
      style={{
        height: `${dataSource.length * itemHeight}px`,
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${startIndex * itemHeight}px`
        }}
      >
        {
          visibleData.map((item, index) => {
            return <div
              style={{
                height: `${itemHeight}px`
              }}
              key={startIndex + index}>
              {renderItem(item)}
            </div>
          })
        }
      </div>
    </div>
  </div>
}

export default VirtualScroll