'use client'

import React, { useState, useEffect } from 'react';

const FLOORS = 10;

function ElevatorSystem() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [queue, setQueue] = useState([]);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    if (queue.length === 0) {
      setDirection(null);
      return;
    }

    const target = queue[0];
    if (currentFloor === target) {
      // 到达目标
      setQueue(prev => prev.slice(1));
    } else {
      const step = currentFloor < target ? 1 : -1;
      const timer = setTimeout(() => {
        setCurrentFloor(f => f + step);
        setDirection(step > 0 ? 'up' : 'down');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentFloor, queue]);

  const callElevator = (floor) => {
    if (!queue.includes(floor)) {
      setQueue(prev => [...prev, floor]);
    }
  };

  return (
    <div>
      <h2>Current Floor: {currentFloor}</h2>
      {Array.from({ length: FLOORS }, (_, i) => (
        <button key={i} onClick={() => callElevator(i)}>
          Call to Floor {i}
        </button>
      ))}
    </div>
  );
}

export default ElevatorSystem;
