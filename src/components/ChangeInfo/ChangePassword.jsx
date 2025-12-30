import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { enqueueSnackbar, useSnackbar } from "notistack";
import axios from "axios";
import { MyAuthContext } from "../Contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function ChangePasswordModal() {

    //  =========================UseStates=============================
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, SetIsClicked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //  =========================UseNavigate=============================
    const navigat = useNavigate()
    //  =========================UseContexts=============================
    const { istoken, setToken } = useContext(MyAuthContext)
    //  =========================UseSnackbar=============================
    const { enqueueSnackbar } = useSnackbar();



   






    //  =========================UseFormikFunctions=============================

    const ChangePassFormik = useFormik({
        initialValues: {

            currentPassword: '',
            password: '',
            rePassword: '',



        },

        onSubmit: ChangeUserPass,


        validationSchema: yup.object({
            currentPassword: yup.string().required("Current password is required"),
            password: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
            rePassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password is required"),

        })


    })




    //  =========================ChangeUserInfoFunction=======================================
    async function ChangeUserPass(values) {
        try {
            SetIsClicked(true);

            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, { headers: { token: istoken } });



            successMassage("Password updated successfully");

            setToken(data.token);
            localStorage.setItem("Token", data.token);
            setIsOpen(false);
            navigat("/Home");
        } catch (err) {
            ErrorMassage(err.response?.data?.errors?.msg || "Something went wrong");
        } finally {
            SetIsClicked(false);
        }
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
        Object.keys(ChangePassFormik.errors).forEach((key) => {
            if (ChangePassFormik.touched[key]) {
                enqueueSnackbar(ChangePassFormik.errors[key], {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            }
        });
    }, [ChangePassFormik.errors, ChangePassFormik.touched, enqueueSnackbar]);




    return (
        <>
            {/* Change Password Button */}



            <button type="button" className="px-5 py-2 mb-auto cursor-pointer rounded-lg bg-green-600 text-white hover:bg-green-700" onClick={() => setIsOpen(true)}  >
                Change Password
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

                        {/* Close */}
                        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer" onClick={() => setIsOpen(false)} >
                            ✕
                        </button>

                        <h2 className="text-lg font-bold text-gray-700 mb-4">
                            Change Password
                        </h2>

                        <form onSubmit={ChangePassFormik.handleSubmit} className="space-y-4">

                            {/* currentPassword */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1 font-bold">currentPassword</label>
                                <input type="password" placeholder="currentPassword" id='currentPassword' name='currentPassword' value={ChangePassFormik.values.currentPassword} onBlur={ChangePassFormik.handleBlur} onChange={ChangePassFormik.handleChange} className="w-full placeholder-gray-400 px-4 py-2 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>

                            {/* password */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1 font-bold">password</label>
                                <div className="relative">
                                    <input type="password" placeholder="password" id='password' name='password' value={ChangePassFormik.values.password} onBlur={ChangePassFormik.handleBlur} onChange={ChangePassFormik.handleChange} className="w-full placeholder-gray-400 px-4 py-2 pr-10 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                </div>
                            </div>

                            {/* rePassword */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1 font-bold">rePassword</label>
                                <div className="relative">
                                    <input type="password" placeholder="rePassword" id='rePassword' name='rePassword' value={ChangePassFormik.values.rePassword} onBlur={ChangePassFormik.handleBlur} onChange={ChangePassFormik.handleChange} className="w-full placeholder-gray-400 px-4 py-2 pr-10 rounded-lg bg-gray-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isClicked}
                                className={`w-full py-2 rounded-lg text-white ${isClicked ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {isClicked ? "Updating..." : "Save Changes"}
                            </button>

                        </form>
                    </div>
                </div>
            )}



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
        </>
    );
}
