// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <Link to="/">MEDICONNECT</Link>
        </div>
        <div className="flex gap-4">
          <Link to="/about" className="text-white hover:underline">
            About
          </Link>
          <Link to="/e-sanjeevni" className="text-white hover:underline">
            E-Sanjeevni
          </Link>
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
