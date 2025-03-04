"use client";

import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useTheme } from "../contexts/ThemeContext";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const { isDark } = useTheme();
  const [name, setName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || null
  );
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        fullName: name,
        email,
        phone,
        address,
        profilePicture,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
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
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center overflow-hidden mb-4 ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {profilePicture ? (
              <img
                src={profilePicture || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl sm:text-4xl font-semibold text-gray-400">
                {name.charAt(0) || user?.username?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current.click()}
            className={`mt-2 text-sm sm:text-base ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Change Profile Picture
          </Button>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label
                htmlFor="name"
                className={isDark ? "text-gray-300" : "text-gray-700"}
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={
                  isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className={isDark ? "text-gray-300" : "text-gray-700"}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={
                  isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="phone"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={
                isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }
            />
          </div>
          <div>
            <Label
              htmlFor="address"
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              Address
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={
                isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }
            />
          </div>
        </div>
        <Button
          type="submit"
          className={`w-full mt-6 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors duration-200`}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
