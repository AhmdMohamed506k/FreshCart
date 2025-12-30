import React, { useContext, useEffect, useState } from "react";
import { FiMoreHorizontal, FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { MyCartContext } from "../Contexts/CartContext/CartContext";
import axios from "axios";
import FreshCartLoader from "../Loading/Loader/Loader";






export default function AllOrders() {
    // ======================UseStates===========================
    const [userOrders, setUserOrders] = useState([]); // initialize as array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  //For Pagination
    const [itemsPerPage, setItemsPerPage] = useState(5); //For Pagination
    // ======================UseContexts===========================
    const { CartOwner } = useContext(MyCartContext);
    // ======================GlobleVariables===========================
    const cartOwnerId = localStorage.getItem("cartOwnerId");
    const totalPages = Math.ceil(userOrders.length / itemsPerPage); //For Pagination
    const indexOfLastItem = currentPage * itemsPerPage; //For Pagination
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; //For Pagination
    const currentOrders = userOrders.slice(indexOfFirstItem, indexOfLastItem); //For Pagination
    let SpendBox = 0;






    setTimeout(() => {
        setLoading(false)
    }, 2000);
    // ======================GetUserOrders && it UseEffects===========================
    async function getUserOrders() {
        if (!CartOwner && !cartOwnerId) return;

        try {
            const ownerId = CartOwner || cartOwnerId;

            const res = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`
            );

            setUserOrders(res.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    userOrders.map((s) => { SpendBox += s.totalOrderPrice; })
    useEffect(() => {
        getUserOrders()
    }, [CartOwner]);





    // ======================PaginationFunctions===========================
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };





    // ======================Loader===========================
    if (loading) return <FreshCartLoader />;


    return <>
        <head>
            <meta charSet="utf-8" />
            <title>OrdersDashboard</title>

        </head>



        <div className="min-h-screen bg-gray-50 pt-10 px-4 xl:px-45 ">
            {/* Title Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold mb-4 md:mb-0">Orders</h1>

            </div>

            {/* Stats Summary */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Total Revenue */}
                <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-300 rounded-full">
                            <AiOutlineArrowUp className="text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-xl font-bold">{SpendBox} EGP</p>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <AiOutlineArrowUp /> from last week
                            </p>
                        </div>
                    </div>
                </div>
                {/* Total Orders */}
                <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <AiOutlineArrowUp className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-xl font-bold">{userOrders.length}</p>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <AiOutlineArrowUp /> from last week
                            </p>
                        </div>
                    </div>
                </div>
                {/* Total Returns */}
                <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AiOutlineArrowDown className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Returns</p>
                            <p className="text-xl font-bold">0</p>
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AiOutlineArrowDown /> from last week
                            </p>
                        </div>
                    </div>
                </div>


            </div>

            {/* Order Summary Section */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 ">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Order Summary</h2>
                        <p className="text-sm text-gray-500">
                            Overview of total orders, returns, and revenue
                        </p>
                    </div>

                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead className="bg-green-300 text-center">
                            <tr>
                                <th className="p-3">
                                    <input type="checkbox" className="form-checkbox h-4 w-full text-green-500" />
                                </th>
                                <th className="ms-auto me-auto">Order Id</th>
                                <th className="ms-auto me-auto">Buyer</th>
                                <th className="ms-auto me-auto">Date</th>
                                <th className="ms-auto me-auto">Total</th>
                                <th className="ms-auto me-auto">Payment Method</th>

                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentOrders.map((order, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 border-b border-gray-200 transition">
                                    <td className="p-3">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500" />
                                    </td>
                                    <td className="p-3">{order.id}</td>
                                    <td className="p-3">{order?.user?.name}</td>
                                    <td className="p-3">{order?.createdAt?.slice(0, 10)}</td>
                                    <td className="p-3">{order?.totalOrderPrice} EGP</td>
                                    <td className="p-3">{order?.paymentMethodType}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">

                    {/* Items per page */}
                    <div>
                        <label className="text-sm text-gray-500 mr-2">Items per page:</label>
                        <select
                            className="rounded-lg border border-gray-200 px-3 py-1"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // reset to first page
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>

                        </select>
                    </div>

                    {/* Page buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                            onClick={prevPage}
                        >
                            <FiChevronLeft />
                        </button>

                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                className={`px-3 py-1 rounded-lg border ${currentPage === idx + 1
                                    ? "bg-green-500 text-white border-green-500"
                                    : "border-gray-200 text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => goToPage(idx + 1)}
                            >
                                {idx + 1}
                            </button>
                        ))}

                        <button
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                            onClick={nextPage}
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </>



}
