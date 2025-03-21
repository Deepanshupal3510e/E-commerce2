import React, { useEffect, useState } from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slider1 from "../assets/sliderImages/slider1.jpg";
import slider2 from "../assets/sliderImages/slider2.jpg";
import slider3 from "../assets/sliderImages/slider3.jpg";
import slider4 from "../assets/sliderImages/slider4.jpg";
import slider5 from "../assets/sliderImages/slider5.jpg";
import mobile1 from "../assets/sliderImages/mobile1.jpg";
import mobile2 from "../assets/sliderImages/mobile2.jpg";
import mobile3 from "../assets/sliderImages/mobile3.jpg";
import mobile4 from "../assets/sliderImages/mobile4.jpg";
import useMobile from "../hooks/useMobile";

const Sliders = () => {
  const [ mobile ]= useMobile();

  const [images, setImages] = useState([]);

  useEffect(() => {
    if(mobile) {
        setImages([mobile1, mobile2, mobile3, mobile4]);
    } else {
        setImages([slider1, slider2, slider3, slider4, slider5]);
    }
  },[mobile]);

  return (
    <div className="slide-container h-[300px] z-50">
      <Zoom scale={0.5}>
        {images.map((each, index) => (
          <img
            className="h-[300px] z-50"
            key={index}
            style={{ width: "100%" }}
            src={each}
          />
        ))}
      </Zoom>
    </div>
  );
};

export default Sliders;
