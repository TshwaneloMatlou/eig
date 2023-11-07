'use client'
import React from 'react';
import TableCurrency from '../Components/TableCurrency';

const MoneyManagement = () => {
  const data = [
    {
      id: 1,
      currentBalance: 1000,
      riskPercent: 0,
      riskMoney: 6,
      rewardPercent: 0,
      rewardMoney: 12,
      tradeDate: '2023-10-26T10:00',
      pair: 'EURUSD',
      direction: 'BUY',
      lotSize: 0.01,
      openPrice: 1.1000,
      stopLossPoints: 10,
      stopLossPrice: 1.0990,
      stopLossMoney: -10,
      takeProfitPoints: 30,
      takeProfitPrice: 1.1030,
      takeProfitMoney: 30,
      winLose: 'Win',
      swap: -2.50,
      commission: -5.00,
      broker_PL: 20.00,
      our_PL: 20.00,
      difference_PL: 27.50,
      final_PL: 20.00,
    },
    // Add more rows with similar data
  ];

  // Make use of the `App` component here or elsewhere in your code

  return (
    <div>
      <h1 className="text-center font-semibold bg-green-300 mb-8 mt-36 rounded-3xl border-2 border-red-500">Trade Table</h1>
      <div className='grid overflow-x-auto m-5 shadow-lg shadow-green-500 rounded-md'>
        <div className='m-5 p-5'>
          <TableCurrency data={data} />
        </div>
      </div>
    </div>
  );
}

export default MoneyManagement;
