import React from "react";
import Slider from "react-slick";
import banner1 from "../../../assets/banner1.png"
import banner2 from "../../../assets/banner2.png"
import banner3 from "../../../assets/banner3.png"
import banner4 from "../../../assets/banner4.png"

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="slider-container w-full  ">
      <Slider {...settings}>
        {[banner4, banner2, banner3, banner1].map((img, index) => (
          <div key={index} className="lg:px-2"> {/* <— gap here */}
            <img src={img} className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[460px]  px-1 rounded-2xl cursor-pointer" alt={`banner-${index}`}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
