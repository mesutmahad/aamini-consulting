"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Pencil,
  Trash2,
  Search,
  User,
  Mail,
  Shield,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import CreateUser from "./CreateUser";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    role: "user",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    username: "jane_smith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    role: "admin",
    createdAt: "2023-02-20",
  },
  {
    id: 3,
    username: "bob_johnson",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    phone: "+1122334455",
    role: "moderator",
    createdAt: "2023-03-10",
  },
  {
    id: 4,
    username: "sarah_williams",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
    phone: "+1555666777",
    role: "user",
    createdAt: "2023-04-05",
  },
  {
    id: 5,
    username: "mike_brown",
    firstName: "Mike",
    lastName: "Brown",
    email: "mike@example.com",
    phone: "+1888999000",
    role: "admin",
    createdAt: "2023-05-12",
  },
];

const ListUsers = () => {
  const { isDark } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newlyCreatedUser, setNewlyCreatedUser] = useState(null);

  // Replace the handleDelete function and add a state for delete confirmation

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredUsers = mockUsers.filter(
      (user) =>
        user.username
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.firstName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (userId) => {
    const userToRemove = users.find((user) => user.id === userId);
    setUserToDelete(userToRemove);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const getRoleBadgeClass = (role) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    if (isDark) {
      switch (role) {
        case "admin":
          return `${baseClass} bg-red-900 text-red-200`;
        case "moderator":
          return `${baseClass} bg-yellow-900 text-yellow-200`;
        default:
          return `${baseClass} bg-green-900 text-green-200`;
      }
    } else {
      switch (role) {
        case "admin":
          return `${baseClass} bg-red-100 text-red-800`;
        case "moderator":
          return `${baseClass} bg-yellow-100 text-yellow-800`;
        default:
          return `${baseClass} bg-green-100 text-green-800`;
      }
    }
  };

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setShowCreateUser(false);
    setNewlyCreatedUser(newUser);
    setIsSuccessModalOpen(true);
  };

  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">
        User Management
      </h1>

      <Button
        onClick={() => setShowCreateUser(!showCreateUser)}
        className={`mb-4  sm:mb-6 ${
          isDark
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white transition-colors duration-200`}
      >
        {showCreateUser ? "Hide Create User Form" : "Create New User"}
      </Button>

      {showCreateUser && <CreateUser onUserCreated={handleUserCreated} />}

      <Card
        className={`mb-6 mt-10 ${
          isDark
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-gray-900 border-gray-200"
        }`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={handleSearch}
              className={`pl-8 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>
        </CardContent>
      </Card>

      <div
        className={`rounded-lg overflow-hidden border ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className={isDark ? "bg-gray-800" : "bg-gray-50"}>
              <TableRow>
                <TableHead className="font-semibold">Username</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Created At
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={isDark ? "bg-gray-800" : "bg-white"}>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No users found. Try a different search term.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className={`${
                      isDark
                        ? "hover:bg-gray-700 border-gray-700"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <span className="text-sm font-semibold text-gray-400">
                            {user.firstName.charAt(0)}
                          </span>
                        </div>
                        <span className="hidden sm:inline">
                          {user.username}
                        </span>
                        <span className="sm:hidden">{user.firstName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="truncate max-w-[150px] sm:max-w-none">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <span className={getRoleBadgeClass(user.role)}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                        className={
                          isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className={
                          isDark
                            ? "hover:bg-gray-700 text-red-400 hover:text-red-300"
                            : "hover:bg-gray-200 text-red-500 hover:text-red-600"
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={`max-w-md mx-auto ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold mb-4">
                  User Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">
                    Username
                  </label>
                  <p className="text-sm font-semibold flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {selectedUser.username}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">
                    Full Name
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">
                    Email
                  </label>
                  <p className="text-sm flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedUser.email}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">
                    Phone
                  </label>
                  <p className="text-sm flex items-center">
                    {selectedUser.phone}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">Role</label>
                  <p className="text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className={getRoleBadgeClass(selectedUser.role)}>
                      {selectedUser.role}
                    </span>
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">
                    Created At
                  </label>
                  <p className="text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedUser.createdAt}
                  </p>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className={
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }
                >
                  Close
                </Button>
                <Button
                  className={`${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors duration-200`}
                >
                  Edit User
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* Add this at the end of the component, after the user details Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent
          className={`max-w-md mx-auto ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete user{" "}
              <span className="font-semibold">{userToDelete?.username}</span>?
            </p>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className={
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className={`${
                isDark
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-500 hover:bg-red-600"
              } text-white transition-colors duration-200`}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add this new Dialog for the success modal */}
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
            {newlyCreatedUser && (
              <div
                className={`p-4 rounded-lg ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p>
                  <strong>Username:</strong> {newlyCreatedUser.username}
                </p>
                <p>
                  <strong>Name:</strong>{" "}
                  {`${newlyCreatedUser.firstName} ${newlyCreatedUser.lastName}`}
                </p>
                <p>
                  <strong>Email:</strong> {newlyCreatedUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {newlyCreatedUser.role}
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

export default ListUsers;
