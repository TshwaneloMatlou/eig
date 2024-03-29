import React, { useState } from 'react';
import TradeCard from './TradeCard';
import ImageBanner from './ImageBanner';
import ImageBanner4hr from './ImageBanner4hr';

const Trades = () => {
  const data = require('../data/chartData2.json');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data.charts);
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Explicitly set type to string or null

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

  const handleRowClick = (id: string) => {
    setSelectedRow(id === selectedRow ? null : id); // Toggle selected row
  };

  return (
    <div>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/*
      <ImageBanner filteredData={filteredData} selectedRow={selectedRow} handleRowClick={handleRowClick} />
      <ImageBanner4hr filteredData={filteredData} selectedRow={selectedRow} handleRowClick={handleRowClick} /> 
      */}

      <div className="container mx-auto overflow-auto">
        {/* Toggle between table and card views */}
        {filteredData.length > 0 ? (
          <>
            <div className="flex overflow-x-auto p-2">
              {filteredData
                .slice() // Make a copy of the array to avoid mutating the original
                .sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id)) // Sort in descending order based on the id
                .map((chart: any) => (
                  <TradeCard
                    key={chart.id}
                    chart={chart}
                    selected={chart.id === selectedRow}
                    onClick={() => handleRowClick(chart.id)}
                  />
                ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No data to display.</p>
        )}
      </div>
    </div>
  );
};

export default Trades;
