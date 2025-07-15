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
  const dataSize = dataSource?.length ?? 0
  const startIndex = Math.max(Math.floor(top / itemHeight) - bufferSize, 0)
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 2 * bufferSize, dataSize - 1)

  const visibleData = useMemo(() => {
    return dataSource.slice(startIndex, endIndex + 1)
  }, [startIndex, endIndex, dataSource])

  const containerRef = useRef(null)
  const rafRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    rafRef.current = requestAnimationFrame(() => {
      const newTop = containerRef.current.scrollTop
      setTop(newTop)
    })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div style={{
      height: `${containerHeight}px`,
      width: '100%',
      overflowY: 'auto'
    }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div style={{
        height: `${itemHeight * dataSize}px`,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          transform: `translateY(${startIndex * itemHeight}px)`
        }}>
          {
            visibleData.map((item, index) => {
              return (
                <div key={startIndex + index}
                  style={{
                    height: `${itemHeight}px`
                  }}
                >
                  {renderItem(item)}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default VirtualScroll