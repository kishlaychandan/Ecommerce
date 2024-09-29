import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component that provides isLoggedIn state and setter
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); 

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isUserLoggedIn, setIsUserLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext in other components
export function useAuth() {
    return useContext(AuthContext);
}