
import style from "./BrandsSection.module.css"
import SplitText from "../../SubComponents/MainText/SplitText";
import Spline from '@splinetool/react-spline';
import { FaRegCreditCard } from "react-icons/fa6";
import { BsArrowReturnLeft } from "react-icons/bs";
import { LuBox } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Responsive from "./slider";
import ShopProductsSlider from "./ShopProductsSlider";

export default function BrandsSection() {


  const [Brands, setBrands] = useState([]);
  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
        { timeout: 10000 }
      );
      setBrands(data.data.slice(0, 20)); // use slice instead of splice
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  }






  useEffect(() => {
    getBrands()



  }, [])


  const features = [
    {
      icon: <LuBox />,
      title: "Free Shipping",
      description: "Free shipping over order $120",
    },
    {
      icon: <FaRegCreditCard />,
      title: "Flexible Payment",
      description: "Pay with Multiple Credit Cards",
    },
    {
      icon: <BsArrowReturnLeft />,
      title: "14 Day Returns",
      description: "Within 30 days for an exchange",
    },
    {
      icon: <BiSupport />,
      title: "Premium Support",
      description: "Outstanding premium support",
    },
  ];





  return (

    <section className={`${style.BrandsSection} py-20 overflow-hidden`} >
      <div className={`${style.conatiner}`}>






        <div className={`${style.sliderContainer} mb-20`}>
          <Responsive />
        </div>

        <div className="contant mb-[-7px]">

          <div className="flex justify-center flex-col mb-6">
            <SplitText

              text="Freshcart "

              className="text-5xl font-semibold text-center mb-5 text-[#0a9137]"

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

            <SplitText

              text="Inspire and let yourself be inspired, from one unique fashion to another. "

              className="text-[17px] font-semibold text-center text-gray-500 px-2"

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



          </div>
          <ShopProductsSlider />
        </div>

        <div className="py-12 px-10 lg:px-20 xl:px-10 ">
          <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-y-25 sm:gap-x-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col  h-[140%] items-center justify-center text-center p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300" >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
