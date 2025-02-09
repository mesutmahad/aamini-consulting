"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Menu, X } from "lucide-react"

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#2B428C]/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
      style={{ backgroundColor: "#2B428C" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/src/App.jsx" className="text-white text-2xl font-bold">
            Aamini-Cosulting
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div
            className={`
            lg:flex items-center gap-8
            fixed lg:static
            inset-x-0 top-20 lg:top-0
            p-6 lg:p-0
            bg-[#2B428C] lg:bg-transparent
            border-t lg:border-0 border-white/10
            transition-all duration-300
            ${isMenuOpen ? "flex flex-col" : "hidden"}
          `}
          >
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/services" active={location.pathname === "/services"}>
              Services
            </NavLink>
            <NavLink to="/pricing" active={location.pathname === "/pricing"}>
              Pricing
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              About
            </NavLink>
            <NavLink to="/contact" active={location.pathname === "/contact"}>
              Contact
            </NavLink>
            <Button className="bg-[#47C263] hover:bg-[#47C263]/90 text-white w-full lg:w-auto">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`
        text-white/90 hover:text-white
        py-3 lg:py-0
        border-b lg:border-b-0 border-white/10
        last-of-type:border-b-0
        transition-colors
        w-full lg:w-auto
        text-center
        ${active ? "text-white font-medium" : ""}
      `}
    >
      {children}
    </Link>
  )
}

