/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import CreateForm from "../components/Form/CreateForm";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePage = ({ restaurantInfo, isEditing, isNew, setIsEditing, id }) => {
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
    date_added: new Date().toISOString(),
    date_modified: null,
    email: "",
    text_review: "",

    table_grade: "",
    table_service: "",
    detailsData: [],
    text_title: "",
    status: "",
  });
  const navigate = useNavigate();

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
        category: restaurantInfo.category || "",
        date_added: restaurantInfo.added || new Date().toISOString(),
        date_modified: restaurantInfo.date_modified || null,
        email: restaurantInfo.email || "",
        text_review: restaurantInfo.text_review || "",
        table_grade: restaurantInfo.table_grade || "",
        table_service: restaurantInfo.table_service || "",
        detailsData: restaurantInfo.detailsData || [],
        text_title: restaurantInfo.text_title || "",
        handleStatus: restaurantInfo.status || "",
      });
    }
  }, [restaurantInfo]);

  const handleSave = async () => {
    setErrorMessage("");

    if (!restaurantData.name) {
      setErrorMessage("Le nom du restaurant est requis.");
      return;
    }

    if (!restaurantData.category) {
      setErrorMessage("La rubrique du restaurant est requise.");
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

    if (restaurantData.name) {
      const q = query(
        collection(db, "fiches"),
        where("name", "==", restaurantData.name)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage("Un restaurant avec ce nom existe déjà.");
        return;
      }
    }

    const newFiche = { ...restaurantData };

    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "fiches"), newFiche);
      console.log("SUCCES : Sent to Database", newFiche);

      toast.success("Restaurant ajouté!", {
        position: "top-left",
      });
      clearRestaurantData();
      setIsLoading(false);
      navigate(`/restaurants/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi du formulaire.");
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setErrorMessage("");
    setIsEditing(true);

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

    const updatedFiche = {
      ...restaurantData,
      date_modified: new Date().toISOString(),
    };

    // console.log("setIsEditing", updatedFiche);
    // console.log("isNew", isNew);

    try {
      setIsLoading(true);
      await updateDoc(doc(db, "fiches", id), updatedFiche);

      toast.success("Restaurant mis à jour avec succès!", {
        position: "top-right",
      });

      navigate(`/restaurants/${id}`);
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
      email: "",
      text_review: "",
      table_grade: "",
      table_service: "",
      detailsData: [],
      text_title: "",
      status: "",
    });
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
          handleEdit,
          isNew,
          isEditing,
        }}
      />
    </>
  );
};

export default CreatePage;
