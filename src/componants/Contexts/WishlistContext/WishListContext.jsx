import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from 'react'
import { MyAuthContext } from "../UserContext/UserContext";





export const MyWishListContext = createContext();

export default function UserWishListContext({ children }) {





    const { istoken, setToken } = useContext(MyAuthContext)

    const myToken = localStorage.getItem("Token");
    const [Userwishlist, setUserWishlist] = useState([]);


    const [AllWishListProducts, SetAllWishListProducts] = useState()
    const [NumOfWishListItems, SetNumOfWishListItems] = useState()



    // Get User WishList
    async function GetUserWishList() {


        await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token: myToken },


        }).then((res) => {


            setUserWishlist(res.data.data)


            // SetCartID(res)
        }).catch((err) => {
            console.log(err);

        })



    }




    //Add Product To WishList  
    async function AddProductInWishList(ProductId) {
        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
            "productId": ProductId
        }, {
            headers: {
                token: myToken
            }
        }).then((res) => {

            GetUserWishList()

            return true
        }).catch((err) => {


            return false

        })

    }



    //Delete Product From WishList  
    async function DeleteProductFromWishList(ProductId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ProductId}`, {
            headers: {
                token: myToken
            }
        }).then((res) => {


            GetUserWishList()

            return true
        }).catch((err) => {


            return false

        })

    }

    useEffect(() => {
        GetUserWishList();
    }, []);


    return (
        <MyWishListContext.Provider value={{
            GetUserWishList,
            AddProductInWishList,
            DeleteProductFromWishList,
            AllWishListProducts,
            SetAllWishListProducts,
            NumOfWishListItems,
            SetNumOfWishListItems,
            setUserWishlist,
            Userwishlist
        }}>
            {children}
        </MyWishListContext.Provider>
    );
}
