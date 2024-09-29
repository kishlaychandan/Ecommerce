import React from 'react'
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../AuthContext'

function UserDashboard() {
  const { isLoggedIn, setIsLoggedIn, isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  let SNO=1;

  useEffect(() => {
    isCheckUserLoggedIn();
}, [])
useEffect(() => {
  fetchAllProducts();
},[])

async function isCheckUserLoggedIn() {
    try {
        const response = await axios.get(
          "/user/loggedIn",
        );
        if (response.statusText === "OK") {
            setIsLoggedIn(true);
            // setIsUserLoggedIn(true);

        };
      } catch (err) {
        console.log("Error checking login status: " + err);
      }
}
  async function handleLogout(){
    try{
      const response = await axios.post("/user/logout", {
      });
      console.log(response);
      if (response.statusText === "OK") {
        console.log("logged out");
        setIsLoggedIn(false);
        setIsUserLoggedIn(false);
        console.log("isLoggedIn: ",isLoggedIn);
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  
  async function fetchAllProducts(){
    console.log("inside fetch all products");
    
    try{
      const response = await axios.get("/product/getproduct");
      // console.log(response);
      // console.log(response.data.products); 
      setProductData(response.data.products);
      
      // alert(response.data.message);
    }
    catch(err){
      console.log(err.message);
    }
  }
  async function deleteProduct(e){
    console.log("delete product");

    try{
      const response = await axios.delete("/product/deleteproduct"+e.target.id);
      console.log(response);
      console.log(response.data.products); 
      setProductData(response.data.products);
      
      // alert(response.data.message);
    }
    catch(err){
      console.log(err.message);
    }
  }

  async function getSelectedProduct(id){
    const productToDisplay=productData.filter((product) => product._id === id);
    console.log(productToDisplay);

    navigate("/admin/product/",{state:{product:productToDisplay}});
  }

  return (

    <>

      {
        isLoggedIn ? (
          <>
          <div>
            <h1>USER  Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <div>
              <h1>Products</h1>
              {/* <ul>

                {
                productData.map((product) => (
                  <div className="card" key={product._id} >
                    <h2 onClick={() => getSelectedProduct(product._id)}>{product.name}</h2>
                    <h3>{product.price}</h3>
                    <button onClick={deleteProduct}>Delete</button>
                  </div>

                ))}
              </ul> */}

              <table>
                <thead>
                  <tr>
                    <th>S NO.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productData.map((product) => (
                      <tr key={product._id}>
                        <td>{SNO++}</td>
                        <td onClick={() => getSelectedProduct(product._id)}>{product.name}</td>
                        <td>{product.price}</td>
                        <td><button id={product._id} onClick={deleteProduct}>Delete</button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          </>
        ) : (
          navigate("/admin/login")
        )
      }
    </>
  )
}

export default UserDashboard