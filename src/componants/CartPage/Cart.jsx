import React, { useContext, useState } from 'react'
import CartItems from './CartItems'
import OrderSummary from './OrderSummary'
import { MyCartContext } from '../Contexts/CartContext/CartContext';
import FreshCartLoader from '../Loading/Loader/Loader';

export default function Cart() {

  const [loading, setLoading] = useState(true);
  const { AddProduct, NumOfCartItems, TotalCartPrise } = useContext(MyCartContext);

  setTimeout(() => {
    setLoading(false)
  }, 2000);

  if (loading) return <FreshCartLoader />;

  return <>

    <head>
      <meta charSet="utf-8" />
      <title>Cart</title>

    </head>
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-4">
          <CartItems />
        </div>

        {/* Right Section */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  </>
}
