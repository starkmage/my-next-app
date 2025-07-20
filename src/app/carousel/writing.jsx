'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const Carousel = ({ images, interval = 3000 }) => {
  const imgList = useMemo(() => {
    return [
      images[images.length - 1],
      ...images,
      images[0]
    ]
  }, [images])

  const [current, setCurrent] = useState(1)
  const [openTransition, setOpenTransition] = useState(true)

  const jumpTo = useCallback((number) => {
    setOpenTransition(true)
    setCurrent(number)
  }, [])

  const next = useCallback(() => {
    jumpTo(current + 1)
  }, [jumpTo, current])

  const pre = useCallback(() => {
    jumpTo(current - 1)
  }, [jumpTo, current])

  const handleTransitionEnd = () => {
    if (current >= imgList.length - 1) {
      setOpenTransition(false)
      setCurrent(1)
    } else if (current <= 0) {
      setOpenTransition(false)
      setCurrent(imgList.length - 2)
    }
  }

  console.log(current);

  const intervalRef = useRef(null)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      next()
    }, interval)

    return () => {
      clearInterval(intervalRef?.current)
    }
  }, [next])

  return <div
    style={{
      width: '400px',
      margin: 'auto',
      overflow: 'hidden'
    }}
  >
    <div
      style={{
        width: `${100 * imgList.length}%`,
        height: '200px',
        display: 'flex',
        transform: `translateX(-${100 * current / imgList.length}%)`,
        transition: openTransition ? 'transform 0.5s ease' : 'none'
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {
        imgList.map((img, index) => {
          return <div key={index}
            style={{
              height: '100%',
              width: `400px`
            }}
          >
            <img
              style={{
                height: '100%',
                width: `400px`
              }}
              src={img} />
          </div>
        })
      }
    </div>
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <button onClick={pre}>Prev</button>
      <div style={{
        display: 'flex',
        gap: '20px',
      }}>
        {images.map((item, index) => {
          return <div key={index}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            backgroundColor: index === current - 1 ? 'red' : 'grey'
          }}
          />
        })}
      </div>
      <button onClick={next}>Next</button>
    </div>
  </div>
}

export default Carousel