import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";

const Navbar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown menu

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    // Automatically close dropdown after 3 seconds if it's still open
    if (!isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <nav className="bg-white shadow-md sticky w-full z-10 ">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/">
          <div className="flex items-center">
            <span className="text-slate-700 text-lg font-semibold hover:text-blue-800">
              Tag
            </span>
          </div>
        </Link>

        {/* Right side - Search Bar, Create Restaurant, Avatar */}
        <div className="flex items-center space-x-4">
          <Link to="/new">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  ">
              <BiPlus className="h-8 w-8 text-slate-700 hover:text-blue-600 " />
            </button>
          </Link>

          <Link to="/list">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  ">
              {" "}
              <FiSearch className="h-8 w-8 text-slate-700 hover:text-blue-600" />
            </button>
          </Link>
          <Link to="/pdf">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  ">
              {" "}
              <BsFiletypePdf className="h-8 w-8 text-slate-700 hover:text-blue-600" />
            </button>
          </Link>
          <Link to="/admin">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  ">
              {" "}
              <MdDashboard className="h-8 w-8 text-slate-700 hover:text-blue-600" />
            </button>
          </Link>

          {/* Avatar - dropdown menu on click */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl bg-transparent border border-solid shadow-none cursor-pointer text-stone-500 border-stone-200 ">
              <FaUserCircle className="h-8 w-8 text-slate-700 hover:text-blue-600 " />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline- z-20">
                <div className=" hover:bg-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700">
                    Profile
                  </Link>
                </div>
                <div className=" hover:bg-gray-100">
                  <a
                    href="list"
                    className="block px-4 py-2 text-sm text-gray-700">
                    Fiches et listes
                  </a>
                </div>
                <div className=" hover:bg-gray-100">
                  <a
                    href="pdf"
                    className="block px-4 py-2 text-sm text-gray-700">
                    Exporter pdf
                  </a>
                </div>
                <div className=" hover:bg-gray-100">
                  <a
                    href="admin"
                    className="block px-4 py-2 text-sm text-gray-700">
                    Tableau de bord
                  </a>
                </div>
                <div className=" hover:bg-gray-100 font-bold">
                  <button
                    onClick={handleLogout}
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700">
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
