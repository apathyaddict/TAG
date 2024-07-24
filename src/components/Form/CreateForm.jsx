import React, { useState, useEffect } from "react";
import DropdownCat from "./DropdownCat";
import { FaRegCircle } from "react-icons/fa";
import Symbols from "./Symbols";
import ServiceTable from "./ServiceTable";
import DetailsTableForm from "./DetailsTableForm";
import { FaCircleInfo } from "react-icons/fa6";
import NewOldStatus from "./NewOldStatus";

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
      const trimPhoneNumber = value.replace(/[^\d+]/g, ""); // Replace any character that is not a digit or plus sign
      setRestaurantData((prevState) => ({
        ...prevState,
        [id]: trimPhoneNumber,
      }));
    }

    if (id === "name") {
      // Remove non-alphanumeric characters except apostrophes and split names into parts
      const cleanedValue = value.replace(/[^a-zA-Z0-9\s']/g, "");
      const nameSubstrings = cleanedValue.toLowerCase().split(/\s+/);
      nameSubstrings.push(cleanedValue.toLowerCase());

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

  const handleTableServiceChange = (e) => {
    const { value } = e.target;

    setRestaurantData((prevState) => ({
      ...prevState,

      table_service: value,
    }));
  };

  const handleDetailsTableChange = (detailsData) => {
    setRestaurantData((prevState) => ({
      ...prevState,
      detailsData: detailsData,
    }));
  };

  const handleStatus = (value) => {
    setRestaurantData((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  return (
    <section className="container w-full">
      <div className=" max-w-5xl mx-auto my-4 p-8 ">
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
            Nom <span className="text-red-500">*</span>
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

          <div className="mb-4 max-w-[150px]">
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

        <div className="flex gap-3 justify-start">
          <div className="mb-8 w-full ">
            <label
              htmlFor="carte"
              className="block text-sm font-medium text-gray-500">
              Carte
            </label>
            <input
              type="carte"
              id="carte"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={restaurantData.carte}
            />
          </div>
          <div className="mb-8 w-full">
            <label
              htmlFor="menu"
              className="block text-sm font-medium text-gray-500">
              Menu
            </label>
            <input
              type="menu"
              id="menu"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={restaurantData.menu}
            />
          </div>
        </div>

        <div className="mb-8">
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

        <div className="border-gray-200 border space-y-2 my-16"></div>

        <div className="mb-4">
          <p
            htmlFor="table_grade"
            className="block text-sm font-medium text-gray-500 mb-1">
            Niveau de table
          </p>

          <Symbols
            {...{ handleTableGradeChange }}
            table_grade={restaurantData.table_grade}
          />
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-500 mb-1">
            Statut:
          </p>

          <NewOldStatus
            status={restaurantData.status}
            handleStatus={handleStatus}
          />
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-500 mb-1">
            Niveau de l'hotel
          </p>

          <ServiceTable
            table_service={restaurantData.table_service}
            {...{ handleTableServiceChange }}
          />
        </div>
        <label className="block text-sm mb-1 font-medium text-gray-500">
          Autres Détails
        </label>
        <DetailsTableForm
          restaurantData={restaurantData}
          handleDetailsTableChange={handleDetailsTableChange}
        />

        <div className="border-gray-200 border space-y-2 my-16"></div>
        <div className="mb-4">
          <label
            htmlFor="text_title"
            className="block text-sm font-medium text-gray-500">
            Titre du Text
          </label>
          <input
            type="text"
            id="text_title"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md  resize-y focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={restaurantData.text_title}
          />
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

        <div className="flex justify-start gap-2 px-4">
          <FaCircleInfo className="text-slate-700 h-5 w-5" />
          <p classname="text-slate-600 text-sm">
            Pour modifier ou ajouter des images, allez à la page individuelle.
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 mt-10 text-red-600 border border-red-600 px-4 py-2 rounded-md">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-end items-end  my-8 pb-16">
          <button
            className="cursor-pointer hover:bg-white mt-2 px-12 py-2 hover:text-blue-600 font-bold border border-slate-300 rounded-lg bg-slate-800 text-blue-100 uppercase"
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
