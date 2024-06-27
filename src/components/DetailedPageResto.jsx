/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaLink, FaUtensils } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RestaurantDetails = () => {
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

  const { name, rue, code_postal, ville, phone, website } = restaurant;

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");
    return formatted;
  };

  return (
    <div className="max-w-full mr-10 p-10">
      <h5 className="block mb-5 font-sans text-xl font-semibold text-blue-gray-900">
        {name}
      </h5>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="text-stone-600" />
          <div>
            <p className="font-medium text-base leading-relaxed text-blue-gray-900">
              {rue}
            </p>
            <p className="text-base leading-relaxed text-blue-gray-600">
              {code_postal} {ville}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-stone-600" />
          <p className="text-base leading-relaxed text-blue-gray-900">
            {formatPhoneNumber(phone)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaLink className="text-stone-600" />
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline">
            {website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
