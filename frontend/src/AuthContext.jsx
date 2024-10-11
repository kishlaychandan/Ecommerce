import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component that provides isLoggedIn state and setter
export function AuthProvider({ children }) {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); 

    return (
        <AuthContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext in other components
export function useAuth() {
    return useContext(AuthContext);
}