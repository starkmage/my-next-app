'use client'

import React, { useRef, useState } from 'react';

const TodoApp = () => {
  const [itemList, setItemList] = useState([])
  const addRef = useRef()

  const addItem = () => {
    if (addRef.current) {
      const content = addRef?.current.value.trim()

      if (content.length > 0) {
        setItemList((preItem) => {
          return [
            ...preItem,
            {
              id: Date.now(),
              content,
              state: false
            }
          ]
        })
      }
      addRef.current.value = ''
    }
  }

  const handleToggle = (target) => {
    const oldItems = [...itemList]
    const targetItem = oldItems.find((item) => item.id === target.id)

    targetItem.state = !targetItem.state
    console.log(oldItems)

    setItemList(oldItems)
  }

  return <div>
    <div>
      <input
        style={{
          border: '1px solid #000000'
        }}
        ref={addRef} type="text" />
      <button
        onClick={addItem}
      >Add</button>
    </div>

    <div>
      {itemList.map((item) => {
        return <div
          key={item.id}
        >
          <input
            onChange={() => { handleToggle(item) }}
            checked={item?.state}
            type="checkbox"
          />
          <span>{item.content}</span>
        </div>
      })}
    </div>
  </div>
}

export default TodoApp