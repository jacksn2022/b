import React, { useState } from "react";
import logo from "../assets/images/logo.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-auto w-[140px]" />
          {/* <span className="text-xl font-semibold text-slate-800">AceBrand</span> */}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="text-slate-700 hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="text-slate-700 hover:text-blue-600">
            About
          </a>
          <a
            href={`mailto:steviehenderson558@gmail.com`}
            className="text-slate-700 hover:text-blue-600"
          >
            Contact
          </a>
          <a
            href={`mailto:steviehenderson558@gmail.com`}
            className="text-slate-700 hover:text-blue-600"
          >
            support
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-sm">
          <nav className="flex flex-col p-4 space-y-3">
            <a href="#home" className="text-slate-700 hover:text-blue-600">
              Home
            </a>
            <a
              href="https://www.fema.gov/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-600"
            >
              About
            </a>

            <a
              href={`mailto:steviehenderson558@gmail.com`}
              className="text-slate-700 hover:text-blue-600"
            >
              Contact
            </a>
            <a
              href={`mailto:steviehenderson558@gmail.com`}
              className="text-slate-700 hover:text-blue-600"
            >
              support
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
