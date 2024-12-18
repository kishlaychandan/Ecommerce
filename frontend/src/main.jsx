// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { AuthProvider } from './AuthContext'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//     <App />
//     </AuthProvider>
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './AuthContext'
import { CategoriesProvider } from './CategoriesContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CategoriesProvider >
        <App />
    </ CategoriesProvider >
    </AuthProvider>
  </StrictMode>,
)