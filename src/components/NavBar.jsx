import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaSearch, FaUserCircle, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown menu

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Company Name (Tag) */}
        <Link to="/">
          <div className="flex items-center">
            <span className="text-gray-800 text-lg font-semibold">Tag</span>
          </div>
        </Link>

        {/* Right side - Search Bar, Create Restaurant, Avatar */}
        <div className="flex items-center space-x-4">
          {/* Search Bar with icon */}
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Recherche..."
              className="pl-10 pr-3 py-2 text-gray-800 bg-white rounded-2xl focus:outline-none ring-1 ring-stone-200 focus:ring-2 focus:ring-amber-700 w-[300px]"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div> */}

          <Link to="/new">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  hover:text-amber-800">
              <BiPlus className="h-8 w-8 text-zinc-800 " />
            </button>
          </Link>

          <Link to="/list">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  hover:text-amber-800">
              {" "}
              <FaStore className="h-8 w-8 text-zinc-800" />
            </button>
          </Link>

          {/* Avatar - dropdown menu on click */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl bg-transparent border border-solid shadow-none cursor-pointer text-stone-500 border-stone-200 hover:text-gray-800 focus:text-gray-800">
              <FaUserCircle className="h-8 w-8 text-zinc-800" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Liste
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
