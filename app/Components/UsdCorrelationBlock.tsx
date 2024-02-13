import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSync, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface UsdCorrelationBlockProps {
  chart: any;
  selected: boolean;
  onClick: () => void;
}

const UsdCorrelationBlock: React.FC<UsdCorrelationBlockProps> = ({ chart, selected, onClick }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  const handleImageClick = () => {
    setZoomLevel(zoomLevel === 1 ? 2 : 1);
  };

  const zoomOut = () => {
    // Adjusted zoom out increment value
    if (zoomLevel > 1.1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const zoomIn = () => {
    // Adjusted zoom in increment value
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const handlePan = (direction: 'left' | 'right') => {
    const step = 50; // Adjust the step value as needed
    const newOffsetX = direction === 'left' ? offsetX + step : offsetX - step;
    setOffsetX(newOffsetX);
  };

  const reset = () => {
    setZoomLevel(1);
    setOffsetX(0);
  };

  return (
    <div
      onClick={onClick}
      className={`border border-gray-300 shadow-md rounded-md overflow-hidden mx-2 my-2 ${
        selected ? 'bg-gray-200' : 'hover:bg-blue-200'
      }`}
      style={{ minWidth: '300px', position: 'relative', overflow: 'hidden' }}
    >
      <div className="p-4" style={{ position: 'relative' }}>
        <div className="bg-black font-bold text-center text-white rounded-2xl">{chart.id} - {chart.pair}</div>
        <p className='text-center'>{chart.date}</p>
        <p className='text-center whitespace-pre-line'>{chart.description}</p>
        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            transition: 'transform 0.3s ease',
          }}
        >
          <div
            style={{
              transform: `translateX(${offsetX}px)`,
              transition: 'transform 0.3s ease',
            }}
          >
            <Image
              src={`/trades/${chart.weeklyImages}`}
              alt="Weekly Chart"
              className="mt-2 w-full h-full object-cover shadow-lg shadow-green-300 cursor-pointer"
              height={1917}
              width={881}
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <button className="bg-red-300 p-1 text-black rounded-2xl " onClick={reset}>
          <FontAwesomeIcon icon={faSync} />
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: '50%', left: '10px' }}>
        <button className="bg-blue-300 p-1 text-black rounded-2xl " onClick={() => handlePan('left')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '25%', transform: 'translateX(-50%)' }}>
        <button className="bg-green-300 p-1 text-black rounded-2xl " onClick={zoomOut}>
          <FontAwesomeIcon icon={faSearchMinus} />
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '75%', transform: 'translateX(-50%)' }}>
        <button className="bg-green-300 p-1 text-black rounded-2xl " onClick={zoomIn}>
          <FontAwesomeIcon icon={faSearchPlus} />
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: '50%', right: '10px' }}>
        <button className="bg-blue-300 p-1 text-black rounded-2xl " onClick={() => handlePan('right')}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default UsdCorrelationBlock;
