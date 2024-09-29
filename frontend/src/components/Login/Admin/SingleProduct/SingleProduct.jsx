import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
function SingleProduct() {
   const location= useLocation();
   const {product} = location.state;
   console.log("product : ",product);
   
  return (
    <>
    <div className="productCards">
        {
            product.map((product)=>{
                return(
                    <div className="card" key={product._id}>
                        <img src={product.url} alt={product.name} />
                        <h2>Name: {product.name}</h2>
                        <p>Product: {product.price}</p>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>brand : {product.brand}</p>
                        <p>instoock : {product.inStock }</p>
                        <p>inventory :  {product.inventory}</p>

                        </div>
                )
            })
        }
    </div>
    </>
  )
}

export default SingleProduct