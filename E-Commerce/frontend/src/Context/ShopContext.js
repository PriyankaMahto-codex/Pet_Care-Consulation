import React, { createContext, useEffect, useState } from 'react'
// import data_product from '../Components/Assests/AllProducts';

export const  ShowContext = createContext(null);

const getDeafultCart =()=>{
    let cart = {};
    for(let index = 0;index<300+1;index++){
        cart[index]=0;
    }
    return cart;
}

const ShowContextProvide = (Props) =>{
    debugger;
    const [data_product,setAll_Product] =useState([]);
    const [cartItem,setCartItems] = useState(getDeafultCart());

    useEffect(()=>{
        fetch("http://localhost:4000/allproduct")
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/getcart",{
                method:'POST',
                headers:{
                    Accept:"application/form-data",
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
  
    console.log("this is cart",cartItem);

    
    const addToCart = (itemId)=>{
        debugger;
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        // console.log(cartItem);
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/addtocart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/removefromcart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    
   
    const getTotalCartAmount = () =>{
        console.log(cartItem);
        let totalAmount = 0;
        for (let key in cartItem) {
            // console.log(key, cartItem[key]);
            if(cartItem[key]>0)
            {
                let itemInfo = data_product.find((product)=>product.id === Number(key));
                // console.log("this is iteminfo",itemInfo);
                totalAmount += itemInfo.new_price*cartItem[key];
                // console.log(totalAmount);
            }
          }
          return totalAmount;
    }

    const getTotalCartItem = ()=>{
        let totalItem = 0;
        for(const item in cartItem)
        {
            if(cartItem[item]>0)
            {
                totalItem += cartItem[item];
            }
        }
        return totalItem;
    }
    const contextValue = {getTotalCartItem,getTotalCartAmount,data_product,cartItem,addToCart,removeToCart};
    return(
        <ShowContext.Provider value={contextValue}>
            {Props.children}
        </ShowContext.Provider>
    )
}   

export default ShowContextProvide