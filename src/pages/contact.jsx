import { Phone, Printer, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect } from "react";
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
  return (
    <div className="min-h-screen bg-[#f8f9ff] py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Get in <span className="text-[#2B428C]">Touch</span>
                </h1>
                <p className="text-gray-600 mb-8">
                  Enim tempor eget pharetra facilisis sed maecenas adipiscing.
                  Eu leo molestie vel, ornare non id blandit netus.
                </p>

                <form className="space-y-4">
                  <div>
                    <Input type="text" placeholder="Name *" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <Input type="tel" placeholder="Phone number *" />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How did you find us?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">Friend Referral</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-[#47C263] hover:bg-[#47C263]/90">
                    SEND
                  </Button>
                </form>

                <div className="grid grid-cols-2 gap-4 mt-12">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>PHONE</span>
                    </div>
                    <a href="tel:044xxxxxxxx" className="block text-sm">
                      044xxxxxxxx
                    </a>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Printer className="w-4 h-4" />
                      <span>FAX</span>
                    </div>
                    <span className="block text-sm">044 xxx xx xx</span>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>EMAIL</span>
                    </div>
                    <a href="mailto:info@amini.com" className="block text-sm">
                      info@amini.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2B428C] p-2 h-full min-h-[400px] md:min-h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986548727086!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564658827!5m2!1sen!2s"
                width="100%"
                height="100%"
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
  );
}
