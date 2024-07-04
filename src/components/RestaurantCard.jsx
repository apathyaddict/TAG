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
  const { name, rue, code_postal, ville, phone, website, id } = restaurant;

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");

    return formatted;
  };

  const handleEdit = (restaurant) => {
    editFunc(restaurant);
  };

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white p-4  border-l-8 border-blue-600 ">
      <h5 className="mb-2 text-2xl uppercase wrap font-bold leading-snug text-sky ">
        {name}
      </h5>
      <div className=" border mb-4 border-1  border-gray-200"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-base">{rue}</span>
          <span className="text-base">
            {code_postal}, {ville}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-blue-400" />
          <p className="text-gray-700">{formatPhoneNumber(phone)}</p>
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <FaLink className="text-blue-400" />
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline">
            {website}
          </a>
        </div>
      </div>

      {/* buttons */}
      <div className="flex justify-between mt-4 gap-2">
        <Link to={`/restaurants/${id}`}>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border text-slate-700 transition-all rounded-lg hover:bg-slate-500/10 active:bg-gray-900/20 hover:text-slate-800">
            Détails
            <BiPlus className=" h-4 w-4 font-bold" />
          </button>
        </Link>
        <Link to={`/edit-restaurant/${id}?isEditing=true`}>
          <button
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border text-slate-700 transition-all rounded-lg hover:bg-slate-500/10 active:bg-gray-900/20 hover:text-slate-800"
            onClick={() => handleEdit(restaurant)}>
            Modifier <FaEdit className=" h-4 w-4 font-bold" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
