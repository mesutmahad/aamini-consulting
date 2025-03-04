"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useTheme } from "../contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Mail, Phone, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";

const CreateUser = ({ onUserCreated }) => {
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      role: "admin",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser = {
      id: Date.now(),
      username: `${data.firstName.toLowerCase()}_${data.lastName.toLowerCase()}`,
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCreatedUser(newUser);
    setIsSuccessModalOpen(true);
    setIsLoading(false);
    reset();

    onUserCreated(newUser);
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
        Create New User
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              First Name
            </Label>
            <Input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className={`mt-1 ${
                isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="middleName"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              Middle Name
            </Label>
            <Input
              id="middleName"
              {...register("middleName")}
              className={`mt-1 ${
                isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className={`mt-1 ${
                isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="phone"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              Phone
            </Label>
            <div className="flex items-center mt-1">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
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
                className={`${
                  isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              Email
            </Label>
            <div className="flex items-center mt-1">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
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
                className={`${
                  isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }`}
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
          <Label
            htmlFor="password"
            className={isDark ? "text-gray-300" : "text-gray-700"}
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`mt-1 ${
              isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="role"
            className={isDark ? "text-gray-300" : "text-gray-700"}
          >
            Role
          </Label>
          <div className="flex items-center mt-1">
            <Shield className="w-4 h-4 mr-2 text-gray-400" />
            <Select
              defaultValue="admin"
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger
                className={`w-full ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900"
                }
              >
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          className={`w-full mt-6 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors duration-200`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create User"}
        </Button>
      </form>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent
          className={`max-w-md mx-auto ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold mb-4">
              User Created Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>The new user has been successfully registered:</p>
            {createdUser && (
              <div
                className={`p-4 rounded-lg ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p>
                  <strong>Username:</strong> {createdUser.username}
                </p>
                <p>
                  <strong>Name:</strong>{" "}
                  {`${createdUser.firstName} ${createdUser.lastName}`}
                </p>
                <p>
                  <strong>Email:</strong> {createdUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {createdUser.role}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="mt-6">
            <Button onClick={() => setIsSuccessModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateUser;
