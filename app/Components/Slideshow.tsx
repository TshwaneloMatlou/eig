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
  const [isEnlarged, setIsEnlarged] = useState(false);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <div className="relative h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleEnlarged}
        >
          <div className={`${isEnlarged ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
            <div className="flex justify-center items-center h-full bg-black py-5">
              <div
                className="w-full max-w-screen-xl max-h-screen mx-auto overflow-hidden"
                onClick={toggleEnlarged}
              >
                <Image src={image.src} alt={image.alt} layout="responsive" height={1917} width={881} objectFit="contain" />
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
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
