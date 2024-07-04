import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaSearch, FaUserCircle, FaStore } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav className="bg-white shadow-md ">
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
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  ">
              <BiPlus className="h-8 w-8 text-slate-700 hover:text-blue-600 " />
            </button>
          </Link>

          <Link to="/list">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12 rounded-2xl border border-solid  cursor-pointer pointer-events-auto  border-stone-200  ">
              {" "}
              <FaStore className="h-8 w-8 text-slate-700 hover:text-blue-600" />
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
