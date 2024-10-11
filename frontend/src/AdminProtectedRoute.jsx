import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { userContext } from "./App";

function AdminProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);


  return children;
}

export default AdminProtectedRoute;
