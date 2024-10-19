import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import s1 from '../assets/s1.jpg';
import s2 from '../assets/s2.jpg';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [s1, s2];

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
    <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] overflow-hidden shadow-xl">
      {/* Carousel Image */}
      <img
        src={banners[currentSlide]}
        alt={`Banner ${currentSlide + 1}`}
        className="w-full h-full  transition-all duration-700 ease-in-out transform hover:scale-105"
      />

      {/* Left Arrow */}
      <button
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border border-gray-300 p-2 md:p-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        onClick={() =>
          setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1)
        }
      >
        <IoIosArrowBack className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border border-gray-300 p-2 md:p-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        onClick={() =>
          setCurrentSlide(currentSlide === banners.length - 1 ? 0 : currentSlide + 1)
        }
      >
        <IoIosArrowForward className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer ${
              currentSlide === index ? 'bg-white' : 'bg-gray-500'
            } transition duration-300`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-center">
        <h2 className="text-lg md:text-xl font-semibold">
          Banner {currentSlide + 1}
        </h2>
        <p className="text-sm md:text-base">
          This is a description for Slide {currentSlide + 1}.
        </p>
      </div>
    </div>
  );
};

export default BannerCarousel;
