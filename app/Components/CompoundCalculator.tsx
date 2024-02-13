'use client'
import React, { useState } from 'react';

const CompoundCalculator = () => {
  // State variables to store input values and results
  const [presentValue, setPresentValue] = useState('1000');
  const [annualInterestRate, setAnnualInterestRate] = useState('1');
  const [compoundingFrequency, setCompoundingFrequency] = useState('monthly');
  const [timeLength, setTimeLength] = useState('1');
  const [timeInterval, setTimeInterval] = useState('yearly');
  const [additionalPayments, setAdditionalPayments] = useState('100');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [futureValue, setFutureValue] = useState('');
  const [calculationTable, setCalculationTable] = useState<CalculationTableRow[]>([]);
  
  
  // Define a type for the calculation table
  type CalculationTableRow = {
    period: number;
    interest: string;
    additionalPayment: string;
    total: string;
  };

  // Function to calculate the future value
  const calculateFutureValue = () => {
    const pv = parseFloat(presentValue); // Convert present value to a floating-point number
    const r = parseFloat(annualInterestRate) / 100; // Convert annual interest rate to a decimal
    const n = getCompoundingFrequency(); // Get compounding frequency
    const t = getTimeLength(); // Get time length in years
    const ap = parseFloat(additionalPayments); // Convert additional payments to a floating-point number
    const pf = getPaymentFrequency(); // Get payment frequency

    // Calculate the monthly interest rate based on the compounding frequency
    let monthlyInterestRate = r;
    if (n === 12 && pf === 12 && compoundingFrequency === 'yearly') {
      monthlyInterestRate = r / 12;
    }

    let futureValue = pv; // Initialize future value
    let table = []; // Initialize calculation table

    // Inside the calculateFutureValue function
    for (let i = 0; i < t * n; i++) {
      let interest;
      if (i === 0) {
        // Calculate interest for the first row based on (pv * r / n)
        interest = (pv * monthlyInterestRate);
      } else {
        // Calculate interest for subsequent rows based on (futureValue * r / n)
        interest = (futureValue * monthlyInterestRate);
      }

      const previousValue = futureValue; // Store the previous value for additional payments calculation

      // Check if additional payment should be applied based on payment frequency (monthly)
      if ((i + 1) % (12 / pf) === 0) {
        futureValue += ap; // Add additional payment if applicable
      }

      futureValue += interest; // Update the future value with interest
      table.push({
        period: i + 1,
        interest: interest.toFixed(2), // Store interest with 2 decimal places
        additionalPayment: (futureValue - previousValue - interest).toFixed(2), // Store additional payment with 2 decimal places
        total: futureValue.toFixed(2), // Store total with 2 decimal places
      });
    }

    setFutureValue(futureValue.toFixed(2)); // Update the future value in the state
    setCalculationTable(table); // Update the calculation table in the state
  };

  // Function to get compounding frequency as a number
  const getCompoundingFrequency = () => {
    switch (compoundingFrequency) {
      case 'annually':
        return 1;
      case 'quarterly':
        return 4;
      case 'monthly':
        return 12;
      default:
        return 1;
    }
  };

  // Function to get time length in years based on the selected time interval
  const getTimeLength = () => {
    const years = parseFloat(timeLength); // Convert time length to a floating-point number

    switch (timeInterval) {
      case 'yearly':
        return years;
      case 'quarterly':
        return years / 4;
      case 'monthly':
        return years / 12;
      default:
        return years;
    }
  };

  // Function to get payment frequency as a number
  const getPaymentFrequency = () => {
    switch (paymentFrequency) {
      case 'monthly':
        return 12;
      case 'quarterly':
        return 4;
      case 'yearly':
        return 1;
      default:
        return 12;
    }
  };

  // JSX rendering of the calculator form and results
  return (
    <div className="bg-white rounded-lg shadow-lg shadow-green-500 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center ">Compound Interest Calculator</h2>
      {/* Present value input */}
      <div className="mb-4">
        <label htmlFor="presentValue">Present value</label>
        <div className="flex items-center">
          <input
            type="number"
            id="presentValue"
            value={presentValue}
            onChange={(e) => setPresentValue(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      {/* Annual interest rate input */}
      <div className="mb-4">
        <label htmlFor="annualInterestRate">Interest rate</label>
        <div className="flex items-center">
          <input
            type="number"
            id="annualInterestRate"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      {/* Compounding frequency selection */}
      <div className="mb-4">
        <label>Compounded</label>
        <div className="flex items-center">
          <select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="annually">Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      {/* Time length input */}
      <div className="mb-4">
        <label htmlFor="timeLength">Time length</label>
        <div className="flex items-center">
          <input
            type="number"
            id="timeLength"
            value={timeLength}
            onChange={(e) => setTimeLength(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            className="ml-2 border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      {/* Additional payments input */}
      <div className="mb-4">
        <label htmlFor="additionalPayments">Additional payments</label>
        <div className="flex items-center">
          <input
            type="number"
            id="additionalPayments"
            value={additionalPayments}
            onChange={(e) => setAdditionalPayments(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 "
          />
          <select
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 m-2"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      {/* Calculate button */}
      <div>
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={calculateFutureValue}
        >
          Calculate
        </button>
      </div>
      {/* Display future value if available */}
      {futureValue && (
        <div className="mt-4">
          <p className="text-xl font-semibold">
            Future Value: ${futureValue}
          </p>
        </div>
      )}
      {/* Display calculation table if available */}
      {calculationTable.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Calculation Table</h3>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Period</th>
                <th className="border border-gray-400 p-2">Interest</th>
                <th className="border border-gray-400 p-2">Additional Payment</th>
                <th className="border border-gray-400 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {calculationTable.map((row) => (
                <tr key={row.period}>
                  <td className="border border-gray-400 p-2">{row.period}</td>
                  <td className="border border-gray-400 p-2">${row.interest}</td>
                  <td className="border border-gray-400 p-2">${row.additionalPayment}</td>
                  <td className="border border-gray-400 p-2">${row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompoundCalculator;
