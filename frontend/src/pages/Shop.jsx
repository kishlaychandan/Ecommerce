import React from 'react'
import Products from '../components/Products'
import ChatBots from '../components/ChatBot/ChatBots'
function Shop() {
    const Page = "shop"
  return (
    <>
      {/* <h1>Shop Page</h1> */}
      <ChatBots/>
      <Products page={Page}/>
    </>
  )
}

export default Shop