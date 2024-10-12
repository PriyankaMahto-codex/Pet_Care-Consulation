import React from 'react'
import './Hero.css'
import hand from '../Assests/Handwave.jpg'
import Doglogo from '../Assests/Doglogo.jpg'
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2> New Arrivals Only</h2>
            <div>
            <   div className='hand-hand-icon'>
                    <p>new</p>
                    <img  className='hand'src={hand} alt=''/>
                </div>
                <p>Products</p>
                <p>Grab it Now</p>
            </div>
            <Link to="/latest-products">
              <div className='hero-latest-btn'>
                <div>Latest Products</div>
              </div>
            </Link>

        </div> 
        <div className='hero-right'>
        <img className='womenok' src={Doglogo}alt=''/>  
        </div>

    </div>
  )
}

export default Hero