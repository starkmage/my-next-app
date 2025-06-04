'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const InfiniteScroll = (props) => {
  const {
    fetchData,
    hasMore,
    children
  } = props

  const [loading, setLoading] = useState(false)
  const lastElementRef = useRef(null)
  const observerRef = useRef(null)

  const fetchMoreData = useCallback(async () => {
    setLoading(true)
    try {
      await fetchData()
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }, [fetchData])

  const handleObserve = useCallback((entries) => {
    if (entries[0].isIntersecting && hasMore && !loading) {
      fetchMoreData()
    }
  }, [fetchMoreData, hasMore, loading])

  useEffect(() => {
    if (!lastElementRef.current) {
      return
    }

    observerRef.current = new IntersectionObserver(handleObserve, {
      root: null
    })

    observerRef.current.observe(lastElementRef.current)

    return () => {
      if (observerRef.current && lastElementRef.current) {
        observerRef.current.unobserve(lastElementRef.current)
      }
    }
  }, [handleObserve])

  return (
    <div>
      {children}
      <div ref={lastElementRef}>
        {loading ? <div>loading</div> : null}
        {!hasMore ? <div>No More Data</div> : null}
      </div>
    </div>
  )
}

export default InfiniteScroll