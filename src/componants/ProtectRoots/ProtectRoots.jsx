
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectRoots() {



    const token = localStorage.getItem("Token");
   return token ? <Outlet /> : <Navigate to="/login" replace />;
}
