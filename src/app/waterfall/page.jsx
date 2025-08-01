'use client'

import Waterfall from "./lazyLoad"

const App = () => {
  const images = [
    { src: 'https://picsum.photos/300/200' },
    { src: 'https://picsum.photos/300/400' },
    { src: 'https://picsum.photos/300/150' },
    { src: 'https://picsum.photos/300/300' },
    { src: 'https://picsum.photos/300/250' },
    { src: 'https://picsum.photos/300/350' },
    { src: 'https://picsum.photos/300/450' },
    { src: 'https://picsum.photos/300/650' },
    { src: 'https://picsum.photos/300/850' },
    { src: 'https://picsum.photos/300/950' },
    { src: 'https://picsum.photos/300/750' },
  ]
  return <Waterfall items={images} />
}


export default App