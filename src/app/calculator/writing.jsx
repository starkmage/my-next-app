'use client'
import { useState } from 'react';

export default function Calculator() {
  // 状态管理：输入表达式和计算结果
  const [input, setInput] = useState(''); // 用户输入的表达式
  const [result, setResult] = useState(''); // 计算结果

  const calculatedResult = () => {
    const expression = input.replace(/×/g, '*').replace(/÷/g, '/')

    try {
      const result = new Function(`return ${expression}`)()

      setResult(result)
    } catch (error) {
      setResult('Error')
    }
  }

  const handleButtonClick = (btn) => {
    if (btn === '=') {
      calculatedResult()
    } else if (btn === '⌫') {
      if (input.length >= 1) {
        setInput((preVal) => {
          return preVal.slice(0, preVal.length - 1)
        })
      }
    } else if (btn === 'C') {
      setInput('')
      setResult('')
    } else {
      setInput((preVal) => {
        return preVal + btn
      })
    }
  }

  // 计算器按钮布局
  const buttons = [
    '7', '8', '9', '÷', '⌫',
    '4', '5', '6', '×', '(',
    '1', '2', '3', '-', ')',
    '0', '.', 'C', '+', '='
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {/* 显示区域 */}
        <div className="mb-4">
          <div className="text-right text-gray-600 h-6">{input}</div>
          <div className="text-right text-3xl font-bold h-10">
            {result !== '' ? result : '0'}
          </div>
        </div>

        {/* 按钮区域 */}
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`p-3 rounded-md text-lg font-medium transition-colors ${btn === '=' ? 'bg-blue-500 text-white hover:bg-blue-600' : // 等号按钮样式
                btn === 'C' || btn === '⌫' ? 'bg-red-500 text-white hover:bg-red-600' : // 清除和删除按钮样式
                  ['+', '-', '×', '÷', '(', ')'].includes(btn) ? 'bg-gray-200 hover:bg-gray-300' : // 操作符按钮样式
                    'bg-gray-100 hover:bg-gray-200' // 数字按钮样式
                }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}