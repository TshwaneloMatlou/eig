'use client'
import React, { useState } from 'react';

const ProfitLossCalculator = () => {
  const [lotSize, setLotSize] = useState('0.01');
  const [stopLossPoints, setStopLossPoints] = useState('0.00100');
  const [stopLossMoney, setStopLossMoney] = useState('');
  const [takeProfitPoints, setTakeProfitPoints] = useState('0.00100');
  const [takeProfitMoney, setTakeProfitMoney] = useState('');
  const [riskRewardRatio, setRiskRewardRatio] = useState('');

  const handleCalculate = () => {
    // Parse the input values to numbers
    const parsedLotSize = parseFloat(lotSize);
    const parsedStopLossPoints = parseFloat(stopLossPoints);
    const parsedTakeProfitPoints = parseFloat(takeProfitPoints);
  
    // Check if the parsed values are valid numbers
    if (isNaN(parsedLotSize) || isNaN(parsedStopLossPoints) || isNaN(parsedTakeProfitPoints)) {
      alert('Please enter valid numbers for Lot Size, Stop Loss Points, and Take Profit Points.');
      return; // Exit the function if any input is invalid
    }
  
    // Calculate Stop Loss Money and Take Profit Money
    const calculatedStopLossMoney = parseFloat((parsedLotSize * parsedStopLossPoints * 100000).toFixed(2));
    const calculatedTakeProfitMoney = parseFloat((parsedLotSize * parsedTakeProfitPoints * 100000).toFixed(2));
  
    // Calculate Risk-Reward Ratio
    const riskRewardRatioValue = (calculatedTakeProfitMoney / calculatedStopLossMoney).toFixed(0);
  
    // Update the state with the calculated values
    setStopLossMoney(calculatedStopLossMoney.toString()); // Convert to string
    setTakeProfitMoney(calculatedTakeProfitMoney.toString()); // Convert to string
    setRiskRewardRatio(riskRewardRatioValue);
  };
  

  return (
    <div className="rounded-lg shadow-lg shadow-green-500 p-14">
      <h2 className="text-xl font-semibold mb-4 text-center ">Calculate Profit & Loss</h2>
      <div className="grid gap-4 grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="lotSize">
            Lot Size:
          </label>
          <input
            className="px-2 py-1 border rounded"
            type="text"
            id="lotSize"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="riskRewardRatio">
            Risk : Reward
          </label>
          <input
            className="px-2 py-1 border rounded"
            type="text"
            id="riskRewardRatio"
            value={`1 : ${riskRewardRatio}`} // Display the ratio in the desired format
            readOnly // Make this field read-only
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="stopLossPoints">
            Stop Loss Points:
          </label>
          <input
            className="px-2 py-1 border rounded"
            type="text"
            id="stopLossPoints"
            value= {stopLossPoints}
            onChange={(e) => setStopLossPoints(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="takeProfitPoints">
            Take Profit Points:
          </label>
          <input
            className="px-2 py-1 border rounded"
            type="text"
            id="takeProfitPoints"
            value={takeProfitPoints}
            onChange={(e) => setTakeProfitPoints(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="stopLossMoney">
            Stop Loss Money:
          </label>
          <input
            className="px-2 py-1 border rounded"
            type="text"
            id="stopLossMoney"
            value={stopLossMoney}
            readOnly // Make this field read-only
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="takeProfitMoney">
            Take Profit Money:
          </label>
          <input
            className="px-2 py-1 border rounded"
            type="text"
            id="takeProfitMoney"
            value={takeProfitMoney}
            readOnly // Make this field read-only
          />
        </div>

      </div>
      <div className="mt-4">
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default ProfitLossCalculator;
