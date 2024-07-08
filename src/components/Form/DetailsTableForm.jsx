import React, { useState, useEffect } from "react";
import { FaRegStar, FaWineBottle } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";

const DetailsTableForm = ({ restaurantData, handleDetailsTableChange }) => {
  // State to manage checked items
  const [checkedItems, setCheckedItems] = useState({
    cave: false,
    terrasse: false,
    decorRemarquable: false,
  });

  // Update state if restaurantData changes (e.g., when editing existing data)
  useEffect(() => {
    if (restaurantData.detailsData) {
      setCheckedItems({
        ...checkedItems,
        cave: restaurantData.detailsData.cave || false,
        terrasse: restaurantData.detailsData.terrasse || false,
        decorRemarquable: restaurantData.detailsData.decorRemarquable || false,
      });
    }
  }, [restaurantData]);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [id]: checked,
    });

    // Pass updated details data back to parent component
    const updatedDetailsData = {
      ...checkedItems,
      [id]: checked,
    };
    handleDetailsTableChange(updatedDetailsData);
  };

  return (
    <div className="container mb-4">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <li className="border border-gray-300 rounded-lg p-4 bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="cave"
            className="h-4 w-4 text-blue-500"
            onChange={handleCheckboxChange}
            checked={checkedItems.cave}
          />
          <label
            htmlFor="cave"
            className="text-slate-700 text-sm font-medium flex items-center">
            <FaWineBottle className="h-4 w-4 mr-2 text-blue-500" /> Belle Cave
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4 bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="terrasse"
            className="h-4 w-4 text-blue-500"
            onChange={handleCheckboxChange}
            checked={checkedItems.terrasse}
          />
          <label
            htmlFor="terrasse"
            className="text-slate-700 text-sm font-medium flex items-center">
            <IoStorefrontSharp className="h-4 w-4 mr-2 text-blue-500" />{" "}
            Terrasse
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4 bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="decorRemarquable"
            className="h-4 w-4 text-blue-500"
            onChange={handleCheckboxChange}
            checked={checkedItems.decorRemarquable}
          />
          <label
            htmlFor="decorRemarquable"
            className="text-slate-700 text-sm font-medium flex items-center">
            <FaRegStar className="h-4 w-4 mr-2 text-blue-500" /> Décor
            Remarquable
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DetailsTableForm;
