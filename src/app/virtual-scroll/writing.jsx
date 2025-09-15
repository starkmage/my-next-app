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

  const startIndex = Math.floor(top / itemHeight)
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + bufferSize, dataSource.length - 1)

  const visibleData = useMemo(() => {
    return dataSource.slice(startIndex, endIndex + 1)
  }, [dataSource, startIndex, endIndex])

  const containerRef = useRef(null)
  const rafRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      setTop(containerRef.current.scrollTop)
    })
  }, [])

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
        height: `${itemHeight * dataSource.length}px`,
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${startIndex * itemHeight}px`
        }}
      >
        {visibleData.map((item, index) => {
          return <div
            style={{
              height: `${itemHeight}px`
            }}
            key={index + startIndex}>{renderItem(item)}</div>
        })}
      </div>
    </div>
  </div>
}

export default VirtualScroll