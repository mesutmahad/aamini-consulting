"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Phone, MessageSquare, User } from "lucide-react";

const Dashboard = () => {
  const { isDark } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/contact/get-contacts"
      );
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  return (
    <div
      className={`p-4 sm:p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading contacts...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p>No messages available.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card
              key={contact._id}
              className={`overflow-hidden transition-all duration-200 transform hover:scale-105 cursor-pointer ${
                isDark
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-200"
              }`}
              onClick={() => handleContactClick(contact)}
            >
              <CardHeader className="pb-2 p-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {contact.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xs sm:text-sm flex items-center mb-1">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  {contact.email}
                </p>
                <p className="text-xs sm:text-sm flex items-center mb-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  {contact.phone}
                </p>
                <p className="text-xs sm:text-sm flex items-start">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-1" />
                  <span className="line-clamp-2">{contact.message}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={`max-w-md mx-auto ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold mb-4">
                  Contact Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">Name</label>
                  <p className="text-sm font-semibold">
                    {selectedContact.name}
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
                    {selectedContact.email}
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
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedContact.phone}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <label className="block text-xs font-medium mb-1">
                    Message
                  </label>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
