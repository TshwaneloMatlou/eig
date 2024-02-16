import React from 'react'
import Trades from './Trades'
import UsdCorrelation from './UsdCorrelation'
import ChartBanner from './ChartBanner'
import EconomicCalendarWidget from './EconomicCalendarWidget'
import TradeReportCards from './TradeReportCards'
/** import TradeChartsCards from './TradeChartsCards' */


const ChartSearch = () => {
  return (
    <div>
      <div className="mt-28">
        <div className="py-5 mb-2 rounded-xl">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl m-2 font-semibold font-serif underline">Our Trading Analysis</h2>
            <p className="text-lg text-green-800 pb-16 shadow-xl">
              We strive to deliver top-quality analysis and highly profitable trade opportunities.
            </p>
          </div>
        </div>

        <h2 className="text-xl text-center font-extrabold rounded-3xl border-2 mt-8">Current Month Trades</h2>
        <TradeReportCards />
        
        <h2 className="text-xl text-center font-extrabold rounded-3xl border-2 mt-8">Economic Calender</h2>
        <EconomicCalendarWidget />

        <h2 className="text-xl text-center font-extrabold bg-green-300 rounded-3xl border-2 border-red-500 mt-4 ">Trades</h2>
        <Trades />

        <ChartBanner imageUrl="/Images/banner1.jpg" altText="Chart Banner" />

        {/** <TradeChartsCards /> */}

        <h2 className="text-xl text-center font-extrabold bg-green-300 mb-5 rounded-3xl border-2 border-red-500 ">Currency Pair Correlation</h2>
        <UsdCorrelation />
      
      </div>
    </div>
  )
}

export default ChartSearch;