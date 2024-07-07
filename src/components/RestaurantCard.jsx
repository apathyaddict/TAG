import React from "react";
import { FaPhoneAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant, editFunc }) => {
  const { name, rue, code_postal, ville, manager_name, category, id } =
    restaurant;

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");
    return formatted;
  };

  const handleEdit2 = (restaurant) => {
    editFunc(restaurant);
  };

  const capitalizeCityName = (cityName) => {
    if (!cityName) return "";

    // Words that should remain lowercase
    const lowercaseWords = ["de", "du", "des", "et", "la", "le", "les"];

    // Split the city name into words
    const words = cityName.toLowerCase().split(" ");

    // Capitalize each word unless it's in the lowercaseWords array
    const capitalizedWords = words.map((word, index) => {
      if (index === 0 || !lowercaseWords.includes(word)) {
        return capitalizeFirstLetter(word);
      } else {
        return word;
      }
    });

    return capitalizedWords.join(" ");
  };

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-md bg-white p-4 border-l-8 border-blue-600 w-full max-w-sm">
      <div className="flex justify-start max-w-full flex-wrap border-b overflow-x-hidden">
        <h5 className="mb-2 text-xl uppercase font-bold leading-snug text-sky wrap">
          {capitalizeFirstLetter(name)}
        </h5>
      </div>

      <div className="flex flex-col gap-3 ">
        <div className="flex justify-end item-right mt-2 ">
          <p className="text-red-900 font-bold ">{category}</p>
        </div>
        <div className="flex flex-col w-full ">
          <span className="text-base">{capitalizeCityName(rue)}</span>
          <span className="text-base">
            {code_postal}, {capitalizeFirstLetter(ville)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-blue-400" />
          <p className="text-gray-700">
            {" "}
            {capitalizeFirstLetter(manager_name)}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-8 gap-2">
        <Link to={`/restaurants/${id}`}>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase border text-slate-700 transition-all rounded-lg hover:bg-slate-500/10 active:bg-gray-900/20 hover:text-slate-800">
            Détails et Modifications
            <FaEdit className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
