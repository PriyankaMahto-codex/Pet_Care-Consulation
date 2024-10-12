import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove from '../../assets/remove.png'
const ListProduct = () => {
  const [allProducts,setAllProducts] = useState([]);

  const featchInfo = async ()=>{
    await fetch("http://localhost:4000/allproduct")
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }
  useEffect(()=>{
    featchInfo();
  },[])
  
  const remove_product= async(id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await featchInfo();
  }
  return (
    <div className='listproduct'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>old price</p>
        <p>new price</p>
        <p>category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allProducts'>
          <hr/>
          {allProducts.map((product,index)=>{
            return <>
            <div key ={index}className='listproduct-format-main listproduct-format'>
                <img src={product.image} alt='' className='listproduct-format-icon'/>
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <img onClick={()=>{remove_product(product.id)}}className='listproduct-remove-icon'src={remove} alt=''/>
              </div>
              <hr/> 
            </>
          })}
      </div>
    </div>
  )
}

export default ListProduct