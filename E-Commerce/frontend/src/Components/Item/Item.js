import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} className='item'src={props.image} alt=''/></Link>
        <p>{props.name}</p>
        <div className='item-price'>
            <div className='item-price-new'>
                RS-{props.new_price}
            </div>
            <div className='item-price-old'>
                Rs-{props.old_price}
            </div>
        </div>
    </div>

  )
}

export default Item