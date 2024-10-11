import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { userContext } from "./App";

function ProtectedRoute({ children }) {
  const { isUserLoggedIn } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);


  return children;
}

export default ProtectedRoute;
