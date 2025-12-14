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
import UserCartContext from "./componants/Contexts/CartContext/CartContext.jsx"
import toast, { Toaster } from 'react-hot-toast';
import Cart from './componants/CartPage/Cart.jsx';
import UserWishListContext from './componants/Contexts/WishlistContext/WishListContext.jsx';
import Wishlist from './componants/WishListPage/Wishlist.jsx';
import Brands from './componants/Brands/Brands.jsx';
import ContactPage from './componants/ContactPage/ContactPage.jsx';
import { FilterProvider } from './componants/Contexts/FilterContext/FilterContext.jsx';
import PlaceOrder from './componants/PlaceOrder/PlaceOrder.jsx';
import Allorders from './componants/allorders/allorders.jsx';
import ProtectRoots from './componants/ProtectRoots/ProtectRoots.jsx';
import NotFoundPage from './componants/404Page/NotFoundPage.jsx';
import ResatPassword from './componants/RestPassword/ResatPassword.jsx';
import ChangeInfo from './componants/ChangeInfo/ChangeInfo.jsx';




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
