import React from 'react'
import './Navbar.css'
import navlogo from "../../assets/logo.avif"
import cart from "../../assets/cart.png"
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className="nav-logo" src={navlogo} alt=''/>
        <p>Shoppers admin panel</p>
        <img className= "nav-profile" src={cart} alt=''/>
    </div>
  )
}

export default Navbar