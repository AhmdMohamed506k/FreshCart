import React, { useContext, useEffect, useState } from 'react'
import { MyAuthContext } from '../Contexts/UserContext/UserContext';
import Particles from "../mainHome/SubComponents/Particles/Particles";
import { Link, useNavigate } from "react-router-dom"; // ✅ fix: use react-router's Link
import { enqueueSnackbar, SnackbarProvider, useSnackbar } from 'notistack'
import LoadingButton from "../Loading/LoadingButtonFolder/LoadingButton"
import FreshCartLoader from '../Loading/Loader/Loader';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import style from "./ResatPassword.module.css"

export default function ResatPassword() {
  // =======================UseStates===========================
  const [isClicked, SetIsClicked] = useState(false);
  const [isCodeClicked, SetisCodeClicked] = useState(false);
  const [isUpdatePass, SetUpdatePass] = useState(false);
  const [isSuccess, SetIsSuccess] = useState(false);
  // =======================UseNavigate===========================
  const navigat = useNavigate()
  // ========================UseSnackbar=========================
  const { enqueueSnackbar } = useSnackbar();






  // ========================UseFormikFunctions=========================

  // HandleSendVerifyCode
  const ResatPassFormik = useFormik({
    initialValues: {

      email: '',




    },

    onSubmit: ForgetPassword,


    validationSchema: yup.object().shape({

      email: yup.string().email("Invalid Email").required("Email is required"),

    })


  })

  // HandleCheckVerifyCode
  const CheckVerifyCodeFormik = useFormik({
    initialValues: {

      resetCode: '',

    },

    onSubmit: CheckVerifyCode,




  })

  // HandleUpdatePassWord
  const UpdatePassWordFormik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',

    },

    onSubmit: UpdatePassword,

    validationSchema: yup.object().shape({

      email: yup.string().email("Invalid Email").required("Email is required"),
      newPassword: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),


    })


  })

  // ========================NotificationMassages=========================


  function successMassage(trem) {

    const message = trem;
    enqueueSnackbar(message, { variant: 'success' })
  }
  function ErrorMassage(Err) {
    const message = Err
    enqueueSnackbar(message, { variant: 'error' })
  }



  // ========================Functions=========================

  async function ForgetPassword(val) {
    SetIsClicked(true)

    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", val).then((res) => {


      SetIsSuccess(true);
      SetIsClicked(false);
      successMassage('✅ Success please Check you Email')

    }).catch((err) => {


      ErrorMassage(err)

    })


  }
  async function CheckVerifyCode(val) {

    SetIsClicked(true);

    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", val).then((res) => {

      SetisCodeClicked(false);
      SetIsClicked(false);
      successMassage(' Success 🎉');

    }).catch((err) => {


      ErrorMassage(err);

    })


  }
  async function UpdatePassword(val) {
    SetIsClicked(true);
    SetUpdatePass(true)
    await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", val).then((res) => {

      SetUpdatePass(true);
      successMassage("Updated Successfully")
      SetIsClicked(false);
      navigat("/Login")


    }).catch((err) => {


      ErrorMassage(err)

    })


  }






  // Watch for Formik errors and trigger snackbar only when they appear
  useEffect(() => {
    Object.keys(ResatPassFormik.errors).forEach((key) => {
      if (ResatPassFormik.touched[key]) {
        enqueueSnackbar(ResatPassFormik.errors[key], {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    });
  }, [ResatPassFormik.errors, ResatPassFormik.touched, enqueueSnackbar]);



  return (
    <>

      <head>
        <meta charSet="utf-8" />
        <title>Reset password</title>

      </head>


      <section className={`${style.LoginSection} relative bg-[#031f0c] h-[48rem]`}>
        <div className={`${style.container} `}>

          {/* Blur Background Effects */}
          <div className="absolute top-[30%] left-[60%] w-[30rem] h-[12em]  bg-gradient-to-br from-green-600 to-transparent blur-[990px] opacity-50 rotate-[-35deg] z-0 pointer-events-none"></div>






          {!isSuccess ?


            <div className={` absolute left-0 right-0 top-10 bottom-0 z-10 animate__animated animate__backInUp`}>
              <div className="min-h-screen flex items-center justify-center">
                <div className="flex w-[380px] sm:w-[500px] md:w-[850px] lg:w-[900px] rounded-2xl shadow-xl overflow-hidden bg-white">

                  {/* Left Section */}
                  <div className={`${style.LoginFormLeftSection} w-full flex flex-col justify-center items-center p-10`}>
                    <h2 className="text-3xl font-semibold mb-6">Resat your password</h2>


                    {/* Form */}
                    <form onSubmit={ResatPassFormik.handleSubmit} className="flex flex-col space-y-4 w-[117%] sm:w-[100%]">



                      <input type="email" placeholder="email" id='email' name='email' value={ResatPassFormik.values.email} onBlur={ResatPassFormik.handleBlur} onChange={ResatPassFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />



                      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 transition cursor-pointer">

                        {isClicked == true ? <LoadingButton /> : "Send Code"}



                      </button>
                      <p className='ms-auto me-auto text-gray-400 text-[14px] font-bold'>please Enter Your Email </p>
                    </form>
                  </div>

                  {/* Right Section */}
                  <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white p-10">
                    <h2 className="md:text-2xl lg:text-3xl font-semibold mb-4">Fresh Cart</h2>
                    <p className="text-center mb-6">
                      Use this input to get the resat code continue resating your password
                    </p>

                  </div>
                </div>
              </div>
            </div>

            : !isCodeClicked ?


              <div className={`absolute left-0 right-0 top-10 bottom-0 z-10 animate__animated animate__backInUp `}>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="flex w-[380px] sm:w-[500px] md:w-[850px] lg:w-[900px] rounded-2xl shadow-xl overflow-hidden bg-white">

                    {/* Left Section */}
                    <div className={`${style.LoginFormLeftSection} w-full flex flex-col justify-center items-center p-10`}>
                      <h2 className="text-3xl font-semibold mb-6">Resat your password</h2>


                      {/* Form */}
                      <form onSubmit={CheckVerifyCodeFormik.handleSubmit} className="flex flex-col space-y-4 w-[117%] sm:w-[100%]">



                        <input type="text" placeholder="resetCode" id='resetCode' name='resetCode' value={CheckVerifyCodeFormik.values.resetCode} onBlur={CheckVerifyCodeFormik.handleBlur} onChange={CheckVerifyCodeFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />



                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 transition cursor-pointer">

                          {isCodeClicked == true ? <LoadingButton /> : "verify code"}



                        </button>
                        <p className='ms-auto me-auto text-gray-400 text-[14px] font-bold'>Please check the code that we sent to your Email </p>
                      </form>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white p-10">
                      <h2 className="md:text-2xl lg:text-3xl font-semibold mb-4">Fresh Cart</h2>
                      <p className="text-center mb-6">
                        Use this input to get the resat code continue resating your password
                      </p>

                    </div>
                  </div>
                </div>
              </div>

              :

              <div className={`absolute left-0 right-0 top-10 bottom-0 z-10 animate__animated animate__backInUp `}>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="flex w-[380px] sm:w-[500px] md:w-[850px] lg:w-[900px] rounded-2xl shadow-xl overflow-hidden bg-white">

                    {/* Left Section */}
                    <div className={`${style.LoginFormLeftSection} w-full flex flex-col justify-center items-center p-10`}>
                      <h2 className="text-3xl font-semibold mb-6">Resat your password</h2>


                      {/* Form */}
                      <form onSubmit={UpdatePassWordFormik.handleSubmit} className="flex flex-col space-y-4 w-[117%] sm:w-[100%]">




                        <input type="email" placeholder="email" id='email' name='email' value={UpdatePassWordFormik.values.email} onBlur={UpdatePassWordFormik.handleBlur} onChange={UpdatePassWordFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />


                        <input type="password" placeholder="newPassword" id='newPassword' name='newPassword' value={UpdatePassWordFormik.values.newPassword} onBlur={UpdatePassWordFormik.handleBlur} onChange={UpdatePassWordFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />





                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 transition cursor-pointer">

                          {isUpdatePass == true ? <LoadingButton /> : "verify code"}



                        </button>
                        <p className='ms-auto me-auto text-gray-400 text-[14px] font-bold'>Please check the code that we sent to your Email </p>
                      </form>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white p-10">
                      <h2 className="md:text-2xl lg:text-3xl font-semibold mb-4">Fresh Cart</h2>
                      <p className="text-center mb-6">
                        Use this input to get the resat code continue resating your password
                      </p>

                    </div>
                  </div>
                </div>
              </div>

          }












          {/* Blur */}
          <div className="absolute top-[20%] left-[-30%] w-[80rem] h-[12em]
           bg-gradient-to-br from-lime-700 to-transparent blur-[990px] opacity-50 rotate-[35deg] z-0 pointer-events-none"></div>
        </div>

        {/* Particles */}
        <div style={{ width: '100%', height: '600px', position: 'absolute', zIndex: "9", bottom: "60px", left: "25px" }}>
          <Particles
            particleColors={['#ffffff', '#0a9137']}
            particleCount={1000}
            particleSpread={15}
            speed={0.1}
            particleBaseSize={60}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
            className={"z-8"}
          />
        </div>
      </section>
    </>
  )
}
