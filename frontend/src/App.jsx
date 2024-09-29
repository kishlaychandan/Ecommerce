import React from 'react'
import Register from './components/Register/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Admin/Login'
import UserLogin from './components/Login/User/UserLogin'
import Dashboard from './components/Login/Admin/Dashboard/Dashboard'
import ForgetPassword from './components/Login/Admin/ForgetPassword'
import SingleProduct from './components/Login/Admin/SingleProduct/SingleProduct'
import Navbar from './components/Navbar/Navbar'
import UserDashboard from './components/Login/User/UserDashboard'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Deals from './components/Deals/Deals'
import AddProduct from './components/Login/Admin/Dashboard/AddProduct'
import AdminDashboard from './AdminDashboard'
import Review from './components/Review/Review'
function App() {
  return (
    
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/" element={<AdminDashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="/user/login" element={<UserLogin />}/>
        <Route path="/admin/Dashboard" element={<Dashboard />}/>
        <Route path="/user/Dashboard" element={<UserDashboard/>}/>
        <Route path="/forgotPassword" element={<ForgetPassword/>}/>
        <Route path="/admin/product" element={<SingleProduct/>}/>
        <Route path="/user/cart/" element={<Cart/> } />
        <Route path="/user/deals/" element={<Deals/> } />
        <Route path='/review' element={<Review/>}/>
        <Route path='/admin/add' element={<AddProduct/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App