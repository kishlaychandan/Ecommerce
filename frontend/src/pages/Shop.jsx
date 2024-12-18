// import React from 'react'
// import Products from '../components/Products'
// import ChatBots from '../components/ChatBot/ChatBots'
// function Shop() {
//     const Page = "shop"
//   return (
//     <>
//       {/* <h1>Shop Page</h1> */}
//       <ChatBots/>
//       <Products page={Page}/>
//     </>
//   )
// }

// export default Shop

import React, { useState } from 'react'
import Products from '../components/Products'
import ChatBots from '../components/ChatBot/ChatBots'
import ShopNav from '../components/ShopNav.jsx'
import { useCategories } from "../CategoriesContext.jsx";
function Shop() {
    const Page = "shop"
    const { setCategory, setSearchTerm } = useCategories();
  return (
    <>
    <ShopNav setCategory={setCategory} setSearchTerm={setSearchTerm} />
      {/* <h1>Shop Page</h1> */}
      <ChatBots/>
      <Products page={Page} />
    </>
  )
}

export default Shop