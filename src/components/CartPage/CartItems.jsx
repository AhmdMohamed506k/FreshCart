import React, { useContext } from 'react'
import { MyCartContext } from '../Contexts/CartContext/CartContext';
import toast, { Toaster } from 'react-hot-toast';

import myVideo from "../../assets/NodataFound.webm"
import { MyWishListContext } from '../Contexts/WishlistContext/WishListContext';

export default function CartItems() {





  const { AddProduct, NumOfCartItems, TotalCartPrise, AllProducts, DeleteProduct, updateQuantity } = useContext(MyCartContext);
  const { AddProductInWishList } = useContext(MyWishListContext);







  async function HandelDeleteProduct(Productid) {
    const flag = await DeleteProduct(Productid)
    if (flag) {

      setTimeout(() => {
        toast.success('Successfully Deleted!')
      }, 850);


    } else {
      toast.error("This didn't work.")
    }
  }

  async function HandelUpdateProductCount(ProductId, NewCount) {
    try {
      await toast.promise(
        updateQuantity(ProductId, NewCount),
        {
          loading: "Updating quantity...",
          success: <b>Quantity updated!</b>,
          error: <b>Could not update quantity.</b>,
          position: "top-right"

        }
      );
    } catch (err) {
      toast.error("This didn't work.")
    }
  }




  return (
    <>
      <Toaster /> {/* Make sure toast works */}

      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        {NumOfCartItems === 0 ? (
          <div className='h-100 relative'>
            <iframe className=' scale-255 absolute top-30 bottom-0 left-0 right-0 ms-auto me-auto' src="https://lottie.host/embed/22fbc466-8c58-4ed0-8d1f-511dffe6c348/Hbx0EEI7tT.lottie"></iframe>
          </div>
        ) : (AllProducts?.map((p) => (
          <div key={p._id} className="flex flex-col  lg:flex-row  gap-4 mb-10 ">
            {/* Thumbnail */}
            <img src={p.product.imageCover} alt="Product" className="w-28 h-32 mx-auto lg:mx-0 object-cover rounded" />
            {/* Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{p.product.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Brand : {p.product.brand.name}
              </p>
              <p className="text-sm text-gray-500">
                category : {p.product.category.name}
              </p>
              <p className="text-sm text-green-600 font-medium">In Stock</p>

              {/* Actions */}
              <div className="flex gap-4 text-sm text-gray-500 mt-3">
                <button onClick={() => HandelDeleteProduct(p.product._id)} className="cursor-pointer"  >
                  Remove
                </button>
                <button onClick={() => { AddProductInWishList(p.product._id); DeleteProduct(p.product._id); }} className="cursor-pointer" >
                  Move to Wishlist
                </button>
              </div>
            </div>

            {/* Price / Qty / Total */}
            < div className="flex  flex-row lg:flex-col  items-end justify-center gap-2" >
              <div className="text-right flex flex-row items-center gap-2 lg:flex-col">
                <p className="text-sm text-gray-500 lg:mb-0 ">Total Price:</p>
                <p className="font-semibold">{p.price}EGP</p>
              </div>

              {/* Qty */}
              < select className="border rounded px-2 py-1 text-sm ms-auto" >
                <option hidden>{p.count}</option>
                {
                  [1, 2, 3, 4, 5].map((num) => (
                    <option key={num} onClick={() => HandelUpdateProductCount(p.product._id, num)}   >
                      {num}
                    </option>
                  ))
                }
              </select>
            </div >
          </div >
        ))
        )
        }
      </div >
    </>
  );

}
