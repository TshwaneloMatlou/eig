'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define your custom Lightbox component here (use the provided code or create your own)

export default function Page({ params }: { params: { id: string } }) {
  const data = require('../../data/chartData2.json');
  const [filterId, setFilterId] = useState(params.id);
  const [filteredData, setFilteredData] = useState(data.charts);
  const [filteredLiData, setFilteredLiData] = useState(data.charts);
  const [lightboxImage, setLightboxImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);


  const handleFilter = () => {
    const idToFilter = parseInt(filterId, 10);
    const filtered = data.charts.filter((chart: any) => {
      return chart.id === idToFilter;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [filterId]);

  useEffect(() => {
    if (selectedMonth) {
      const filteredByMonth = data.charts.filter((chart: any) => {
        // Assuming the date format is "YYYY/MM"
        return chart.date.startsWith(selectedMonth);
      });
      setFilteredLiData(filteredByMonth);
    } else {
      setFilteredLiData(data.charts);
    }
  }, [selectedMonth]);

  useEffect(() => {
    const currentMonth = findCurrentMonth(data.charts);
    setSelectedMonth(currentMonth);
  }, []);
  

  // Function to open the lightbox
  const openLightbox = (image: string) => {
    setLightboxImage(image);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxImage('');
    setIsZoomed(false); // Reset zoom state
  };

  // Function to handle zoom in
  const handleZoomIn = () => {
    setIsZoomed(true);
  };

  // Function to handle zoom out
  const handleZoomOut = () => {
    setIsZoomed(false);
  };

  const resetZoom = () => {
    // Implement the logic to reset the image zoom here
    setZoomLevel(100); // Example: You may want to set the zoom level back to 100
  };

  return (
    <div className="mx-3 p-3 mt-32">
      <input
        type="text"
        placeholder="Enter ID"
        className="border border-gray-300 rounded-md p-2 mr-2"
        value={filterId}
        onChange={(e) => setFilterId(e.target.value)}
        hidden
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
        {filteredData.map((chart: any) => (
          <div
            className="p-4 border-2 my-2 mx-auto h-[885px] shadow-lg shadow-green-500 rounded-lg"
            key={chart.id}
          >
            <h1 className="text-red-500 bg-white text-center italic font-bold text-lg underline rounded-md">
              [{chart.id}] - {chart.pair}
            </h1>
            <p className="font-semibold whitespace-pre-line my-5 p-5 shadow-md shadow-blue-500">
              {chart.description}
            </p>
            <p className="font-semibold my-5">
              Chart Code: <br /> {chart.chartCode}
            </p>
            <p className="font-semibold mb-5">Date: <br /> {chart.date}</p>
            <p className="font-semibold mb-5">Updated: {chart.updated}</p>

            <div className='bg-blue-300 px-2 py-2 rounded-xl'>
            <label className='font-semibold'>Select Month: </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className='px-3 mx-2 rounded-xl'
            >
              <option value={currentMonth}>Current Month</option>
              <option value="">All Months</option>
              {getUniqueMonths(data.charts).map((month: any) => (
                <option key={month} value={month}>
                  {formatMonth(month)}
                </option>
              ))}
            </select>
            </div>


             {/* Add a section to display a list of all available charts */}
            <div className='bg-gray-200 pb-6 pl-2 mt-5 rounded-xl h-[255px] overflow-y-auto'>
            <h2 className="text-xl text-center font-bold my-3 underline">Available Charts</h2>
            <ul>
              {filteredLiData.map((chart: any) => (
                <li key={chart.id}>
                  <Link href={`/ChartDetails/${chart.id}`}>
                    <p className='bg-green-50 hover:bg-blue-200 my-4 rounded-xl mr-2 pl-5'>* {chart.chartCode} *</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 rounded-lg col-span-2 p-2">
          <div>
            {filteredData.map((chart: any) => (
              <div
                key={chart.id}
                className="text-white p-2 rounded-md font-bold"
              >
                <h1 className="text-red-500 bg-black text-center italic font-bold text-lg underline rounded-xl p-2">
                 [{chart.id}] - {chart.pair}
                </h1>
                  <div>
                    <ChartGallery
                      chartData={chart}
                      openLightbox={openLightbox}
                    />
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
          isZoomed={isZoomed}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={resetZoom}
        />
      )}
    </div>
  );
}

    function findCurrentMonth(charts: any) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');

      for (const chart of charts) {
        const chartYear = chart.date.split('/')[0];
        const chartMonth = chart.date.split('/')[1];

        if (chartYear === currentYear && chartMonth === currentMonth) {
          return `${chartYear}/${chartMonth}`;
        }
      }

      return `${currentYear}/${currentMonth}`;
    }


    // Function to get unique months from your data
    function getUniqueMonths(charts: any) {
      const uniqueMonths = new Set();
      charts.forEach((chart: any) => {
        const month = chart.date.split('/')[0] + '/' + chart.date.split('/')[1];
        uniqueMonths.add(month);
      });
      return Array.from(uniqueMonths);
    }

    // Function to format the month for display (e.g., from "YYYY/MM" to "Month YYYY")
    function formatMonth(month: any) {
      const [year, monthNumber] = month.split('/');
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${monthNames[parseInt(monthNumber, 10) - 1]} ${year}`;
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
        <div className="shadow-md shadow-red-500 p-2 m-5 rounded">
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
              width={isZoomed ? 1200 : 500}
              height={isZoomed ? 600 : 300}
              onClick={() => (isZoomed ? onZoomOut() : onZoomIn())}
            />
          </div>
        </div>
      );
    }