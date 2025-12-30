import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Responsive() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
        { timeout: 10000 }
      );
      setBrands(data.data.slice(0, 10));
    } catch (err) {
      console.error("Error fetching brands:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-500">
        Loading brands...
      </div>
    );
  }

  return (
    <div className="slider-container px-5 py-8">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand._id} className="px-3"> {/* 👈 Adds horizontal gap */}
            <div className="group border p-4 border-gray-200 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.05] hover:shadow-md">
              <img src={brand.image} alt={brand.name} className="w-full h-40 object-contain" />
              <p className="mt-3 text-center text-gray-700 font-medium group-hover:text-black">
                {brand.name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Responsive;
