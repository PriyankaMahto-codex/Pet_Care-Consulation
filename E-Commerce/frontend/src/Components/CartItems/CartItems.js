import React, { useContext } from 'react'
import './CartItems.css'
import { ShowContext } from '../../Context/ShopContext'
import remove from '../Assests/remove.png'
const CartItems = () => {
    const {getTotalCartAmount,data_product,cartItem,removeToCart} = useContext(ShowContext);
    debugger;
    
  return (
    <div className='cartItems'>
        <div className='cartItems-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {data_product.map((e)=>{
            if(cartItem[e.id]>0)
            {
                return ( 
                <div>
                    <div className='cartitems-format cartItems-format-main'>
                        <img src={e.image} alt='' className='carticon-product-icon'/>
                        <p>{e.name}</p>
                        <button className='cartitems-quantity'>{cartItem[e.id]}</button>
                        <p>${e.new_price}</p>
                        <p>{e.new_price*cartItem[e.id]}</p>
                        <img  className='carticon-remove-icon' src={remove} onClick={()=>{removeToCart(e.id)}}alt=''/>
                    </div>
                    <hr/>
                </div>
                );
            }
            return null;
        })}
        <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1>cart Totals</h1>
                <div>
                    <div className='cartitems-total-item'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className='cartitems-total-item'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className='cartitems-promocode'>
                    <p>If you have a promo code, Enter it here</p>
                    <div className='cartitems-promobox'>
                        <input type='text' placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems