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

  const handleObserve = useCallback((entries) => {
    if (hasMore) {
      console.log(entries);

      const [entry] = entries
      if (entry.isIntersecting) {
        setLoading(true)
        fetchData().then(() => {
          setLoading(false)
        })
      }
    }
  }, [hasMore, fetchData])

  useEffect(() => {
    if (!lastRef.current) {
      return
    }

    observerRef.current = new IntersectionObserver(handleObserve, {
      root: null,
    })

    observerRef.current.observe(lastRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handleObserve])

  return (
    <div>
      {children}
      <div ref={lastRef}></div>
      {loading ? <p>loading...</p> : null}
      {hasMore ? null : <p>no more content</p>}
    </div>
  )
}

export default InfiniteScroll