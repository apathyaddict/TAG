import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SidebarSearch = ({
  setSearchTerm,
  searchTerm,
  citySearchTerm,
  setcitySearchTerm,
  managerSearchTerm,
  setManagerSearchTerm,
  setCategorySearch,
  categorySearch,
}) => {
  const categories = [
    "RESTAURANT",
    "RESTAURANT & HÔTEL",
    "RESTAURANT HÔTEL & SPA",
    "HÔTEL & SPA",
    "VIGNOBLE",
    "DISTILLERIE",
    "CHARCUTERIE",
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
    TRAITEUR: "TRAITEUR",
    AUTRE: "AUTRE",
  };

  const handleCategoryChange = (category) => {
    const plainCategory = categoryMap[category];
    let updatedCategories;
    if (categorySearch.includes(plainCategory)) {
      updatedCategories = categorySearch.filter((cat) => cat !== plainCategory);
    } else {
      updatedCategories = [...categorySearch, plainCategory];
    }
    setCategorySearch(updatedCategories);
  };

  return (
    <div className=" sm:h-full   bg-white text-slate-700 p-4 shadow-md ">
      <h2 className="text-2xl font-bold mb-4 text-slate-700">
        Filtrer les résultats
      </h2>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <label
          className="block text-sm font-medium mb-2 text-blue-400"
          htmlFor="search">
          Recherche:
        </label>
        <input
          id="search"
          type="text"
          className="w-full p-2 pl-10 text-slate-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-10 text-slate-600" />
      </div>

      {/* Filter by City */}
      <div className="hidden sm:block mb-4">
        <label
          className="block text-sm font-medium mb-2 text-blue-400"
          htmlFor="city">
          Filtrer par ville:
        </label>
        <input
          id="city"
          type="text"
          className="w-full p-2 text-slate-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={citySearchTerm}
          onChange={(e) => setcitySearchTerm(e.target.value)}
        />
      </div>

      {/* Filter by Category */}
      <div className="hidden sm:block mb-4">
        <label className="block text-sm font-medium mb-2 text-blue-400">
          Filtrer par catégorie:
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                name="category"
                value={category}
                className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                checked={categorySearch.includes(categoryMap[category])}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="text-sm text-gray-800">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter by CEO Name */}
      <div className="hidden sm:block mb-4">
        <label
          className="block text-sm font-medium mb-2 text-blue-400"
          htmlFor="ceo">
          Filtrer par nom de gérant:
        </label>
        <input
          id="ceo"
          type="text"
          className="w-full p-2 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={managerSearchTerm}
          onChange={(e) => setManagerSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SidebarSearch;
