'use client'
import React, { useState, useRef } from 'react';

function BasicCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPosition = inputRef.current ? inputRef.current.selectionStart ?? 0 : 0;



  const handleInput = (value: string) => {
    const cursorPosition = inputRef.current ? inputRef.current.selectionStart ?? 0 : 0;
    setInput(input.slice(0, cursorPosition) + value + input.slice(cursorPosition));
  };

  const handleBackspace = () => {
    const cursorPosition = inputRef.current?.selectionStart ?? 0;
    if (cursorPosition > 0) {
      setInput(input.slice(0, cursorPosition - 1) + input.slice(cursorPosition));
    }
  };
  
  

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg shadow-green-500 p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Basic Calculator</h2>
        <div className="mb-4">
          <input
            type="text"
            value={input}
            className="w-full text-right text-2xl border rounded-md p-2 outline-none"
            readOnly
            ref={inputRef}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="col-span-3 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => clearInput()}
          >
            Clear
          </button>
          <button
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            onClick={() => handleInput('/')}
          >
            /
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('7')}
          >
            7
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('8')}
          >
            8
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('9')}
          >
            9
          </button>
          <button
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            onClick={() => handleInput('*')}
          >
            *
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('4')}
          >
            4
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('5')}
          >
            5
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('6')}
          >
            6
          </button>
          <button
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            onClick={() => handleInput('-')}
          >
            -
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('1')}
          >
            1
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('2')}
          >
            2
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('3')}
          >
            3
          </button>
          <button
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            onClick={() => handleInput('+')}
          >
            +
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('0')}
          >
            0
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={() => handleInput('.')}
          >
            .
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={() => calculateResult()}
          >
            =
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            onClick={() => handleBackspace()}
          >
            Backspace
          </button>
        </div>
        <div className="mt-2">
          <input
            type="text"
            value={result}
            className="w-full text-right text-2xl border rounded-md p-2 outline-none"
            readOnly
          />
        </div>
      </div>
    </>
  );
}

export default BasicCalculator;
