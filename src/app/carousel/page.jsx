'use client'

import Carousel from "./writing"

const App = () => {
  return <Carousel
    images={[
      '/img_1.jpg',
      '/img_2.jpg',
      '/img_3.jpg',
    ]}
    interval={3000}
  />
}

export default App