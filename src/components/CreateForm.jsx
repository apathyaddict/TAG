import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

const CreateForm = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleSave = async () => {
    setErrorMessage("");

    if (!formData.name) {
      setErrorMessage("Le nom du Restaurant est requis.");
      return;
    }
    // Validate postal code format
    if (formData.code_postal && !/^\d+$/.test(formData.code_postal)) {
      setErrorMessage("Le code postal ne doit contenir que des chiffres.");
      return;
    }

    // Validate phone number format
    if (formData.phone && !/^[0-9+-]+$/.test(formData.phone)) {
      setErrorMessage(
        "Le numéro de téléphone ne doit contenir que des chiffres, plus (+) et des tirets (-)."
      );
      return;
    }

    //TODO: add info that says case sentitive
    const q = query(
      collection(db, "fiches"),
      where("name", "==", formData.name)
    );
    const querySnapshot = await getDocs(q);

    console.log("q", q);
    console.log("querySnapshot", querySnapshot);
    if (!querySnapshot.empty) {
      setErrorMessage("Un restaurant avec ce nom existe déjà.");
      return;
    }

    const newFiche = { ...formData };

    try {
      await addDoc(collection(db, "fiches"), newFiche);
      console.log("SUCCES : Sent to Database", newFiche);

      setErrorMessage("");
      // Clear form after successful save if needed
      // setFormData({});
    } catch (error) {
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
          />
        </div>
        <div className="flex gap-3">
          <div className="mb-4  flex-1 max-w-[500px]">
            <label
              htmlFor="rue"
              className="block text-sm font-medium text-gray-500 ">
              Rue et Numéro
            </label>
            <input
              type="text"
              id="rue"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-stone-500"
              onChange={handleInputChange}
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
            onClick={handleSave}>
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
