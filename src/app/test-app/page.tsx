import Counter from './Counter';

export default function Page() {
  // 模拟从数据库/API获取初始值（服务端执行）
  const initialCount = 10;

  return (
    <div>
      <h1>混合渲染计数器（App Router）</h1>
      {/* 传递初始值给客户端组件 */}
      <Counter initialCount={initialCount} />
    </div>
  );
}