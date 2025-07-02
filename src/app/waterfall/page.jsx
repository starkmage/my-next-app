'use client'

import Waterfall from "./Waterfall"

const App = () => {
  const images = [
    { src: 'https://picsum.photos/300/200' },
    { src: 'https://picsum.photos/300/400' },
    { src: 'https://picsum.photos/300/150' },
    { src: 'https://picsum.photos/300/300' },
    { src: 'https://picsum.photos/300/250' },
    { src: 'https://picsum.photos/300/350' },
  ]
  return <Waterfall items={images} />
}


export default App