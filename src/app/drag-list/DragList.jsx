'use client';
import { useState } from 'react';

const DragDropLists = () => {
  const [listA, setListA] = useState(['🍎 Apple', '🍌 Banana']);
  const [listB, setListB] = useState(['🍇 Grape', '🍊 Orange']);

  const onDragStart = (e, item, from) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ item, from }));
  };

  const onDrop = (e, toList, setToList) => {
    e.preventDefault();
    const { item, from } = JSON.parse(e.dataTransfer.getData('text/plain'));

    const fromList = from === 'A' ? listA : listB;
    const setFromList = from === 'A' ? setListA : setListB;

    // 从原列表中移除
    setFromList(fromList.filter(i => i !== item));
    // 添加到目标列表
    setToList(prev => [...prev, item]);
  };

  const renderList = (label, list, setList, key) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, key === 'A' ? listA : listB, setList)}
      style={{
        padding: 10,
        margin: 10,
        width: 180,
        minHeight: 150,
        border: '1px solid #aaa',
      }}
    >
      <strong>{label}</strong>
      {list.map(item => (
        <div
          key={item}
          draggable
          onDragStart={(e) => onDragStart(e, item, key)}
          style={{
            padding: '4px 8px',
            margin: '4px 0',
            background: '#eee',
            cursor: 'grab',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      {renderList('容器 A', listA, setListA, 'A')}
      {renderList('容器 B', listB, setListB, 'B')}
    </div>
  );
};

export default DragDropLists;
