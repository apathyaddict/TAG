/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLink,
  FaUtensils,
  FaUserSecret,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiEraser } from "react-icons/bi";

const RestaurantDetails = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const navigate = useNavigate();
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

  const {
    name,
    rue,
    code_postal,
    ville,
    phone,
    website,
    manager_phone,
    manager_name,
  } = restaurant;

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");
    return formatted;
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ces fichiers ? Cette action est irréversible."
      )
    )
      try {
        const docRef = doc(db, "fiches", id);
        await deleteDoc(docRef);
        console.log("Restaurant successfully deleted");
        navigate("/list");
      } catch (error) {
        console.error("Error deleting restaurant:", error);
      }
  };
  return (
    <div className="max-w-full mr-10 p-10">
      <h5 className="block mb-5 font-sans text-xl font-semibold text-blue-stone-800">
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
        <div className="flex items-center gap-2">
          <FaUserSecret className="w-5 h-5 text-stone-600" />
          <p className="font-medium text-base leading-relaxed text-blue-gray-900">
            {manager_name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FaPhoneAlt className="w-5 h-5 text-stone-600" />
          <p className="text-base leading-relaxed text-blue-gray-900">
            {formatPhoneNumber(manager_phone)}
          </p>
        </div>
      </div>
      <div className=" hover:text-red-700 cursor-auto mt-40 my-4">
        <button
          onClick={handleDelete}
          type="button"
          className="flex items-center justify-center font-semibold rounded-sm border border-solid  cursor-pointer pointer-events-auto hover:bg-pink-100 bg-white px-8 py-2 text-red-600 border-stone-200  ">
          <BiEraser className="h-6 w-6 text-red-600 " />
          <p className="capitalize">EFFACER</p>
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetails;
