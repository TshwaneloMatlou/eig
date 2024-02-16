import React from 'react';

const TradeReportCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-3 p-8 shadow-lg shadow-gray-500 ">
      <div className="rounded shadow-lg shadow-green-300">
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">Amount of Trades taken</div>
          <p className="text-red-500 text-3xl text-right font-extrabold underline rounded-xl bg-gray-100 p-2 pl-10 ">
            100
          </p>
        </div>
      </div>
      <div className="rounded shadow-lg shadow-green-300">
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">Trades Won</div>
          <p className="text-red-500 text-3xl text-right font-extrabold underline rounded-xl bg-gray-100 p-2 pl-10 ">
            75
          </p>
        </div>
      </div>
      <div className="rounded shadow-lg shadow-green-300">
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">Trades Lost</div>
          <p className="text-red-500 text-3xl text-right font-extrabold underline rounded-xl bg-gray-100 p-2 pl-10 ">
            25
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeReportCards;
