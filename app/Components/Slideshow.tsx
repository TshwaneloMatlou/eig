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
  const [clickedPoint, setClickedPoint] = useState<{ x: number; y: number } | null>(null);

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

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    const imageWidth = boundingRect.width;
    const imageHeight = boundingRect.height;

    // Calculate the new zoom level
    const newZoomLevel = zoomLevel * 2; // Zoom in by a factor of 2

    // Calculate the new position of the clicked point relative to the image
    const newClickedPointX = offsetX / newZoomLevel;
    const newClickedPointY = offsetY / newZoomLevel;

    // Calculate the translation needed to keep the clicked point at the same position on the screen
    const translateX = (imageWidth / 2 - newClickedPointX) * (newZoomLevel - zoomLevel);
    const translateY = (imageHeight / 2 - newClickedPointY) * (newZoomLevel - zoomLevel);

    setZoomLevel(newZoomLevel);
    setClickedPoint({ x: newClickedPointX, y: newClickedPointY });

    // Apply transformations
    event.currentTarget.style.transform = `scale(${newZoomLevel}) translate(${translateX}px, ${translateY}px)`;
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
          <div className="border border-red-500 relative flex justify-center items-center py-5">
            <div className="w-full max-w-screen-xl max-h-screen mx-auto overflow-hidden">
              <div className="overflow-hidden" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="responsive"
                  height={1917}
                  width={881}
                  objectFit="contain"
                  onClick={handleImageClick}
                  style={{ cursor: 'zoom-in', transform: `scale(${zoomLevel})` }} // Add zoom level here
                />
              </div>
            </div>
          
            {/* Left button */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-1 py-1 rounded-full focus:outline-none m-0"
              onClick={goToPrevSlide}
            >
              &lt;
            </button>
            {/* Right button */}
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-1 py-1 rounded-full focus:outline-none m-0"
              onClick={goToNextSlide}
            >
              &gt;
            </button>
            {/* Reset zoom button */}
            <button
              className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 mx-8 rounded-full focus:outline-none m-0"
              onClick={zoomOut}
            >
              Reset
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
