import React, { useState } from 'react';

interface ChartData {
  id: string;
  weeklyImages: string; // Assuming this is the property you want to access
  // Add other properties here based on the structure of your data
}

interface ImageBannerProps {
  filteredData: ChartData[];
  selectedRow: string | null;
  handleRowClick: (id: string) => void;
}

const ImageBanner4hr: React.FC<ImageBannerProps> = ({ filteredData, selectedRow, handleRowClick }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextSlide = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === filteredData.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1));
  };

  const Lightbox = () => (
    <div className="lightbox flex flex-col items-center">
      <button className="lightbox-button text-2xl absolute right-3 top-3" onClick={closeLightbox}>
        &times;
      </button>
      <div className={`lightbox-image-container`}>
        <img
          src={`/trades/${filteredData[selectedImageIndex].weeklyImages}`}
          alt="Lightbox Image"
          width={1917}
          height={881}
        />
      </div>
    </div>
  );

  return (
    <div className="image-banner">
        <h2 className="text-xl text-center font-extrabold rounded-3xl border-2 mt-8">Weekly Open Price - 4 Hour Charts</h2>
      <img
        src={`/trades/${filteredData[selectedImageIndex].weeklyImages}`}
        alt="Banner Image"
        width={1917}
        height={881}
        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
        onClick={() => openLightbox(selectedImageIndex)}
      />
      {lightboxOpen && <Lightbox />}
    </div>
  );
};

export default ImageBanner4hr;
