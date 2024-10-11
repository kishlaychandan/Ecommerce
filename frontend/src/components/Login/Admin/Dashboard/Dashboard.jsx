import React from 'react'
import axios from '../../../../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../../AuthContext'
import AddProduct from '../AddProduct/AddProduct'
function Dashboard() {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  let SNO=1;

//   useEffect(() => {
//     isUserLoggedIn();
// }, [])
useEffect(() => {
  fetchAllProducts();
},[])

// async function isUserLoggedIn() {
//     try {
//         const response = await axios.get(
//           "/user/loggedIn",
//         );
//         if (response.statusText === "OK") setIsAdminLoggedIn(true);
//       } catch (err) {
//         console.log("Error checking login status: " + err);
//       }
// }
  async function handleLogout(){
    try{
      const response = await axios.post("/user/logout", {
        
      });
      console.log(response);
      if (response.statusText === "OK") {
        console.log("logged out");
        setIsAdminLoggedIn(false);
        navigate("/admin");
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
    const id=e.target.id;
    try{
      const response = await axios.delete(`/product/deleteproduct/${id}`);
      // console.log(response);
      fetchAllProducts();
      
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
          <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <div>
              <h1>Products</h1>
   
              {productData && productData.length > 0 ? (
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
                    {productData.map((product) => (
                      <tr key={product._id}>
                        <td>{SNO++}</td>
                        <td onClick={() => getSelectedProduct(product._id)}>
                          {product.name}
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <button id={product._id} onClick={deleteProduct}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No products available</p>
              )}
   
              <Link to="/addproduct" element={<AddProduct />}>
                Add Product
              </Link>
            </div>
          </div>
        
    </>
   );
   
}

export default Dashboard