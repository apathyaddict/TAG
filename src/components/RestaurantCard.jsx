import React from "react";
import { FaPhoneAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant, editFunc }) => {
  const { name, rue, code_postal, ville, manager_name, phone, category, id } =
    restaurant;

  // Function to capitalize the first letter of each word
  // const capitalizeFirstLetter = (str) => {
  //   return str.replace(/\b\w/g, (char) => char.toUpperCase());
  // };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");
    return formatted;
  };

  // const handleEdit2 = (restaurant) => {
  //   editFunc(restaurant);
  // };

  const lowercaseWords = ["de", "du", "des", "et", "la", "le", "les"];

  const capitalizeCityName = (cityName) => {
    if (!cityName) return "";

    // Split the city name by spaces and hyphens while preserving special characters
    const words = cityName.split(/[\s-]+/);

    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      // Handle words containing an apostrophe
      if (word.includes("'")) {
        const parts = word.split("'");
        parts[0] = capitalizeFirstLetter(parts[0]);
        parts[1] = capitalizeFirstLetter(parts[1]);
        word = parts.join("'");
      } else {
        word = capitalizeFirstLetter(word);
      }

      // Ignore certain lowercase words
      if (i === 0 || !lowercaseWords.includes(word.toLowerCase())) {
        words[i] = word;
      } else {
        words[i] = word.toLowerCase();
      }

      // Handle special characters like accents after a dash or hyphen
      if (i > 0 && word.startsWith("-")) {
        words[i] = "-" + words[i][1].toUpperCase() + words[i].slice(2);
      }
    }

    return words.join(" ");
  };

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-md bg-white p-4 border-l-8 border-blue-600 w-full max-w-80">
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
          <p className="text-gray-700"> {formatPhoneNumber(phone)}</p>
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
