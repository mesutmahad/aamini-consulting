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
        profilePicture: "/img/PROFILE PIC.ico",
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

  const addUser = (newUserData) => {
    // In a real app, you'd send this data to your backend to create a new user
    // For this example, we'll just add it to local storage
    const newUser = {
      ...newUserData,
      id: Date.now(), // Generate a unique ID (use a proper ID generation in production)
    };
    setUser(newUser);
    localStorage.setItem("rememberedUser", JSON.stringify(newUser));
    return true;
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem("rememberedUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
