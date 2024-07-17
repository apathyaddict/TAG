import React from "react";
import { FaRegStar, FaWineBottle } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import { useLocation } from "react-router-dom";

const PrintPage = () => {
  const location = useLocation();
  const data = location.state;

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/[^\d+]/g, "");
    const formatted = cleaned.replace(/(\d{2})(?=\d{2,})/g, "$1 ");
    return formatted;
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
      default:
        return 0;
    }
  };

  const renderStars = (numStars) => {
    return Array(numStars)
      .fill(0)
      .map((_, index) => (
        <MdTableRestaurant key={index} className="h-6 w-6 text-blue-900" />
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
        <GiKnifeFork key={index} className="h-5 w-5 text-blue-900" />
      ));
  };

  return (
    <section className="flex flex-row justify center px-6 my-12 ">
      {data.selectedItems.map((fiche) => (
        <div
          key={fiche.id}
          className="bg-white border p-8  flex-1 flex  flex-col ">
          <div>
            <h1 className="text-3xl uppercase font-bold text-red-900">
              {fiche.name}
            </h1>
            <h2 className="text-md uppercase font-semibold text-red-900">
              {fiche.ville}
            </h2>
          </div>

          <div className="flex flex-row justify-start  gap-5 text-xs mt-6">
            <div> {renderStars(getStars(fiche.table_grade))}</div>
            <div className="flex text-xs">
              {renderForks(getForks(fiche.table_service))}
            </div>
            <div className="text-blue-900   ">
              {fiche.detailsData.cave ? (
                <FaWineBottle className="h-5 w-5" />
              ) : null}
            </div>
            {fiche.detailsData.decorRemarquable ? (
              <div className="text-blue-900 ">
                <FaRegStar className="h-5 w-5" />
              </div>
            ) : null}
            {fiche.detailsData.terrasse ? (
              <div className=" text-blue-900 ">
                <IoStorefrontSharp className="h-5 w-5" />
              </div>
            ) : null}
          </div>

          <div className="text-black text-sm relative mt-8 mb-10">
            {fiche.imagesUrl && fiche.imagesUrl[0] && (
              <img
                src={fiche.imagesUrl[0]}
                alt="Image 1"
                className="float-right mr-4 mb-4 w-1/4"
              />
            )}
            {fiche.text_review}
          </div>
          {/* //image 2 */}
          {fiche.imagesUrl && fiche.imagesUrl[1] && (
            <img
              src={fiche.imagesUrl[1]}
              alt="Image 2"
              className="max-h-[300px] max-w-full object-cover"
            />
          )}
          {/* //footer */}
          <div className="flex flex-row gap-2  justify-around  mt-8 text-xs font-bold  ">
            <div className="flex flex-row gap-1 mb-10">
              {" "}
              <p className=""> {capitalizeCityName(fiche.rue)}</p>
              <p className="text-xs font-bold">
                {capitalizeCityName(fiche.ville)}
              </p>
              <p className="">{fiche.code_postal}</p>
            </div>
            <div className="text-xs">{formatPhoneNumber(fiche.phone)}</div>
            <div className="text-xs">{fiche.website}</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PrintPage;
