/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import CreateForm from "../components/CreateForm";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaUtensils } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditForm = () => {
  const { id } = useParams(); // Get the ID parameter from the URL

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "fiches", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRestaurant(docSnap.data());
        } else {
          console.log("Restaurant not found");
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-full mr-10 p-10">
        <Skeleton height={100} className="my-2" count={3} />
      </div>
    );
  }

  if (!restaurant || Object.keys(restaurant).length === 0) {
    return (
      <div className="flex mt-16 flex-col items-center gap-2">
        <FaUtensils className="h-8 w-8 text-zinc-800" />
        <h3 className="font-semibold text-xl">C'est calme ici.</h3>
        <p>Aucune fiche de restaurant trouvée.</p>
      </div>
    );
  }
  return <CreateForm restaurant={restaurant} />;
};

export default EditForm;
