/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";

import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiEdit, BiEraser } from "react-icons/bi";
import { format } from "date-fns";

import UploadImage from "./Form/UploadImage";

const RestaurantDetails = ({ editFunc }) => {
  const { id } = useParams();

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
        <Skeleton height={30} className="my-2" count={3} />
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

  const handleEdit = (restaurant) => {
    editFunc(restaurant);
  };

  const {
    name,
    rue,
    code_postal,
    ville,
    phone,
    website,
    manager_phone,
    manager_name,
    category,
    date_modified,
    date_added,
    email,
    text_review,
    imagesUrl,
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
    <div className="max-w-full mx-4 p-10 flex flex-col justify-center gap-4">
      <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex flex-col gap-10 justify-between ">
        <h5 className="block mb-6 text-3xl font-semibold text-blue-800 uppercase">
          {name}
        </h5>
        <ul className="flex flex-col gap-4  ">
          <li className="flex gap-5 pb-4font-normal text-md  py-2 border-b pb-4 border-gray-300">
            <div className=" w-[350px]  px-4 text-slate-400 ">Catégorie</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {category}</p>
            </div>
          </li>
          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">Addresse</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=" ">{rue} , </p>{" "}
              <span className="font-semibold">{code_postal} , </span>
              <p className="gap-4"> {ville}</p>
            </div>
          </li>
          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">
              Numéro de téléphone
            </div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {formatPhoneNumber(phone)}</p>
            </div>
          </li>
          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">Mail</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <a
                href={`mailto:${email}`}
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline">
                <p className=""> {email}</p>
              </a>
            </div>
          </li>
          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">Site web</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline">
                <p className=""> {website}</p>
              </a>
            </div>
          </li>
          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">
              Nom du gérant
            </div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {manager_name}</p>
            </div>
          </li>
          <li className="flex gap-5  font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">
              Numéro du gérant
            </div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {formatPhoneNumber(manager_phone)}</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex gap-10 justify-start ">
        <div className=" w-[150px]  px-4 text-slate-400 ">Texte:</div>
        <div className=" w-full flex justify-start gap-2 text-slate-800 ">
          <p className="text-sm font-normal">{text_review}</p>
        </div>
      </div>

      <UploadImage {...{ id, imagesUrl }} />

      <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex gap-10 justify-between ">
        <div className="mt-2 text-left">
          <p className="text-sm text-slate-500">
            Ajouté à la banque de donnée::
          </p>
          {format(new Date(date_added), "dd / MM / yyyy")}
        </div>
        <div className="mt-2 text-right">
          <p className="text-sm text-slate-500">Dernière mise à jour:</p>
          {format(new Date(date_modified), "dd / MM / yyyy")}
        </div>
      </div>

      <div className="flex justify-end cursor-auto mb-10 gap-4 ">
        <Link to={`/edit-restaurant/${id}?isEditing=true`}>
          <button
            onClick={() => handleEdit(restaurant)}
            type="button"
            className="flex items-center justify-center font-semibold rounded-lg border border-solid  cursor-pointer pointer-events-auto shadow-md hover:bg-emerald-600 bg-emerald-400 px-6 py-2 text-white border-green-500 text-sm gap-2">
            <BiEdit className="h-6 w-6 text-white " />
            <p className="uppercase">Modifier</p>
          </button>
        </Link>
        <button
          onClick={handleDelete}
          type="button"
          className="flex items-center justify-center font-semibold rounded-lg border border-solid  cursor-pointer pointer-events-auto 
          shadow-md hover:bg-red-600 bg-red-400 px-4 py-2 text-white border-pink-500 text-sm gap-2">
          <BiEraser className="h-6 w-6 text-white " />
          <p className="uppercase">Supprimer</p>
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetails;
