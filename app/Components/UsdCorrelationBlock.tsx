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
  const maxZoomLevel = 2; // Define maximum zoom level
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStartX, setPanStartX] = useState(0);
  const [panStartY, setPanStartY] = useState(0);

  const handleImageClick = () => {
    if (zoomLevel < maxZoomLevel) {
      setZoomLevel(zoomLevel + 0.1); // Increment zoom level
    }
  };

  const reset = () => {
    setZoomLevel(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPanning(true);
    setPanStartX(e.clientX);
    setPanStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const deltaX = e.clientX - panStartX;
    const deltaY = e.clientY - panStartY;
    setOffsetX(offsetX + deltaX);
    setOffsetY(offsetY + deltaY);
    setPanStartX(e.clientX);
    setPanStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`border border-gray-300 shadow-md rounded-md overflow-hidden mx-2 my-2 py-8 ${
        selected ? 'bg-gray-200' : 'hover:bg-gray-200'
      }`}
      style={{ minWidth: '300px', position: 'relative', overflow: 'hidden', cursor: 'grab' }}
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
            transform: `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)`,
            transformOrigin: 'top left',
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
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <button className="bg-red-300 p-1 text-black rounded-2xl " onClick={reset}>
          <FontAwesomeIcon icon={faSync} />
        </button>
      </div>
    </div>
  );
};

export default UsdCorrelationBlock;
