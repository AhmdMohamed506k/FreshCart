import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Category.module.css"; // assuming you have a CSS module

export default function ShopByCategories() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);

  // 🔹 Fetch categories
  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
        { timeout: 10000 }
      );
      setCategories(data.data.slice(0, 5)); // use slice instead of splice
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  }

  // 🔹 Handle scroll animation state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 655);
    };
    getCategories();
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 React Slick settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="pt-120 ms-7 me-5 lg:pt-140 xl:pt-120 mb-25 ">
      <div className={`${style.container} max-w-7xl mx-auto`}>
        {/* 🔹 Title + Buttons */}
        <div className="flex items-center gap-5 ms-5 mb-5">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 hover:bg-[#0a9137] hover:text-white transition"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 hover:bg-[#0a9137] hover:text-white transition relative z-50"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <i className="fa-solid fa-arrow-right" />
          </button>

          <h3 className="text-2xl font-semibold">Our Categories</h3>
        </div>

        {/* 🔹 Slider */}
        <Slider ref={sliderRef} {...settings}>
          {categories.map((cat) => (
            <div key={cat._id} className="p-2">
              <div className={`rounded-[20px] overflow-hidden bg-gray-50 relative transition-all duration-700 ${ isScrolling ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} >
                <img src={cat.image} alt={cat.name} className="w-full h-[500px] object-cover rounded-[20px]" />
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-md text-sm font-medium">
                  {cat.name}
                </div>
              </div>
            </div>
          ))}

          {/* 🔹 Last slide: Discover all new items */}
          <div className="p-2">
            <div className={`${style.flowtCard} h-[500px] border border-gray-300 rounded-[20px] flex flex-col items-start justify-center px-6 `}>
              <p className="text-2xl font-medium mb-3">Discover all new items</p>
              <button className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-black hover:text-white transition  relative z-200 ">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}
