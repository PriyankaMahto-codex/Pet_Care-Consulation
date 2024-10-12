import React,{useContext}from 'react'
import { ShowContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/Description/Description';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const {data_product}  = useContext(ShowContext);
    const {productId} = useParams();
    const product = data_product.find((e)=> e.id === Number(productId));
    console.log(product);
  return (
    <div>
        <Breadcrum product = {product}/>
        <ProductDisplay product = {product}/>
        <Description product = {product}/>
        <RelatedProducts/>
    </div>
  )
}

export default Product