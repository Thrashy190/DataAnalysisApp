import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();


  return currentUser ? currentUser.accept_terms_and_conditions ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/" />;
};

export default ProtectedRoute;
