import React,  { useState, useEffect  }  from 'react';

type TableRow = {
  id: number;
  currentBalance: number;
  riskPercent: number;
  riskMoney: number;
  rewardPercent: number;
  rewardMoney: number;
  tradeDate: string;
  pair: string;
  direction: string;
  lotSize: number;
  openPrice: number;
  stopLossPoints: number;
  stopLossPrice: number;
  stopLossMoney: number;
  takeProfitPoints: number;
  takeProfitPrice: number;
  takeProfitMoney: number;
  winLose: string;
  swap: number;
  commission: number;
  broker_PL: number;
  our_PL: number;
  difference_PL: number;
  final_PL: number;
  // ... Define the rest of the properties here
};

// Define the types for your props
type TableCurrencyProps = {
  data: TableRow[];
};

const TableCurrency: React.FC<TableCurrencyProps> = ({ data }) => {
  const [rowData, setRowData] = useState<TableRow[]>(data);
  const [calculating, setCalculating] = useState(false); // State to track whether calculation is pending

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setRowData(JSON.parse(savedData));
    }
  }, []);

  // Function to save data to localStorage
  const saveDataToLocalStorage = (data: TableRow[]) => {
    localStorage.setItem('tableData', JSON.stringify(data));
  };

  const clearTable = () => {
    // Clear the table data by setting an empty array
    setRowData([]);
    // Also, remove the data from localStorage
    localStorage.removeItem('tableData');
  };
  
  // Add a change handler function
  const handleInputChange = (index: number, fieldName: string, value: string) => {
    const updatedData = [...rowData];
    updatedData[index] = {
      ...updatedData[index],
      [fieldName]: value,
    };
    setRowData(updatedData);
  };

  const calculateRiskReward = (index: number) => {
    if (index >= 0 && index < rowData.length) {
      const row = rowData[index];
      if (
        row.currentBalance !== 0 &&
        row.riskMoney !== 0 &&
        row.rewardMoney !== 0
      ) {
        const riskPercent = parseFloat(((row.riskMoney / row.currentBalance) * 100).toFixed(2));
        const rewardPercent = parseFloat(((row.rewardMoney / row.currentBalance) * 100).toFixed(2));
  
        // Check if the selected pair is in the decimalPointsMapping
        if (row.pair in decimalPointsMapping) {
          const decimalPoints = decimalPointsMapping[row.pair];
  
          // Calculate stopLossPoints and takeProfitPoints using the specified decimal points
          const stopLossPoints = parseFloat((row.riskMoney / (10 ** decimalPoints)).toFixed(decimalPoints));
          const takeProfitPoints = parseFloat((row.rewardMoney / (10 ** decimalPoints)).toFixed(decimalPoints));
  
          // Update the state with the new data
          const updatedData = [...rowData];
          updatedData[index] = {
            ...updatedData[index],
            riskPercent: riskPercent,
            rewardPercent: rewardPercent,
            stopLossPoints: stopLossPoints,
            takeProfitPoints: takeProfitPoints,
          };
  
          setRowData(updatedData);
          saveDataToLocalStorage(updatedData);
        }
      }
    }
  };
  

  
  const addRow = () => {
    // Generate a new id by finding the maximum id in the existing data and incrementing it by 1
    const newId = rowData.length > 0 ? Math.max(...rowData.map((row) => row.id)) + 1 : 1;
  
    // Create a new row with default values
    const newRow: TableRow = {
      id: newId,
      currentBalance: 1000, // Default value for currentBalance in the first row
      riskPercent: 0,
      riskMoney: 0, // Default value for riskMoney
      rewardPercent: 0,
      rewardMoney: 0, // Default value for rewardMoney
      tradeDate: '', // Default value for tradeDate
      pair: '', // Default value for pair
      direction: '', // Default value for direction
      lotSize: 0,
      openPrice: 0,
      stopLossPoints: 0,
      stopLossPrice: 0,
      stopLossMoney: 0,
      takeProfitPoints: 0,
      takeProfitPrice: 0,
      takeProfitMoney: 0,
      winLose: '', // Default value for winLose
      swap: 0,
      commission: 0,
      broker_PL: 0,
      our_PL: 0,
      difference_PL: 0,
      final_PL: 0,
      // ... Set default values for the remaining properties
    };
  
    // Calculate the new currentBalance based on the previous row's final_PL
    if (rowData.length > 0) {
      const previousRow = rowData[rowData.length - 1];
      newRow.currentBalance = previousRow.currentBalance + previousRow.final_PL;
    }
  
    // Recalculate risk and reward percentages for the new row
    calculateRiskReward(rowData.length);
  
    // Update the data state to include the new row
    setRowData([...rowData, newRow]);
    setCalculating(false); // Set calculating to false for the new row
    saveDataToLocalStorage([...rowData, newRow]);
  };
  

  const deleteRow = (index: number) => {
    const updatedData = [...rowData];
    updatedData.splice(index, 1); // Remove the row at the specified index
    setRowData(updatedData);
    saveDataToLocalStorage(updatedData);
  };

  const firstHeadings = ['Account Details', 'Risk/Reward Data', 'Trade Data', 'Final Data'];

  const secondHeadings = [
    'Trade No.',
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
    'Calculate Row',
    'Delete Row', // Add a new heading for the delete buttons
  ];

  // Define an array of available options
  const pairOptions = ["DXY", "USDCAD", "USDCHF", "USDJPY", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "XAUUSD",];

  const decimalPointsMapping: Record<string, number> = {
    "DXY": 3,  // Example decimal points for DXY
    "USDCAD": 5,  // Example decimal points for USDCAD
    "USDCHF": 5,  // Example decimal points for USDCHF
    "USDJPY": 3,  // Example decimal points for USDJPY
    "EURUSD": 5,  // Example decimal points for EURUSD
    "GBPUSD": 5,  // Example decimal points for GBPUSD
    "AUDUSD": 5,  // Example decimal points for AUDUSD
    "NZDUSD": 5,  // Example decimal points for NZDUSD
    "XAUUSD": 2,  // Example decimal points for XAUUSD
    // Add other pairs and their respective decimal points here
  }


  return (
    <div className='shadow-lg shadow-blue-400 border-2 border-blue-300 p-5'>
      {/* Add a button to add more rows */}
      <button onClick={addRow} className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 m-5 rounded">
        Add Row
      </button>
      {/* Add a button to clear the table */}
      <button onClick={clearTable} className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 m-5 rounded">
        Clear Table
      </button>
      <h1 className='font-bold text-[25px] bg-blue-300'>Your Table Currency</h1>
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
          {rowData.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } cursor-pointer hover-bg-green-200 border-b border-black`}
            >
              {/* Render input fields for each property in the row */}
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center font-bold'>{row.id}</p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-green-600 font-bold'>${row.currentBalance} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-red-500 font-bold' >{row.riskPercent} % </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.riskMoney}  
                  onChange={(e) => handleInputChange(index, 'riskMoney', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-red-500 font-bold' >{row.rewardPercent} % </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.rewardMoney}  
                  onChange={(e) => handleInputChange(index, 'rewardMoney', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input 
                  type="date" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.tradeDate}  
                  onChange={(e) => handleInputChange(index, 'tradeDate', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <select
                  className='w-full rounded-xl text-center font-bold'
                  value={row.pair}
                  onChange={(e) => handleInputChange(index, 'pair', e.target.value)}>
                  {pairOptions.map((pairOption, optionIndex) => (
                    <option key={optionIndex} value={pairOption}>
                      {pairOption}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <div className="flex gap-2 items-center justify-center font-bold">
                  <input
                    type="radio"
                    id={`buy-${index}`}
                    name={`direction-${index}`}
                    value="Buy"
                    checked={row.direction === "Buy"}
                    onChange={(e) => handleInputChange(index, 'direction', e.target.value)}
                  />
                  <label htmlFor={`buy-${index}`}>Buy</label>
                  <input
                    type="radio"
                    id={`sell-${index}`}
                    name={`direction-${index}`}
                    value="Sell"
                    checked={row.direction === "Sell"}
                    onChange={(e) => handleInputChange(index, 'direction', e.target.value)}
                  />
                  <label htmlFor={`sell-${index}`}>Sell</label>
                </div>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.lotSize}  
                  onChange={(e) => handleInputChange(index, 'lotSize', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.openPrice}  
                  onChange={(e) => handleInputChange(index, 'openPrice', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-purple-500 font-bold'> {row.stopLossPoints} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-blue-500 font-bold'> {row.stopLossPrice} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-green-500 font-bold'>$ {row.stopLossMoney} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-purple-500 font-bold'> {row.takeProfitPoints} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-blue-500 font-bold'> {row.takeProfitPrice} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-green-500 font-bold'>$ {row.takeProfitMoney} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <div className="flex gap-2 items-center justify-center font-bold">
                  <input
                    type="radio"
                    id={`win-${index}`}
                    name={`winLose-${index}`}
                    value="Win"
                    checked={row.winLose === "Win"}
                    onChange={(e) => handleInputChange(index, 'winLose', 'Win')}
                  />
                  <label htmlFor={`win-${index}`}>Win</label>
                  <input
                    type="radio"
                    id={`lose-${index}`}
                    name={`winLose-${index}`}
                    value="Lose"
                    checked={row.winLose === "Lose"}
                    onChange={(e) => handleInputChange(index, 'winLose', 'Lose')}
                  />
                  <label htmlFor={`lose-${index}`}>Lose</label>
                </div>
              </td>
              <td className="py-2 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.swap}  
                  onChange={(e) => handleInputChange(index, 'swap', e.target.value)} />
              </td>
              <td className="py-2 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.commission}  
                  onChange={(e) => handleInputChange(index, 'commission', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <input 
                  type="number" 
                  className='w-full rounded-xl text-center font-bold' 
                  value={row.broker_PL}  
                  onChange={(e) => handleInputChange(index, 'broker_PL', e.target.value)} />
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-purple-500 font-bold'>{row.our_PL} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-purple-500 font-bold'>{row.difference_PL} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <p className='w-full rounded-xl text-center text-red-500 font-extrabold underline'> {row.final_PL} </p>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <button
                    onClick={() => {
                      calculateRiskReward(index);
                      setCalculating(false);
                    }}
                    className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    disabled={calculating} // Disable the button when calculating
                  >
                    Calculate
                  </button>
              </td>
              <td className="py-2 px-3 border-l border-r border-black">
                <button
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCurrency;
