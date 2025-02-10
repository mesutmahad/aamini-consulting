"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UpdateUser = () => {
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userData);
    navigate("/profile");
  };

  if (!user) {
    return <div>Please log in to update your information.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Update User Information
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              name="fullName"
              type="text"
              required
              placeholder="Full Name"
              value={userData.fullName || ""}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="gender"
              type="text"
              required
              placeholder="Gender"
              value={userData.gender || ""}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="nationality"
              type="text"
              required
              placeholder="Nationality"
              value={userData.nationality || ""}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="phone"
              type="tel"
              required
              placeholder="Phone"
              value={userData.phone || ""}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={userData.email || ""}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="address"
              type="text"
              required
              placeholder="Address"
              value={userData.address || ""}
              onChange={handleChange}
              className="mb-2"
            />
          </div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Information
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
