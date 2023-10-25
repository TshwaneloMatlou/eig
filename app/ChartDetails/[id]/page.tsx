'use client'
import React, { useState, useEffect,  } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'react-image-lightbox/style.css';

export default function Page({ params }: { params: { id: string } }) {
  const data = require('../../data/chartData.json');
  const [filterId, setFilterId] = useState(params.id);
  const [filteredData, setFilteredData] = useState(data.charts);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  useEffect(() => {
    const handleFilter = () => {
      const idToFilter = parseInt(filterId, 10);
      const filtered = data.charts.filter((chart: any) => {
        return chart.id === idToFilter;
      });
      setFilteredData(filtered);
    };
    
    handleFilter();
  }, [filterId, data.charts]);
  
  

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
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
            <h1 className='text-red-500 bg-white text-center italic font-bold text-lg underline rounded-md'>
              [{chart.id}] - {chart.pair}
            </h1>
            <p className="font-semibold mt-5">Chart Code: <br /> {chart.chartCode}</p>   
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
                <h1 className='text-red-500 bg-white text-center italic font-bold text-lg underline rounded-md'>{chart.pair}</h1>

                <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                  
                  <div>
                    <div className="rounded-lg my-2 ">
                        <div className="relative">
                          <Link href={'/Charts'}>
                            <Image
                              src= "/eig_logo.jpg"
                              alt= "Logo"
                              className="rounded-lg fill cover mx-auto"
                              width={350}
                              height={300}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className='shadow shadow-red-500  p-2 m-1 rounded'>
                        <p className='bg-blue-800 p-2 my-2 rounded-lg text-center'>
                          Weekly Charts:
                        </p>
                      <div className="grid grid-cols-3 gap-3 p-2 h-[170px] max-h-[170px] overflow-y-auto bg-black rounded-lg">
                        {chart.weeklyImages.map((image: string, imageIndex: number) => (
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
                        <div className='bg-gray-900 p-2 my-2 rounded-lg text-center'> 
                          <p className='m-2 font-extrabold underline'>Chart Description:</p> 
                          <p className='bg-white text-black'>{chart.weeklyDescription}</p>
                        </div>
                    </div>

                    <div className='shadow shadow-red-500  p-2 m-1 rounded'>
                        <p className='bg-blue-800 p-2 my-2 rounded-lg text-center'>
                          Daily Charts:
                        </p>
                      <div className="grid grid-cols-3 gap-3 p-2 h-[170px] max-h-[170px] overflow-y-auto bg-black rounded-lg">
                        {chart.dailyImages.map((image: string, imageIndex: number) => (
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
                        <div className='bg-gray-900 p-2 my-2 rounded-lg text-center'> 
                          <p className='m-2 font-extrabold underline'>Chart Description:</p> 
                          <p className='bg-white text-black'>{chart.dailyDescription}</p>
                        </div>
                    </div>

                    <div className='shadow shadow-red-500  p-2 m-1 rounded'>
                        <p className='bg-blue-800 p-2 my-2 rounded-lg text-center'>
                          4 Hours Charts:
                        </p>
                      <div className="grid grid-cols-3 gap-3 p-2 h-[170px] max-h-[170px] overflow-y-auto bg-black rounded-lg">
                        {chart.hours4Images.map((image: string, imageIndex: number) => (
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
                        <div className='bg-gray-900 p-2 my-2 rounded-lg text-center'> 
                          <p className='m-2 font-extrabold underline'>Chart Description:</p> 
                          <p className='bg-white text-black'>{chart.hours4Description}</p>
                        </div>
                    </div>

                    <div className='shadow shadow-red-500  p-2 m-1 rounded'>
                        <p className='bg-blue-800 p-2 my-2 rounded-lg text-center'>
                          1 Hour Charts:
                        </p>
                      <div className="grid grid-cols-3 gap-3 p-2 h-[170px] max-h-[170px] overflow-y-auto bg-black rounded-lg">
                        {chart.hour1Images.map((image: string, imageIndex: number) => (
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
                        <div className='bg-gray-900 p-2 my-2 rounded-lg text-center'> 
                          <p className='m-2 font-extrabold underline'>Chart Description:</p> 
                          <p className='bg-white text-black'>{chart.hour1Description}</p>
                        </div>
                    </div>

                    <div className='shadow shadow-red-500  p-2 m-1 rounded'>
                        <p className='bg-blue-800 p-2 my-2 rounded-lg text-center'>
                          30 Minutes Charts:
                        </p>
                        <div className="grid grid-cols-3 gap-3 p-2 h-[170px] max-h-[170px] overflow-y-auto bg-black rounded-lg">
                        {chart.minutes30Images.map((image: string, imageIndex: number) => (
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
                        <div className='bg-gray-900 p-2 my-2 rounded-lg text-center'> 
                          <p className='m-2 font-extrabold underline'>Chart Description:</p> 
                          <p className='bg-white text-black'>{chart.minutes30Description}</p>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center">
          <Image
            src={`/trades/${lightboxImage}`}
            alt="Lightbox Image"
            width={800}
            height={800}
            className="rounded-lg max-w-full max-h-full cursor-pointer"
            onClick={closeLightbox}
          />
        </div>
      )}
    </div>
  );
}
