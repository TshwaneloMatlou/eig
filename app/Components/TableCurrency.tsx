'use client'
import React, { useState } from 'react';

const TableCurrency = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const [data, setData] = useState([
    {
      id: 1,
      currentBalance: 300,
      riskPercent: 1,
      riskMoney: 0,
      rewardPercent: 3,
      rewardMoney: 0,
      tradeDate: '',
      pair: 'EURUSD',
      direction: 'BUY',
      lotSize: 0.01,
      openPrice: 0.00801,
      stopLossPoints: 0,
      stopLossPrice: 0,
      takeProfitPoints: 0,
      takeProfitPrice: 0,
    },
  ]);

  const firstHeadings = ['Account Details', 'Main Data', 'Final Data'];

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
    'TP_(Points)',
    'TP_(Price)',
  ];

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const calculateRiskAndReward = (index: number, value: number) => {
    const riskPercent = data[index].riskPercent;
    const rewardPercent = data[index].rewardPercent;
    const riskMoney = parseFloat((value * riskPercent / 100).toFixed(2));
    const rewardMoney = parseFloat((value * rewardPercent / 100).toFixed(2));
    return { riskMoney, rewardMoney };
  };

  const handleCurrentBalanceChange = (index: number, value: string) => {
    const newData = [...data];
    const numericValue = parseFloat(value); // Convert input value to a number
    newData[index].currentBalance = isNaN(numericValue) ? 0 : numericValue;
    const { riskMoney, rewardMoney } = calculateRiskAndReward(index, newData[index].currentBalance);
    newData[index].riskMoney = riskMoney;
    newData[index].rewardMoney = rewardMoney;
    newData[index].stopLossPoints = parseFloat((riskMoney / 1000).toFixed(5));
    newData[index].takeProfitPoints = parseFloat((rewardMoney / 1000).toFixed(5));
    // Update the table data
    setData(newData);
  };

  const handleDirectionChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index].direction = value;
    
    if (!isNaN(newData[index].stopLossPoints)) {
      // Calculate and update stopLossPrice based on direction
      if (value === 'BUY') {
        newData[index].stopLossPrice = parseFloat((newData[index].openPrice - newData[index].stopLossPoints).toFixed(5));
      } else if (value === 'SELL') {
        newData[index].stopLossPrice = parseFloat((newData[index].openPrice + newData[index].stopLossPoints).toFixed(5));
      }
    }

    if (!isNaN(newData[index].takeProfitPoints)) {
      // Calculate and update takeProfitPrice based on direction
      if (value === 'BUY') {
        newData[index].takeProfitPrice = parseFloat((newData[index].openPrice + newData[index].takeProfitPoints).toFixed(5));
      } else if (value === 'SELL') {
        newData[index].takeProfitPrice = parseFloat((newData[index].openPrice - newData[index].takeProfitPoints).toFixed(5));
      }
    }

    // Update the table data
    setData(newData);
  };

  return (
    <div className='shadow-lg shadow-blue-400 border-2 border-blue-300 p-5'>
      <h1 className='font-bold text-[25px] bg-blue-300'>Template for (Consistent Currency)</h1>
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
                  heading === 'Main Data' ? 'border-t border-black' : ''
                }`}
                colSpan={heading === 'Main Data' ? 4 : 9}
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
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].riskPercent = parseFloat(e.target.value); // Convert input value to a number
                    setData(newData);
                  }}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">$ {row.riskMoney}</td>

              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.rewardPercent}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].rewardPercent = parseFloat(e.target.value); // Convert input value to a number
                    setData(newData);
                  }}
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
                <select
                  className='w-full rounded-xl text-center font-bold'
                  value={row.direction}
                  onChange={(e) => handleDirectionChange(index, e.target.value)}
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.lotSize}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].lotSize = parseFloat(e.target.value); // Convert input value to a number
                    setData(newData);
                  }}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input
                  className='w-full rounded-xl text-center font-bold'
                  type="text"
                  value={row.openPrice}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].openPrice = parseFloat(e.target.value); // Convert input value to a number
                    setData(newData);
                  }}
                />
              </td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.stopLossPoints}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.stopLossPrice}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.takeProfitPoints}</td>
              <td className="py-2 px-3 border-l border-r border-black text-center text-red-500 font-bold">{row.takeProfitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCurrency;
