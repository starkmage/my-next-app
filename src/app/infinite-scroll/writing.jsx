'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const InfiniteScroll = (props) => {
  const {
    fetchData,
    hasMore,
    children
  } = props

  const lastElementRef = useRef(null)
  const observerRef = useRef(null)
  const [loading, setLoading] = useState(false)

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
  }, [hasMore, fetchData])

  useEffect(() => {
    observerRef.current = new IntersectionObserver((handleObserve))
    observerRef.current.observe(lastElementRef.current)

    return () => {
      observerRef.current.disconnect()
    }
  }, [handleObserve])

  return (
    <div>
      {children}
      <div ref={lastElementRef}>
        {loading ? <p>loading...</p> : null}
        {hasMore ? null : <p>No More</p>}
      </div>
    </div>
  )
}

export default InfiniteScroll