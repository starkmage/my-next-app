'use client'

import React, { useState, useEffect } from 'react';

const App = () => {
  const handleClick = () => {
    console.log('react写的')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector('#a');
      element.addEventListener('click', () => { console.log('原生事件'); });
      element.addEventListener('click', () => { console.log('原生事件-capture 1'); }, true);
      element.addEventListener('click', () => { console.log('原生事件-capture 2'); }, true);
      element.addEventListener('click', () => { console.log('原生事件bubble2'); });
    }
  }, [])

  return <div>
    <div id='a' onClick={handleClick}>Button</div>
  </div>
}

export default App
