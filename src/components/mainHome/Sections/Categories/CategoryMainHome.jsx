import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

import style from "./Category.module.css"; // assuming you have a CSS module




export default function ShopByCategories() {
  
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);




  // 🔹 Fetch categories
  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
        { timeout: 10000 }
      );
      setCategories(data.data); // use slice instead of splice
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };



return (
    <section className="py-10 bg-white">
      <div className={`${style.container} mx-auto px-4`}>
        
       
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Our Categories</h3>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
              <i className="fa-solid fa-arrow-left" />
            </button>
            <button onClick={() => scroll('right')} className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>

        
        <div ref={scrollRef}  className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory pb-4"  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => (
            <div   key={cat._id}   className="min-w-[70%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[20%] snap-start">
              <div className="rounded-[20px] overflow-hidden bg-gray-50 group cursor-pointer border border-transparent hover:border-green-500 transition-all">
                <div className="relative h-100 overflow-hidden">
                   <img src={cat.image}  alt={cat.name}  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"  />
                </div>
                <div className="p-4 text-center">
                  <span className="font-bold text-gray-700">{cat.name}</span>
                </div>
              </div>
            </div>
          ))}

      
          <div className="min-w-[70%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[20%] snap-start">
            <div className="h-full min-h-[310px] bg-green-50 border-2 border-dashed border-green-200 rounded-[20px] flex flex-col items-center justify-center p-6">
              <p className="text-green-700 font-black text-lg mb-4 text-center">Discover all new items</p>
              <button className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-black transition">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
