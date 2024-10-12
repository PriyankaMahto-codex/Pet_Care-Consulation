import React, { useContext, useRef, useState } from 'react'
import logo from '../Assests/logo.avif'
import cart from '../Assests/cart.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { ShowContext } from '../../Context/ShopContext'
import dropdown from '../Assests/drop_down.png'
const Navbar = () => {
    const [menu,setMenu]= useState("shop")
    const {getTotalCartItem} = useContext(ShowContext);
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav_logo'>
            <img className='logo_img'src={logo} alt='none'/>
            <p>Pet Care</p>
        </div>
        <img className='nav-drop_down' onClick={dropdown_toggle} src={dropdown} alt=''/>
        <ul  ref={menuRef} className='nav-manu'>
            <li onClick={()=>{setMenu("Shop")}}><Link to={'/'}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Cat")}}><Link to={'/Cat'}>Cat</Link>{menu==="Cat"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Dog")}}><Link to={'/Dog'}>Dog</Link>{menu==="Dog"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Rabbit")}}><Link to={'/Rabbit'}>Rabbit</Link>{menu==="Rabbit"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')?
            <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LOGOUT</button>:<Link to={'/login'}><button>Login</button> </Link>}
            <Link to={'/cart'}><img className='img'src={cart} alt='none'/></Link>
            <div className='nav-cart-count'>{getTotalCartItem()}</div>
        </div> 
    </div>
  )
}

export default Navbar