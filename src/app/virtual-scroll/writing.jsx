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
  const rafRef = useRef(null)

  const startIndex = Math.max(0, Math.floor(top / itemHeight) - bufferSize)
  const endIndex = Math.min(dataSource.length, startIndex + Math.ceil(containerHeight / itemHeight) + bufferSize * 2)

  const visibleItems = useMemo(() => {
    return dataSource.slice(startIndex, endIndex)
  }, [startIndex, endIndex, dataSource])

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
  })

  return (
    <div
      style={{
        height: `${containerHeight}px`,
        overflowY: 'auto'
      }}
      ref={containerRef}
      onScroll={handleScroll}
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
          {
            visibleItems.map((item, index) => {
              return (
                <div
                  key={startIndex + index}
                  style={{
                    height: `${itemHeight}px`
                  }}
                >
                  {
                    renderItem(item)
                  }
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