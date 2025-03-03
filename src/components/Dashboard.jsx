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
      className={`p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card
              key={contact._id}
              className={`overflow-hidden transition-all duration-200 transform hover:scale-105 ${
                isDark
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-200"
              }`}
              onClick={() => handleContactClick(contact)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {contact.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm flex items-center mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {contact.email}
                </p>
                <p className="text-sm flex items-center mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {contact.phone}
                </p>
                <p className="text-sm flex items-start">
                  <MessageSquare className="w-4 h-4 mr-2 mt-1" />
                  <span className="line-clamp-2">{contact.message}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }
        >
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedContact.name}
                </DialogTitle>
                <DialogDescription>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedContact.email}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedContact.phone}
                  </p>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <p className="text-sm border rounded-lg p-4">
                  {selectedContact.message}
                </p>
              </div>
              <DialogFooter>
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
