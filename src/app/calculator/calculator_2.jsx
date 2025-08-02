'use client'
import { useState } from 'react';

export default function Calculator() {
  // 状态管理：输入表达式和计算结果
  const [input, setInput] = useState(''); // 用户输入的表达式
  const [result, setResult] = useState(''); // 计算结果

  // 处理按钮点击事件
  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        // 使用BODMAS规则计算表达式
        const calculatedResult = evaluateExpression(input);
        setResult(calculatedResult);
      } catch (error) {
        setResult('错误');
      }
    } else if (value === 'C') {
      // 清除所有内容
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      // 删除最后一个字符
      setInput(input.slice(0, -1));
    } else {
      // 添加字符到输入
      setInput(input + value);
    }
  };

  // 使用BODMAS规则计算表达式
  const evaluateExpression = (expr) => {
    // 首先验证表达式是否有效
    if (!isValidExpression(expr)) {
      throw new Error('无效表达式');
    }

    // 将×替换为*，÷替换为/以便计算
    const sanitizedExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');

    // 使用Function构造函数进行安全计算
    // 注意：实际项目中可能需要更安全的计算方式
    return new Function(`return ${sanitizedExpr}`)();
  };

  // 验证表达式是否有效
  const isValidExpression = (expr) => {
    // 检查括号是否匹配
    let balance = 0;
    for (const char of expr) {
      if (char === '(') balance++;
      if (char === ')') balance--;
      if (balance < 0) return false; // 闭括号比开括号多
    }
    if (balance !== 0) return false; // 括号不匹配

    // 检查无效的操作符组合
    const invalidPatterns = [
      /[+\-×÷][+\-×÷]/,  // 连续的操作符
      /^[+\-×÷]/,        // 以操作符开头
      /[+\-×÷]$/,        // 以操作符结尾
      /\.\d*\./          // 一个数字中有多个小数点
    ];

    return !invalidPatterns.some(pattern => pattern.test(expr));
  };

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
              className={`p-3 rounded-md text-lg font-medium transition-colors ${
                btn === '=' ? 'bg-blue-500 text-white hover:bg-blue-600' : // 等号按钮样式
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