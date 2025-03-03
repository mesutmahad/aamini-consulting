"use client";

import { useState, useEffect } from "react";
import { Phone, Printer, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useTheme } from "../contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/contact/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setLoading(false);
      setResponseMessage(result.message);

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          message: "",
        });
      }
    } catch (error) {
      setLoading(false);
      setResponseMessage("An error occurred while sending the message.");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-[#f8f9ff] text-gray-900"
      } py-16 mt-20`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } rounded-2xl overflow-hidden shadow-lg`}
        >
          <div className="grid md:grid-cols-2">
            {/* Left Section: Contact Form */}
            <div className="p-8 md:p-12">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Get in{" "}
                  <span className={isDark ? "text-blue-400" : "text-[#2B428C]"}>
                    Touch
                  </span>
                </h1>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } mb-8`}
                >
                  Fill out the form below and we’ll get back to you as soon as
                  possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="friend">Friend Referral</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    className="w-full p-2 border rounded"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "SEND"}
                  </Button>
                </form>

                {responseMessage && (
                  <p className="mt-4 text-sm">{responseMessage}</p>
                )}
              </div>
            </div>

            {/* Right Section: Contact Info */}
            <div
              className={`${
                isDark ? "bg-gray-700" : "bg-[#2B428C]"
              } p-8 h-full min-h-[400px] md:min-h-full text-white`}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>
                    Phone:{" "}
                    <a href="tel:+1234567890" className="underline">
                      +1 234 567 890
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5" />
                  <span>Fax: +1 234 567 891</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>
                    Email:{" "}
                    <a href="mailto:info@amini.com" className="underline">
                      info@amini.com
                    </a>
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986548727086!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564658827!5m2!1sen!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
