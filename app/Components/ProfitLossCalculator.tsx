'use client'
import React, { useState, useEffect } from 'react';

const ProfitLossCalculator = () => {
  const [lotSize, setLotSize] = useState('0.01');
  const [stopLossPoints, setStopLossPoints] = useState('0.00101');
  const [stopLossMoney, setStopLossMoney] = useState('0');
  const [takeProfitPoints, setTakeProfitPoints] = useState('0.00101');
  const [takeProfitMoney, setTakeProfitMoney] = useState('0');
  const [riskRewardRatio, setRiskRewardRatio] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EURUSD'); // Add state for selected currency

  useEffect(() => {
    // Calculate Stop Loss Points and Take Profit Points based on the selected currency
    let calculatedStopLossPoints: number = parseFloat(stopLossPoints);
    let calculatedTakeProfitPoints: number = parseFloat(takeProfitPoints);

    if (selectedCurrency === 'USDJPY' || selectedCurrency === 'DXY') {
      calculatedStopLossPoints = Number(calculatedStopLossPoints.toFixed(3));
      calculatedTakeProfitPoints = Number(calculatedTakeProfitPoints.toFixed(3));
    } else {
      calculatedStopLossPoints = Number(calculatedStopLossPoints.toFixed(5));
      calculatedTakeProfitPoints = Number(calculatedTakeProfitPoints.toFixed(5));
    }

    setStopLossPoints(calculatedStopLossPoints.toString());
    setTakeProfitPoints(calculatedTakeProfitPoints.toString());
  }, [selectedCurrency]);

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
    let calculatedStopLossPoints: number;
    let calculatedTakeProfitPoints: number;
  
    // Adjust the decimal points based on the selected currency
    if (selectedCurrency === 'USDJPY' || selectedCurrency === 'DXY') {
      calculatedStopLossPoints = Number(parsedStopLossPoints.toFixed(3));
      calculatedTakeProfitPoints = Number(parsedTakeProfitPoints.toFixed(3));
    } else {
      calculatedStopLossPoints = Number(parsedStopLossPoints.toFixed(5));
      calculatedTakeProfitPoints = Number(parsedTakeProfitPoints.toFixed(5));
    }
  
    const calculatedStopLossMoney = parseFloat((parsedLotSize * parsedStopLossPoints * 100000).toFixed(2));
    const calculatedTakeProfitMoney = parseFloat((parsedLotSize * parsedTakeProfitPoints * 100000).toFixed(2));
  
    // Calculate Risk-Reward Ratio
    const riskRewardRatioValue = (calculatedTakeProfitMoney / calculatedStopLossMoney).toFixed(0);
  
    // Update the state with the calculated values
    setStopLossPoints(calculatedStopLossPoints.toString());
    setTakeProfitPoints(calculatedTakeProfitPoints.toString());
    setStopLossMoney(calculatedStopLossMoney.toString());
    setTakeProfitMoney(calculatedTakeProfitMoney.toString());
    setRiskRewardRatio(riskRewardRatioValue);
  };
  
  

  return (
    <div className="rounded-lg shadow-lg shadow-green-500 p-14">
      <h2 className="text-xl font-semibold mb-4 text-center ">Calculate Profit & Loss</h2>
      <div className="grid gap-4 grid-cols-2">
        <div className='bg-black col-span-2 text-white p-5 rounded-2xl'>
          <h1 className='text-center text-green-500 text-[15pt] font-extrabold mb-3'>Description</h1>
          <p className='mb-3'>This calculator is designed to calculate the Profit and Loss of a trade based on editing the (Currency Pair, Points or LotSize).</p>
          <p className='mb-2'>* Example Calculate Loss:  LotSize * Stop Loss Points = Stop Loss Money ($)</p>
          <p className='mb-2'>* Example Calculate Profit:  LotSize * Stop Profit Points = Stop Profit Money ($)</p>
          <h1 className='bg-blue-500 text-center font-bold my-3 rounded-lg'>Amount of Decimal Numbers (5) </h1>
          <p className='text-center mb-3 underline'>USDCAD, USDCHF, EURUSD, GBPUSD, AUDUSD, NZDUSD</p>
          <p className='mb-2'>* Example1: EURUSD = "1.001001"</p>
          <p className='mb-2'>* Example2: GBPUSD = "1.001002"</p>
          
          <h1 className='bg-blue-500 text-center font-bold my-3 rounded-lg'>Amount of Decimal Numbers (3) </h1>
          <p className='text-center mb-3 underline'>DXY, USDJPY</p>
          <p className='mb-2'>* Example1: DXY = "1.001"</p>
          <p className='mb-2'>* Example2: USDJPY = "1.002"</p>
        </div>
        <div className='mx-auto text-center pt-8 px-2'>E.I.G</div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="currency">
            Currency:
          </label>
          <select
            className="px-2 py-1 border rounded"
            id="currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="DXY">DXY</option>
            <option value="USDCAD">USDCAD</option>
            <option value="USDCHF">USDCHF</option>
            <option value="USDJPY">USDJPY</option>
            <option value="EURUSD">EURUSD</option>
            <option value="GBPUSD">GBPUSD</option>
            <option value="AUDUSD">AUDUSD</option>
            <option value="NZDUSD">NZDUSD</option>
            <option value="XAUUSD">XAUUSD</option>
          </select>
        </div>
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
            className="px-2 py-1 border-2 border-red-500 rounded"
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
            value={stopLossPoints}
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
            Stop Loss Money ($):
          </label>
          <input
            className="px-2 py-1 border-2 border-red-500 rounded"
            type="text"
            id="stopLossMoney"
            value={stopLossMoney}
            readOnly // Make this field read-only
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="takeProfitMoney">
            Take Profit Money ($):
          </label>
          <input
            className="px-2 py-1 border-2 border-red-500 rounded"
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
