import React, { useContext, useEffect, useState } from 'react'

import style from "./Home.module.css"
import SimpleSlider from './mainBannerSlider/BannerSlider';
import { FaBars } from "react-icons/fa6";
import { BsGrid } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import axios from 'axios';

import fiveStars from "../../assets/fiveStars.png";
import fourAndHalfStarRating from "../../assets/fourAndHalfStarRating.png";
import fourStarRating from "../../assets/fourStarRating.png";
import threeAndHalfStarRating from "../../assets/threeAndHalfStarRating.png";
import threeStarRating from "../../assets/threeStarRating.png";
import twoAndHalfStarRating from "../../assets/twoAndHalfStarRating.png";
import twoStarRating from "../../assets/twoStarRating.png";
import oneAndHalfStarRating from "../../assets/oneAndHalfStarRating.png";
import oneStarRating from "../../assets/oneStarRating.png";
import halfStarRating from "../../assets/halfStarRating.png";
import noRating from "../../assets/NoRating.png";
import PhoneFilterList from './PhoneFilterList';

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { MyCartContext } from '../Contexts/CartContext/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { MyWishListContext } from '../Contexts/WishlistContext/WishListContext';
import { useFilter } from '../Contexts/FilterContext/FilterContext';
import FreshCartLoader from '../Loading/Loader/Loader';
import { Helmet } from 'react-helmet';
import cartLogo from "../../assets/cart.png"
import { Commet } from 'react-loading-indicators';


