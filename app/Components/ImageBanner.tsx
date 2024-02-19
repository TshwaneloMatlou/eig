import React, { useState } from 'react';
import TradeCard from './TradeCard';

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

const ImageBanner: React.FC<ImageBannerProps> = ({ filteredData, selectedRow, handleRowClick }) => {
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

  return (
    <div className="image-banner" onClick={() => openLightbox(0)}>
      <img
        src={`/trades/${filteredData[selectedImageIndex].weeklyImages}`}
        alt="Banner Image"
        width={1917}
        height={881}
        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
      />
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="slideshow-prev" onClick={goToPrevSlide}>
            &lt;
          </button>
          <div className="lightbox">
            <img
              src={`/trades/${filteredData[selectedImageIndex].weeklyImages}`}
              alt="Lightbox Image"
              width={1917}
              height={881}
            />
          </div>
          <button className="slideshow-next" onClick={goToNextSlide}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageBanner;
