"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setUser(JSON.parse(rememberedUser));
    }
  }, []);

  const login = (username, password) => {
    // This is a simple check. In a real app, you'd validate against a backend.
    if (username === "admin" && password === "2025") {
      const userData = {
        username: "admin",
        fullName: "MESUT MAHAD MOHAMED",
        gender: "Male",
        nationality: "Somali",
        phone: "+252 617678646",
        email: "mesutmahad@gmail.com",
        profilePicture: null,
        address: "Jawhara st, Mogadishu, Somalia",
      };
      setUser(userData);
      localStorage.setItem("rememberedUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rememberedUser");
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem("rememberedUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
