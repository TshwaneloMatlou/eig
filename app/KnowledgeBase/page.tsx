import React from 'react';
import Image from 'next/image';

const KnowledgeBase = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Forex Market Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Basic Terms</h2>
          <ul className="list-disc ml-4">
            <li>
              <li><strong>Lot:</strong> A standard unit for measuring the quantity of a currency.</li>
            </li>
            <li>
              <strong>Lot Size:</strong> The volume of a single lot, typically 100,000 units.
            </li>
            <li>
              <li><strong>Points:</strong> Also known as (pipettes,&apos;) the smallest price move in the forex market.</li>
            </li>
            <li>
              <strong>Pips:</strong> A unit of measurement representing the change in value between two currencies.
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Trading</h2>
          <ul className="list-disc ml-4">
            <li>
              <strong>Leverage:</strong> Borrowed funds used to amplify potential returns (e.g., 1:100 leverage).
            </li>
            <li>
              <strong>Margin:</strong> The collateral required to open and maintain a trading position.
            </li>
            <li>
              <strong>Equity:</strong> The current account balance, including the open trades profits or losses.
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Balances</h2>
          <ul className="list-disc ml-4">
            <li>
              <strong>Balance:</strong> The initial deposit amount in your trading account.
            </li>
            <li>
              <strong>Free Margin:</strong> The amount of funds available for new trades.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
      <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Additional Forex Terms</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Trading Strategies</h2>
          <ul className="list-disc ml-4">
            <li><span className="font-semibold">Day Trading:</span> Buying and selling currencies within the same trading day.</li>
            <li><span className="font-semibold">Swing Trading:</span> A medium-term trading strategy that aims to capture price swings within a trend.</li>
            <li><span className="font-semibold">Position Trading:</span> A long-term trading strategy that holds positions for extended periods.</li>
            <li><span className="font-semibold">Scalping:</span> A short-term trading strategy that aims to profit from small price movements.</li>
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Risk and Analysis</h2>
          <ul className="list-disc ml-4">
            <li><span className="font-semibold">Risk-Reward Ratio:</span> The ratio of potential profit to potential loss in a trade.</li>
            <li><span className="font-semibold">Currency Risk:</span> The potential for losses due to fluctuations in exchange rates.</li>
            <li><span className="font-semibold">Drawdown:</span> The peak-to-trough decline during a specific trading period.</li>
            <li><span className="font-semibold">Pip Value:</span> The monetary value of a pip in a particular trade.</li>
            <li><span className="font-semibold">Spread:</span> The difference between the bid (selling) and ask (buying) prices.</li>
          </ul>
        </div>
        </div>

        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Technical Analysis</h2>
            <ul className="list-disc ml-4">
            <li><span className="font-semibold">Moving Average (MA):</span> A statistical calculation used to analyze trends in currency prices.</li>
            <li><span className="font-semibold">Relative Strength Index (RSI):</span> A momentum oscillator used to identify overbought or oversold conditions.</li>
            <li><span className="font-semibold">Fibonacci Retracement:</span> A tool used to identify potential support and resistance levels.</li>
            <li><span className="font-semibold">Order Book:</span> A real-time list of buy and sell orders for a particular currency pair.</li>
            <li><span className="font-semibold">Hedging:</span> A risk management strategy that involves taking offsetting positions to reduce risk.</li>
            </ul>
        </div>

        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Market Sentiment</h2>
            <ul className="list-disc ml-4">
            <li><span className="font-semibold">Overbought:</span> A condition where an asset&apos;s price has risen too high and may be due for a reversal.</li>
            <li><span className="font-semibold">Oversold:</span> A condition where an asset&apos;s price has fallen too low and may be due for a rebound.</li>
            <li><span className="font-semibold">Market Sentiment:</span> The overall attitude or outlook of traders and investors toward a particular currency pair.</li>
            </ul>
        </div>
        </div>
        
        </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Examples</h2>
        <p>
          Example 1: You buy 1 standard lot of EUR/USD at 1.2000, and it rises to 1.2050. You earn 50 pips.
        </p>
        <p>
          Example 2: With 1:100 leverage, you can control a $100,000 position with $1,000 in your account.
        </p>
      </div>

      <div className='bg-gray-100 grid gap-4 grid-cols-2 my-5'>
        <div className='grid gap-4 grid-cols-2 shadow-md shadow-blue-500 p-3 h-[350px] overflow-y-auto'>
          <h1 className='col-span-2 text-center shadow-md shadow-red-500'>Head & Shoulders Description</h1>
          <div>
            <Image
                src="/knowledgeBase/head-and-shoulders-before-inverse.PNG"
                alt="Head & Shoulders"
                width={450}
                height={450}
                className="mx-auto"
            />
          </div>
          <div>
            <Image
                src="/knowledgeBase/Head-and-Shoulders-Pattern-Inverted.PNG"
                alt="Head & Shoulders"
                width={450}
                height={450}
                className="mx-auto"
            />
          </div>
          <div>
            <Image
                src="/knowledgeBase/head-and-shoulders-before.PNG"
                alt="Head & Shoulders"
                width={450}
                height={450}
                className="mx-auto"
            />
          </div>
          <div>
            <Image
                src="/knowledgeBase/head-and-shoulders-inverse-before.PNG"
                alt="Head & Shoulders"
                width={450}
                height={450}
                className="mx-auto"
            />
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <h1 className='col-span-2 text-center'>Double Top Description</h1>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div className='grid grid-cols-2'>
          <h1 className='col-span-2 text-center'>Double Bottom Description</h1>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div className='grid grid-cols-2'>
          <h1 className='col-span-2 text-center'>Triple Top Description</h1>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div className='grid grid-cols-2'>
          <h1 className='col-span-2 text-center'>Triple Bottom Description</h1>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
