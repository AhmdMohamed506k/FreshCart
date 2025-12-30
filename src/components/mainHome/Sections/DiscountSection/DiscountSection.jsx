import React from 'react'
import style from "./DiscountSection.module.css"
import img from "../../../../assets/pc.png"
import SplitText from '../../SubComponents/MainText/SplitText'
   import CircularText from '../../SubComponents/CircularText/CircularText';




export default function DiscountSection() {
    return <>
        <section className={`${style.DiscountSection} rounded-[7px] mb-30`}>
            <div className={`${style.container} relative`}>

                <div className="grid grid-cols-2 lg:grid-cols-12  h-[100%] ">
                    <div className={`${style.sectionColumn1} col-span-6 mx-auto`}>
                        <img src={img} className='w-140' alt="" />
                    </div>


                    <div className={`${style.sectionColumn2} col-span-6 pt-22 ps-5 flex justify-start flex-col flex-nowrap `} >
                        <p className={`${style.OrderNowWord}mb-3 text-3xl text-[#FDC040]`}>Order Now</p>
                        <SplitText text="With FreshCart platForm" className={`${style.DiscountSectionTitle} text-5xl ms-[-23px] font-semibold text-center text-[#0a9137] mb-3 `} delay={100} duration={0.6} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px" textAlign="center" />
                        <p className=' text-[#464444] mb-12'>Easily Shopping , safe , Easy and Fast</p>


                        <div className=''>
                            <p className={`${style.sectionDescription} text-[#464444] text-[16px]/7 md:w-[100%] lg:w-[82%]`}>With FreshCart, you can easily find any product you  need  at the best prices
                                and quality available, all in  a  fast and safe environment.</p>
                        </div>

                 

                    </div>
                </div>


            </div>
        </section>
    </>
}
