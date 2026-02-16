import React, { useEffect, useRef, useState } from "react";
import style from "./Hero.module.css";
import img1 from "../../../../../assets/banner.png";
import { ContainerScroll } from "../../../SubComponents/ContainerScroll/ContainerScroll";
import Particles from "../../../SubComponents/Particles/Particles";
import { Link } from "react-router-dom";







export default function Hero() {




  return (
    <>
      <section className={`${style.HeroSection} bg-[#031f0c] relative  text-center  `}>
        <div className={`${style.container} `}>


          {/* Lighting blur Effect */}
          <div className="absolute top-[20%] left-[-30%] w-[100vw] bg-yellow-200 h-[12em]
           bg-gradient-to-br from-white/50 to-transparent
           blur-[990px] opacity-40 rotate-[35deg] z-0 pointer-events-none">
          </div>




          <div className={`${style.TextDiv}  z-40`}>

            <h1 className={`   mb-9 animate__animated animate__fadeIn `}> Welcome to <br /> <span id={style.FreshSpan}>FreshCart
              <svg id={style.FreshSvg} className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 28" fill="none">
                <path d="M2.93273 17.4395C62.4362 8.76346 122.369 4.23974 182.504 5.62874C199.624 6.02314 216.692 6.76634 233.799 7.59017C235.637 7.70392 235.782 4.98029 233.975 4.76092C203.548 1.06968 172.635 -0.148886 142.007 0.26829C111.898 0.6658 81.8321 2.67289 51.9398 6.28091C35.279 8.30526 18.6895 10.8424 2.23528 14.1261C0.0782858 14.5596 0.79277 17.7568 2.93273 17.4395Z" fill="url(#paint0_linear_4439_5)"></path>
                <path d="M27.9044 27.6467C51.7739 24.377 75.6011 21.0753 99.6031 19.0701C124.029 17.0374 148.545 16.2323 173.053 16.2822C187.044 16.3119 201.053 16.7632 215.041 16.607C215.202 16.603 215.357 16.5387 215.473 16.4269C215.589 16.3151 215.66 16.1639 215.67 16.0031C215.68 15.8423 215.629 15.6836 215.527 15.5583C215.425 15.433 215.28 15.3502 215.12 15.3263C202.85 13.6725 190.401 13.2201 178.042 12.7633C165.682 12.3066 153.295 12.5325 140.948 12.9124C116.56 13.7009 92.1402 15.475 67.9463 18.7539C54.3841 20.5936 40.8289 22.7172 27.479 25.7237C26.2548 25.995 26.6551 27.7698 27.8534 27.5995L27.9044 27.6467Z" fill="url(#paint1_linear_4439_5)"></path>
                <defs>
                  <linearGradient id="paint0_linear_4439_5" x1="11.9017" y1="0.25629" x2="210.252" y2="34.939" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#76F5BC"></stop>
                    <stop offset="0.552083" stop-color="#0a9137"></stop>
                    <stop offset="1" stop-color="#0a9137"></stop>
                  </linearGradient>
                  <linearGradient id="paint1_linear_4439_5" x1="11.9017" y1="0.25629" x2="210.252" y2="34.939" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#76F5BC"></stop>
                    <stop offset="0.552083" stop-color="#0a9137"></stop>
                    <stop offset="1" stop-color="#0a9137"></stop>
                  </linearGradient>
                </defs>
              </svg></span> Market
            </h1>


            <p className={` animate__animated animate__fadeIn  mb-8`}>
              I built FreshCart using the latest technologies and frameworks to ensure a seamless shopping experience. Discover useful products and enjoy easier online shopping.
            </p>


            <div className={`${style.ButtonsGroup} text-white flex flex-nowrap justify-center animate__animated animate__fadeIn`}>





              <button className={`${style.registerButton} mx-5`}>
                <Link to={"/Register"}> <i className="fa-solid fa-user-plus me-2" />Register Now</Link>
              </button>


            </div>

          </div>

        </div>













        {/* flowting Particles Effect */}
        <div style={{ width: '100%', height: '600px', position: 'absolute', zIndex: "9", bottom: "60px", left: "0" }}>
          <Particles
            particleColors={['#ffffff', '#0a9137']}
            particleCount={1000}
            particleSpread={15}
            speed={0.1}
            particleBaseSize={60}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
            className={"z-8"}
          />
        </div>


        
  
       
      </section>
   
      
      











    </>
  );
}
