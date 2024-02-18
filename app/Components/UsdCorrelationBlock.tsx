import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface UsdCorrelationBlockProps {
  chart: any;
  selected: boolean;
  onClick: () => void;
}

const UsdCorrelationBlock: React.FC<UsdCorrelationBlockProps> = ({ chart, selected, onClick }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <div className={`border border-gray-300 shadow-md rounded-md overflow-hidden mx-2 my-2 py-8 ${selected ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
      <div className="p-4 relative">
        <div className="bg-black font-bold text-center text-white rounded-2xl">{chart.id} - {chart.pair}</div>
        <p className='text-center'>{chart.date}</p>
        <p className='text-center whitespace-pre-line'>{chart.description}</p>
        <div>
          <Image
            src={`/trades/${chart.weeklyImages}`}
            alt="Weekly Chart"
            className={`mt-2 w-full h-full object-cover shadow-lg shadow-green-300 cursor-pointer ${isEnlarged ? 'cursor-auto' : ''}`}
            height={1917}
            width={881}
            onClick={isEnlarged ? undefined : toggleEnlarged}
          />
          {isEnlarged && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={toggleEnlarged}
            >
              <Image
                src={`/trades/${chart.weeklyImages}`}
                alt="Weekly Chart"
                className="max-h-screen max-w-screen cursor-pointer"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <button className="bg-red-300 p-1 text-black rounded-2xl " onClick={onClick}>
          <FontAwesomeIcon icon={faSync} />
        </button>
      </div>
    </div>
  );
};

export default UsdCorrelationBlock;
