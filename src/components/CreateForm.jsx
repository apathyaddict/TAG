import React, { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
//TODO: add toast

const CreateForm = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    rue: "",
    code_postal: "",
    ville: "",
    phone: "",
    website: "",
    days_open: "",
    menu: "",
    prices: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [id]: value,
    });

    setErrorMessage("");
  };

  const handleSave = async () => {
    setErrorMessage("");

    if (!restaurantData.name) {
      setErrorMessage("Le nom du Restaurant est requis.");
      return;
    }

    // Validate postal code format
    if (
      restaurantData.code_postal &&
      !/^\d+$/.test(restaurantData.code_postal)
    ) {
      setErrorMessage("Le code postal ne doit contenir que des chiffres.");
      return;
    }

    // Validate phone number format
    if (restaurantData.phone && !/^[0-9+-]+$/.test(restaurantData.phone)) {
      setErrorMessage(
        "Le numéro de téléphone ne doit contenir que des chiffres, plus (+) et des tirets (-)."
      );
      return;
    }

    // Check if restaurant with the same name already exists
    const q = query(
      collection(db, "fiches"),
      where("name", "==", restaurantData.name)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setErrorMessage("Un restaurant avec ce nom existe déjà.");
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(db, "fiches"), restaurantData);
      console.log("SUCCES : Sent to Database", restaurantData);

      // Clear form fields after successful submission
      setRestaurantData({
        name: "",
        rue: "",
        code_postal: "",
        ville: "",
        phone: "",
        website: "",
        days_open: "",
        menu: "",
        prices: "",
      });
      setErrorMessage("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding document: ", error);
    }
  };

  return (
    <section className="container">
      <div className="max-w-4xl mx-auto my-4 p-8">
        <h1 className="text-2xl font-bold mb-6 text-stone-600">
          Ajouter un nouvel établissement:
        </h1>
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

        <div className="flex justify-end items-end cursor-pointer">
          <button
            className="bg-white mt-2 px-12 py-2 text-slate-800 font-extrabold border border-slate-300 rounded-md hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
            onClick={handleSave}
            disabled={isLoading}>
            {isLoading ? "En cours..." : "Ajouter"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
