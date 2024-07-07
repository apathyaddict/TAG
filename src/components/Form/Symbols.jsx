import React, { useState } from "react";
import { MdTableRestaurant } from "react-icons/md";

const Symbols = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const renderIcons = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <MdTableRestaurant key={index} className="text-blue-600/50" />
    ));
  };

  return (
    <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex gap-10 justify-start">
      <div className="w-[150px] px-4 text-slate-400">La cuisine:</div>
      <div className="flex flex-col gap-4">
        <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li
            className={`flex items-center border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ${
              selectedOption === 0 ? "bg-gray-100" : ""
            }`}>
            <input
              id="horizontal-list-radio-license-0"
              type="radio"
              checked={selectedOption === 0}
              onChange={() => handleOptionChange(0)}
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="horizontal-list-radio-license-0"
              className="flex items-center py-3 ml-2 space-x-1 text-sm font-medium text-gray-900 dark:text-gray-300">
              Trés bonne table {renderIcons(1)}
            </label>
          </li>
          <li
            className={`flex items-center border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ${
              selectedOption === 1 ? "bg-gray-100" : ""
            }`}>
            <input
              id="horizontal-list-radio-license-1"
              type="radio"
              checked={selectedOption === 1}
              onChange={() => handleOptionChange(1)}
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="horizontal-list-radio-license-1"
              className="flex items-center py-3 ml-2 space-x-1 text-sm font-medium text-gray-900 dark:text-gray-300">
              Grande Table, Grande cuisine {renderIcons(2)}
            </label>
          </li>
          <li
            className={`flex items-center border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ${
              selectedOption === 2 ? "bg-gray-100" : ""
            }`}>
            <input
              id="horizontal-list-radio-license-2"
              type="radio"
              checked={selectedOption === 2}
              onChange={() => handleOptionChange(2)}
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="horizontal-list-radio-license-2"
              className="flex items-center py-3 ml-2 space-x-1 text-sm font-medium text-gray-900 dark:text-gray-300">
              Une des meilleures tables {renderIcons(3)}
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Symbols;
