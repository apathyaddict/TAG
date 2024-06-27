import React, { useState } from "react";
import CreateForm from "../components/CreateForm";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const CreatePage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <CreateForm
      {...{
        handleSave,
        setErrorMessage,
        errorMessage,
        isLoading,
        setRestaurantData,
        restaurantData,
      }}
    />
  );
};

export default CreatePage;
