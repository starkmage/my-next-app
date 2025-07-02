'use client'
import { useEffect, useState } from 'react'

const Waterfall = ({ items }) => {
  const [leftCol, setLeftCol] = useState([])
  const [rightCol, setRightCol] = useState([])

  useEffect(() => {
    const left = []
    const right = []
    let leftHeight = 0
    let rightHeight = 0

    const promises = items.map(item =>
      new Promise(resolve => {
        const img = new Image()
        img.src = item.src
        img.onload = () => {
          resolve({ ...item, height: img.height })
        }
      })
    )

    Promise.all(promises).then(results => {
      results.forEach(item => {
        if (leftHeight <= rightHeight) {
          left.push(item)
          leftHeight += item.height
        } else {
          right.push(item)
          rightHeight += item.height
        }
      })
      setLeftCol(left)
      setRightCol(right)
    })
  }, [items])

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ flex: 1 }}>
        {leftCol.map((item, idx) => (
          <img key={idx} src={item.src} style={{ width: '100%', marginBottom: '16px' }} />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {rightCol.map((item, idx) => (
          <img key={idx} src={item.src} style={{ width: '100%', marginBottom: '16px' }} />
        ))}
      </div>
    </div>
  )
}


export default Waterfall