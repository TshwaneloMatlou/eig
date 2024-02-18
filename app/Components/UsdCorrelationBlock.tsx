import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// Import the Lightbox component
function Lightbox({
  image,
  onClose,
  isZoomed,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: {
  image: string;
  onClose: () => void;
  isZoomed: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}) {
  return (
    <div className="lightbox flex flex-col items-center">
      <button
        className="lightbox-button text-2xl absolute right-3 top-3"
        onClick={onClose}
      >
        &times;
      </button>
      <div
        className={`lightbox-image-container ${isZoomed ? 'zoomed' : ''}`}
      >
        <Image
          src={`/trades/${image}`}
          alt="Lightbox Image"
          width={isZoomed ? 1917 : 881}
          height={isZoomed ? 600 : 300}
          onClick={() => (isZoomed ? onZoomOut() : onZoomIn())}
        />
      </div>
    </div>
  );
}

interface UsdCorrelationBlockProps {
  chart: any;
  selected: boolean;
  onClick: () => void;
}

const UsdCorrelationBlock: React.FC<UsdCorrelationBlockProps> = ({ chart, selected, onClick }) => {
  // State to manage the lightbox
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className={`border border-gray-300 shadow-md rounded-md overflow-hidden mx-2 my-2 py-8 ${selected ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
      <div className="p-4 relative">
        <div className="bg-black font-bold text-center text-white rounded-2xl">{chart.id} - {chart.pair}</div>
        <p className='text-center'>{chart.date}</p>
        <p className='text-center whitespace-pre-line'>{chart.description}</p>
        <div>
          {/* Render the image */}
          <Image
            src={`/trades/${chart.weeklyImages}`}
            alt="Weekly Chart"
            className={`mt-2 w-full h-full object-cover shadow-lg shadow-green-300 cursor-pointer ${isEnlarged ? 'cursor-auto' : ''}`}
            height={1917}
            width={881}
            onClick={toggleEnlarged}
          />
          {/* Render the Lightbox if enlarged */}
          {isEnlarged && (
            <Lightbox
              image={chart.weeklyImages}
              onClose={toggleEnlarged}
              isZoomed={isZoomed}
              onZoomIn={toggleZoom}
              onZoomOut={toggleZoom}
              onResetZoom={() => setIsZoomed(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsdCorrelationBlock;
