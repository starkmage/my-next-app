'use client'
import { useEffect, useState } from 'react'

const Waterfall = ({ items }) => {
  const [columns, setColumns] = useState([[], []])

  useEffect(() => {
    items.forEach(item => {
      const img = new Image()
      img.src = item.src
      img.onload = () => {
        setColumns(prev => {
          const [left, right] = prev
          const leftHeight = left.reduce((sum, item) => sum + item.height, 0)
          const rightHeight = right.reduce((sum, item) => sum + item.height, 0)

          return leftHeight <= rightHeight
            ? [[...left, { src: item.src, height: img.height }], right]
            : [left, [...right, { src: item.src, height: img.height }]]
        })
      }
    })
  }, [items])

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {columns.map((column, colIdx) => (
        <div key={colIdx} style={{ flex: 1 }}>
          {column.map((item, idx) => (
            <img
              key={`${colIdx}-${idx}`}
              src={item.src}
              style={{ width: '100%', marginBottom: 16 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Waterfall