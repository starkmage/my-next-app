'use client'
import { useEffect, useState, useRef } from 'react'

function useLazyLoadAll(containerRef) {
  const observerRef = useRef(null);

  useEffect(() => {
    console.log(containerRef.current)
    if (!containerRef.current) {
      return
    }
    // 配置 IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log({
            src: entry.target.dataset.src,
            is: entry.isIntersecting,
            entry
          })
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observerRef.current.unobserve(img); // 停止监听已加载图片
            }
          }
        });
      },
      {
        root: null
      }
    );

    // 自动监听现有图片

    requestAnimationFrame(() => {
      const images = containerRef.current.querySelectorAll('img[data-src]');
      images.forEach(img => observerRef.current.observe(img));
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef.current]);
}


const LazyImgList = ({ items }) => {
  const containerRef = useRef(null)

  useLazyLoadAll(containerRef)

  return <div
    ref={containerRef}
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {
      items.map((img, index) => {
        return <img
          key={index}
          data-src={img.src}
          style={{
            width: '100%',
            height: '800px'
          }}
          onLoad={() => console.log(`loaded ${img.src}`)}
        />
      })
    }
  </div>
}


export default LazyImgList