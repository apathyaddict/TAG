import React from "react";
import {
  FaLongArrowAltRight,
  FaEdit,
  FaPhoneAlt,
  FaLink,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant, editSelectedRestaurant }) => {
  const { name, rue, code_postal, ville, phone, website, id } = restaurant;

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");

    return formatted;
  };

  const handleEdit = (restaurant) => {
    editSelectedRestaurant(restaurant);
    console.log(restaurant);
  };

  return (
    <div className="rounded-md shadow-lg bg-white p-4">
      <h5 className="mb-5 text-xl font-semibold leading-snug text-blue-gray-900">
        {name}
      </h5>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-base">{rue}</span>
          <span className="text-base">
            {code_postal}, {ville}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-stone-600" />
          <p className="text-gray-700">{formatPhoneNumber(phone)}</p>
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <FaLink className="text-stone-600" />
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline">
            {website}
          </a>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Link to={`/restaurants/${id}`}>
          <button className="flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase text-gray-900 transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20">
            Details <FaLongArrowAltRight />
          </button>
        </Link>
        <Link to={`/edit-restaurant/${id}`}>
          <button
            className="flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase text-gray-900 transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20"
            onClick={() => handleEdit(restaurant)}>
            Modifier <FaEdit />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
