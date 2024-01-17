import React, { useState } from "react";
import Slider from "react-slick";
import "./Slider.css";

const SimpleSlider = ({ children }) => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  });

  return <Slider {...sliderSettings}>{children}</Slider>;
};

export default SimpleSlider;
