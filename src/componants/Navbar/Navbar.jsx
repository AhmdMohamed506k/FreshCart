import React, { useContext, useRef, useState } from 'react'
import navImg from "../../assets/freshcart-logo.png"
import { Link, NavLink } from 'react-router-dom'
import StaggeredMenu from './phoneList/StaggeredMenu'
import "./Navbar.css"
import { MyAuthContext } from '../Contexts/UserContext/UserContext'
import AuthNavbar from './AuthNavbar/AuthNavbar'
export default function Navbar() {

  const { istoken, setToken } = useContext(MyAuthContext)
  const navRef = useRef()
  var prevScroll = window.scrollY
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY



    if (prevScroll > currentScroll) {
      navRef?.current?.classList?.add("stickyNavDown")
      navRef?.current?.classList?.remove("stickyNav")
      navRef?.current?.classList?.remove("stickyNavUp")

    } else {
      navRef?.current?.classList?.add("stickyNavUp")
      navRef?.current?.classList?.remove("stickyNavDown")
      navRef?.current?.classList?.remove("stickyNav")

    }


    if (currentScroll < 3) {
      navRef?.current?.classList?.add("stickyNav")
      navRef?.current?.classList?.remove("stickyNavDown")
      navRef?.current?.classList?.remove("stickyNavUp")
    }
    prevScroll = currentScroll

  })



  const menuItems = [

  
    { label: 'Login', ariaLabel: 'Login', link: '/Login' },

    { label: 'Register', ariaLabel: 'Register', link: '/Register' }

  ];
  

  const AuthMenuItems=[
      { label: 'Products', ariaLabel: 'Products', link: '/Products' },

    { label: 'Categories', ariaLabel: 'Categories', link: '/Categories' },

    { label: 'Brands', ariaLabel: 'Brands', link: '/Brands' },

  ]

  const socialItems = [

    { label: 'Facebook', link: 'https://www.facebook.com/AhmedMohamed506' },

    { label: 'GitHub', link: 'https://github.com/AhmdMohamed506k' },

    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/ahmed-mohamed-1710392a5/' }

  ];



  return <>

  

  {istoken != null ? 


  <AuthNavbar/>

    :
    
    <nav ref={navRef} className="fixed z-15 animate__animated animate__fadeIn">
      {/* Main NavBar Container */}
      <div className=" MainNavContainer max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


        {/* Main NavBar Logo */}
        <Link to={"/"} className=" navLogo flex items-center space-x-3 rtl:space-x-reverse">
          <img src={navImg} className='w-50 text-white' alt="MainTile" />
        </Link>





        {/* middel NavBar Links */}
     




        {/* Auth navbar links  */}
        <div className='AuthNavbarLinks hidden xl:block pt-[2.3px] '>
          <ul className='flex flex-row gap-4 '>
            <li>
              <NavLink to={'/Login'} className="text-white ">
                <div className='relative w-[95%] sm:w-25 h-7 bg-gradient-to-r from-[#0ccd56] to-[#87e963] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
                  <div className='absolute inset-[3px]  rounded-full flex items-center justify-center gap-1'>
                    <i className="fa-solid fa-right-to-bracket me-1" />

                    Login
                  </div>

                </div>




              </NavLink>
            </li>
            <li>
              <NavLink to={'/Register'} className="text-white ">

                <div className='relative w-[95%] sm:w-30 h-7  bg-gradient-to-r from-[#0ccd56] to-[#87e963] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
                  <div className='absolute inset-[3px] bg-transparent  rounded-full flex items-center justify-center gap-1   text-1xl  '>

                    <i className="fa-solid fa-user me-2 " />
                    Register

                  </div>

                </div>


              </NavLink>
            </li>
          </ul>
        </div>


        {/* PhoneList Button */}
        <StaggeredMenu

          position="right"

          items={menuItems}

          socialItems={socialItems}

          displaySocials={true}

          displayItemNumbering={true}

          menuButtonColor="#fff"

          openMenuButtonColor="#000000"

          changeMenuColorOnOpen={true}

          colors={['#B19EEF', '#5227FF']}

          logoUrl="/path-to-your-logo.svg"

          accentColor="#09822f"

          className={""}

          onMenuOpen={() => console.log('Menu opened')}

          onMenuClose={() => console.log('Menu closed')}

        />







      </div>
    </nav>

  }




  </>
}
