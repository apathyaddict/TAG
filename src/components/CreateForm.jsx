import React, { useEffect } from "react";

//TODO: add toast
/* eslint-disable react/prop-types */

const CreateForm = ({
  restaurant,
  handleSave,
  setErrorMessage,
  errorMessage,
  isLoading,
  setRestaurantData,
  restaurantData,
}) => {
  useEffect(() => {
    if (restaurant) {
      setRestaurantData({
        name: restaurant.name || "",
        rue: restaurant.rue || "",
        code_postal: restaurant.code_postal || "",
        ville: restaurant.ville || "",
        phone: restaurant.phone || "",
        website: restaurant.website || "",
        days_open: restaurant.days_open || "",
        menu: restaurant.menu || "",
        prices: restaurant.prices || "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [id]: value,
    });

    setErrorMessage("");
  };

  return (
    <section className="container">
      <div className="max-w-4xl mx-auto my-4 p-8">
        {!restaurant || restaurant.length === 0 ? (
          <h1 className="text-2xl font-bold mb-6 text-stone-600">
            Ajouter un nouvel établissement:
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-6 text-stone-600">
            Modifier un nouvel établissement:
          </h1>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-500">
            Nom du Restaurant
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500 required:border-red-500"
            onChange={handleInputChange}
            value={restaurantData.name}
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
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
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
              type="text"
              id="code_postal"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
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
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
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
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
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
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleInputChange}
            value={restaurantData.website}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="days_open"
            className="block text-sm font-medium text-gray-500">
            Jours d'ouverture
          </label>
          <input
            type="text"
            id="days_open"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleInputChange}
            value={restaurantData.days_open}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="menu"
            className="block text-sm font-medium text-gray-500">
            Menu
          </label>
          <input
            type="text"
            id="menu"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleInputChange}
            value={restaurantData.menu}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="prices"
            className="block text-sm font-medium text-gray-500">
            Prix
          </label>
          <input
            type="text"
            id="prices"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
            onChange={handleInputChange}
            value={restaurantData.prices}
          />
        </div>
        {errorMessage && (
          <div className="mb-4 mt-10 text-red-600 border border-red-600 px-4 py-2 rounded-md">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-end items-end ">
          <button
            className="cursor-pointer bg-white mt-2 px-12 py-2 text-slate-800 font-bold border border-slate-300 rounded-md hover:bg-slate-100 hover:text-slate-600 "
            onClick={handleSave}
            disabled={isLoading}>
            {isLoading ? "En cours..." : restaurant ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
