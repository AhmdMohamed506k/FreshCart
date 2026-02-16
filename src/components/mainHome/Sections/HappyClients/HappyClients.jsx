import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import axios from "axios";
import "./HappyClients.css";
import SplitText from "../../SubComponents/MainText/SplitText";
import Particles from "../../SubComponents/Particles/Particles"

export default function HappyClients() {
    const sliderRef = useRef();
    const [products, setProducts] = useState([]);

    // Fetch products
    async function getProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
                timeout: 10000,
            });
            setProducts(data.data.slice(0, 4)); // just 4 to match testimonial count
        } catch (err) {
            console.error("Error fetching products:", err.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const testimonials = [
        {
            name: "Allen Lyn",
            country: "France",
            title: "Great Selection and Quality",
            text: `"I love the variety of styles and the high-quality clothing on this web fashion site."`,
        },
        {
            name: "Peter Rope",
            country: "USA",
            title: "Best Customer Service",
            text: `"I finally found a web fashion site with stylish and flattering options in my size."`,
        },
        {
            name: "Hellen Ase",
            country: "Japan",
            title: "Great Selection and Quality",
            text: `"I love the variety of styles and the high-quality clothing on this web fashion site."`,
        },
        {
            name: "New Client",
            country: "UK",
            title: "Awesome Experience",
            text: `"Very satisfied with the speed of delivery and product quality!"`,
        },
    ];

    // Scroll functions
    const scroll = (direction) => {
        if (!sliderRef.current) return;
        const { clientWidth } = sliderRef.current;
        sliderRef.current.scrollBy({
            left: direction === "next" ? clientWidth : -clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <section className={` HappyClients overflow-hidden relative py-16 px-4 sm:px-8 lg:px-16  bg-[#031f0c] rounded-[8px]`}>
            <div className="text-center mb-10">
                <SplitText

                    text="Happy Clients"

                    className="text-4xl font-semibold font-semibold text-center text-[#0a9137]"

                    delay={100}

                    duration={0.6}

                    ease="power3.out"

                    splitType="chars"

                    from={{ opacity: 0, y: 40 }}

                    to={{ opacity: 1, y: 0 }}

                    threshold={0.1}

                    rootMargin="-100px"

                    textAlign="center"

                  

                />
              
                <p className="text-white mt-0">Hear what they say about us</p>
            </div>



            <div className="absolute top-[20%] left-0  h-[12em]
           bg-gradient-to-br from-green-500 to-transparent
           blur-[990px] opacity-50 rotate-[35deg] z-11 pointer-events-none">
            </div>

            {/* Slider Container */}
            <div className="relative z-12">
                {/* Prev Button */}
                <button onClick={() => scroll("prev")} className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100" >
                    <ChevronLeft size={24} />
                </button>

                {/* Scrollable Cards */}
                <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth gap-6 scrollbar-hide snap-x snap-mandatory" >
                    {testimonials.map((t, i) => {
                        const product = products[i]; // link testimonial to one product
                        return (
                            <div key={i} className="w-[100%] sm:w-[99%] md:w-[47%] lg:w-[47.5%] xl:w-[32%] bg-white border border-[#ebebeb] rounded-2xl p-6 shadow-sm snap-start flex-shrink-0">
                                <div className="flex mb-4 text-orange-500">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <h3 className="font-semibold text-lg">{t.title}</h3>
                                <p className="text-gray-700 mt-2 mb-4">{t.text}</p>
                                <p className="font-medium">{t.name}</p>
                                <p className="text-gray-500 text-sm mb-4">
                                    Customer from {t.country}
                                </p>

                                {product && (
                                    <div className="flex items-center gap-3 border-t border-[#ebebeb] pt-4">
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded-lg border"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{product.title}</p>
                                            <p className="text-sm text-gray-600">${product.price}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button onClick={() => scroll("next")} className="hidden md:flex absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100" >
                    <ChevronRight size={24} />
                </button>




            </div>

            <div className="absolute top-[10px] right-[-25rem] w-[80rem] h-[7em]
           bg-gradient-to-br  from-green-600 to-transparent
           blur-[990px] opacity-50 rotate-[-30deg] z-11 pointer-events-none">
            </div>
       
            
        </section>
    );
}
