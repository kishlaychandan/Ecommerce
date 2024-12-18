// import { useContext } from "react";
// import Products from "../components/Products";
// import Sidebar from "../components/Sidebar";
// import { userContext } from "../App";
// import BannerCarousel from "../components/BannerCarousel";
// import ChatBots from "../components/ChatBot/ChatBots";

// function Home() {
//   // return <Products />;
//   const { isUserLoggedIn } = useContext(userContext);
//   const page="home";
//   // console.log(isUserLoggedIn);
//   return (
//     <>
//       {/* <Sidebar /> */}
//       <ChatBots/>
//       <Products page={page}/>
//     </>
//   );
// }

// export default Home;

import { useContext } from "react";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import { userContext } from "../App";
import BannerCarousel from "../components/BannerCarousel";
import ChatBots from "../components/ChatBot/ChatBots";
import { useCategories } from "../CategoriesContext.jsx";
import ShopNav from "../components/ShopNav.jsx";

function Home() {
  // return <Products />;
  const { isUserLoggedIn } = useContext(userContext);
  const { setCategory, setSearchTerm } = useCategories();
  const page = "home";
  // console.log(isUserLoggedIn);
  return (
    <>
      <ShopNav setCategory={setCategory} setSearchTerm={setSearchTerm} />
      <ChatBots />
      <Products page={page} />
    </>
  );
}

export default Home;

