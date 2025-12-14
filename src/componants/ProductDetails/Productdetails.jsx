import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import FreshCartLoader from "../Loading/Loader/Loader";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";

// ⭐ Rating Images
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
import noRating from "../../assets/noRating.png";


import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MyCartContext } from "../Contexts/CartContext/CartContext";
import toast from "react-hot-toast";
import { MyWishListContext } from "../Contexts/WishlistContext/WishListContext";

export default function ProductDetails() {
    const { AddProduct, NumOfCartItems, TotalCartPrise } = useContext(MyCartContext);

    const { AddProductInWishList, DeleteProductFromWishList } = useContext(MyWishListContext);
    const [wishlist, setWishlist] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [selectedTab, setSelectedTab] = useState("description"); //  active tab
    const navigate = useNavigate()
    const { id } = useParams();









    async function getProductDetails() {

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

    }
    async function HandelAddProduct(ProductID) {



        const flag = await AddProduct(ProductID)

        if (flag) {
            toast.success('Added Successfully');
            setTimeout(() => {
                navigate("/")
            }, 1300);
        } else {
            toast.error('This is an error!');
        }
    }










    const { isLoading, data } = useQuery({
        queryKey: ["ProductId", id],
        queryFn: getProductDetails,
    });



    const product = data?.data?.data;
    function handelScreenScroll() {
        if (window.scrollY > 20) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }


    useEffect(() => {
        handelScreenScroll()
    }, []);


    //  Set main image when data loads
    if (!mainImage && product?.imageCover) {
        setMainImage(product.imageCover);
    }

    //  Toggle wishlist
    const toggleWishlist = (productId) => {
        setWishlist((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };
    async function HandelAddProductToWishList(ProductID) {



        const flag = await AddProductInWishList(ProductID)

        if (flag) {
            toast.success('Added Successfully');
        } else {
            toast.error('This is an error!');
        }
    }





    //  Rating stars
    const getStars = (rating) => {
        if (rating === 5) return fiveStars;
        else if (rating >= 4.5) return fourAndHalfStarRating;
        else if (rating >= 4) return fourStarRating;
        else if (rating >= 3.5) return threeAndHalfStarRating;
        else if (rating >= 3) return threeStarRating;
        else if (rating >= 2.5) return twoAndHalfStarRating;
        else if (rating >= 2) return twoStarRating;
        else if (rating >= 1.5) return oneAndHalfStarRating;
        else if (rating >= 1) return oneStarRating;
        else if (rating >= 0.5) return halfStarRating;
        else return noRating;
    };

    //  Tab content function
    const renderTabContent = () => {
        switch (selectedTab) {
            case "description":
                return (
                    <p className="text-gray-600 leading-7 mb-4 px-4">{product.description}</p>
                );
            case "info":
                return (
                    <div className="text-gray-600 px-4 pb-4 leading-7">
                        <p><strong>Category:</strong> {product.category.name}</p>
                        <p><strong>Brand:</strong> {product.brand.name}</p>
                        <p><strong>Available Quantity:</strong> {product.quantity}</p>
                        <p><strong>Price:</strong> {product.price} EGP</p>
                    </div>
                );
            case "reviews":
                return (
                    <div className="px-4 pb-4 text-gray-600 leading-7">
                        <p>⭐ <strong>Rating:</strong> {product.ratingsAverage}</p>
                        <p>No user reviews yet.</p>
                    </div>
                );
            default:
                return null;
        }
    };


    if (isLoading) return <FreshCartLoader />;

    return (
        <div className="w-full bg-gray-50 pt-8 pb-10">
            <div className=' flex flex-row  items-center w-[80%] mx-auto mb-5'>
                <p className='text-[13px]   lg:text-[18px] text-gray-500 hover:text-green-500'> <Link to={"/Home"} > Home </Link> </p>
                <span className="mt-0.5 ms-1" ><MdOutlineArrowForwardIos /></span>
                <p className='text-[13px]  lg:text-[18px]  text-gray-500 ms-1'>{product.subcategory[0].name}</p>
                <span className="mt-0.5 ms-1" ><MdOutlineArrowForwardIos /></span>
                <p className='text-[13px] lg:text-[18px]  text-green-500 ms-1'>{product.title.split("").slice(0,32).join("") }</p>
            </div>
            <div className="max-w-7xl mx-auto mb-25 py-10 px-4 w-[80%]  xl:w-[90%]  grid grid-cols-1 md: xl:grid-cols-2 gap-10 border-2 border-gray-100 bg-white rounded-2xl">
                {/*  Left Section */}
                <div className="flex flex-col items-center">
                    <img src={mainImage} alt="product" className="rounded-xl w-80 h-auto transition-all duration-300" />
                    <div className="flex gap-4 mt-4 flex-wrap justify-center">
                        {product.images.map((img) => (
                            <img
                                key={img}
                                src={img}
                                alt="thumb"
                                onClick={() => setMainImage(img)} // 👈 change main image
                                className={`w-16 h-16 rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? "border-green-500 ring-2 ring-green-300" : "border-transparent"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/*  Right Section */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

                    <div className="text-gray-500 text-sm mb-2">
                        Brand: {product.brand.name} ‖ Quantity: {product.quantity}
                    </div>

                    <div className="flex items-center mb-2">
                        <img src={getStars(product.ratingsAverage)} className="w-20 me-2" alt="rating" />
                        <span className="text-gray-700 text-sm">{product.ratingsAverage}</span>
                    </div>

                    <p className="text-red-600 text-2xl font-bold mb-1">{product.price} EGP</p>
                    <p className={`text-[16px] my-2 ${product.quantity >= 1 ? "text-green-600" : "text-[#d51243]"}`}>
                        {product.quantity >= 1 ? "In Stock" : "Out of Stock"}
                    </p>

                    <p className="text-gray-600 mb-6 max-w-md">{product.description}</p>

                    {/* Quantity + Cart */}
                    <div className="sm:flex items-center gap-3 mb-4 hidden ">


                        <button onClick={() => HandelAddProduct(product._id)} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer">
                            Add to Cart
                        </button>
                    </div>

                    {/* Wishlist */}
                    <button onClick={() => { toggleWishlist(product._id), HandelAddProductToWishList(product._id) }} className={`w-[89%] cursor-pointer hidden sm:w-[40%] h-9 border-2 rounded-4xl sm:flex items-center justify-center text-[15px] font-semibold transition-all ${wishlist.includes(product._id) ? "bg-green-100 border-green-600 text-green-600" : "border-[#71778e] text-[#71778e]"}`} >
                        {wishlist.includes(product._id) ? (
                            <>
                                <FaHeart className="me-2 text-green-600 text-[18px]" />
                                Added to Wishlist
                            </>
                        ) : (
                            <>
                                <FiHeart className="me-2 text-[#71778e] text-[18px]" />
                                Add to Wishlist
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/*  Tabs Section */}
            <div className="max-w-7xl mx-auto mt-10 pt-4 border-2 w-[80%] xl:w-[90%] border-[#edeef5] bg-white rounded-2xl">
                <div className="border-b-2 border-[#edeef5] mb-4 pb-2 px-4 flex  flex-col   text-start sm:flex-row sm:text-center gap-8 text-gray-600 font-medium">
                    <button onClick={() => setSelectedTab("description")}
                        className={selectedTab === "description" ?
                            "text-green-600 border-b-2 border-green-600 pb-1 w-21 mb-[-24px] sm:mb-0 sm:w-auto " : "w-21 mb-[-20px] sm:mb-0 sm:w-auto"}   >
                        Description
                    </button>
                    <button onClick={() => setSelectedTab("info")}
                        className={selectedTab === "info" ?
                            "text-green-600 border-b-2 border-green-600 pb-1 w-41 mb-[-25px] sm:mb-0 sm:w-auto  " : "w-41 mb-[-25px] sm:mb-0 sm:w-auto"} >
                        Additional Information
                    </button>
                    <button onClick={() => setSelectedTab("reviews")}
                        className={selectedTab === "reviews" ?
                            "text-green-600 border-b-2 border-green-600 pb-1 w-15  sm:w-auto" : "w-15  sm:w-auto"} >
                        Reviews
                    </button>
                </div>

                {renderTabContent()}
            </div>






            {/* Mobile Fixed Bottom Bar (hidden on large screens) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-300 shadow-lg flex items-center justify-center px-4 py-4 md:hidden z-50">
                <div className="flex items-center  justify-around w-full gap-2">

                    {/* Wishlist Button */}
                    <button
                        onClick={() => {
                            toggleWishlist(product._id);
                            HandelAddProductToWishList(product._id);
                        }}
                        className={`flex items-center justify-center gap-2 px-4 py-[10px] rounded-full border-2 text-[14px] font-semibold transition-all
                ${wishlist.includes(product._id)
                                ? "bg-green-100 border-green-600 text-green-600"
                                : "border-[#71778e] text-[#71778e]"
                            }`}
                    >
                        {wishlist.includes(product._id) ? (
                            <>
                                <FaHeart className="text-green-600 text-[18px]" />
                                Added to Wishlist
                            </>
                        ) : (
                            <>
                                <FiHeart className="text-[#71778e] text-[18px]" />
                                Add to Wishlist
                            </>
                        )}
                    </button>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => HandelAddProduct(product._id)}
                        className="bg-green-600 text-white px-10 py-[10px] rounded-full font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    );
}
