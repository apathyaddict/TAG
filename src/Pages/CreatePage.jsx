import React, { useState, useEffect } from "react";
import CreateForm from "../components/CreateForm";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Toast from "../components/Toast";

const CreatePage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); // State to manage Toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State to manage Toast message

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

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

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

      setShowToast(true); // Show the toast on successful submission
      setToastMessage("Restaurant ajouté avec succès!");

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
      setErrorMessage("Une erreur est survenue lors de l'envoi du formulaire.");
    }
  };

  const handleCloseToast = () => {
    setShowToast(false); // Hide the toast when the close button is clicked
  };

  return (
    <>
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
      {showToast && (
        <Toast id="toast" message={toastMessage} onClose={handleCloseToast} />
      )}
    </>
  );
};

export default CreatePage;
