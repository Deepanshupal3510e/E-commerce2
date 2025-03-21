import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function ProductSlider({ value }) {

  const navigate = useNavigate()

  const handleNavigateClick = (data) => {

    const url = data.name.toLowerCase().replaceAll(" " , "-")+data._id.replaceAll("  " , "-")
    navigate(`/show-product-details/${url}` , {
      state : data,
    })
  }
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay : true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {value.map((data) => {
          return (
            <div  key={data._id} onClick={() => handleNavigateClick(data)} className="flex justify-center items-center cursor-pointer">
                <div className="flex justify-center items-center">
                    <img src={data.image[0]} alt={data.name} className="h-30 w-auto" />
                </div>
                <p className="text-center line-clamp-1 w-[80%] mx-auto m-3 ">{data.name}</p>
            </div>
          );
        })}

      
      </Slider>
    </div>
  );
}

export default ProductSlider;
