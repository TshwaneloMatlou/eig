'use client'
import React, { useState } from 'react';

const TablePercentage = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // New state variables for Swap, Commission, and Broker_PL
  const [swap, setSwap] = useState<number | string>(''); // You can set their initial values
  const [commission, setCommission] = useState<number | string>('');
  const [brokerPL, setBrokerPL] = useState<number | string>('');

  // Handler functions for Swap, Commission, and Broker_PL input fields
  const handleSwapChange = (value: string) => {
    setSwap(value);
  };

  const handleCommissionChange = (value: string) => {
    setCommission(value);
  };

  const handleBrokerPLChange = (value: string) => {
    setBrokerPL(value);
  };

  const [data, setData] = useState([
    {
      id: 1,
      currentBalance: 0,
      riskPercent: 1,
      riskMoney: 0,
      rewardPercent: 3,
      rewardMoney: 0,
      tradeDate: '',
      pair: 'EURUSD',
      direction: 'Select',
      lotSize: 0.01,
      openPrice: 0.01001,
      stopLossPoints: 0,
      stopLossPrice: 0,
      stopLossMoney: 0,
      takeProfitPoints: 0,
      takeProfitPrice: 0,
      takeProfitMoney: 0,
      winLose: 'WIN',
      swap: 0,
      commission: 0,
      broker_PL: 0,
      our_PL: 0,
      difference_PL: 0,
      final_PL: 0,
    },
  ]);

  const defaultRowData = {
    riskPercent: 1,
    riskMoney: 0,
    rewardPercent: 3,
    rewardMoney: 0,
    tradeDate: '',
    pair: 'EURUSD',
    direction: 'Select',
    lotSize: 0.01,
    openPrice: 0.01001,
    stopLossPoints: 0,
    stopLossPrice: 0,
    stopLossMoney: 0,
    takeProfitPoints: 0,
    takeProfitPrice: 0,
    takeProfitMoney: 0,
    winLose: 'WIN',
    swap: 0,
    commission: 0,
    broker_PL: 0,
    our_PL: 0,
    difference_PL: 0,
    final_PL: 0,
  };

  const firstHeadings = ['Account Details', 'Risk/Reward Data', 'Trade Data', 'Final Data'];

  const secondHeadings = [
    'No.',
    'Current_($)',
    'Risk_(%)',
    'Risk_($)',
    'Reward_(%)',
    'Reward_($)',
    'TradeDate',
    'TradingPair',
    'Direction',
    'LotSize',
    'OpenPrice',
    'SL_(Points)',
    'SL_(Price)',
    'SL_(Money)',
    'TP_(Points)',
    'TP_(Price)',
    'TP_(Money)',
    'Win/Lose',
    'Swap',
    'Commission',
    'Broker_PL',
    'Our_PL',
    'Difference_PL',
    'Final_PL',
  ];


  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const calculateRiskAndReward = (index: number, value: number) => {
    const riskPercent = data[index].riskPercent;
    const rewardPercent = data[index].rewardPercent;
    const riskMoney = parseFloat((value * riskPercent / -100).toFixed(2));
    const rewardMoney = parseFloat((value * rewardPercent / 100).toFixed(2));
    return { riskMoney, rewardMoney };
  };

  const handleRiskPercentChange = (index: number, value: string) => {
    const newData = [...data];
    const numericValue = parseFloat(value);
    newData[index].riskPercent = isNaN(numericValue) ? 0 : numericValue;
    const updatedData = calculateRiskAndReward(index, newData[index].currentBalance);
    newData[index].riskMoney = updatedData.riskMoney;
    newData[index].rewardMoney = updatedData.rewardMoney;
    newData[index].stopLossPoints = parseFloat((updatedData.riskMoney / -1000).toFixed(5));
    newData[index].takeProfitPoints = parseFloat((updatedData.rewardMoney / 1000).toFixed(5));
    setData(newData);
    calculateFinalPL(index);
  };

  const handleRewardPercentChange = (index: number, value: string) => {
    const newData = [...data];
    const numericValue = parseFloat(value);
    newData[index].rewardPercent = isNaN(numericValue) ? 0 : numericValue;
    const updatedData = calculateRiskAndReward(index, newData[index].currentBalance);
    newData[index].riskMoney = updatedData.riskMoney;
    newData[index].rewardMoney = updatedData.rewardMoney;
    newData[index].stopLossPoints = parseFloat((updatedData.riskMoney / 1000).toFixed(5));
    newData[index].takeProfitPoints = parseFloat((updatedData.rewardMoney / 1000).toFixed(5));
    setData(newData);
    calculateFinalPL(index);
  };
  
  const handleCurrentBalanceChange = (index: number, value: string) => {
    const newData = [...data];
    const numericValue = parseFloat(value);
    newData[index].currentBalance = isNaN(numericValue) ? 0 : numericValue;
    const { riskMoney, rewardMoney } = calculateRiskAndReward(index, newData[index].currentBalance);
    newData[index].riskMoney = riskMoney;
    newData[index].rewardMoney = rewardMoney;
    newData[index].stopLossPoints = parseFloat((riskMoney / 1000).toFixed(5));
    newData[index].takeProfitPoints = parseFloat((rewardMoney / 1000).toFixed(5));
    setData(newData);
    calculateFinalPL(index);
  };

  const handleDirectionChange = (index: number, direction: string) => {
    const newData = [...data];
    newData[index].direction = direction;

    if (!isNaN(newData[index].stopLossPoints)) {
      if (direction === 'BUY') {
        newData[index].stopLossPrice = parseFloat((newData[index].openPrice - newData[index].stopLossPoints).toFixed(5));
      } else if (direction === 'SELL') {
        newData[index].stopLossPrice = parseFloat((newData[index].openPrice + newData[index].stopLossPoints).toFixed(5));
      }
    }

    if (!isNaN(newData[index].takeProfitPoints)) {
      if (direction === 'BUY') {
        newData[index].takeProfitPrice = parseFloat((newData[index].openPrice + newData[index].takeProfitPoints).toFixed(5));
      } else if (direction === 'SELL') {
        newData[index].takeProfitPrice = parseFloat((newData[index].openPrice - newData[index].takeProfitPoints).toFixed(5));
      }

      setData(newData);
      calculateFinalPL(index);
    }
  };

  const handleOpenPriceChange = (index: number, value: string) => {
    const newData = [...data];
    const numericValue = parseFloat(value);
    newData[index].openPrice = isNaN(numericValue) ? 0 : numericValue;
    
    if (!isNaN(newData[index].stopLossPoints)) {
      if (newData[index].direction === 'BUY') {
        newData[index].stopLossPrice = parseFloat((newData[index].openPrice - newData[index].stopLossPoints).toFixed(5));
      } else if (newData[index].direction === 'SELL') {
        newData[index].stopLossPrice = parseFloat((newData[index].openPrice + newData[index].stopLossPoints).toFixed(5));
      }
    }

    if (!isNaN(newData[index].takeProfitPoints)) {
      if (newData[index].direction === 'BUY') {
        newData[index].takeProfitPrice = parseFloat((newData[index].openPrice + newData[index].takeProfitPoints).toFixed(5));
      } else if (newData[index].direction === 'SELL') {
        newData[index].takeProfitPrice = parseFloat((newData[index].openPrice - newData[index].takeProfitPoints).toFixed(5));
      }

      setData(newData);
      calculateFinalPL(index);
    }
  };

  const handleLotSizeChange = (index: number, value: string) => {
    const newData = [...data];
    const numericValue = parseFloat(value);
    newData[index].lotSize = isNaN(numericValue) ? 0 : numericValue;
    newData[index].stopLossMoney = parseFloat(((newData[index].lotSize * newData[index].stopLossPoints)*100000).toFixed(2));
    newData[index].takeProfitMoney = parseFloat(((newData[index].lotSize * newData[index].takeProfitPoints)*100000).toFixed(2));
    setData(newData);
    calculateFinalPL(index);
  };

  const calculateFinalPL = (index: number | null) => {
    if (index !== null) {
      const newData = [...data];
      const row = newData[index];
      row.final_PL = (-row.swap) + (-row.commission) + row.our_PL + row.difference_PL;
      setData(newData);
    }
  };
  

  // Update handleWinLoseChange to call calculateDifferencePL
  const handleWinLoseChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index].winLose = value;

    if (value === 'Win') {
      newData[index].our_PL = newData[index].takeProfitMoney;
    } else if (value === 'Lose') {
      newData[index].our_PL = newData[index].stopLossMoney;
    }

    calculateDifferencePL(index); // Calculate difference_PL
    calculateFinalPL(index);
  };


  const addNewRows = () => {
    const newData = [...data];
    let currentBalance = 0;
  
    if (newData.length > 0) {
      const previousRow = newData[newData.length - 1];
      currentBalance = previousRow.currentBalance + previousRow.final_PL;
    }
    
  
    const newRow = {
      id: newData.length + 1,
      ...defaultRowData, // Include default data in the new row
      currentBalance, // Set the calculated currentBalance
    };
  
    newData.push(newRow);
    setData(newData);
  };
  
  


  const calculateDifferencePL = (index: number) => {
    const newData = [...data];
    const row = newData[index];
    row.difference_PL = parseFloat((row.broker_PL - row.our_PL).toFixed(2));
    setData(newData);
  };

  // Function to update the table data based on input values
  const updateTableData = () => {
    const newData = [...data];
    // Update Swap, Commission, and Broker_PL for the selected row
    if (selectedRow !== null) {
      newData[selectedRow].swap = parseFloat(swap.toString()) || 0;
      newData[selectedRow].commission = parseFloat(commission.toString()) || 0;
      newData[selectedRow].broker_PL = parseFloat(brokerPL.toString()) || 0;
      calculateDifferencePL(selectedRow); // Calculate difference_PL
    }
    setData(newData);
    calculateFinalPL(selectedRow);
  };
  

  return (
    <div className='shadow-lg shadow-blue-400 border-2 border-blue-300 p-5'>
      <h1 className='font-bold text-[25px] bg-blue-300'>Template for (Consistent Percentage)</h1>
      
      <button onClick={addNewRows} className="mb-4 p-2 bg-blue-500 text-white font-semibold rounded-lg">
        Add New Rows
      </button>

      <table className="min-w-full bg-white border border-collapse border-black rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th
              colSpan={2}
              className="py-2 px-3 text-center text-xs font-semibold text-gray-600 uppercase border-b border-black border-l border-r"
            >
              {firstHeadings[0]}
            </th>
            {firstHeadings.slice(1).map((heading, index) => (
              <th
                key={index}
                className={`py-2 px-3 text-center text-xs font-semibold text-gray-600 uppercase border-b border-black border-l border-r ${
                  heading === 'Risk/Reward Data' ? 'border-t border-black' : ''
                }`}
                colSpan={heading === 'Risk/Reward Data' ? 4 : 11}
              >
                {heading}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100">
            {secondHeadings.map((heading, index) => (
              <th
                key={index}
                className={`${
                  heading === 'No.'
                    ? 'py-2 px-3 text-center text-xs font-semibold text-gray-600 uppercase'
                    : 'py-2 px-3'
                } border border-black`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${
                selectedRow === index ? 'bg-green-400' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } cursor-pointer hover-bg-green-200 border-b border-black`}
              onClick={() => handleRowClick(index)}
            >
              <td className="py-2 px-3 border-l border-r border-black">{row.id}</td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.currentBalance}
                  onChange={(e) => handleCurrentBalanceChange(index, e.target.value)}
                />
              </td>

              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.riskPercent}
                  onChange={(e) => handleRiskPercentChange(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">$ {row.riskMoney}</td>

              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.rewardPercent}
                  onChange={(e) => handleRewardPercentChange(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">$ {row.rewardMoney}</td>

              <td className="py-2 px-3 border-l border-r border-black">
                <input
                    className='w-full rounded-xl text-center font-bold'
                    type="datetime-local"
                    value={row.tradeDate}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].tradeDate = e.target.value;
                      setData(newData);
                    }}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.pair}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].pair = e.target.value;
                    setData(newData);
                  }}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <div className='flex gap-3'>
                  <label>
                    <input
                      type="radio"
                      name={`direction_${index}`}
                      value="BUY"
                      checked={row.direction === 'BUY'}
                      onChange={() => handleDirectionChange(index, 'BUY')}
                    />
                    BUY
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`direction_${index}`}
                      value="SELL"
                      checked={row.direction === 'SELL'}
                      onChange={() => handleDirectionChange(index, 'SELL')}
                    />
                    SELL
                  </label>
                </div>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className="w-full rounded-xl text-center font-bold"
                  type="number" // Set the input type to "number"
                  step="1"   // Set the step attribute to allow decimal values
                  value={row.lotSize}
                  onChange={(e) => handleLotSizeChange(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className="w-full rounded-xl text-center font-bold"
                  type="number" // Set the input type to "number"
                  step="0.00001" // Adjust the step attribute to control decimal precision
                  value={row.openPrice}
                  onChange={(e) => handleOpenPriceChange(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.stopLossPoints}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.stopLossPrice}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">$ {row.stopLossMoney}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.takeProfitPoints}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.takeProfitPrice}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">$ {row.takeProfitMoney}</td>
              
              <td className="py-2 px-3 border-l border-r border-black text-center">
                  <div className='flex gap-3'>
                    <label>
                      <input
                        type="radio"
                        name={`winLose_${index}`}
                        value="Win"
                        checked={row.winLose === 'Win'}
                        onChange={() => handleWinLoseChange(index, 'Win')}
                      />
                      Win
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`winLose_${index}`}
                        value="Lose"
                        checked={row.winLose === 'Lose'}
                        onChange={() => handleWinLoseChange(index, 'Lose')}
                      />
                      Lose
                    </label>
                  </div>
              </td>


              <td className="py-2 px-3 border-l border-r border-black text-center text-purple-500 font-bold">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={swap}
                  onChange={(e) => handleSwapChange(e.target.value)}
                  onBlur={updateTableData} // Call updateTableData when the input loses focus
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-purple-500 font-bold">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={commission}
                  onChange={(e) => handleCommissionChange(e.target.value)}
                  onBlur={updateTableData} // Call updateTableData when the input loses focus
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-black font-bold">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={brokerPL}
                  onChange={(e) => handleBrokerPLChange(e.target.value)}
                  onBlur={updateTableData} // Call updateTableData when the input loses focus
                />
              </td>

              <td className="py-2 px-3 border-l border-r border-black text-center text-purple-500 font-bold">$ {row.our_PL}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-purple-500 font-bold">$ {row.difference_PL}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-Blue-500 font-bold">$ {row.final_PL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePercentage;
