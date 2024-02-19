// TradeCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TradeCardProps {
  chart: any;
  selected: boolean;
  onClick: () => void;
}

const TradeCard: React.FC<TradeCardProps> = ({ chart, selected, onClick }) => {
  return (
    <Link href={`/ChartDetails/${chart.id}`} className="block">
    <div
      onClick={onClick}
      className={`border border-gray-300 shadow-md rounded-md overflow-hidden mx-2 my-2 ${
        selected ? 'bg-gray-200' : 'hover:bg-blue-200'
      }`}
      style={{ minWidth: '300px' }}
    >
      <div className="p-4">
        <div className="bg-black font-bold text-center text-white rounded-2xl">{chart.id} - {chart.pair}</div>
        <p className='text-center'>{chart.date}</p>
        <p className='font-semibold text-center'>{chart.direction}</p>
        <Image 
          src={`/trades/${chart.weeklyImages}`}
          alt="Weekly Chart" 
          className="mt-2 w-full h-32 object-cover shadow-lg shadow-green-300" 
          height={150} 
          width={150}
        />
        <p className='mt-5 whitespace-pre-line'>{chart.description}</p>
        {/* ... (add other card content) */}
      </div>
    </div>
    </Link>
  );
};

export default TradeCard; 
