import React, { useContext } from 'react'
import './ShopCategories.css'
import { ShowContext } from '../Context/ShopContext'
// import data_product from '../Components/Assests/AllProducts'
import Item from '../Components/Item/Item'
import dropdown_icon from '../Components/Assests/drop_down.png'


const ShopCategories =(Props)=>{
  const {data_product}  = useContext(ShowContext);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={Props.banner} alt=''/>
      <div className='shopcategory-indexsort'>
        <p>
          <span>Showing 1-12</span> out Of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img className='down' src={dropdown_icon} alt=''/>
        </div>
      </div>
      <div className='shopcategory-products'>
          {data_product.map((item,i)=>{
            if(Props.category === item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price= {item.old_price}/>
            }
            else{
              return null;
            }
          })}
      </div>
      <div className='shopcategory-loadmore'>
        Explore more
      </div>
    </div>
  )
}

export default ShopCategories