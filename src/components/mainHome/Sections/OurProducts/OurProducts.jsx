import React, { useEffect, useRef, useState } from 'react'
import style from './OurProducts.module.css'
import SplitText from '../../SubComponents/MainText/SplitText'
import TextType from '../../SubComponents/TextType/TextType'
import Particles from "../../SubComponents/Particles/Particles"
import Spline from '@splinetool/react-spline';
import axios from 'axios'




export default function OurProducts() {
   
     
    const [hovered, setHovered] = useState(false);
    const [Products, setProducts] = useState([]);
    const productImgRef = useRef()


    async function getCategories() {
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/products",
                { timeout: 10000 }
            );
            setProducts(data.data.slice(0, 8)); // use slice instead of splice
        } catch (err) {
            console.error("Error fetching categories:", err.message);
        }
    }









    useEffect(() => {
        getCategories()



    }, [])






    return <>
        <section className={`${style.OurProductsSection} overflow-hidden bg-[#031f0c] relative  rounded-[7px] `}>
            <div className={`${style.contanier}  `}>

                {/* Section Header && Title */}
                <div className={`OurProductsTitle`}>

                    <div className="absolute top-[20%] left-[-30%] w-[80rem] h-[12em]
                  bg-gradient-to-br  from-green-600 to-transparent
                  blur-[990px] opacity-50 rotate-[35deg] z-12 pointer-events-none">
                    </div>



           <div className="text-center my-10">
                <SplitText

                    text="Our Products"

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
              
                <p className="text-white mt-0">browse our new Products</p>
            </div>




                    <div className="absolute top-[20%] right-[0%] w-[100vw] h-[25em] rotate-[10%]
                bg-gradient-to-br  from-emerald-800 to-transparent
                blur-[990px] opacity-50 rotate-[30deg] z-11 pointer-events-none">
                    </div>


                </div>


                {/* Product Cards */}
                <div className='grid grid-cols-8 sm:grid-cols-9 sm:ps-12 sm:pe-0  | md:grid-cols-12 md:ps-4 md:pe-4 | lg:grid-cols-16  place-items-center px-3 py-5 gap-3  relative z-13'>

                    {Products.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}








                </div>
                {/* Particles */}
                <div style={{ width: '100%', height: '1200px', position: 'absolute', zIndex: "12", bottom: "60px", left: "0", top: "30rem" }}>
                    <Particles
                        particleColors={['#ffffff', '#0a9137']}
                        particleCount={1300}
                        particleSpread={15}
                        speed={0.1}
                        particleBaseSize={68}
                        moveParticlesOnHover={false}
                        alphaParticles={false}
                        disableRotation={false}
                        className={"z-8"}
                    />
                </div>

            </div>






        </section>

    </>
}


// =====================================



function ProductCard({ product }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`${style.productCard} col-span-4 w-[90%] mb-15`}  >
            <div className="relative w-[90%] mx-auto rounded-2xl pt-3 mb-3 overflow-hidden " onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {/* First Image */}
                <img src={product.images[0]} alt={product.title} className={`w-full rounded-2xl absolute top-3 left-0 transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`} />

                {/* Second Image */}
                <img src={product.images[1]} alt={product.title} className={`w-full rounded-2xl transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
            </div>

            <div className="w-[90%] lg:w-[100%] mx-auto pb-4 pt-2 ps-2 text-white flex flex-col lg:flex-row flex-nowrap mb-2">
                <div className=' mb-2 lg:w-[50%] lg:ms-5 '>
                    <h3 className=''>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <p>{product.price} EGP</p>
                </div>
                <div className='  lg:w-[50%]  '>
                   <button className='bg-emerald-700 rounded-xl px-5 py-2 lg:ms-7 mt-1 cursor-pointer transition '>Buy now</button>
                </div>
            </div>
        </div>
    )
}
