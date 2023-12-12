import React, { useEffect, useRef } from "react";
import { Carousel } from 'react-bootstrap';
import Banner1 from "./../Banner1.jpg";
import Banner3 from "./../Banner3.jpg";
import Banner5 from './../Banner5.jpg';
import Banner6 from './../Banner6.jpg';
import Banner7 from './../Banner7.jpg';
import "./BannersImage.css";

function Banners() {
  const slides = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (slides.current) {
        slides.current.next();
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="full-screen-carousel">
    <Carousel id="images-slides" ref={slides}>
      <Carousel.Item>
        <img className=" first" src={Banner1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" third" src={Banner3} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner5} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner6} alt="Fourth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner7} alt="Five slide" />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Banners;
