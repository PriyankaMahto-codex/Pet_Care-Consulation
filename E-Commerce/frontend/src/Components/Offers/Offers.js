import React from 'react'
import './Offers.css'
import Doglogo from '../Assests/Doglogo.jpg'

const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left' >
            <h1>Exclusive </h1>
            <h1>Offers For u</h1>
            <p>Only on best sellers products</p>
            <button>check now</button>
        </div>
        <div className='offers-right'>
            <img className='womenok'src={Doglogo} alt=''/>
        </div>

    </div>
  )
}

export default Offers