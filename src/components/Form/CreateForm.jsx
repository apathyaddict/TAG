import React, { useState, useEffect } from "react";
import DropdownCat from "./DropdownCat";
import { MdTableRestaurant } from "react-icons/md";

const CreateForm = ({
  handleSave,
  setErrorMessage,
  errorMessage,
  isLoading,
  setRestaurantData,
  restaurantData,
  handleEdit,
  isNew,
  isEditing,
}) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Always convert to lowercase except for "text_review"
    const lowercaseValue = id === "text_review" ? value : value.toLowerCase();

    setRestaurantData((prevState) => ({
      ...prevState,
      [id]: lowercaseValue,
    }));

    if (id === "phone" || id === "manager_phone") {
      const trimPhoneNumber = value.replace(/\s/g, "");
      setRestaurantData((prevState) => ({
        ...prevState,
        [id]: trimPhoneNumber,
      }));
    }

    if (id === "name") {
      // Split names into parts and save the whole name in lowercase for searching later
      const nameSubstrings = value.toLowerCase().split(/\s+/);
      nameSubstrings.push(value.toLowerCase());

      setRestaurantData((prevState) => ({
        ...prevState,
        nameSubstrings: nameSubstrings,
      }));
    }

    setErrorMessage("");
  };

  const handleTableGradeChange = (e) => {
    const { value } = e.target;

    setRestaurantData((prevState) => ({
      ...prevState,
      table_grade: value,
    }));
  };

  return (
    <section className="container">
      <div className="max-w-4xl mx-auto my-4 p-8">
        {!isEditing ? (
          <h1 className="my-5 text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl ">
            Ajouter un nouvel établissement:
          </h1>
        ) : (
          <h1 className="my-5 text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl ">
            Modifier un nouvel établissement:
          </h1>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-500">
            Nom du Restaurant <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 required:border-red-500"
            onChange={handleInputChange}
            value={restaurantData.name}
          />
        </div>
        <div className="mb-4">
          <DropdownCat
            category={restaurantData.category}
            setRestaurantData={setRestaurantData}
            restaurantData={restaurantData}
          />
        </div>
        <div className="flex gap-3">
          <div className="mb-4 flex-1 max-w-[500px]">
            <label
              htmlFor="rue"
              className="block text-sm font-medium text-gray-500">
              Rue et Numéro
            </label>
            <input
              type="text"
              id="rue"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={restaurantData.rue}
            />
          </div>

          <div className="mb-4 max-w-[100px]">
            <label
              htmlFor="code_postal"
              className="block text-sm font-medium text-gray-500">
              Code Postal
            </label>
            <input
              type="number"
              id="code_postal"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={restaurantData.code_postal}
              pattern="[0-9]*"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="ville"
            className="block text-sm font-medium text-gray-500">
            Ville
          </label>
          <input
            type="text"
            id="ville"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.ville}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-500">
            Numéro de Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.phone}
            pattern="[0-9+-]*"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-500">
            Site Web
          </label>
          <input
            type="url"
            id="website"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.website}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-500">
            Mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.email}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="manager_name"
            className="block text-sm font-medium text-gray-500">
            Nom du gérant
          </label>
          <input
            type="text"
            id="manager_name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.manager_name}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="manager_phone"
            className="block text-sm font-medium text-gray-500">
            Numero de portable du gérant
          </label>
          <input
            type="tel"
            id="manager_phone"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.manager_phone}
          />
        </div>
        <div className="mb-4">
          <p
            htmlFor="table_grade"
            className="block text-sm font-medium text-gray-500 mb-1">
            Niveau de table
          </p>

          <div className="container">
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white ">
              <li className="border border-gray-300 rounded-lg p-4 flex items-center space-x-2">
                <input
                  type="radio"
                  id="table_grade1"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={handleTableGradeChange}
                  checked={restaurantData.table_grade === "Bonne Table"}
                  value="Bonne Table"
                />
                <label
                  htmlFor="table_grade1"
                  className="text-slate-700 text-sm font-medium flex items-center">
                  <MdTableRestaurant className="h-4 w-4 mr-2  text-blue-500" />{" "}
                  Bonne Table
                </label>
              </li>
              <li className="border border-gray-300 rounded-lg p-4 flex items-center space-x-2">
                <input
                  type="radio"
                  id="table_grade2"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={handleTableGradeChange}
                  checked={restaurantData.table_grade === "Très bonne table"}
                  value="Très bonne table"
                />
                <label
                  htmlFor="table_grade2"
                  className="text-slate-700 text-sm font-medium flex items-center">
                  <MdTableRestaurant className="h-4 w-4 text-blue-500" />
                  <MdTableRestaurant className="h-4 w-4   text-blue-500 mr-2" />{" "}
                  Très bonne table
                </label>
              </li>
              <li className="border border-gray-300 rounded-lg p-4 flex items-center space-x-2">
                <input
                  type="radio"
                  id="table_grade3"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={handleTableGradeChange}
                  checked={restaurantData.table_grade === "Table d'exception"}
                  value="Table d'exception"
                />
                <label
                  htmlFor="table_grade3"
                  className="text-slate-700 text-sm font-medium flex items-center">
                  <MdTableRestaurant className="h-4 w-4   text-blue-500" />
                  <MdTableRestaurant className="h-4 w-4 text-blue-500" />
                  <MdTableRestaurant className="h-4 w-4 mr-2  text-blue-500" />{" "}
                  Table d'exception
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="text_review"
            className="block text-sm font-medium text-gray-500">
            Texte
          </label>
          <textarea
            type="text"
            id="text_review"
            rows={10}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md  resize-y focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.text_review}
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 mt-10 text-red-600 border border-red-600 px-4 py-2 rounded-md">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-end items-end  mt-8">
          <button
            className="cursor-pointer bg-white mt-2 px-12 py-2 text-blue-600 font-bold border border-slate-300 rounded-lg hover:bg-slate-800 hover:text-blue-100 uppercase"
            onClick={isEditing ? handleEdit : handleSave}
            disabled={isLoading}>
            {isLoading ? "En cours..." : isEditing ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
