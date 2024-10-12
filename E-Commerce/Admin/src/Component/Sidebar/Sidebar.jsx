import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import cart from "../../assets/cart.png"
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img className= "nav-profile" src={cart} alt=''/>
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img className= "nav-profile" src={cart} alt=''/>
                <p>List Product</p>
            </div>
        </Link>

    </div>
  )
}

export default Sidebar