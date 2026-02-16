
import React, { use, useEffect, useLayoutEffect, useRef, useState } from 'react'
import "./MainHome.css"
import Hero from './Sections/Hero/MainHero/Hero';

import ShopByCategories from './Sections/Categories/CategoryMainHome';
import OurProducts from './Sections/OurProducts/OurProducts';
import DiscountSection from './Sections/DiscountSection/DiscountSection';
import HappyClients from './Sections/HappyClients/HappyClients';
import BrandsSection from './Sections/Brands/BrandsSection';
import { ContainerScroll } from './SubComponents/ContainerScroll/ContainerScroll';
import img1 from "../../assets/banner.png";







export default function MainHome() {



  return <>

    <Hero />
    <ContainerScroll className={`  `} >
         <img src={img1} alt="" />
    </ContainerScroll>
    <main className="min-h-screen bg-background ">
      <ShopByCategories />
    </main> 
      <OurProducts/>


     <DiscountSection />
   <HappyClients />
    <BrandsSection /> 
 
  </>

}
