import React from 'react'
import Trades from './Trades'
import UsdCorrelation from './UsdCorrelation'
/** import TradeChartsCards from './TradeChartsCards' */


const ChartSearch = () => {
  return (
    <div>
      <div className="px-4 md:px-6 lg:px-8 mx-5 mt-36">
      <h2 className="text-center font-semibold bg-green-300 mb-5 rounded-3xl border-2 border-red-500 ">Trades</h2>
      <Trades />

     
      {/** <TradeChartsCards /> */}

      <h2 className="text-center font-semibold bg-green-300 mb-5 rounded-3xl border-2 border-red-500 ">Currency Correlation</h2>
      <UsdCorrelation />
      
      </div>
    </div>
  )
}

export default ChartSearch;