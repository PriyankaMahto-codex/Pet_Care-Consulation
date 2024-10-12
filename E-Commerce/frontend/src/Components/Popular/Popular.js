import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'


const Popular = () => {
  debugger;
  const [popular_in_women,setpopular] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/popularwomen")
    .then((response)=>response.json())
    .then((data)=>setpopular(data))
  },[])
  return (
    <div className='popular'>
        <h1>Popular in Cat</h1>
        <hr/>
        <div className='popular-item'>
            {popular_in_women.map((item,i)=>{
                console.log(item.id)
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price= {item.old_price}/>
            })}
        </div>
    </div>
  ) 
}

export default Popular