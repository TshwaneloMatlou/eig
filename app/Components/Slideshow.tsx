import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]); // Re-run effect when currentIndex changes

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
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
            <div className="flex justify-center items-center h-full bg-black p-5">
              <div
                className="w-full max-w-screen-xl max-h-screen mx-auto overflow-hidden"
                onClick={toggleEnlarged}
              >
                <Image src={image.src} alt={image.alt} layout="responsive" height={1917} width={881} objectFit="contain" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
