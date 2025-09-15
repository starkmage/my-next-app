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
  const observerRef = useRef(null)

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
    observerRef.current = new IntersectionObserver(handleObserve)
    observerRef.current.observe(lastRef.current)

    return () => {
      observerRef.current.disconnect()
    }
  }, [handleObserve])

  return <div>
    {children}
    <div ref={lastRef}>
      {loading ? <div>loading</div> : null}
      {hasMore ? null : <div>No More</div>}
    </div>
  </div>
}

export default InfiniteScroll