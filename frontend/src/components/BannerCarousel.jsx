import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of banner images
  const banners = [
    'https://via.placeholder.com/800x300/FF5733/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/800x300/33FF57/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/800x300/3357FF/FFFFFF?text=Slide+3',
  ];

  // Auto-switch slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === banners.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[48vh] overflow-hidden shadow-xl">
      {/* Carousel Image */}
      <img
        src={banners[currentSlide]}
        alt={`Banner ${currentSlide + 1}`}
        className="w-full h-full object-center object-cover transition-all duration-700 ease-in-out transform scale-100 hover:scale-105"
      />

      {/* Left Arrow */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        onClick={() => 
          setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1)
        }
      >
        <IoIosArrowBack />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        onClick={() => 
          setCurrentSlide(currentSlide === banners.length - 1 ? 0 : currentSlide + 1)
        }
      >
        <IoIosArrowForward />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-gray-500'} transition duration-300`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-center">
        <h2 className="text-xl font-semibold">Banner {currentSlide + 1}</h2>
        <p className="text-sm">This is a description for Slide {currentSlide + 1}.</p>
      </div>
    </div>
  );
};

export default BannerCarousel;
