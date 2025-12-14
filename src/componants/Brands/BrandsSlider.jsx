import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

function BrandsSlider() {



  async function GetBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, data } = useQuery({
    queryKey: ["BrandId"],
    queryFn: GetBrands,
  });

  const Brands = data?.data?.data || [];







  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {Brands.map((brand) => (
          <div key={brand._id} className="flex flex-col items-center my-10">
            <div className="h-50 w-50    bg-white border border-gray-200   rounded-xl   flex items-center justify-center   hover:shadow-sm transition "  >
              <img src={brand.image} alt={brand.name} className="max-w-[40%] max-h-[40%] object-contain" />
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BrandsSlider;
