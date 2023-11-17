import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axiosInstance.post("/api/auth/login", inputs,{
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axiosInstance.post("/api/auth/logout",{},{
      withCredentials:true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};