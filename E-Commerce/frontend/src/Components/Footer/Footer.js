import React from 'react'
import './Fotter.css'
import logo from '../Assests/logo.avif'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img  className='img'src={logo} alt=''/>
            <p>Pet Care</p>
        </div>
        <ul className='footer-link'>
            <li>Company</li>
            <li>Products</li>
            <li>Officers</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icon-container'>
                <img className='img' src={logo} alt=''/>
            </div>
            <div className='footer-icon-container'>
                <img className='img' src={logo} alt=''/>
            </div>
            <div className='footer-icon-container'>
                <img className='img' src={logo} alt=''/>
            </div>
            <div className='footer-icon-container'>
                <img  className='img' src={logo} alt=''/>
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>Copyright @2024- All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer