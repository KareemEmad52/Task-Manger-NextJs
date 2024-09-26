"use client";

import React, { useState, useEffect, createContext } from "react";
import { AuthContextType, AuthStateType } from "@/lib/types";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<AuthStateType>({
    isAuth: false,
    token: null,
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsAuth({ isAuth: true, token});
    }
  }, []);

  const handleLogin = (token: string) => {
    Cookies.set("authToken", token, { expires: 7 });
    Cookies.set("isAuth", 'true', { expires: 7 });
    setIsAuth({ isAuth: true, token });
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("isAuth");
    setIsAuth({ isAuth: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
