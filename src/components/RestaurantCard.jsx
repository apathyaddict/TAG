import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import {
  FaLongArrowAltRight,
  FaEdit,
  FaPhoneAlt,
  FaLink,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant, editFunc }) => {
  const {
    name,
    rue,
    code_postal,
    ville,
    phone,
    manager_name,
    manager_phone,
    category,
    website,
    id,
  } = restaurant;

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");

    return formatted;
  };

  const handleEdit2 = (restaurant) => {
    editFunc(restaurant);
  };

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-md bg-white p-4  border-l-8 border-blue-600 overflow-x-hidden w-md">
      <h5 className="mb-2 text-xl uppercase  font-bold leading-snug text-sky border-b  ">
        {name}
      </h5>
      {/* <div className=" border mb-2 border-1  border-gray-200"></div> */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-end item-right gap-2 ">
          <p className="text-red-900 font-bold">{category}</p>
        </div>
        <div className="flex flex-col w-full">
          <span className="text-base">{rue}</span>
          <span className="text-base">
            {code_postal}, {ville}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-blue-400" />
          <p className="text-gray-700">{manager_name}</p>
        </div>
        {/* <div className="flex items-center gap-2 overflow-hidden">
          <FaLink className="text-blue-400" />
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline">
            {website}
          </a>
        </div> */}
      </div>

      {/* buttons */}
      <div className="flex justify-end mt-8 gap-2">
        <Link to={`/restaurants/${id}`}>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border text-slate-700 transition-all rounded-lg hover:bg-slate-500/10 active:bg-gray-900/20 hover:text-slate-800">
            Détails et Modifications
            <FaEdit className=" h-4 w-4" />
          </button>
        </Link>
        {/* removed for now, first go to details page */}
        {/* <Link to={`/edit-restaurant/${id}?isEditing=true`}>
          <button
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border text-slate-700 transition-all rounded-lg hover:bg-slate-500/10 active:bg-gray-900/20 hover:text-slate-800"
            onClick={() => handleEdit2(restaurant)}>
            Modifier <FaEdit className=" h-4 w-4 font-bold" />
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default RestaurantCard;
