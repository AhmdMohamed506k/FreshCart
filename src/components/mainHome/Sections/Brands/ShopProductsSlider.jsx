import React, { useEffect, useState, useRef } from "react";
import { ShoppingBag } from "lucide-react";

function ShopProductsSlider() {
  const Imgs = [
    { _id: "1", imgCover: "https://img.freepik.com/free-photo/front-view-male-checking-his-phone_23-2148316184.jpg", name: "1" },
    { _id: "2", imgCover: "https://img.freepik.com/free-photo/young-teeanger-showing-his-shopping-bags_23-2148303884.jpg", name: "2" },
    { _id: "3", imgCover: "https://img.freepik.com/free-photo/full-shot-man-streaming-with-tablet_23-2148781049.jpg", name: "3" },
    { _id: "4", imgCover: "https://img.freepik.com/free-photo/man-with-two-shopping-bags_23-2147707544.jpg", name: "4" },
    { _id: "5", imgCover: "https://img.freepik.com/free-photo/front-view-man-shopping-online-using-tablet-credit-card_23-2148455096.jpg", name: "5" },
    { _id: "6", imgCover: "https://img.freepik.com/free-photo/person-talking-video-call_23-2151228188.jpg", name: "6" },
    { _id: "7", imgCover: "https://img.freepik.com/free-photo/full-shot-man-with-tablet-coffee_23-2148781048.jpg", name: "7" },
    { _id: "8", imgCover: "https://img.freepik.com/free-photo/close-up-man-holding-credit-cards_23-2148447804.jpg", name: "8" },
  ];

  // 🔹 بنضاعف المصفوفة عشان نخلق وهم الاستمرارية
  const infiniteImgs = [...Imgs, ...Imgs];

  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    const handleInfinity = () => {
      if (!scrollContainer) return;
      
      // لو اليوزر وصل لنص السكرول (نهاية المجموعة الأولى)، نرجعه للبداية فوراً وبدون Smooth
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const interval = setInterval(() => {
      if (scrollContainer && !isDown) {
        // تحريك سلس
        scrollContainer.scrollBy({ left: 2, behavior: "auto" }); // تحريك مستمر بطيء (Linear)
        handleInfinity();
      }
    }, 20); // سرعة التحديث 20 مللي ثانية لحركة ناعمة جداً

    return () => clearInterval(interval);
  }, [isDown]);

  // 🔹 Mouse Drag Logic
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseUp = () => setIsDown(false);
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full px-2 py-8 overflow-hidden">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {infiniteImgs.map((B, index) => (
          <div 
            key={`${B._id}-${index}`} 
            className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[20%]"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg group select-none">
              <img
                src={B.imgCover}
                alt={B.name}
                className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <ShoppingBag className="text-white w-10 h-10 transform scale-90 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopProductsSlider;