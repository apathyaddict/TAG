import React, { useState } from "react";

const categories = [
  "RESTAURANT",
  "RESTAURANT & HOTEL",
  "RESTAURANT HOTEL & SPA",
  "HOTEL & SPA",
  "VIGNOBLE",
  "DISTILLERIE",
  "CHARCUTERIE",
  "TRAITEUR",
  "AUTRE",
];

const DropdownCat = ({ category, setRestaurantData, restaurantData }) => {
  const handleInputChange = (event) => {
    const newCategory = event.target.value;
    setRestaurantData((prevData) => ({
      ...prevData,
      category: newCategory,
    }));
  };

  return (
    <>
      <div className="custom-select">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-500">
          Rubrique <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={category}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:stone-blue-500 form-select appearance-none pr-8 pl-2 bg-no-repeat"
          onChange={handleInputChange}>
          <option value="" disabled>
            Veuillez choisir une rubrique
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropdownCat;