export default function Home() {


  //   =======================UseStates========================================
  const [active, setActive] = useState("grid4");
  const [isProduct, SetIsProduct] = useState([{}])
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ProductLoading, setProductLoading] = useState(false);
  const [CategoriesProducts, setCategoriesProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //For Pagination
  //   =======================UseContexts=======================================
  const { AddProduct, NumOfCartItems, TotalCartPrise } = useContext(MyCartContext);
  const { AddProductInWishList, DeleteProductFromWishList } = useContext(MyWishListContext);
  const { filters, updateFilters } = useFilter();
  const { search, category, minPrice, maxPrice, sort } = filters;
  // ======================GlobleVariables===========================
  const productsPerPage = active === "grid2" ? 8 : active === "grid3" ? 9 : active === "grid4" ? 8 : 6;

  // ============================TimeFunction====================================
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  // ---------------------------------------------------------------------------







  // ===========================CART=================================//
  async function HandelAddProduct(ProductID) {



    const flag = await AddProduct(ProductID)

    if (flag) {
      toast.success('Added Successfully');
    } else {
      toast.error('This is an error!');
    }
  }
  // =========================WishList================================//
  async function HandelAddProductToWishList(ProductID) {



    const flag = await AddProductInWishList(ProductID)

    if (flag) {
      toast.success('Added Successfully');
    } else {
      toast.error('This is an error!');
    }
  }
  async function RemoveProductFromWishList(ProductID) {



    const flag = await DeleteProductFromWishList(ProductID)

    if (flag) {
      toast.success('Removed Successfully');
    } else {
      toast.error('This is an error!');
    }
  }
  async function toggleWishlist(productId) {

    const isInWishlist = wishlist.includes(productId);

    if (isInWishlist) {
      // Update UI instantly
      setWishlist((prev) => prev.filter((id) => id !== productId));



      // Then call API
      await RemoveProductFromWishList(productId);


    } else {
      // Update UI instantly
      setWishlist((prev) => [...prev, productId]);

      // Then call API
      await HandelAddProductToWishList(productId);
      localStorage.setItem("product", productId)
    }
  }
  // =========================Categories================================//
  async function GetCategories() {

    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

    setCategoriesProducts(data?.data)


  }
  // =========================HomePageGridDesign================================//
  async function GetHomeProducts(params) {

    const { data } = await axios?.get("https://ecommerce.routemisr.com/api/v1/products")

    SetIsProduct(data?.data)




  }
  function ChanageGridStyle() {
    if (active == "grid4") return ` ${style.CardContainer} grid grid-cols-2  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-4 `
    if (active == "grid3") return ` ${style.CardContainer} grid grid-cols-2  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  gap-4 `
    if (active == "grid2") return ` ${style.CardContainer} grid grid-cols-1  sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4 `
    if (active == "bars") return ` ${style.CardContainer} grid grid-cols-2  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1  gap-4 `

  }
  function ChanageGridCardStyle() {
    if (active == "grid4") return `${style.CardBody} bg-white border border-gray-300 rounded-xl shadow-sm p-3 hover:shadow-md transition`
    if (active == "grid3") return `${style.CardBody} bg-white border border-gray-300 rounded-xl shadow-sm p-3 hover:shadow-md transition`
    if (active == "grid2") return ` ${style.CardBody} bg-white border border-gray-300 rounded-xl shadow-sm p-3 hover:shadow-md transition `
    if (active == "bars") return ` ${style.CardBody} flex flex-row-revers bg-white border border-gray-300 rounded-xl shadow-sm p-3 hover:shadow-md transition  h-60 `

  }
  function ChanageGridImgSize() {
    if (active == "grid4") return ` w-full h-60 object-contain mb-3 `
    if (active == "grid3") return ` w-full h-70 object-contain mb-3`
    if (active == "grid2") return ` w-full h-80 object-contain mb-3 `
    if (active == "bars") return ` w-100 h-full object-contain mb-3 ms-3   `

  }
  const getStars = (rating) => {
    if (rating == 5) return fiveStars;
    if (rating >= 4.5) return fourAndHalfStarRating;
    if (rating >= 4) return fourStarRating;
    if (rating >= 3.5) return threeAndHalfStarRating;
    if (rating >= 3) return threeStarRating;
    if (rating >= 2.5) return twoAndHalfStarRating;
    if (rating >= 2) return twoStarRating;
    if (rating >= 1.5) return oneAndHalfStarRating;
    if (rating >= 1) return oneStarRating;
    if (rating >= 0.5) return halfStarRating;
    if (rating < 0.5) return noRating;

  };
  // ======================PaginationFunctions===========================
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = isProduct.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(isProduct.length / productsPerPage);








  //*******************************UseEffects && Loader**************************************** 
  useEffect(() => {
    GetHomeProducts();
    GetCategories();
  }, [])
  useEffect(() => {
    setProductLoading(true)
    const params = new URLSearchParams();
    if (search) params.append("keyword", search);
    if (category) params.append("category", category);
    params.append("price[gte]", minPrice);
    params.append("price[lte]", maxPrice);
    if (sort === "Latest") params.append("sort", "-createdAt");
    if (sort === "Price: Low to High") params.append("sort", "price");
    if (sort === "Price: High to Low") params.append("sort", "-price");

    fetch(`https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        SetIsProduct(data.data);
        setProductLoading(false);
      })
      .catch(() => setProductLoading(false));
  }, [search, category, minPrice, maxPrice, sort]);

  if (loading) return <FreshCartLoader />;










  return <>
    <head>
      <meta charSet="utf-8" />
      <title>Home</title>

    </head>


    <div onLoad={() => setLoading(false)} className=' bg-gray-50 min-h-screen z-400 p-4 md:p-8' >

      <div className="flex flex-col md:flex-row w-full overflow-hidden  xl:w-[85%] xl:mx-auto">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-50 rounded-xl  p-4 mb-6 md:mb-0 md:mr-6 hidden xl:block " >
          <h2 className="font-semibold text-gray-800 text-lg mb-4">
            Product Categories
          </h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            {CategoriesProducts.map((cat) => (
              <li key={cat._id} value={filters.category} onClick={() => updateFilters({ category: cat._id })} className={`flex items-center justify-between hover:text-green-600 cursor-pointer  ${filters.category === cat._id ? "text-green-600 font-semibold" : ""}`}  >
                <span>{cat.name}</span>
                <span className="text-gray-400 text-lg">+</span>
              </li>
            ))}
          </ul>


          {/* Filter by price */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm uppercase">
              Filter by Price
            </h3>
            <input type="range" min="0" max="120000" value={filters.maxPrice} className="w-full accent-green-600" onChange={(e) => updateFilters({ maxPrice: e.target.value })} />
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Price: ${filters.maxPrice}</span>
              <button className="text-green-600 font-semibold">Filter</button>
            </div>
          </div>


        </aside>

        {/* Product Section */}
        <main className="flex-1  md:w-[82%]">
          {/* Banner */}
          <div className=" rounded-xl overflow-hidden mb-6  ">
            <SimpleSlider />

          </div>

          {/* Sorting */}
          <div className=" items-center justify-between bg-white shadow-sm  rounded-xl px-4 py-2 mb-4 hidden xl:flex">
            <div className="flex items-center space-x-3">

              {/* Bars */}
              <button onClick={() => setActive("bars")} className={`p-2 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 ${active === "bars" ? "bg-gray-200" : ""}`} >
                <FaBars className={active === "bars" ? "text-black" : "text-gray-400"} />
              </button>

              {/* Grid 2 */}
              <button onClick={() => setActive("grid2")} className={`p-2 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 ${active === "grid2" ? "bg-gray-200" : ""}`} >
                <BsGrid className={active === "grid2" ? "text-black" : "text-gray-400"} />
              </button>

              {/* Grid 3 */}
              <button onClick={() => setActive("grid3")} className={`p-2 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 ${active === "grid3" ? "bg-gray-200" : ""}`} >
                <BsGrid3X3Gap className={active === "grid3" ? "text-black" : "text-gray-400"} />
              </button>

              {/* Grid 4 */}
              <button onClick={() => setActive("grid4")} className={`p-2 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 ${active === "grid4" ? "bg-gray-200" : ""}`} >
                <TfiLayoutGrid4Alt className={active === "grid4" ? "text-black" : "text-gray-400"} />
              </button>

            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <span>Sort by</span>
              <select className="border border-gray-300 rounded-lg p-1" onChange={(e) => updateFilters({ sort: e.target.value })}>
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          {/* PhoneFilterList */}
          <PhoneFilterList />







          {/* Products Cards Grid */}
          <div className={ChanageGridStyle()}>
            {ProductLoading ?
              <div className="flex justify-center items-center w-[1000px] h-[200px] ">
                <Commet color="#32cd32" size="medium" text="" textColor="" />
              </div> : currentProducts && currentProducts.length > 0 ? currentProducts?.map((item) => (<div key={item._id} className={ChanageGridCardStyle()} >
                {/* Card Body */}
                <Link to={`/ProductDetails/${item._id}`}>
                  <img src={item.imageCover} alt={item.name} className={ChanageGridImgSize()} />  {/* ProductImage */}
                </Link>

                {active != "bars" ? <div className="flex flex-col  items-start gap-2 mt-1 relative">

                  <Link to={`/ProductDetails/${item._id}`}>
                    <h4 className="text-sm font-medium text-gray-800 mb-[-5px] line-clamp-2 hover:text-green-500 transition-all">  {/* ProductTitle */}
                      {item?.title?.split(" ").slice(0, 2).join(" ")}
                    </h4>
                  </Link>
                  {/* if Product Is Available or Nor */}
                  {item.quantity >= 1 ? <p className='text-[12px] text-green-600 mb-[-6px]' >In Stock</p> : <p className='text-[12px]   text-[#d51243]' >Out of stock</p>}

                  <button onClick={() => toggleWishlist(item._id)} className="ml-auto  absolute right-0 cursor-pointer " > {/* AddProductToWishlistBtn */}
                    {wishlist.includes(item._id) ? (
                      <FaHeart className="text-red-500 text-[20px] transition hover:scale-110" />
                    ) : (
                      <FiHeart className="text-red-500 text-[20px] transition hover:scale-110" />
                    )}
                  </button>

                  <div className='flex flex-nowrap mb-[-4px]'> {/* ProductRatingAverage */}
                    <img src={getStars(item.ratingsAverage)} className="w-20 ms-[-6px] me-1" alt="" />
                    <span className='text-gray-700 text-[14px]'>
                      {item.ratingsAverage}
                    </span>
                  </div>


                  <span className="text-[#d51243] font-semibold text-[16px] ms-0.5 mb-0"> {/* ProductPrice */}
                    {item.price} EGP
                  </span>


                  <div className=' flex justify-center items-center text-center w-full'> {/* AddProductToCartBtn */}


                    <button onClick={() => HandelAddProduct(item._id)} className=' transition-all ms-auto me-auto w-[100%] h-10  cursor-pointer hover:bg-green-600 hover:text-white border-2 border-green-600 rounded-4xl text-green-600 text-[15px] ' >Add to cart</button>
                  </div>

                </div>
                  : <div className=" flex flex-col  items-start gap-2 mt-1  w-100 py-1 px-2" > {/* BarCardsStyle */}

                    <Link to={`/ProductDetails/${item._id}`}>
                      <h4 className="text-[17px] font-medium text-gray-800 mb-0 line-clamp-2 hover:text-green-500 transition-all "> {/* ProductTitle */}
                        {item?.title?.split(" ").slice(0, 3).join(" ")}
                      </h4>
                    </Link>
                    {/* if Product Is Available or Nor */}
                    {item.quantity >= 1 ? <p className='text-[12px] text-green-600' >In Stock</p> : <p className='text-[12px]   text-[#d51243]' >Out of stock</p>}



                    <div className='flex flex-nowrap '> {/* ProductRatingAverage */}
                      <img src={getStars(item.ratingsAverage)} className="w-20 ms-[-6px] me-1" alt="" />
                      <span className='text-gray-700 text-[14px]'>
                        {item.ratingsAverage}
                      </span>
                    </div>


                    <span className="text-[#d51243] font-semibold text-[16px] ms-0.5 mb-2"> {/* ProductPrice */}
                      {item.price} EGP
                    </span>

                    {/* AddProductToCartBtn && AddProductToWishlistBtn */}
                    <div className=' flex flex-col justify-center items-center text-center w-full  ms-[-5px]'>
                      {/* AddProductToWishlistBtn */}
                      <button onClick={() => toggleWishlist(item._id)} className="transition-all w-[40%] h-8 cursor-pointer font-[600] me-auto mb-2 border-2 border-[#71778e] text-[#71778e] rounded-4xl flex items-center justify-center text-[15px]">
                        {wishlist.includes(item._id) ? (
                          <>
                            <FaHeart className="text-[#71778e] me-1 text-[18px]" /> Add to Wishlist
                          </>
                        ) : (
                          <>
                            <FiHeart className="text-[#71778e] me-1 text-[18px]" /> Add to Wishlist
                          </>
                        )}
                      </button>



                      {/* AddProductToCartBtn */}
                      <button onClick={() => HandelAddProduct(item._id)} className=' transition-all  me-auto w-[25%] h-9  font-[600] cursor-pointer bg-green-600 text-white  rounded-4xl  text-[13px] ' >Add to cart</button>
                    </div>

                  </div>
                }


              </div>
              )) : <div className='flex justify-center font-bold text-gray-400  text-xl w-[1000px]'>Sorry no products found</div>}

          </div>
          {/* Pagination */}
          {currentProducts && currentProducts.length > 0 && <div className="flex justify-center items-center gap-2 mt-6">

            {/* Previous Button */}
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className={`px-3 py-1 cursor-pointer border rounded-xl ${currentPage === 1 ? "text-gray-300 border-gray-300" : "hover:bg-green-600 hover:text-white border-green-600"}`} >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-3 py-1 cursor-pointer border rounded-xl ${currentPage === index + 1 ? "bg-green-600 text-white border-green-600" : "border-gray-300 hover:bg-green-600 hover:text-white"}`} >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className={`px-3 cursor-pointer py-1 border rounded-xl ${currentPage === totalPages ? "text-gray-300 border-gray-300" : "hover:bg-green-600 hover:text-white border-green-600"}`} >
              Next
            </button>

          </div> }

        </main>
      </div>
    </div>




  </>


}
