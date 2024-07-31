import React, { useState, useEffect } from "react";
import { FaRegStar, FaUmbrellaBeach, FaWineBottle } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";
import Chaudron from "../icons/Chaudron";
import { PiClover, PiCloverLight } from "react-icons/pi";
import { TbCircleLetterLFilled, TbHexagonLetterLFilled } from "react-icons/tb";

const DetailsTableForm = ({ restaurantData, handleDetailsTableChange }) => {
  // State to manage checked items
  const [checkedItems, setCheckedItems] = useState({
    cave: false,
    terrasse: false,
    decorRemarquable: false,
    qualite_prix: false,
    hotel_calme: false,
  });

  // Update state if restaurantData changes (e.g., when editing existing data)
  useEffect(() => {
    if (restaurantData.detailsData) {
      setCheckedItems({
        cave: restaurantData.detailsData.cave || false,
        terrasse: restaurantData.detailsData.terrasse || false,
        decorRemarquable: restaurantData.detailsData.decorRemarquable || false,
        qualite_prix: restaurantData.detailsData.qualite_prix || false,
        hotel_calme: restaurantData.detailsData.hotel_calme || false,
      });
    }
  }, [restaurantData]);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    // Update the state with the new checked value
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    // Pass updated details data back to parent component
    const updatedDetailsData = {
      ...checkedItems, // Use the current state, not the potentially outdated state
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
            <FaUmbrellaBeach className="h-4 w-4 mr-2 text-blue-500" /> Terrasse
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
            <TbHexagonLetterLFilled className="h-5 w-5 mr-2 text-blue-500" />{" "}
            Décor Remarquable
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4 bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="qualite_prix"
            className="h-4 w-4 text-blue-500"
            onChange={handleCheckboxChange}
            checked={checkedItems.qualite_prix}
          />
          <label
            htmlFor="qualite_prix"
            className="text-slate-700 text-sm font-medium flex items-center">
            <Chaudron
              className="mr-2 text-blue-500"
              style={{
                width: "20px",
                height: "20px",
                color: "rgb(59, 130, 246)",
              }}
            />{" "}
            Rapport qualité-prix
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4 bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="hotel_calme"
            className="h-4 w-4 text-blue-500"
            onChange={handleCheckboxChange}
            checked={checkedItems.hotel_calme}
          />
          <label
            htmlFor="hotel_calme"
            className="text-slate-700 text-sm font-medium flex items-center">
            <PiClover className="h-4 w-4 mr-2 text-blue-500" /> Hôtel au calme
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DetailsTableForm;
