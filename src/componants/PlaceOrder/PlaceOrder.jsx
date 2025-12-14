import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./PlaceOrder.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { MyAuthContext } from '../Contexts/UserContext/UserContext'
import { MyCartContext } from '../Contexts/CartContext/CartContext'
import Swal from 'sweetalert2'


export default function PlaceOrder() {

    const { istoken } = useContext(MyAuthContext);
    const { CartID, SetCartID, SetAllProducts, SetNumOfCartItems, SetTotalCartPrise } = useContext(MyCartContext);
    const [UserChoice, setUserChoice] = useState(true);
    const [loading, setLoading] = useState(false);


    const Navigate = useNavigate()




    const orderFormik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: HandleUserChoice,
    });

    function HandleUserChoice(values) {
        if (UserChoice) {
            CreateCashOrder(values);
        } else {
            CreateOnlinePaymentOrder(values);
        }
    }

    function clearUI() {
        SetAllProducts(0);
        SetNumOfCartItems(0);
        SetTotalCartPrise(0);
        SetCartID(null);
    }

    async function CreateCashOrder(value) {
        const BackEndBody = { shippingAddress: value };

        setLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartID}`, BackEndBody, {
            headers: { token: istoken }
        }).then(() => {
            setLoading(false);
            clearUI()
            Swal.fire({
                title: "congratulations 🎉!",
                text: `your order is in proccess we will conect with you by your phone number  to tell you any new informations as fast as possible`,
                icon: "success",
                draggable: true
            });
            Navigate("/Home")



        }).catch(err => { setLoading(false); });
    }

    async function CreateOnlinePaymentOrder(value) {
        const BackEndBody = { shippingAddress: value };
        setLoading(true);

        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}`,
                BackEndBody,
                {
                    headers: {
                        token: istoken,
                    },
                    params: {
                        url: "http://localhost:3000",  // only once
                    },
                }
            );

            setLoading(false);

            // Redirect to Stripe / session URL
            if (res?.data?.session?.url) {
                window.location.href = res.data.session.url;
            } else {
                console.error("No session URL returned:", res.data);
            }
        } catch (err) {
            setLoading(false);
            console.error("Payment API error:", err);
        }
    }


    return (
        <>

            <head>
                <meta charSet="utf-8" />
                <title>PlaceOrder</title>

            </head>

            {loading && (
                <div id='loadingBackGround' className=" fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3">
                        <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <p className="text-gray-700 font-semibold">Processing your order...</p>
                    </div>
                </div>
            )}
            <div className="h-full bg-gray-50 flex justify-center px-20 p-4">
                <div className="relative py-10 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10 border border-green-400">
                        <div className="max-w-md mx-auto">

                            {/* address form!! */}
                            <form onSubmit={orderFormik.handleSubmit}>

                                <div className="mt-5 flex flex-col gap-0 ">

                                    <div className=''>
                                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Details</label>
                                        <input placeholder="details" name="details" value={orderFormik.values.details} onBlur={orderFormik.handleBlur} onChange={orderFormik.handleChange} className="border capitalize placeholder-gray-500 text-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:ring-2 focus:ring-green-500" />
                                    </div>

                                    <div>
                                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Phone</label>
                                        <input placeholder="phone" name="phone" value={orderFormik.values.phone} onBlur={orderFormik.handleBlur} onChange={orderFormik.handleChange} className="border capitalize placeholder-gray-500 text-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:ring-2 focus:ring-green-500" />
                                    </div>

                                    <div>
                                        <label className="font-semibold text-sm text-gray-600 pb-1 block">City</label>
                                        <input placeholder="city" name="city" value={orderFormik.values.city} onBlur={orderFormik.handleBlur} onChange={orderFormik.handleChange} className="border capitalize placeholder-gray-500 text-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:ring-2 focus:ring-green-500" />
                                    </div>

                                </div>

                                <div className="flex justify-center items-center mt-4">
                                    <div className="w-full">

                                        <button onClick={() => { setUserChoice(true); orderFormik.handleSubmit(); }} className="cursor-pointer flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-base font-semibold shadow-md rounded-lg">
                                            <img style={{ width: "12%" }} src="https://cdn-icons-png.flaticon.com/512/5359/5359689.png" alt="Cash" />
                                            <span className="ms-2 mb-2">Cash Order</span>
                                        </button>

                                        <button onClick={() => { setUserChoice(false); orderFormik.handleSubmit(); }} className="cursor-pointer flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-base font-semibold shadow-md rounded-lg mt-4">
                                            <img style={{ width: "12%" }} src="https://cdn-icons-png.flaticon.com/512/639/639365.png" alt="Online" />
                                            <span className="ms-2 mb-2">Online Pay</span>
                                        </button>

                                    </div>
                                </div>

                            </form>

                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b md:w-1/4" />
                                <Link to="/Home" className="text-xs text-green-500 uppercase hover:underline">
                                    Thank you for using FreshCart
                                </Link>
                                <span className="w-1/5 border-b md:w-1/4" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}
