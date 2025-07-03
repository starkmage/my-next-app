'use client'

import { useEffect, useRef, useState } from "react"

const Carousel = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(1)
  const [transitioning, setTransitioning] = useState(false)

  const displayImages = [
    images[images.length - 1],
    ...images,
    images[0]
  ]

  const timerRef = useRef(null)

  const slideTo = (index) => {
    setTransitioning(true)
    setCurrent(index)
  }

  const next = () => {
    slideTo(current + 1)
  }

  const pre = () => {
    slideTo(current - 1)
  }

  useEffect(() => {
    timerRef.current = setInterval(next, interval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [interval, current])

  const handleTransitionEnd = () => {
    if (current >= displayImages.length - 1) {
      setTransitioning(false)
      setCurrent(1)
    } else if (current <= 0) {
      setTransitioning(false)
      setCurrent(displayImages.length - 2)
    }
  }

  return (
    <div>
      <div
        style={{
          width: '600px',
          height: '300px',
          position: 'relative',
          margin: 'auto',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${100 * displayImages.length}%`,
            height: '100%',
            position: 'absolute',
            transform: `translateX(${(-100 / displayImages.length) * current}%)`,
            transition: transitioning ? `transform 1s ease` : 'none',
            display: 'flex'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {
            displayImages.map((item, index) => {
              return <div
                key={index}
                style={{
                  height: '100%',
                  width: `${100 / displayImages.length}%`,
                }}
              >
                <img
                  src={item}
                  style={{
                    height: '100%',
                    width: `100%`,
                  }}
                />
              </div>
            })
          }
        </div>
      </div>
      <div
        style={{
          width: '400px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <button onClick={pre}>{'<'}</button>
        <div
          style={{
            width: '150px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          {
            images.map((_, index) => {
              return <div
                key={index}
                onClick={() => slideTo(index + 1)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  backgroundColor: current === index + 1 ? 'black' : 'grey'
                }}
              ></div>
            })
          }
        </div>
        <button onClick={next}>{'>'}</button>
      </div>
    </div>

  )
}

export default Carousel