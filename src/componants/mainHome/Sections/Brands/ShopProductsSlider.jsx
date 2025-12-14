import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingBag } from "lucide-react"; // example icon

function ShopProductsSlider() {
  const Imgs = [
    {
      _id: "1",
      imgCover:
        "https://img.freepik.com/free-photo/front-view-male-checking-his-phone_23-2148316184.jpg",
      name: "Front view male checking his phone",
    },
    {
      _id: "2",
      imgCover:
        "https://img.freepik.com/free-photo/young-teeanger-showing-his-shopping-bags_23-2148303884.jpg",
      name: "Young teenager showing his shopping bags",
    },
    {
      _id: "3",
      imgCover:
        "https://img.freepik.com/free-photo/full-shot-man-streaming-with-tablet_23-2148781049.jpg",
      name: "Full shot man streaming with tablet",
    },
    {
      _id: "4",
      imgCover:
        "https://img.freepik.com/free-photo/man-with-two-shopping-bags_23-2147707544.jpg",
      name: "Man with two shopping bags",
    },
    {
      _id: "5",
      imgCover:
        "https://img.freepik.com/free-photo/front-view-man-shopping-online-using-tablet-credit-card_23-2148455096.jpg",
      name: "Front view of man shopping online using tablet and credit card",
    },
    {
      _id: "6",
      imgCover:
        "https://img.freepik.com/free-photo/person-talking-video-call_23-2151228188.jpg",
      name: "Person talking on video call",
    },
    {
      _id: "7",
      imgCover:
        "https://img.freepik.com/free-photo/full-shot-man-with-tablet-coffee_23-2148781048.jpg",
      name: "Full shot man with tablet and coffee",
    },
    {
      _id: "8",
      imgCover:
        "https://img.freepik.com/free-photo/close-up-man-holding-credit-cards_23-2148447804.jpg",
      name: "Close-up man holding credit cards",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1124,
        settings: { slidesToShow: 3, slidesToScroll: 2 },
      },
      {
        breakpoint: 770,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="slider-container px-7 py-8">
      <Slider {...settings} className="[&_.slick-slide>div]:px-3">
        {Imgs.map((B) => (
          <div key={B._id} className="cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              {/* Image */}
              <img
                src={B.imgCover}
                alt={B.name}
                className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay Layer */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ShoppingBag className="text-white w-10 h-10 transform scale-90 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ShopProductsSlider;
