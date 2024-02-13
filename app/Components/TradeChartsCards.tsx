import React, { useState } from 'react';
import Link from 'next/link';

const TradeChartsCards: React.FC = () => {
  const data = require('../data/chartData2.json');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data.charts);

  const handleFilter = () => {
    const filtered = data.charts.filter((chart: any) => {
      const chartDate = new Date(chart.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return chartDate >= start && chartDate <= end;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredData(data.charts);
  };

  return (
    <div>
      <h2 className="text-center font-semibold bg-green-300 mb-5 rounded-3xl border-2 border-red-500 ">Trade Charts</h2>
      <div className="flex justify-center mb-5 p-5">
        <input
          type="date"
          className="border border-gray-300 rounded-md p-2 mr-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-md p-2 mr-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div>
          <button
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div>
          <button
            className="bg-gray-500 hover-bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((chart: any) => (
            <div
              className="p-4 border-2 shadow-md shadow-green-500 hover:shadow-md hover:shadow-blue-500 rounded-lg"
              key={chart.id}
            >
              <Link href={`/ChartDetails/${chart.id}`} className="block">
                <h1 className='text-red-500 bg-white text-center italic font-bold text-lg underline rounded-md'>
                  [{chart.id}] - {chart.pair}
                </h1>
                <p className="font-semibold whitespace-pre-line my-5 p-5 shadow-md shadow-blue-500">
                  {chart.description} 
                </p>
                <p className="font-semibold my-5">Chart Code: <br /> {chart.chartCode}</p>  
                <p className="font-semibold mb-5">Date: <br /> {chart.date}</p>
                <p className="font-semibold mb-5">Updated: {chart.updated}</p>            
              </Link>
            </div>
          ))}
        </div>
    </div>
  )
}

export default TradeChartsCards
