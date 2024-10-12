import React from 'react'
import './Description.css'
const Description = (props) => {
  const {product}= props;
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className='descriptionbox-nav-box'>Description</div>
            <div className='descriptionbox-nav-box fade'>Reviews(122)</div>
        </div>
        <div className='descriptionbox-description'>
            <p>{product.description}</p>
        </div>
    </div>
  )
}

export default Description