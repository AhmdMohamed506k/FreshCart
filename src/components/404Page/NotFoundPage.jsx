import React, { useEffect } from 'react'
import Img404 from "../../assets/error.svg"

export default function NotFoundPage() {

  function handelScreenScroll() {
    if (window.scrollY == 0) {
      window.scrollTo({ top: 10, behavior: "smooth" });
    }
  }

    useEffect(() => {
        handelScreenScroll()
    }, []);


  return <>
         <head>
      <meta charSet="utf-8" />
      <title>404 not Found</title>
    
    </head>
    <section className='h-[100vh] flex justify-center'>
      <img src={Img404} className='w-180' alt="404NotfoundImage" />
    </section>
  </>
}
