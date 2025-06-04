'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 无限滚动组件
 * @param {Object} props
 * @param {Function} props.fetchData - 获取数据的函数，应返回Promise，解析为新项目数组
 * @param {boolean} props.hasMore - 是否有更多数据可加载
 * @param {number} props.threshold - 触发加载的阈值（像素），默认为200
 * @param {React.ReactNode} props.loader - 加载指示器组件
 * @param {React.ReactNode} props.endMessage - 当没有更多数据时显示的消息
 * @param {React.ReactNode} props.children - 子组件，通常是数据项列表
 * @param {string} props.className - 容器的CSS类名
 */
export default function InfiniteScroll({
  fetchData,
  hasMore = false,
  threshold = 200,
  loader = <div className="loader">加载中...</div>,
  endMessage = <div className="end-message">没有更多数据了</div>,
  children,
  className = '',
}) {
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const lastElementRef = useRef(null);

  // 加载更多数据
  const loadMoreItems = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('加载数据时出错:', error);
    } finally {
      setLoading(false);
    }
  };


  // 处理交叉观察
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        loadMoreItems();
      }
    },
    [hasMore, loading]
  );

  // 设置交叉观察器
  useEffect(() => {
    const lastElement = lastElementRef.current;
    if (!lastElement) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: `0px 0px ${threshold}px 0px`,
      threshold: 0.1,
    });

    observerRef.current.observe(lastElement);

    return () => {
      if (lastElement && observerRef.current) {
        observerRef.current.unobserve(lastElement);
      }
    };
  }, [handleObserver, threshold]);

  return (
    <div className={`infinite-scroll-container ${className}`}>
      {children}
      <div ref={lastElementRef} className="loading-trigger">
        {loading && loader}
        {!hasMore && !loading && endMessage}
      </div>
    </div>
  );
}