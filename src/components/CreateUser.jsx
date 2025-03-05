"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useTheme } from "../contexts/ThemeContext";
import { Mail, Phone } from "lucide-react";
import { useAxios } from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = ({ onUserCreated, editingUser }) => {
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: editingUser?.firstName || "",
      middleName: editingUser?.middleName || "",
      lastName: editingUser?.lastName || "",
      phone: editingUser?.phone || "",
      email: editingUser?.email || "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if (editingUser) {
      Object.keys(editingUser).forEach((key) =>
        setValue(key, editingUser[key])
      );
    }
  }, [editingUser, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (editingUser) {
        await axios.put(`/users/update/${editingUser._id}`, data);
        toast.success("User updated successfully! ✅");
      } else {
        await axios.post("/users/register", data);
        toast.success("User created successfully! ✅");
      }
      onUserCreated(); // This will call fetchUsers in UserManagement
      reset();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-6 sm:py-10 mt-4 sm:mt-8 ${
        isDark
          ? "bg-gray-800 text-white border border-gray-700 shadow-lg"
          : "bg-white text-gray-900 border border-gray-200 shadow-md"
      } rounded-lg transition-all duration-200`}
    >
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
        {editingUser ? "Edit User" : "Create User"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input id="middleName" {...register("middleName")} />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center mt-1">
              <Input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center mt-1">
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: !editingUser ? "Password is required" : false,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? editingUser
              ? "Updating..."
              : "Creating..."
            : editingUser
            ? "Update User"
            : "Create User"}
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
