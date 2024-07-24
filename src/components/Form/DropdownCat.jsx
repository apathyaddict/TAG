import React, { useState } from "react";

const displayCategories = [
  "RESTAURANT",
  "RESTAURANT & HÔTEL",
  "RESTAURANT HÔTEL & SPA",
  "HÔTEL & SPA",
  "VIGNOBLE",
  "DISTILLERIE",
  "CHARCUTERIE",
  "PATISSERIE",
  "BOULANGER",
  "FROMAGER",
  "BOUCHER",
  "TRAITEUR",
  "AUTRE",
];

const categoryMap = {
  RESTAURANT: "RESTAURANT",
  "RESTAURANT & HÔTEL": "RESTAURANT ET HOTEL",
  "RESTAURANT HÔTEL & SPA": "RESTAURANT HOTEL ET SPA",
  "HÔTEL & SPA": "HOTEL ET SPA",
  VIGNOBLE: "VIGNOBLE",
  DISTILLERIE: "DISTILLERIE",
  CHARCUTERIE: "CHARCUTERIE",
  PATISSERIE: "PATISSERIE",
  BOULANGER: "BOULANGER",
  FROMAGER: "FROMAGER",
  BOUCHER: "BOUCHER",
  TRAITEUR: "TRAITEUR",
  AUTRE: "AUTRE",
};

const DropdownCat = ({ category, setRestaurantData, restaurantData }) => {
  const handleInputChange = (event) => {
    const selectedCategory = event.target.value;
    const plainCategory = categoryMap[selectedCategory];
    setRestaurantData((prevData) => ({
      ...prevData,
      category: plainCategory,
    }));
  };

  return (
    <div className="custom-select">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-500">
        Rubrique <span className="text-red-500">*</span>
      </label>
      <select
        id="category"
        name="category"
        value={
          Object.keys(categoryMap).find(
            (key) => categoryMap[key] === category
          ) || ""
        }
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:stone-blue-500 form-select appearance-none pr-8 pl-2 bg-no-repeat"
        onChange={handleInputChange}>
        <option value="" disabled>
          Veuillez choisir une rubrique
        </option>
        {displayCategories.map((displayCategory, index) => (
          <option key={index} value={displayCategory}>
            {displayCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCat;
