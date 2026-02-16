import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Responsive() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

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


  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const moveDistance = clientWidth * 0.8; 
      const scrollTo = direction === 'left' ? scrollLeft - moveDistance : scrollLeft + moveDistance;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-400">
        <div className="animate-pulse">Loading brands...</div>
      </div>
    );
  }




  return (
    <div className="w-full  px-2 lg:px-11 py-8 group/main">
      <div className="flex items-center justify-between lg:px-2 mb-4">
         <h2 style={{fontWeight:"900"}} className="text-2xl  text-gray-800">Shop by Brand</h2>
        
         <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition">
               <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition">
               <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
         </div>
      </div>

      <div  ref={scrollRef}   className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory pb-4"   style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
        {brands.map((brand) => (
          <div key={brand._id}  className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[18%] snap-start" >
            <div className="group border p-6 border-gray-100 rounded-2xl cursor-pointer transition-all duration-300 hover:border-green-400 hover:shadow-lg bg-white">
              <div className="w-full h-32 flex items-center justify-center overflow-hidden">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              <p className="mt-4 text-center text-gray-500 font-semibold group-hover:text-green-600 transition-colors">
                {brand.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Responsive;