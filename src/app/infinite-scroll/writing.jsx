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

  const handleUpdate = useCallback(async () => {
    if (!hasMore) {
      return
    }
    if (loading) {
      return
    }

    setLoading(true)
    await fetchData()
    setLoading(false)
  }, [loading, hasMore, fetchData])

  const handleObserver = useCallback((entries) => {
    const lastElement = entries[0]
    if (lastElement.isIntersecting) {
      handleUpdate()
    }
  }, [handleUpdate])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null
    })

    observerRef.current.observe(lastElementRef.current)

    return () => {
      observerRef.current.disconnect()
    }
  }, [handleObserver])


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