import { useContext } from "react";
import { MyCartContext } from "../Contexts/CartContext/CartContext";
import { Link } from "react-router-dom";






export default function OrderSummary() {


  const { AddProduct, NumOfCartItems, TotalCartPrise } = useContext(MyCartContext);


  return (
    <div className="border border-gray-200 bg-white rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Promo Code */}
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Promo Code"
          disabled={NumOfCartItems === 0} // disables input if cart is empty
        />
        <button
          className={`px-4 py-2 rounded-r-lg text-sm font-medium transition-colors duration-200
      ${NumOfCartItems === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-600'
              : 'bg-green-600 hover:bg-green-500 text-white cursor-pointer'}`}
          disabled={NumOfCartItems === 0} // disables button if cart is empty
        >
          Submit
        </button>
      </div>


      {/* Cost list */}
      <div className="space-y-2 text-sm text-gray-600 border-b pb-3">
        <div className="flex justify-between">
          <span>Shipping cost</span>
          <span>0 EGP</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>0%</span>
        </div>

      </div>

      {/* Estimated Total */}
      <div className="flex justify-between text-lg font-semibold mt-3 mb-2">
        <span>Total Prise</span>
        <span>{TotalCartPrise} EGP</span>
      </div>

      {/* Afterpay */}
      <p className="text-xs text-gray-600 mb-3">
        or 4 interest-free payments of $10.00 with <span className="font-medium">Afterpay</span>
      </p>

      {/* Free shipping notice */}
      <p className="text-sm text-yellow-600 mb-4">
        You're <span className="font-semibold">$10.01</span> away from free shipping!
      </p>

      {/* Checkout Button */}
      {NumOfCartItems > 0 ? (
        <Link to="/PlaceOrder">
          <button className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
            <span className="text-lg">🔒</span> Checkout
          </button>
        </Link>
      ) : (
        <button disabled className="w-full bg-green-600 opacity-50 cursor-not-allowed text-white py-3 rounded-lg flex items-center justify-center gap-2" >
          <span className="text-lg">🔒</span> Checkout
        </button>
      )}

    </div>
  );
};