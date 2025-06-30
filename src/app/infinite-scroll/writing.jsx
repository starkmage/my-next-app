'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const InfiniteScroll = (props) => {
  const {
    fetchData,
    hasMore,
    children
  } = props

  const lastElementRef = useRef(null)
  const observeRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleObserve = useCallback((entries) => {
    if (hasMore) {
      const [entry] = entries
      if (entry.isIntersecting) {
        setLoading(true)
        fetchData().then(() => {
          setLoading(false)
        })
      }
    }
  }, [fetchData])

  useEffect(() => {
    if (loading) {
      return
    }

    observeRef.current = new IntersectionObserver(handleObserve, {
      root: null
    })

    observeRef.current.observe(lastElementRef.current)

    return () => {
      if (observeRef.current) {
        observeRef.current.disconnect()
      }
    }
  }, [handleObserve])


  return (
    <div>
      {children}
      <div ref={lastElementRef}>
        {loading ? <div>loading...</div> : null}
        {hasMore ? null : <div>No More</div>}
      </div>
    </div>
  )
}

export default InfiniteScroll