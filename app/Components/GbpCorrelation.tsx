import React, { useState, useEffect } from 'react';
import UsdCorrelationBlock from './UsdCorrelationBlock';

interface Chart {
  id: string;
  // Add other properties here
}

const GbpCorrelation = () => {
  const data = require('../data/GbpCorrelation.json');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState<Chart[]>([]); // Type annotation for filteredData
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    // Sort the initial data in ascending order based on chart id
    const sortedData = [...data.charts].sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id));
    // Display only the first 4 charts
    const initialCharts = sortedData.slice(0, 4);
    setFilteredData(initialCharts);
  }, []);

  const handleFilter = () => {
    const filtered = data.charts.filter((chart: any) => {
      const chartDate = new Date(chart.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Extract date parts without considering time
      const chartDateWithoutTime = new Date(chartDate.getFullYear(), chartDate.getMonth(), chartDate.getDate());
      const startWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      return chartDateWithoutTime >= startWithoutTime && chartDateWithoutTime <= endWithoutTime;
    });
    // Sort the filtered data in ascending order based on chart id
    filtered.sort((a: any, b: any) => parseInt(a.id) - parseInt(b.id));
    setFilteredData(filtered.slice(0, 4)); // Display only the first 4 filtered charts
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredData(data.charts.slice(0, 4)); // Reset to display the first 4 charts
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

      <div className="container mx-auto mb-10 overflow-auto">
        {/* Toggle between table and card views */}
        {filteredData.length > 0 ? (
          <>
            <div className="grid mb-10 p-2">
              {filteredData.map((chart: any) => (
                <UsdCorrelationBlock
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

export default GbpCorrelation;
