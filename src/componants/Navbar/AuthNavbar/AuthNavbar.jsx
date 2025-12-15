import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import img from "../../../assets/freshcart-logoGreen.png"
import { IoIosSearch } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaBars } from "react-icons/fa6";

import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbBrandShopee } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import StaggeredMenu from "../AuthNavbar/AuthNavPhoneList/AuthNavPhoneList";
import { MyCartContext } from "../../Contexts/CartContext/CartContext";
import axios from "axios";
import { FiMusic } from "react-icons/fi";
import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { TbHorseToy } from "react-icons/tb";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineElectricBolt } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MyAuthContext } from "../../Contexts/UserContext/UserContext";
import FreshCartLoader from "../../Loading/Loader/Loader";
import { HiOutlineLogin } from "react-icons/hi";
import { FaCartArrowDown } from "react-icons/fa6";
import "./AuthNavbar.css"
import { useFilter } from "../../Contexts/FilterContext/FilterContext";
import { GrUpdate } from "react-icons/gr";









const AuthNavbar = () => {


    //   =======================UseStates===============================
    const [menuOpen, setMenuOpen] = useState(false);
    const [UserMenu, setUserMenu] = useState(false);
    const [OpenCategoriesMenu, setOpenCategoriesMenu] = useState(false);
    const [OpenSubCategoriesMenu, setSubOpenCategoriesMenu] = useState(false);
    const [CategoriesProducts, setCategoriesProducts] = useState([]);
    const [SubCategoriesProducts, setSubCategoriesProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [products, setProducts] = useState([]);
    //   =======================UseContexts=============================
    const { AddProduct, NumOfCartItems, TotalCartPrise, AllProducts } = useContext(MyCartContext);
    const { filters, updateFilters } = useFilter();
    const { search, category, minPrice, maxPrice, sort } = filters;
    const { istoken, setToken } = useContext(MyAuthContext);
    //   =======================UseNavigates=============================
    const Navegait = useNavigate()
    //   =======================UseReFs==================================
    const avatarRef = useRef(null);
    const cartRef = useRef(null);
    const SearchRef = useRef(null);
    const CategoriesMenuRef = useRef(null);











    // ===========================Categories=================================
    async function GetCategories(params) {

        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

        setCategoriesProducts(data?.data)

    }
    function handleCategorySelect(categoryName) {
        updateFilters({ category: categoryName });
        Navegait("/Home")
        setOpenCategoriesMenu(false);
        setSubOpenCategoriesMenu(false);
    }
    // ===========================LogOut=====================================
    function HandelLogOut() {
        localStorage.removeItem("Token");
        setToken(null);
        Navegait("/MainHome");
    }
    // ===========================SearchBar==================================
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);


    };








    //    ======================UseEffects && Loader ==========================
    useEffect(() => {
        GetCategories()

        function handleClickOutside(e) {


            // CLOSE USER MENU if clicked outside
            if (avatarRef.current && !avatarRef.current.contains(e.target)) {
                setUserMenu(false);
            }

            // CLOSE CART MENU if clicked outside
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
            if (SearchRef.current && !SearchRef.current.contains(e.target)) {
                setSearchTerm("");
            }
            if (CategoriesMenuRef.current && !CategoriesMenuRef.current.contains(e.target)) {
                setOpenCategoriesMenu(false)
            }



        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setSubCategoriesProducts])
    useEffect(() => {
        const delay = setTimeout(() => {
            updateFilters({ search: searchTerm });
        }, 500); // Debounce

        return () => clearTimeout(delay);
    }, [searchTerm]);
    useEffect(() => {

        const params = new URLSearchParams();

        if (search) params.append("search", search);


        fetch(`https://ecommerce.routemisr.com/api/v1/products?=${params.toString()}`)
            .then((r) => r.json())

            .then((data) => {
                const filtered = data.data.filter((product) =>
                    product.title.toLowerCase().includes(search.toLowerCase())
                );




                setSearchResults(filtered);



            });
    }, [search]);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (category) params.append("category", category);


                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`);


                setProducts(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, search]);







    //    =========================PhoneLists==========================
    const AuthMenuItems = [
        { label: 'Home', ariaLabel: 'Home', link: '/Home' },

        { label: 'Brands', ariaLabel: 'Brands', link: '/Brands' },

        { label: 'Wishlist', ariaLabel: 'Wishlist', link: '/Wishlist' },

        { label: 'Contact', ariaLabel: 'Contact', link: '/ContactPage', onclick: <StaggeredMenu /> },
    ]
    const socialItems = [

        { label: 'Facebook', link: 'https://www.facebook.com/AhmedMohamed506' },

        { label: 'GitHub', link: 'https://github.com/AhmdMohamed506k' },

        { label: 'LinkedIn', link: 'https://www.linkedin.com/in/ahmed-mohamed-1710392a5/' }

    ];



    return (
        <nav className="w-full xl:h-auto xl:h-[9rem]  bg-white  border-b border-gray-200  top-0 left-0 z-50 relative ">
            {/* top Section */}
            <div className="flex items-center justify-between px-6 py-3 w-90% xl:w-[81%] mx-auto mt-5  ">
                {/* Logo */}
                <div className="flex items-center space-x-2">  <Link to={"/Home"} > <img src={img} alt="Logo" className="w-full h-9" /> </Link>


                </div>

                {/* Search Bar */}
                <div className="hidden lg:flex w-1/2 mx-4 relative ">
                    <input value={searchTerm} onChange={handleSearchChange} type="text" placeholder="Search for products..." className="w-full   border border-gray-300 bg-[#f3f4f7] rounded-[12px] px-4 py-2 text-[#9595a9] text-sm focus:outline-none" />
                    <IoIosSearch size={25} className=" absolute right-3 top-[6.4px] " />

                    {searchTerm && (
                        <div ref={SearchRef} className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 z-50 max-h-64 overflow-y-auto shadow-lg" >
                            {searchLoading ? (
                                <div className="p-3 text-center text-gray-500">Loading...</div>
                            ) : searchResults.length === 0 ? (
                                <div className="p-3 text-center text-gray-500">No products found</div>
                            ) : (
                                searchResults.map((product) => (
                                    <Link to={`/ProductDetails/${product._id}`} key={product._id} className="flex items-center px-3 py-2 hover:bg-gray-100" onClick={() => setSearchTerm("")}  >
                                        <div className="me-3 mt-1">
                                            <img src={product.imageCover} width={40} alt="" />
                                        </div>

                                        {product.title}
                                    </Link>
                                ))
                            )}
                        </div>
                    )}


                </div>




                {/* Right side */}
                <div className="flex items-center gap-6 relative right-10 xl:right-0 ">

                    {/* Avatar + Arrow */}
                    <div ref={avatarRef} className="flex items-center space-x-1 cursor-pointer" onClick={() => { setUserMenu(!UserMenu) }} >
                        <div className=" px-2 py-2 rounded-[100%] border">
                            <LuUserRound size={21} />
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-600" />


                        {UserMenu && (
                            <div className="absolute right-0 top-14 z-600 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                                <h3 className="text-sm font-semibold text-green-700 ps-2 pt-2  mb-5 capitalize">
                                    account options
                                </h3>
                                <ul className="space-y-2 max-h-48 overflow-y-auto">

                                    <Link id="UserinfoBtn" to={"/ChangeInfo"} className="">
                                        <li onClick={() => setUserMenu(!UserMenu)} className="flex justify-between text-sm text-gray-600 border border-gray-300 p-4  rounded-2xl hover:border-green-700 mb-3"  >
                                            <button id="UserInfoBtnText" className=" text-black  cursor-pointer  flex"> <GrUpdate  size={17} className="mt-0.5 me-2" /> Edit profile </button>
                                        </li>
                                    </Link>


                                    <Link id="OrderBtn" to={"/allorders"} className="">
                                        <li onClick={() => setUserMenu(!UserMenu)} className="flex justify-between text-sm text-gray-600 border border-gray-300 p-4  rounded-2xl hover:border-green-700 mb-3"  >
                                            <button id="OrderBtnText" className=" text-black  cursor-pointer  flex"> <FaCartArrowDown size={19} className="mt-0.5 me-2" /> My Orders</button>
                                        </li>
                                    </Link>


                                    <button id="LogoutBtn" className="w-[100%] cursor-pointer" onClick={() => HandelLogOut()} >
                                        <li className="flex justify-between text-sm text-gray-600 border border-gray-300 p-4  rounded-2xl    hover:border-green-700" >
                                            <div id="LogoutBtnText" className=" text-black   flex"><HiOutlineLogin size={20} className="mt-0.2 me-2" /> LogOut</div >
                                        </li>
                                    </button>
                                </ul>

                            </div>
                        )}

                    </div>


                    {/* Cart Icon */}
                    <div ref={cartRef} className="relative cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="bg-[#fff1ee] px-2 py-2 rounded-4xl">
                            <LiaShoppingBagSolid size={25} className=" text-[#ea2b0f]" />

                        </div>


                        <span className="absolute -top-2 -right-2 bg-[#ea2b0f] text-white text-xs rounded-full px-1">
                            {NumOfCartItems >= 1 ? NumOfCartItems : " "}
                        </span>



                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute right-0 top-14 z-600 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Cart Items
                                </h3>
                                <ul className="space-y-2 max-h-48 overflow-y-auto">
                                    {AllProducts?.map((products) => (
                                        <li key={products.id} className="flex justify-between text-sm text-gray-600 border-b pb-1" >
                                            <span>{products.product.title.split(" ").splice(0, 3).join(" ")}</span>
                                            <span className="font-medium">{products.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div onClick={() => setMenuOpen(!menuOpen)} className=" cursor-pointer" >
                                    <Link className="" to={"/Cart"}>
                                        <div className="w-full mt-3 text-center bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">
                                            View Cart
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>

                </div>




            </div>

            {/* bottom Section */}
            <div className="xl:flex items-center justify-between px-6 py-3 w-[80%] mx-auto mb-1 cursor-pointer  hidden  2 relative ">
                {/* Categories Card */}
                <div onClick={() => setOpenCategoriesMenu(!OpenCategoriesMenu)} className="flex items-center bg-[#00a63e] text-white w-55 h-12 ms-[-10px] rounded-4xl">
                    <FaBars className="mx-4" />
                    <p>Categories</p>
                    <div className="ms-auto">
                        <MdKeyboardArrowDown size={20} className="me-3 mt-1" />
                    </div>
                </div>
                {/* Cards */}
                {OpenCategoriesMenu && (<div ref={CategoriesMenuRef} className="absolute left-3.5 top-16 z-600 w-55 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                    <ul className="">


                        <li key={CategoriesProducts[0]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[0]?._id) }} className="flex flex-row items-center ms-2 mb-4">

                            <FiMusic size={18} className="me-2 mt-[2px]" />
                            {CategoriesProducts[0]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>


                        </li>

                        {/* ================================================ */}


                        <li key={CategoriesProducts[1]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[1]?._id) }} className="flex flex-row items-center ms-2 mb-4 relative transition-all">
                            <IoManOutline size={18} className="me-2 mt-[2px]" />
                            {CategoriesProducts[1]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>

                        </li>


                        {/* ================================================ */}



                        <li key={CategoriesProducts[2]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[2]?._id) }} className="flex flex-row items-center ms-2 mb-4 transition-all">
                            <IoWomanOutline size={18} className="me-2 mt-[2px]" />
                            {CategoriesProducts[2]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />

                            </div>
                        </li>




                        {/* ================================================ */}




                        <li key={CategoriesProducts[3]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[3]?._id) }} className="flex flex-row items-center ms-2 mb-4">
                            <CiShoppingCart size={18} className="me-2 mt-[2px]" /> {CategoriesProducts[3]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>
                        </li>



                        {/* ================================================ */}







                        <li key={CategoriesProducts[4]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[4]?._id) }} className="flex flex-row items-center ms-2 mb-4">
                            <TbHorseToy size={18} className="me-2 mt-[2px]" /> {CategoriesProducts[4]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>
                        </li>





                        {/* ================================================ */}



                        <li key={CategoriesProducts[6]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[6]?._id) }} className="flex flex-row items-center ms-2 mb-4" >
                            <LuBookMarked size={18} className="me-2 mt-[2px]" /> {CategoriesProducts[6]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>

                        </li>




                        {/* ================================================ */}





                        <li key={CategoriesProducts[7]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[7]?._id) }} className="flex flex-row items-center ms-2 mb-4">
                            <MdOutlineHealthAndSafety size={18} className="me-2 mt-[2px]" /> {CategoriesProducts[7]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>
                        </li>



                        {/* ================================================ */}





                        <li key={CategoriesProducts[8]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[8]?._id) }} className="flex flex-row items-center ms-2 mb-4">
                            <HiOutlineDevicePhoneMobile size={18} className="me-2 mt-[2px]" /> {CategoriesProducts[8]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>
                        </li>




                        {/* ================================================ */}




                        <li key={CategoriesProducts[9]?._id} onClick={() => { handleCategorySelect(CategoriesProducts[9]?._id) }} className="flex flex-row items-center ms-2 mb-1">
                            <MdOutlineElectricBolt size={18} className="me-2 mt-[2px]" /> {CategoriesProducts[9]?.name}
                            <div className="mt-[2px] ms-auto">
                                <MdOutlineKeyboardArrowRight />
                            </div>
                        </li>





                    </ul>

                </div>
                )}





                {/* Links */}
                <div className="hidden md:flex w-200 mx-4  absolute right-[61px] mt-1  px-4  ">

                    <ul className="flex gap-10">
                        <li>
                            <NavLink to={"/Home"}>
                                <div className="flex flex-row items-center text-[#3e445a]">
                                    <div className="me-1 mt-[0.5px]">
                                        <AiOutlineHome />
                                    </div>
                                    <p className=" text-xl me-2" >Home</p>
                                    <MdKeyboardArrowDown className="mt-1" />
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={"/Brands"}>
                                <div className="flex flex-row items-center text-[#3e445a] mt-[0.7px]">
                                    <div className="me-1 mt-[0.5px]">
                                        <TbBrandShopee />
                                    </div>
                                    <p className=" text-xl me-2" >Brands</p>
                                    <MdKeyboardArrowDown className="mt-1" />
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Wishlist"}>
                                <div className="flex flex-row items-center text-[#3e445a] mt-[0.7px]">
                                    <div className="me-1 mt-[0.5px]">
                                        <FaHandHoldingHeart />
                                    </div>
                                    <p className=" text-xl me-2" >Wishlist</p>
                                    <MdKeyboardArrowDown className="mt-1" />
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/ContactPage"}>
                                <div className="flex flex-row items-center text-[#3e445a] mt-[0.7px]">
                                    <div className="me-1 mt-[0.5px]">
                                        <BiSupport />
                                    </div>
                                    <p className=" text-xl me-2" >Contact</p>
                                    <MdKeyboardArrowDown className="mt-1" />
                                </div>
                            </NavLink>
                        </li>
                    </ul>


                </div>



            </div>







            <StaggeredMenu

                position="right"

                items={AuthMenuItems}

                socialItems={socialItems}

                displaySocials={true}

                displayItemNumbering={true}

                menuButtonColor="#3e445a"

                openMenuButtonColor="#3e445a"

                changeMenuColorOnOpen={true}

                colors={['#B19EEF', '#5227FF']}

                logoUrl="/path-to-your-logo.svg"

                accentColor="#09822f"

                className={" "}


            />

        </nav>
    );
};

export default AuthNavbar;
