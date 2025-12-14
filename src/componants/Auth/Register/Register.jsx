import React, { useContext, useEffect, useState } from 'react'
import style from "./Register.module.css"
import Particles from "../../mainHome/SubComponents/Particles/Particles";
import { Link, useNavigate } from "react-router-dom"; // ✅ fix: use react-router's Link
import { auth, googleProvider, facebookProvider, signInWithPopup, Githubprovider, } from "./Supcomponents/firebaseConfig"; // ✅ import Firebase
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa"; // ✅ optional better icons
import { useFormik } from 'formik';
import * as yup from "yup"
import { enqueueSnackbar, SnackbarProvider, useSnackbar } from 'notistack'
import LoadingButton from "../../Loading/LoadingButtonFolder/LoadingButton"
import axios from 'axios';
import { MyAuthContext } from '../../Contexts/UserContext/UserContext';
import { fetchSignInMethodsForEmail, GoogleAuthProvider } from 'firebase/auth';
import FreshCartLoader from '../../Loading/Loader/Loader';






export default function Register() {


  //  =========================UseStates=============================
  const [isClicked, SetIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  //  =========================UseContexts=============================
  const { istoken, setToken } = useContext(MyAuthContext)
  //  =========================UseNavigate=============================
  const navigat = useNavigate()
  //  =========================UseSnackbar=============================
  const { enqueueSnackbar } = useSnackbar();











  //  =========================UseUseFormikFunctions=============================
  const RegisterFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''


    },

    onSubmit: RegisterNewUser,


    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid Email").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
      rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required"),
      phone: yup.string().trim().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'We accept Egyptian numbers only').required('Phone is required'),
    })


  })
  //  =========================MassageFunctions==================================
  function successMassage() {

    const message = 'Register Successfully'
    enqueueSnackbar(message, { variant: 'success' })
  }
  function ErrorMassage(Err) {
    const message = Err
    enqueueSnackbar(message, { variant: 'error' })
  }

  //  =========================RegisterFunction=======================================
  async function RegisterNewUser(val) {
    SetIsClicked(true)

    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", val).then((x) => {



      setLoading(true);
      successMassage()

      setTimeout(() => {
        setLoading(false);
        navigat('/Login')
      }, 2000)



    }).catch((err) => {
      setLoading(false);
      ErrorMassage(err.response.data.message)
      SetIsClicked(false)




    })


  }












  //  =========================UseEffect================================
  useEffect(() => {
    Object.keys(RegisterFormik.errors).forEach((key) => {
      if (RegisterFormik.touched[key]) {
        enqueueSnackbar(RegisterFormik.errors[key], {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    });
  }, [RegisterFormik.errors, RegisterFormik.touched, enqueueSnackbar]);
  if (loading) return <FreshCartLoader />;


  return <>
    <head>
      <meta charSet="utf-8" />
      <title>Register</title>

    </head>



    <section className={`${style.RegisterSection} relative bg-[#031f0c] h-[48rem]`}>
      <div className={`${style.container}`}>

        {/* Blur Background Effects */}
        <div className="absolute top-[30%] left-[60%] w-[30rem] h-[12em]
           bg-gradient-to-br from-green-600 to-transparent blur-[990px] opacity-50 rotate-[-35deg] z-0 pointer-events-none"></div>





        <div className={`${style.RegisterForm} absolute left-0 right-0 top-10 bottom-0 z-10`}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex w-[380px] sm:w-[500px] md:w-[850px] lg:w-[900px] rounded-2xl shadow-xl overflow-hidden bg-white animate__animated animate__backInUp">

              {/* Left Section */}
              <div className={`${style.RegisterFormLeftSection} w-full flex flex-col justify-center items-center p-10`}>
                <h2 className="text-3xl font-semibold mb-6">Create Account</h2>

                
              

                {/* Form */}
                <form onSubmit={RegisterFormik.handleSubmit} className="flex flex-col space-y-4 w-[117%] sm:w-[100%]">

                  <input type="text" placeholder="name" id='name' name='name' value={RegisterFormik.values.name} onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />


                  <input type="email" placeholder="email" id='email' name='email' value={RegisterFormik.values.email} onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />


                  <input type="password" placeholder="password" id='password' name='password' value={RegisterFormik.values.password} onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />


                  <input type="Password" placeholder="rePassword" id='rePassword' name='rePassword' value={RegisterFormik.values.rePassword} onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />


                  <input type="text" placeholder="phone" id='phone' name='phone' value={RegisterFormik.values.phone} onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} className="border border-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />



                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 transition cursor-pointer">

                    {isClicked == true ? <LoadingButton /> : "Register"}

                  </button>
                </form>
              </div>

              {/* Right Section */}
              <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white p-10">
                <h2 className="md:text-2xl lg:text-3xl font-semibold mb-4">Welcome Back!</h2>
                <p className="text-center mb-6">
                  To keep connected with us, please login with your personal info
                </p>
                <Link
                  to="/Login"
                  className="border border-white rounded-md px-8 py-2 font-semibold hover:bg-white hover:text-green-700 transition"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div>

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
}
