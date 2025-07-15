Cursor-Based Infinite Scroll（基于游标的无限滚动）

1. 核心概念

Cursor-Based Infinite Scroll 是一种 分页加载技术，通过 游标（Cursor） 标记数据的位置，实现动态加载更多内容（无需传统分页页码）。  
适用于社交媒体、商品列表等需要 持续加载数据 的场景（如 Twitter 的推文列表、电商商品瀑布流）。

2. 与传统分页的区别

方式 传统分页（Page-Based） 游标分页（Cursor-Based）

标识 页码（page=1） 游标（cursor=abc123）

数据变动影响 新增/删除数据会导致页码错乱 游标指向固定位置，不受新增/删除影响

适用场景 静态数据（如文档） 动态数据（如实时更新的社交动态）

3. 工作原理

1. 首次请求：  
   • 客户端请求初始数据（如最近的 20 条记录）。  

   • 服务端返回数据 + 一个 游标（通常是最后一条记录的 ID 或时间戳）。  
   {
     "data": [...],
     "next_cursor": "abc123"  // 用于获取下一页
   }
   

2. 滚动到底部时：  
   • 客户端用 next_cursor 发起新请求，获取下一批数据。  

   • 服务端根据游标返回后续数据，并更新游标。  
   // 示例请求
   fetch(`/api/items?cursor=${nextCursor}&limit=20`);
   

3. 终止条件：  
   • 当服务端返回 next_cursor=null 时，表示无更多数据。

4. 实现示例（前端 + 后端）

前端（React + Intersection Observer）

```
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !cursor) return; // 无更多数据或正在加载时停止
    setLoading(true);
    const res = await fetch(`/api/items?cursor=${cursor}`);
    const { data, next_cursor } = await res.json();
    setItems([...items, ...data]);
    setCursor(next_cursor);
    setLoading(false);
  };

  // 监听滚动到底部
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });
    observer.observe(document.querySelector('#load-more-trigger'));
    return () => observer.disconnect();
  }, [cursor]);

  return (
    <div>
      {items.map(item => <Item key={item.id} data={item} />)}
      <div id="load-more-trigger" style={{ height: '1px' }} />
      {loading && <Spinner />}
    </div>
  );
}
```


后端（Node.js 伪代码）

app.get('/api/items', (req, res) => {
  const { cursor, limit = 20 } = req.query;
  let query = db.collection('items').orderBy('created_at', 'desc');
  
  if (cursor) {
    query = query.startAfter(cursor); // 使用游标跳过已加载数据
  }
  
  query.limit(limit).exec((err, data) => {
    const nextCursor = data.length > 0 ? data[data.length - 1].id : null;
    res.json({ data, next_cursor: nextCursor });
  });
});


5. 游标的常见形式

• ID 游标：基于最后一条记录的唯一 ID（如 WHERE id > last_id）。  

• 时间戳游标：基于最后一条记录的时间（如 WHERE created_at < last_timestamp）。  

• 复合游标：结合 ID + 时间戳，避免重复或遗漏。

6. 优点

• 动态数据友好：新增/删除数据不会影响已加载内容。  

• 性能优化：减少不必要的数据传输（对比 OFFSET 分页）。  

• 无缝体验：用户无需点击翻页，滚动即加载。

7. 注意事项

• 游标需唯一且有序：通常基于 ID 或 时间戳 排序。  

• 服务端需支持游标查询：如 Firebase 的 startAfter()、SQL 的 WHERE id > cursor。  

• 客户端防抖：避免滚动时频繁触发请求。

总结

Cursor-Based Infinite Scroll 通过 游标标记数据位置，解决了传统分页在动态数据场景下的问题，是现代无限滚动实现的推荐方案。  
典型应用：Twitter 动态、Instagram 瀑布流、电商商品列表等。