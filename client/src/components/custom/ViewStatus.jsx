import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";

const ViewStatus = ({ status, handleViewStatusClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(status);
    console.log(`http://localhost:8080/${status.media[currentIndex]?.url}`);
  }, [currentIndex, status]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === status.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? status.media.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black  bg-opacity-50 z-50 w-full h-full flex items-center justify-center">
      <div className="w-[80%] max-w-4xl h-[80%] rounded-lg shadow-lg p-3 bg-gray-900 " >
        <div className="flex justify-end">
        <FontAwesomeIcon className="text-pink text-lg" icon={faXmark} onClick={handleViewStatusClose}></FontAwesomeIcon>
        </div>
        
        <div className="carousel w-full h-full">
          {/* Indicators */}
          <ol className="carousel-indicators">
            {status.media.map((_, index) => (
              <li
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={index === currentIndex ? "active" : ""}
              ></li>
            ))}
          </ol>

          {/* Carousel Items */}
          <div className="carousel-inner">
            {status.media.map((med, index) => (
              <div
                key={index}
                className={`carousel-item ${index === currentIndex ? "active" : ""}`}
              >
                <img
                  className="d-block w-full h-auto object-cover"
                  src={`http://localhost:8080/${med.url}`}
                  alt={`media-${index}`}
                />
                <div className="relative bottom-0 text-pinkNew flex justify-center w-full h-full text-lg"><div>{med.caption}</div></div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <a
            className="carousel-control-prev"
            role="button"
            onClick={handlePrev}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            role="button"
            onClick={handleNext}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewStatus;
