import { useContext } from "react";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import { userContext } from "../App";
import BannerCarousel from "../components/BannerCarousel";

function Home() {
  // return <Products />;
  const { isUserLoggedIn } = useContext(userContext);
  // console.log(isUserLoggedIn);
  return (
    <>
      {/* <Sidebar /> */}
      <Products />
    </>
  );
}

export default Home;