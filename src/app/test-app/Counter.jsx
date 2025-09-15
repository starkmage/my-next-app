// app/counter/Counter.tsx
// 'use client'; // 必须标记为客户端组件

const ProgressBar = (props) => {
  const percent = props.percent ?? 0
  return <div
    style={{
      width: '500px',
      height: '50px',
      border: '2px solid #000000',
      borderRadius: '25px',
      overflow: 'hidden'
    }}
  >
    <div
      style={{
        height: '100%',
        width: `${percent}%`,
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {percent > 0 ? `${percent}%` : null}
    </div>
  </div>
}

export default ProgressBar