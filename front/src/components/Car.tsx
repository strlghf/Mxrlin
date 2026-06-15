import { useState, useEffect } from "react";
import kali from "../img/kali.png"
import kl from "../img/kl.jpg"
import nvidia from "../img/geforce.jpeg"

const BANNERS = [
  { id: 1, image: kali, alt: "Día del padre - Moda" },
  { id: 2, image: kl, alt: "Hardware de última generación" },
  { id: 3, image: nvidia, alt: "Descuentos Gaming" }
];

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? BANNERS.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === BANNERS.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={prevSlide} aria-label="Anterior banner">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div className="carousel-slide" key={banner.id}>
            <img src={banner.image} alt={banner.alt} className="carousel-image" />
          </div>
        ))}
      </div>

      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Siguiente banner">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      <div className="carousel-dots">
        {BANNERS.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};