/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import {
  FaRegStar,
  FaWineBottle,
  FaUtensils,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiEdit, BiEraser } from "react-icons/bi";
import { format } from "date-fns";

import UploadImage from "./Form/UploadImage";
import { FaRegCircle } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { PiClover, PiForkKnifeFill } from "react-icons/pi";
import Chaudron from "./icons/Chaudron";
import {
  TbSquareLetterNFilled,
  TbHexagonLetterR,
  TbCheckbox,
  TbSquareRoundedLetterNFilled,
  TbHexagonLetterRFilled,
  TbHexagonLetterLFilled,
} from "react-icons/tb";
import DialogBox from "./DialogBox";

const RestaurantDetails = ({ editFunc }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

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
    table_grade,
    table_service,
    detailsData,
    text_title,
    status,
    menu,
    carte,
  } = restaurant;

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

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/[^\d+]/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");
    return formatted;
  };

  const handleDelete = async () => {
    // if (
    //   window.confirm(
    //     "Êtes-vous sûr de vouloir supprimer ces fichiers ? Cette action est irréversible."
    //   )
    // )
    try {
      const docRef = doc(db, "fiches", id);
      await deleteDoc(docRef);
      console.log("Restaurant successfully deleted");
      navigate("/list");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const capitalizeCityName = (cityName) => {
    if (!cityName) return "";

    const lowercaseWords = ["de", "du", "des", "et", "la", "le", "les"];

    const words = cityName.toLowerCase().split(" ");

    // Capitalize each word unless it's in the lowercaseWords array
    const capitalizedWords = words.map((word, index) => {
      if (index === 0 || !lowercaseWords.includes(word)) {
        return capitalizeFirstLetter(word);
      } else {
        return word;
      }
    });

    return capitalizedWords.join(" ");
  };

  const getStars = (grade) => {
    switch (grade) {
      case "Bonne Table":
        return 1;
      case "Très bonne table":
        return 2;
      case "Table d'exception":
        return 3;
      case "Simple":
        return 4;
      case "Bon confort":
        return 5;
      case "Trés confortable":
        return 6;
      default:
        return 0;
    }
  };
  const renderStars = (numStars) => {
    let renderCount;
    let IconComponent;

    if (numStars <= 3) {
      renderCount = numStars;
      IconComponent = FaRegCircle;
    } else {
      renderCount = numStars - 3;
      IconComponent = PiForkKnifeFill;
    }

    return Array(renderCount)
      .fill(0)
      .map((_, index) => (
        <IconComponent key={index} className="h-6 w-6 text-blue-500" />
      ));
  };

  const getForks = (grade) => {
    switch (grade) {
      case "service et cadre simple":
        return 1;
      case "cadre et service confort":
        return 2;
      case "cadre luxe":
        return 3;
      default:
        return 0;
    }
  };

  const renderForks = (numStars) => {
    return Array(numStars)
      .fill(0)
      .map((_, index) => (
        <IoStarSharp key={index} className="h-6 w-6 text-blue-500" />
      ));
  };

  const iconMapping = {
    nouveau: <TbSquareRoundedLetterNFilled className="w-6 h-6 text-blue-500" />,
    retiré: <TbHexagonLetterRFilled className="w-6 h-6 text-blue-500" />,
    aucun: <TbCheckbox className="w-5 h-5 text-blue-500" />,
  };

  const handleConfirmDelete = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    handleDelete();
    handleDialogClose();
  };

  return (
    <div className="max-w-full mx-4 p-10 flex flex-col justify-center gap-4">
      <DialogBox
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      />
      <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex flex-col gap-10 justify-between ">
        <h5 className="block mb-6 text-3xl font-semibold text-blue-800 uppercase">
          {capitalizeFirstLetter(name)}
        </h5>
        <ul className="flex flex-col gap-4  ">
          <li className="flex gap-5 pb-4font-normal text-md  py-2 border-b pb-4 border-gray-300">
            <div className=" w-[350px]  px-4 text-slate-400 ">Rubrique</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {category}</p>
            </div>
          </li>
          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">Addresse</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=" ">{capitalizeCityName(rue)}, </p>{" "}
              <span className="font-medium">{code_postal}, </span>
              <p className="gap-4"> {capitalizeFirstLetter(ville)}</p>
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
            <div className=" w-[350px]  px-4 text-slate-400 ">Menu</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {menu}</p>
            </div>
          </li>

          <li className="flex gap-5 border-b pb-4 border-gray-300 font-normal text-md  py-2">
            <div className=" w-[350px]  px-4 text-slate-400 ">Carte</div>
            <div className=" w-full flex justify-start gap-2 text-slate-800 ">
              <p className=""> {carte}</p>
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
              <p className=""> {capitalizeFirstLetter(manager_name)}</p>
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
        {/* <div className=" w-[350px]  px-4 text-slate-400 ">
          Qualité de la table:
        </div> */}
        <div className="w-full flex flex-col justify-start gap-6 divide-y  ">
          <div className=" w-full flex justify-start gap-2 text-slate-800  ">
            <div className="flex items-center gap-1 w-[150px] ">
              {renderStars(getStars(table_grade))}
            </div>
            <p className="text-sm font-normal">{table_grade}</p>
          </div>
          <div className=" w-full flex justify-start gap-2 text-slate-800 pt-6 ">
            <div className="flex items-center gap-1 w-[150px]">
              {renderForks(getForks(table_service))}
            </div>
            <p className="text-sm font-normal">{table_service}</p>
          </div>

          <div className=" w-full flex justify-start gap-2 text-slate-800 pt-6 ">
            <div className="flex items-center gap-1 w-[150px]">
              {iconMapping[status] || null}
            </div>
            <p className="text-sm font-normal">{status}</p>
          </div>

          <div className="w-full flex justify-start gap-2 text-slate-800 ">
            <ul className="list-disc gap-6 w-full">
              {detailsData.cave ? (
                <li className="flex items-center space-x-2 border-b pt-6 pb-6">
                  <div className="flex items-center gap-1 text-blue-500 w-[150px]">
                    <span>
                      <FaWineBottle className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="text-sm font-normal ">Cave remarquable</p>
                </li>
              ) : null}
              {detailsData.decorRemarquable ? (
                <li className="flex items-center space-x-2 border-b pt-6 pb-6">
                  <div className="flex items-center gap-1 text-blue-500 w-[150px]">
                    <span>
                      <TbHexagonLetterLFilled className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="text-sm font-normal">Décor remarquable</p>
                </li>
              ) : null}
              {detailsData.terrasse ? (
                <li className="flex items-center space-x-2 border-b pt-6 pb-6">
                  <div className="flex items-center gap-1 text-blue-500 w-[150px]">
                    <span>
                      <FaUmbrellaBeach className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="text-sm font-normal">Terrasse</p>
                </li>
              ) : null}
              {detailsData.qualite_prix ? (
                <li className="flex items-center space-x-2 border-b pt-6 pb-6">
                  <div className="flex items-center gap-1 text-blue-500 w-[150px]">
                    <span>
                      <Chaudron
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "rgb(59, 130, 246)",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-sm font-normal"> Rapport qualité-prix</p>
                </li>
              ) : null}
              {detailsData.hotel_calme ? (
                <li className="flex items-center space-x-2 border-b pt-6 pb-6">
                  <div className="flex items-center gap-1 text-blue-500 w-[150px]">
                    <span>
                      <PiClover className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="text-sm font-normal">Hôtel au calme</p>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-[150px] text-slate-400">Titre du Texte:</div>
          <div className="flex-1 text-slate-800 text-sm font-normal">
            {text_title}
          </div>
        </div>
        <div>
          <div className="w-[150px] text-slate-400 mb-2">Texte:</div>
          <div className="flex-1 text-slate-800 text-sm font-normal">
            {text_review}
          </div>
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
          {date_modified
            ? format(new Date(date_modified), "dd / MM / yyyy")
            : "-- / -- / --"}
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
          onClick={handleConfirmDelete}
          // onClick={handleDelete}
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
