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
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => handleContactClick(contact)}
              className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-card text-card-foreground border border-border/30"
            >
              <h3 className="font-semibold text-lg mb-2">{contact.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                {contact.email}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {contact.phone}
              </p>
              <p className="text-sm line-clamp-2">{contact.message}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedContact.name}</DialogTitle>
                <DialogDescription>
                  <p>{selectedContact.email}</p>
                  <p>{selectedContact.phone}</p>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <p className="text-sm border py-10 p-2">{selectedContact.message}</p>
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
