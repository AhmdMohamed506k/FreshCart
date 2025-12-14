import React, { createContext, useEffect, useState } from "react";

export const MyAuthContext = createContext();

export default function UserContext({ children }) {
  const [istoken, setToken] = useState(() => {
    return localStorage.getItem("Token") || null;
  });

  // Keep token updated if changed in localStorage (login / logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("Token");
      setToken(token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <MyAuthContext.Provider value={{ istoken, setToken }}>
      {children}
    </MyAuthContext.Provider>
  );
}
