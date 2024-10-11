import React from 'react'
import { cartContext } from '../../App'
import { useContext } from 'react'
function Cart() {
  const { cart, setCart } = useContext(cartContext)
  console.log("inside cart");
  console.log("cart item ",cart," this");
  

  return (
    <div>Cart</div>
  )
}

export default Cart