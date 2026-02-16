import React, { useContext, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as yup from "yup"
import { enqueueSnackbar, useSnackbar } from "notistack";
import axios from "axios";
import { MyAuthContext } from "../Contexts/UserContext/UserContext";
import ChangePasswordModal from "./ChangePassword";


export default function ChangeInfo() {




    //  =========================UseStates=============================
    const [isClicked, SetIsClicked] = useState(false);
    //  =========================UseNavigate=============================
    const navigat = useNavigate()
    //  =========================UseContexts=============================
    const { istoken, setToken } = useContext(MyAuthContext)
    //  =========================UseSnackbar=============================
    const { enqueueSnackbar } = useSnackbar();














    //  =========================UseFormikFunctions=============================

    const ChangeInfoFormik = useFormik({
        initialValues: {

            name: '',
            email: '',
            phone: '',



        },

        onSubmit: ChangeUserInfo,


        validationSchema: yup.object().shape({
            name: yup.string().required("Name is required"),
            email: yup.string().email("Invalid Email").required("Email is required"),
            phone: yup.string().trim().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'We accept Egyptian numbers only').required('Phone is required'),

        })


    })


    //  =========================ChangeUserInfoFunction=======================================
    async function ChangeUserInfo(val) {
        SetIsClicked(true)

        await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", val, {
            headers: {
                token: istoken
            }
        }).then((x) => {


            successMassage("Updated Successfully");
            SetIsClicked(false)
            setTimeout(() => { navigat('/Home') }, 1000)



        }).catch((err) => {


            ErrorMassage(err.response.data.errors.msg)
            SetIsClicked(false)


        })


    }


    //  =========================MassageFunctions==================================
    function successMassage(trim) {

        const message = trim
        enqueueSnackbar(message, { variant: 'success' })
    }
    function ErrorMassage(Err) {
        const message = Err
        enqueueSnackbar(message, { variant: 'error' })
    }








    useEffect(() => {
        Object.keys(ChangeInfoFormik.errors).forEach((key) => {
            if (ChangeInfoFormik.touched[key]) {
                enqueueSnackbar(ChangeInfoFormik.errors[key], {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            }
        });
    }, [ChangeInfoFormik.errors, ChangeInfoFormik.touched, enqueueSnackbar]);





    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {isClicked && (
                <div id='loadingBackGround' className=" fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3">
                        <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <p className="text-gray-700 font-semibold">Updating information...</p>
                    </div>
                </div>
            )}



            {/* Card */}
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 relative">
                {/* Title */}
                <h2 className="text-lg  font-extrabold text-gray-600 mb-6 ">Edit Profile</h2>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img src="https://img.freepik.com/free-photo/artist-white_1368-3543.jpg" alt="Profile" className="w-28 h-28 rounded-full object-cover border" />
                        <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
                            ✎
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={ChangeInfoFormik.handleSubmit} className="space-y-4 ">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-gray-500 mb-1 font-bold">Full Name</label>
                        <input type="text" placeholder="Your Name" id='name' name='name' value={ChangeInfoFormik.values.name} onBlur={ChangeInfoFormik.handleBlur} onChange={ChangeInfoFormik.handleChange} className="w-full placeholder-gray-400 px-4 py-2 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-500 mb-1 font-bold">Email</label>
                        <div className="relative">
                            <input type="email" placeholder="Your Email" id='email' name='email' value={ChangeInfoFormik.values.email} onBlur={ChangeInfoFormik.handleBlur} onChange={ChangeInfoFormik.handleChange} className="w-full placeholder-gray-400 px-4 py-2 pr-10 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                        </div>
                    </div>

                    {/* Number */}
                    <div>
                        <label className="block text-sm text-gray-500 mb-1 font-bold">Number</label>
                        <div className="relative">
                            <input type="tel" placeholder="Your Phone Number" id='phone' name='phone' value={ChangeInfoFormik.values.phone} onBlur={ChangeInfoFormik.handleBlur} onChange={ChangeInfoFormik.handleChange} className="w-full placeholder-gray-400 px-4 py-2 pr-10 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                        </div>
                    </div>






                    {/* Buttons */}

                    <div className="flex flex-col lg:flex-row justify-end gap-3 ms-auto mb-14 lg:mb-0 w-full pt-4 ">

                        <button type="button" className="px-5 py-2   rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" >
                            <Link to={"/Home"} >
                                Back To Home
                            </Link>

                        </button>
                        <button type="submit" className="px-5 py-2  cursor-pointer rounded-lg bg-green-600 text-white hover:bg-green-700" >
                            Save Changes
                        </button>


                    </div>

                </form>


                <div className="me-auto w-full absolute bottom-7 ">
                    <ChangePasswordModal />
                </div>

            </div>
        </div>
    );
}
