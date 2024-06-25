import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

const inputFields = [
  {
    id: "name",
    label: "Nom du Restaurant",
    placeholder: "Nom du Restaurant",
    type: "text",
  },
  { id: "rue", label: "Rue et Numéro", placeholder: "Rue", type: "text" },
  {
    id: "code_postal",
    label: "Code Postal",
    placeholder: "Code Postal",
    type: "text",
  },
  { id: "ville", label: "Ville", placeholder: "Ville", type: "text" },
  { id: "website", label: "Site Web", placeholder: "Site Web", type: "url" },
  {
    id: "days_open",
    label: "Jours d'ouverture",
    placeholder: "Jours d'ouverture",
    type: "text",
  },
  { id: "menu", label: "Menu", placeholder: "Menu", type: "text" },
  { id: "prices", label: "Prix", placeholder: "Prix", type: "text" },
  {
    id: "phone",
    label: "Numéro de Téléphone",
    placeholder: "Numéro de Téléphone",
    type: "tel",
  },
];

const FormComponent = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = async () => {
    // localStorage.setItem("formData", JSON.stringify(formData));

    const newFiche = {
      formData,
    };
    try {
      await addDoc(collection(db, "fiches"), newFiche);
      console.log(newFiche);
    } catch (error) {
      console.log(error);
    }
    // setFormData("");
  };

  return (
    <section className="container">
      <div className="max-w-4xl mx-auto my-4 p-8">
        <h1 className="text-2xl font-bold mb-6 text-stone-600">
          Ajouter un nouvel établissement:
        </h1>
        {inputFields.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div className="flex justify-end items-end">
          <button
            className="mt-2 px-12 py-2 bg-stone-500 text-white rounded-md hover:bg-stone-600/50 focus:outline-none focus:bg-stone-600/50"
            onClick={handleSave}>
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormComponent;
