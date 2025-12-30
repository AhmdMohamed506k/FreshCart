import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './componants/Layout/Layout'
import Login from './componants/Auth/Login/Login';
import Register from './componants/Auth/Register/Register'
import MainHome from './componants/mainHome/MainHome'
import Home from './componants/Home/Home'
import UserContext from './componants/Contexts/UserContext/UserContext';
import { SnackbarProvider } from 'notistack';
import ProductDetails from './componants/ProductDetails/Productdetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserCartContext from "./componants/Contexts/CartContext/CartContext"
import toast, { Toaster } from 'react-hot-toast';
import Cart from './componants/CartPage/Cart';
import UserWishListContext from './componants/Contexts/WishlistContext/WishListContext';
import Wishlist from './componants/WishListPage/Wishlist';
import Brands from './componants/Brands/Brands';
import ContactPage from './componants/ContactPage/ContactPage';
import { FilterProvider } from './componants/Contexts/FilterContext/FilterContext';
import PlaceOrder from './componants/PlaceOrder/PlaceOrder';
import Allorders from './componants/allorders/AllOrders';
import ProtectRoots from './componants/ProtectRoots/ProtectRoots';
import NotFoundPage from './componants/404Page/NotFoundPage';
import ResatPassword from './componants/RestPassword/ResatPassword';
import ChangeInfo from './componants/ChangeInfo/ChangeInfo';




const queryClient = new QueryClient()

function App() {
  const istoken = localStorage.getItem("Token")
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        // Public Pages
        { index: true, element: istoken ? <Home /> : <MainHome /> },
        { path: "Login", element: <Login /> },
        { path: "MainHome", element: <MainHome /> },
        { path: "Register", element: <Register /> },
        { path: "Brands", element: <Brands /> },
        { path: "ContactPage", element: <ContactPage /> },
        { path: "/ProductDetails/:id", element: <ProductDetails /> },
        { path: "/ResatPassword", element: <ResatPassword /> },
        { path: "/ChangeInfo", element: <ChangeInfo /> },
        { path: "*", element: <NotFoundPage /> },

        // Protected Pages
        {
          element: <ProtectRoots />,      // ⛔ Require Token from here
          children: [
            { path: "Home", element: <Home /> },
            { path: "Cart", element: <Cart /> },
            { path: "MainHome", element: <MainHome /> },
            { path: "Wishlist", element: <Wishlist /> },
            { path: "PlaceOrder", element: <PlaceOrder /> },
            { path: "allorders", element: <Allorders /> },
            { path: "/ResatPassword", element: <ResatPassword /> },
            { path: "/ChangeInfo", element: <ChangeInfo /> },
            { path: "*", element: <NotFoundPage /> },

          ],
        },
      ],
    },
  ]);


  return (
    <>

      <UserContext>
        <UserCartContext>
          <UserWishListContext>

            <FilterProvider >




              <QueryClientProvider client={queryClient}>

                <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  <RouterProvider router={router} />
                </SnackbarProvider>

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 2500,
                    style: {
                      background: "#fff",
                      color: "#333",
                    },
                  }}
                />


              </QueryClientProvider>


            </FilterProvider >
          </UserWishListContext>
        </UserCartContext>
      </UserContext>
    </>
  )
}

export default App
