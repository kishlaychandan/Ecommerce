import React from 'react'
import Products from '../components/Products'
function Shop() {
    const Page = "shop"
  return (
    <>
      {/* <h1>Shop Page</h1> */}
      <Products page={Page}/>
    </>
  )
}

export default Shop