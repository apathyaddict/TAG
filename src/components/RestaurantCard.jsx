import React from "react";
import {
  FaLongArrowAltRight,
  FaPlus,
  FaPhoneAlt,
  FaLink,
  FaMapMarkerAlt, // New icon for address
} from "react-icons/fa";

/* eslint-disable react/prop-types */

const RestaurantCard = ({ restaurant }) => {
  const { name, rue, code_postal, ville, phone, website } = restaurant;

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");

    return formatted;
  };

  return (
    <div className="max-w-lg rounded-md shadow-lg bg-white p-4  ">
      <h5 className="block mb-5 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        {name}
      </h5>
      <div className="flex flex-col items-start gap-4  w-full">
        {/* Address section */}
        <div className=" flex  flex-col items-start  w-full ">
          <div className="flex-1 font-medium">
            {/* <FaMapMarkerAlt className="text-stone-600" /> */}
            <span className="block font-sans text-base antialiased  leading-relaxed text-inherit">
              {rue}
            </span>
          </div>
          <div className="flex-1 font-normal">
            <p className="block font-sans text-base antialiased leading-relaxed text-inherit">
              {code_postal}, {ville}
            </p>
          </div>
        </div>
        {/* Phone section */}
        <div className="flex items-center gap-2 w-full">
          <FaPhoneAlt className="text-stone-600" />
          <p className="text-gray-700 text-base gap-2 flex items-center">
            {formatPhoneNumber(phone)}
          </p>
        </div>
        {/* Website section */}
        <div className="flex items-center gap-2 w-full">
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
        <a href="#" className="inline-block">
          <button
            className="flex items-center gap-2 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button">
            Details <FaLongArrowAltRight />
          </button>
        </a>
        <button
          className="flex items-center gap-2 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
          type="button"
          // onClick={onEdit}
        >
          Modifier <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
