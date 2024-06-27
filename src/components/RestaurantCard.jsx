import React from "react";
import { FaLongArrowAltRight, FaPlus, FaPhoneAlt } from "react-icons/fa";

/* eslint-disable react/prop-types */

const RestaurantCard = ({ restaurant }) => {
  const {
    formData: { name, code_postal, ville, phone, website },
  } = restaurant;

  // Function to format phone number with spaced pairs
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");

    return formatted;
  };

  return (
    <div className="max-w-lg rounded-md shadow-lg bg-white p-4">
      <div className="">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {name}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {code_postal}, {ville}
        </p>
        <p className="text-gray-700 text-base  gap-2 flex items-center">
          <FaPhoneAlt className="text-stone-600" />
          {formatPhoneNumber(phone)}
        </p>
        {website && (
          <p className="block mt-4 font-sans text-base antialiased font-light leading-relaxed text-inherit">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:underline">
              Site web
            </a>
          </p>
        )}
      </div>
      <div className="flex flex-col justify-center align-middle mt-10">
        <div className=" flex justify-between">
          <a href="#" className="inline-block">
            <button
              className="flex items-center gap-2  py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button">
              Details
              <FaLongArrowAltRight />
            </button>
          </a>
          <button
            className="flex items-center gap-2 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button"
            // onClick={onEdit}
          >
            Modifier
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
