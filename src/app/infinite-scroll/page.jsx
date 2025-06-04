'use client';

import { useState, useCallback, useId } from 'react';
import InfiniteScroll from './writing';

// 使用确定性的颜色数组替代随机生成
const predefinedColors = [
  'hsl(0, 70%, 80%)',    // 红色
  'hsl(30, 70%, 80%)',   // 橙色
  'hsl(60, 70%, 80%)',   // 黄色
  'hsl(120, 70%, 80%)',  // 绿色
  'hsl(180, 70%, 80%)',  // 青色
  'hsl(210, 70%, 80%)',  // 蓝色
  'hsl(240, 70%, 80%)',  // 靛蓝色
  'hsl(270, 70%, 80%)',  // 紫色
  'hsl(300, 70%, 80%)',  // 粉色
  'hsl(330, 70%, 80%)',  // 玫瑰色
];

// 模拟数据生成函数
const generateMockItems = (startIndex, count) => {
  return Array.from({ length: count }, (_, i) => {
    const itemIndex = startIndex + i;
    return {
      id: itemIndex,
      title: `项目 ${itemIndex}`,
      description: `这是项目 ${itemIndex} 的描述内容。这是一些文本，用于演示无限滚动组件。`,
      color: predefinedColors[itemIndex % predefinedColors.length],
    };
  });
};

export default function InfiniteScrollPage() {
  // 使用useId生成唯一ID，确保服务器和客户端一致性
  const instanceId = useId();
  const [items, setItems] = useState(() => generateMockItems(1, 10));
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 模拟API请求获取更多数据
  const fetchMoreData = useCallback(async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const nextPage = page + 1;
    const newItems = generateMockItems(items.length + 1, 10);
    
    setItems(prevItems => [...prevItems, ...newItems]);
    setPage(nextPage);
    
    // 模拟数据上限，加载到50项后没有更多数据
    if (nextPage >= 5) {
      setHasMore(false);
    }
  }, [items.length, page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">无限滚动演示</h1>
      
      <InfiniteScroll
        fetchData={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        }
        endMessage={
          <div className="text-center p-4 text-gray-500">
            已经到底了，没有更多内容
          </div>
        }
        className="space-y-4"
      >
        {items.map(item => (
          <div 
            key={`${instanceId}-${item.id}`} 
            className="p-4 rounded-lg shadow-md transition-transform hover:scale-[1.01]"
            style={{ backgroundColor: item.color }}
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}