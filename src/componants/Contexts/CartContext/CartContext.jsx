import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from 'react'

import { MyAuthContext } from "../UserContext/UserContext"



export const MyCartContext = createContext();

export default function UserCartContext({ children }) {




    const { istoken, setToken } = useContext(MyAuthContext)





    const [AllProducts, SetAllProducts] = useState()
    const [NumOfCartItems, SetNumOfCartItems] = useState()
    const [TotalCartPrise, SetTotalCartPrise] = useState()
    const [CartID, SetCartID] = useState()
    const [CartOwner, SetCartOwner] = useState()


    // Get User Cart




    async function GetUserCart() {
        if (!istoken) return; // Avoid API call if no token

        try {
            const res = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { headers: { token: istoken } }
            );

            const cart = res?.data?.data;

            // Defensive checks in case API structure changes
            SetAllProducts(cart?.products || []);
            SetNumOfCartItems(res?.data?.numOfCartItems || 0);
            SetTotalCartPrise(cart?.totalCartPrice || 0);
            SetCartID(res?.data?.cartId || null);

            // Store & set cart owner safely
            if (cart?.cartOwner) {
                localStorage.setItem("cartOwnerId", cart.cartOwner);
                SetCartOwner(cart.cartOwner);
            }

        } catch (err) {
            console.error("GetUserCart Error:", err);
        }
    }


    // Add product
    async function AddProduct(ProductId) {
        if (!istoken) return false; // prevent API call without token
        try {
            await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId: ProductId },
                { headers: { token: istoken } }
            );
            GetUserCart(); // refresh cart
            return true;
        } catch (err) {

            return false;
        }
    }

    // Same for updateQuantity and DeleteProduct

    //update Product Quantity  
    async function updateQuantity(ProductId, newQuantity) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`, {
            "count": newQuantity
        }, {
            headers: {
                token: istoken
            }
        }).then((res) => {



            SetAllProducts(res?.data?.data?.products)
            SetNumOfCartItems(res?.data?.numOfCartItems)
            SetTotalCartPrise(res?.data?.data?.totalCartPrice)
            SetCartID(res?.data?.cartId)

            return true
        }).catch((err) => {
            console.log(err);

            return false

        })

    }


    //Add Product From Cart  
    async function DeleteProduct(ProductId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`, {
            headers: {
                token: istoken
            }
        }).then((res) => {


            GetUserCart()
            return true
        }).catch((err) => {


            return false

        })

    }


    useEffect(() => {
        GetUserCart();
    }, [istoken, AllProducts]);

    return (
        <MyCartContext.Provider value={{
            GetUserCart, AddProduct,
            updateQuantity, DeleteProduct,
            SetAllProducts, AllProducts,
            SetNumOfCartItems, NumOfCartItems,
            SetTotalCartPrise, TotalCartPrise,
            SetCartID, CartID, CartOwner
        }}>
            {children}
        </MyCartContext.Provider>
    );
}
