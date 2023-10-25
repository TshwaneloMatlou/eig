'use client'
import React, { useState } from 'react';

function ForexCalculator() {
  const [accountBalance, setAccountBalance] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [positionSize, setPositionSize] = useState('');
  const [margin, setMargin] = useState('');
  const [lots, setLots] = useState('');

  const calculatePositionSize = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercentage) / 100;
    const lossAmount = balance * risk;
    const pips = parseFloat(stopLoss);
    const marginRequired = parseFloat(margin);

    if (balance && risk && pips) {
      const positionSize = (lossAmount / pips).toFixed(2);
      setPositionSize(positionSize);

      if (marginRequired) {
        const lotSize = (marginRequired / (pips * 10)).toFixed(2); // Standard 1 Lot = 100,000 units
        setLots(lotSize);
      }
    } else {
      setPositionSize('');
      setLots('');
    }
  };

  return (
    <div className="mt-4 col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Forex Position Size Calculator</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="accountBalance">Account Balance ($):</label>
          <input
            type="number"
            id="accountBalance"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="riskPercentage">Risk Percentage (%):</label>
          <input
            type="number"
            id="riskPercentage"
            value={riskPercentage}
            onChange={(e) => setRiskPercentage(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="stopLoss">Stop Loss (Pips):</label>
          <input
            type="number"
            id="stopLoss"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="margin">Margin Required ($):</label>
          <input
            type="number"
            id="margin"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label>Position Size (Lots):</label>
          <input
            type="text"
            value={positionSize}
            readOnly
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label>Lots:</label>
          <input
            type="text"
            value={lots}
            readOnly
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>
      <button
        onClick={calculatePositionSize}
        className="bg-green-500 text-white p-2 rounded-md mt-4"
      >
        Calculate
      </button>
    </div>
  );
}

export default ForexCalculator;
