'use client'

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (op: string, first: number, second: number) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  const calculateResult = () => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = performCalculation(operator, firstOperand, inputValue);
    
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 bg-gray-900">
          <div className="text-right text-white text-3xl font-mono h-16 flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-1 p-2">
          <button onClick={clearDisplay} className="col-span-2 p-4 bg-red-500 text-white text-xl font-bold rounded hover:bg-red-600 transition-colors">
            AC
          </button>
          <button onClick={() => setDisplay(display.charAt(0) === '-' ? display.substring(1) : '-' + display)} className="p-4 bg-gray-700 text-white text-xl font-bold rounded hover:bg-gray-600 transition-colors">
            +/-
          </button>
          <button onClick={() => handleOperator('/')} className="p-4 bg-yellow-500 text-white text-xl font-bold rounded hover:bg-yellow-600 transition-colors">
            ÷
          </button>
          
          {[7, 8, 9].map(num => (
            <button key={num} onClick={() => inputDigit(num.toString())} className="p-4 bg-gray-700 text-white text-xl font-bold rounded hover:bg-gray-600 transition-colors">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('*')} className="p-4 bg-yellow-500 text-white text-xl font-bold rounded hover:bg-yellow-600 transition-colors">
            ×
          </button>
          
          {[4, 5, 6].map(num => (
            <button key={num} onClick={() => inputDigit(num.toString())} className="p-4 bg-gray-700 text-white text-xl font-bold rounded hover:bg-gray-600 transition-colors">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('-')} className="p-4 bg-yellow-500 text-white text-xl font-bold rounded hover:bg-yellow-600 transition-colors">
            -
          </button>
          
          {[1, 2, 3].map(num => (
            <button key={num} onClick={() => inputDigit(num.toString())} className="p-4 bg-gray-700 text-white text-xl font-bold rounded hover:bg-gray-600 transition-colors">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('+')} className="p-4 bg-yellow-500 text-white text-xl font-bold rounded hover:bg-yellow-600 transition-colors">
            +
          </button>
          
          <button onClick={() => inputDigit('0')} className="col-span-2 p-4 bg-gray-700 text-white text-xl font-bold rounded hover:bg-gray-600 transition-colors">
            0
          </button>
          <button onClick={inputDecimal} className="p-4 bg-gray-700 text-white text-xl font-bold rounded hover:bg-gray-600 transition-colors">
            .
          </button>
          <button onClick={calculateResult} className="p-4 bg-yellow-500 text-white text-xl font-bold rounded hover:bg-yellow-600 transition-colors">
            =
          </button>
        </div>
      </div>
    </div>
  );
}