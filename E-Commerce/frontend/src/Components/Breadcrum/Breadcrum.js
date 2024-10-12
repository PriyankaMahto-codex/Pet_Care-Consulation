import React from 'react'
import './Breadcum.css'
import next from '../Assests/next.png'
const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        Home<img className='img'src={next} alt=''/>Shop <img className='img'src={next} alt=''/>{product.category}<img className='img'src={next} alt=''/>{product.name}
    </div> 
  )
}

export default Breadcrum