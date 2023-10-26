'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define your custom Lightbox component here (use the provided code or create your own)

export default function Page({ params }: { params: { id: string } }) {
  const data = require('../../data/chartData.json');
  const [filterId, setFilterId] = useState(params.id);
  const [filteredData, setFilteredData] = useState(data.charts);
  const [lightboxImage, setLightboxImage] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleFilter = () => {
    const idToFilter = parseInt(filterId, 10);
    const filtered = data.charts.filter((chart: any) => {
      return chart.id === idToFilter;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [filterId, data.charts]);

  // Function to open the lightbox
  const openLightbox = (image: string) => {
    setLightboxImage(image);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxImage('');
  };

  // Function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(Math.min(200, zoomLevel + 10)); // Adjust the max zoom level as needed
  };

  // Function to handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(Math.max(100, zoomLevel - 10)); // Adjust the min zoom level as needed
  };

  return (
    <div className="m-3 p-3">
      <input
        type="text"
        placeholder="Enter ID"
        className="border border-gray-300 rounded-md p-2 mr-2"
        value={filterId}
        onChange={(e) => setFilterId(e.target.value)}
        hidden
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
        {filteredData.map((chart: any) => (
          <div
            className="p-4 border-2 my-2 mx-auto h-[410px] shadow-lg shadow-green-500 rounded-lg"
            key={chart.id}
          >
            <h1 className="text-red-500 bg-white text-center italic font-bold text-lg underline rounded-md">
              [{chart.id}] - {chart.pair}
            </h1>
            <p className="font-semibold mt-5">
              Chart Code: <br /> {chart.chartCode}
            </p>
            <p className="font-semibold whitespace-pre-line my-5 p-5 shadow-md shadow-blue-500">
              {chart.description}
            </p>
            <p className="font-semibold mb-5">Date: <br /> {chart.date}</p>
            <p className="font-semibold mb-5">Updated: {chart.updated}</p>
          </div>
        ))}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 rounded-lg col-span-3 p-3">
          <div>
            {filteredData.map((chart: any) => (
              <div
                key={chart.id}
                className="bg-green-400 text-white p-2 rounded-md font-bold"
              >
                <h1 className="text-red-500 bg-white text-center italic font-bold text-lg underline rounded-md">
                  {chart.pair}
                </h1>

                <div>
                  <div>
                    <div className="rounded-lg my-2">
                      <div className="relative">
                        <Link href={'/Charts'}>
                          <Image
                            src="/eig_logo.jpg"
                            alt="Logo"
                            className="rounded-lg fill cover mx-auto"
                            width={350}
                            height={300}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div>
                    <ChartGallery
                      chartData={chart}
                      openLightbox={openLightbox}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={closeLightbox}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      )}
    </div>
  );
}

    // Define a ChartGallery component to display weekly, daily, and other charts
    function ChartGallery({ chartData, openLightbox }: any) {
      return (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          
          <ChartTypeGallery
            chartType="Weekly Charts"
            images={chartData.weeklyImages}
            description={chartData.weeklyDescription}
            openLightbox={openLightbox}
          />
          <ChartTypeGallery
            chartType="Daily Charts"
            images={chartData.dailyImages}
            description={chartData.dailyDescription}
            openLightbox={openLightbox}
          />
          <ChartTypeGallery
            chartType="4 Hours Charts"
            images={chartData.hours4Images}
            description={chartData.hours4Description}
            openLightbox={openLightbox}
          />
          <ChartTypeGallery
            chartType="1 Hour Charts"
            images={chartData.hour1Images}
            description={chartData.hour1Description}
            openLightbox={openLightbox}
          />
          <ChartTypeGallery
            chartType="30 Minutes Charts"
            images={chartData.minutes30Images}
            description={chartData.minutes30Description}
            openLightbox={openLightbox}
          />
          <ChartTypeGallery
            chartType="15 Minutes Charts"
            images={chartData.minutes15Images}
            description={chartData.minutes15Description}
            openLightbox={openLightbox}
          />
        </div>
      );
    }

    // Define a component to display a specific chart type with images and descriptions
    function ChartTypeGallery({ chartType, images, description, openLightbox }: any) {
      return (
        <div className="shadow shadow-red-500 p-2 m-1 rounded">
          <p className="bg-blue-800 p-2 my-2 rounded-lg text-center">{chartType}</p>
          <div className="grid grid-cols-3 gap-3 p-2 h-[170px] max-h-[170px] overflow-y-auto bg-black rounded-lg">
            {images.map((image: string, imageIndex: number) => (
              <div key={imageIndex} className="relative">
                <Image
                  src={`/trades/${image}`}
                  alt={`Image ${imageIndex + 1}`}
                  className="rounded-lg fill cover cursor-pointer"
                  width={500}
                  height={300}
                  onClick={() => openLightbox(image)}
                />
              </div>
            ))}
          </div>
          <div className="bg-gray-900 p-2 my-2 rounded-lg text-center">
            <p className="m-2 font-extrabold underline">Chart Description:</p>
            <p className="bg-white text-black">{description}</p>
          </div>
        </div>
      );
    }

    // Custom Lightbox component (you can use the one you created)
    function Lightbox({ image, onClose, zoomLevel, onZoomIn, onZoomOut }: any) {
      return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center">
          <div className="lightbox-container">
            <Image
              src={`/trades/${image}`}
              alt="Lightbox Image"
              width={zoomLevel * 8}
              height={zoomLevel * 8}
              className="rounded-lg max-w-full max-h-full cursor-pointer"
              onClick={onClose}
            />
            <div className="zoom-buttons text-center">
              <button className='px-8 m-5 font-extrabold rounded-lg bg-green-500' onClick={onZoomIn}> + </button>
              <button className='px-8 m-5 font-extrabold rounded-lg bg-green-500' onClick={onZoomOut}> - </button>
            </div>
          </div>
        </div>
      );
    }