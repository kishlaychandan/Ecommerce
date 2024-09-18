import React from 'react'
import Register from './components/Register/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App