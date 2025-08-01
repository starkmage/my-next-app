'use client'
import { useEffect, useState } from 'react'

const Waterfall = ({ items }) => {
  const [columns, setColumns] = useState([[], []])

  useEffect(() => {
    for (const item of items) {
      const img = new Image()
      img.src = item.src

      img.onload = () => {
        setColumns((preValue) => {
          const [left, right] = preValue

          const leftHeight = left?.reduce((pre, cur) => pre + cur.height, 0)
          const rightHeight = right?.reduce((pre, cur) => pre + cur.height, 0)

          if (leftHeight <= rightHeight) {
            return [[...left, { ...item, height: img.height }], right]
          } else {
            return [left, [...right, { ...item, height: img.height }]]
          }
        })
      }
    }

  }, [items])

  return <div
    style={{
      display: 'flex'
    }}
  >
    {columns.map((col, index) => {
      return <div
        style={{
          flex: 1
        }}
        key={index}
      >
        {
          col.map((img, index) => {
            return <img
              key={index}
              src={img.src}
              style={{
                width: '100%'
              }}
            />
          })
        }
      </div>
    })}
  </div>
}


export default Waterfall