import React, { useState } from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
}

interface SlideshowProps {
  images: ImageProps[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const zoomOut = () => {
    setZoomLevel(1); // Reset zoom level to 1
  };

  return (
    <div className="relative h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-screen-xl max-h-screen mx-auto overflow-hidden">
              <div style={{ transform: `scale(${zoomLevel})` }}>
                <div className="overflow-auto" style={{ width: '100%', height: '100%' }}>
                  <Image src={image.src} alt={image.alt} layout="responsive" height={1917} width={881} objectFit="contain" />
                </div>
              </div>
            </div>
          </div>
          {/* Left button */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full focus:outline-none"
            onClick={goToPrevSlide}
          >
            &lt;
          </button>
          {/* Right button */}
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full focus:outline-none"
            onClick={goToNextSlide}
          >
            &gt;
          </button>
          {/* Zoom in button */}
          <button
            className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full focus:outline-none"
            onClick={zoomIn}
          >
            +
          </button>
          {/* Reset zoom button */}
          <button
            className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full focus:outline-none"
            onClick={zoomOut}
          >
            Reset
          </button>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
