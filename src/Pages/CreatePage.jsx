/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import CreateForm from "../components/Form/CreateForm";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const CreatePage = ({ restaurantInfo, isEditing, isNew }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    rue: "",
    code_postal: "",
    ville: "",
    phone: "",
    website: "",
    manager_phone: "",
    manager_name: "",
    category: "",
  });

  useEffect(() => {
    if (restaurantInfo) {
      setRestaurantData({
        name: restaurantInfo.name || "",
        rue: restaurantInfo.rue || "",
        code_postal: restaurantInfo.code_postal || "",
        ville: restaurantInfo.ville || "",
        phone: restaurantInfo.phone || "",
        website: restaurantInfo.website || "",
        manager_phone: restaurantInfo.manager_phone || "",
        manager_name: restaurantInfo.manager_name || "",
        category: restaurantInfo.restaurantInfo || "",
      });
    }
  }, [restaurantInfo]);

  const handleSave = async () => {
    setErrorMessage("");

    if (!restaurantData.name) {
      setErrorMessage("Le nom du Restaurant est requis.");
      return;
    }

    if (
      restaurantData.code_postal &&
      !/^\d+$/.test(restaurantData.code_postal)
    ) {
      setErrorMessage("Le code postal ne doit contenir que des chiffres.");
      return;
    }

    if (
      (restaurantData.phone && !/^[0-9+-]+$/.test(restaurantData.phone)) ||
      (restaurantData.manager_phone &&
        !/^[0-9+-]+$/.test(restaurantData.manager_phone))
    ) {
      setErrorMessage(
        "Les numéros de téléphone ne doivent contenir que des chiffres, plus (+) et des tirets (-)."
      );
      return;
    }

    try {
      setIsLoading(true);
      await FirestoreOperations.addRestaurant(restaurantData);
      toast.success("Restaurant ajouté avec succès!", {
        position: "top-right",
      });
      clearRestaurantData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi du formulaire.");
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setErrorMessage("");

    if (!restaurantData.name) {
      setErrorMessage("Le nom du Restaurant est requis.");
      return;
    }

    if (
      restaurantData.code_postal &&
      !/^\d+$/.test(restaurantData.code_postal)
    ) {
      setErrorMessage("Le code postal ne doit contenir que des chiffres.");
      return;
    }

    if (restaurantData.phone && !/^[0-9+-]+$/.test(restaurantData.phone)) {
      setErrorMessage(
        "Le numéro de téléphone ne doit contenir que des chiffres, plus (+) et des tirets (-)."
      );
      return;
    }

    if (
      restaurantData.manager_phone &&
      !/^[0-9+-]+$/.test(restaurantData.manager_phone)
    ) {
      setErrorMessage(
        "Le numéro de portable du gérant ne doit contenir que des chiffres, plus (+) et des tirets (-)."
      );
      return;
    }

    try {
      setIsLoading(true);
      await FirestoreOperations.updateRestaurant(isNew.id, restaurantData);
      toast.success("Restaurant mis à jour avec succès!", {
        position: "top-right",
      });
      clearRestaurantData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      setErrorMessage(
        "Une erreur est survenue lors de la mise à jour du formulaire."
      );
      setIsLoading(false);
    }
  };

  const clearRestaurantData = () => {
    setRestaurantData({
      name: "",
      rue: "",
      code_postal: "",
      ville: "",
      phone: "",
      website: "",
      manager_phone: "",
      manager_name: "",
      category: "",
    });
  };

  const FirestoreOperations = {
    addRestaurant: async (data) => {
      const newFiche = { ...data };
      await addDoc(collection(db, "fiches"), newFiche);
    },
    updateRestaurant: async (id, data) => {
      const updatedFiche = { ...data };
      await setDoc(doc(db, "fiches", id), updatedFiche);
    },
  };

  return (
    <>
      <CreateForm
        handleSave={handleSave}
        handleEdit={handleEdit}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        isLoading={isLoading}
        setRestaurantData={setRestaurantData}
        restaurantData={restaurantData}
        isNew={isNew}
        isEditing={isEditing}
      />
    </>
  );
};

export default CreatePage;
