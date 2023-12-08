import React, { useEffect, useRef } from "react";
import { Carousel } from 'react-bootstrap';
import Banner1 from "./../Banner1.jpg";
import Banner2 from "./../Banner 2.jpg";
import Banner3 from "./../Banner3.jpg";
import Banner4 from './../Banner4.jpg';
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
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Carousel id="images-slides" ref={slides}>
      <Carousel.Item>
        <img className=" first" src={Banner1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" second" src={Banner2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" third" src={Banner3} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner4} alt="Fourth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner5} alt="five slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner6} alt="Six slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className=" fourth" src={Banner7} alt="Seven slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banners;
