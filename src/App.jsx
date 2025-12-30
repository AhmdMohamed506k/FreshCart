import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register'
import MainHome from './components/mainHome/MainHome'
import Home from './components/Home/Home'
import UserContext from './components/Contexts/UserContext/UserContext';
import { SnackbarProvider } from 'notistack';
import ProductDetails from './components/ProductDetails/Productdetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserCartContext from "./components/Contexts/CartContext/CartContext"
import toast, { Toaster } from 'react-hot-toast';
import Cart from './components/CartPage/Cart';
import UserWishListContext from './components/Contexts/WishlistContext/WishListContext';
import Wishlist from './components/WishListPage/Wishlist';
import Brands from './components/Brands/Brands';
import ContactPage from './components/ContactPage/ContactPage';
import { FilterProvider } from './components/Contexts/FilterContext/FilterContext';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Allorders from './components/AllOrders/AllOrders';
import ProtectRoots from './components/ProtectRoots/ProtectRoots';
import NotFoundPage from './components/404Page/NotFoundPage';
import ResatPassword from './components/RestPassword/ResatPassword';
import ChangeInfo from './components/ChangeInfo/ChangeInfo';




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
