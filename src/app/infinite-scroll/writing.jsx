'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const InfiniteScroll = (props) => {
  const {
    fetchData,
    hasMore,
    children
  } = props

  const [loading, setLoading] = useState(false)
  const lastRef = useRef(null)
  const observeRef = useRef(null)

  const handleObserve = useCallback(async (entries) => {
    if (!hasMore) {
      return
    }

    const [entry] = entries

    if (entry.isIntersecting) {
      setLoading(true)
      await fetchData()
      setLoading(false)
    }
  }, [fetchData, hasMore])

  useEffect(() => {
    observeRef.current = new IntersectionObserver(handleObserve)

    observeRef.current.observe(lastRef.current)

    return () => {
      observeRef.current.disconnect()
    }
  }, [handleObserve])


  return (
    <div>
      {children}
      <div ref={lastRef}>
        {loading ? <p>loading...</p> : null}
        {hasMore ? null : <p>No More</p>}
      </div>
    </div>
  )
}

export default InfiniteScroll