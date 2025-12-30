import React, { useContext, useEffect, useState } from "react";
import { MyWishListContext } from "../Contexts/WishlistContext/WishListContext";
import toast from "react-hot-toast";
import FreshCartLoader from "../Loading/Loader/Loader";




export default function Wishlist() {






    const { AddProductInWishList, DeleteProductFromWishList, Userwishlist } = useContext(MyWishListContext);
    const [loading, setLoading] = useState(true);
    const [loadingItem, setLoadingItem] = useState(null);

    setTimeout(() => {
        setLoading(false);
    }, 1000);

    async function RemoveProductFromWishList(ProductID) {
        setLoadingItem(ProductID); // show loader only on this item

        const flag = await DeleteProductFromWishList(ProductID);

        if (flag) {
            toast.success("Removed Successfully");
        } else {
            toast.error("This is an error!");
        }

        setLoadingItem(null); // remove loader
    }



    if (loading) return <FreshCartLoader />;


    return <>
        <head>
            <meta charSet="utf-8" />
            <title>Whishlist</title>

        </head>

        <div id="whishlist" className="max-w-7xl mx-auto px-6 py-12 whishlist">
            {/* Header */}
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900">Wishlist</h1>
                <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
                    737 inspirational designs, illustrations, and graphic elements from the world's best
                    designers. Want more inspiration? Browse our search results...
                </p>
            </header>




            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Userwishlist?.map((product) => (<article key={product._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300" aria-labelledby={`title-${product._id}`} >
                    {/* Card Image */}
                    <div className="relative h-56 md:h-64 lg:h-62">  <img src={product.imageCover} alt={product.title} className="object-cover w-full h-full" loading="lazy" />

                        {/* RGBA overlay (uses inline style to match exact rgba) */}
                        <div role="presentation" className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} >
                            {/* Trash button centered */}
                            <button
                                className="pointer-events-auto cursor-pointer p-3 rounded-full bg-white/95 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-250"
                                aria-label={`Remove ${product.title} from wishlist`}
                            >
                                {loadingItem === product._id ? (
                                    // Small spinner loader
                                    <div className="w-5 h-5 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <svg
                                        onClick={() => RemoveProductFromWishList(product._id)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#111827"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                                        <path d="M10 11v6"></path>
                                        <path d="M14 11v6"></path>
                                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                )}
                            </button>

                        </div>


                    </div>

                    {/* Card footer */}
                    <div className="px-4 py-3">
                        <h3 id={`title-${product._id}`} className="text-sm font-semibold text-slate-900">
                            {product.title}
                        </h3>
                        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-6 h-2 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium">

                                    </span>
                                    <span></span>
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#9CA3AF" aria-hidden="true"  >
                                        <path d="M12 21s-7-4.686-9-8.118C1.605 9.66 5.09 6 8.5 6c1.97 0 3.48 1.002 3.5 1.02.02-.018 1.53-1.02 3.5-1.02 3.41 0 6.895 3.66 5.5 6.882C19 16.314 12 21 12 21z" />
                                    </svg>
                                    <span className="text-xs text-slate-400"></span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#9CA3AF" aria-hidden="true" >
                                        <path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7zm0 10a3 3 0 1 1 .001-6.001A3 3 0 0 1 12 15z" />
                                    </svg>
                                    <span className="text-xs text-slate-400"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                ))}
            </div>

            {/* Empty state */}
            {Userwishlist.length === 0 && (
                <div className="mt-12 text-center text-slate-500">
                    Your wishlist is empty. Start adding items you love ✨
                </div>
            )}
        </div>

    </>
}
