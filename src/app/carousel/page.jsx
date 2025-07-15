'use client'

import Carousel from "./writing"

const App = () => {
    const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      console.log(entry);
      // 这里可以对性能条目进行统计或上报
    });
  });
  observer.observe({ type: 'paint', buffered: true });

  const [navigation] = performance.getEntriesByType('navigation');

console.log('TTFB:', navigation.responseStart - navigation.requestStart);
console.log('DOM解析完成时间:', navigation.domContentLoadedEventEnd - navigation.startTime);
console.log('页面加载完成时间:', navigation.loadEventEnd - navigation.startTime);

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