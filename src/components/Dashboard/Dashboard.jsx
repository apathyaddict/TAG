import { format } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsHouseFill } from "react-icons/bs";
import {
  FaArrowRight,
  FaCheck,
  FaRegCircle,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { HiXCircle } from "react-icons/hi";
import { PiForkKnifeFill } from "react-icons/pi";
import {
  TbCheckbox,
  TbHexagonLetterR,
  TbSquareLetterNFilled,
} from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import Pagination from "./Pagination";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [sortBy, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const orderDirection = sortBy.startsWith("-") ? "desc" : "asc";
      const sortField = sortBy.startsWith("-") ? sortBy.slice(1) : sortBy;
      const restaurantsQuery = query(
        collection(db, "fiches"),
        orderBy(sortField, orderDirection)
      );
      const documentSnapshots = await getDocs(restaurantsQuery);
      const results = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setLoading(false);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortBy(`-${field}`);
    } else if (sortBy === `-${field}`) {
      setSortBy(field);
    } else {
      setSortBy(field);
    }
  };

  const getSortIcon = (field) => {
    if (sortBy === field) {
      return <FaSortAmountDown className="text-white text-lg ml-2" />;
    } else if (sortBy === `-${field}`) {
      return <FaSortAmountUp className="text-white text-lg ml-2" />;
    } else {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-full mx-auto mr-10 p-10">
        <Skeleton height={30} className="my-2" count={10} />
      </div>
    );
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate current items based on currentPage
  const itemsPerPage = 20; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
        <IconComponent key={index} className="h-4 w-4 text-slate-700" />
      ));
  };
  const getForks = (grade) => {
    switch (grade) {
      case "service et cadre simple":
        return 1;
      case "cadre et service confort":
        return 2;
      case "cadre grand confort":
        return 3;
      case "cadre luxe":
        return 4;
      case "cadre grand luxe":
        return 5;
      default:
        return 0;
    }
  };

  const renderForks = (numStars) => {
    const iconColor = numStars > 4 ? "text-red-500" : "text-slate-700";

    return Array(numStars)
      .fill(0)
      .map((_, index) => (
        <BsHouseFill key={index} className={`h-3 w-3 ${iconColor}`} />
      ));
  };

  const iconMapping = {
    nouveau: <TbSquareLetterNFilled className="w-5 h-5 text-red-500 " />,
    retiré: <TbHexagonLetterR className="w-5 h-5 text-gray-500 " />,
    aucun: <TbCheckbox className="w-5 h-5 text-blue-500 " />,
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 mt-10">
      <div className="my-5 px-2">
        {" "}
        <h1 className=" text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl ">
          Tableau de bord
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Il est possible de filtrer par critère (ascendant et descendant) en
          cliquant sur les boutons dans la marge du tableau.
        </p>{" "}
      </div>

      <div className="py-4">
        <div className="shadow overflow-hidden rounded-lg border-b border-slate-200 ">
          <table className="min-w-full bg-white ">
            <thead className="bg-zinc-500 text-white ">
              <tr>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  <button
                    className="text-white uppercase text-md font-semibold py-2 rounded-lg shadow-sm flex items-left px-2 hover:bg-slate-800  bg-slate-800/40 "
                    onClick={() => toggleSort("name")}>
                    Nom{getSortIcon("name")}
                  </button>
                </th>
                <th className="text-left py-2  uppercase font-semibold text-xs">
                  <button
                    className="text-white uppercase text-md font-semibold py-2 rounded-lg shadow-sm flex items-left hover:bg-slate-800  bg-slate-800/40  px-2"
                    onClick={() => toggleSort("category")}>
                    Catégorie {getSortIcon("category")}
                  </button>
                </th>
                <th className="text-left py-2  uppercase font-semibold text-xs">
                  <button
                    className="text-white uppercase text-md font-semibold py-2 rounded-lg shadow-sm flex items-left hover:bg-slate-800  bg-slate-800/40  px-2"
                    onClick={() => toggleSort("ville")}>
                    Ville {getSortIcon("ville")}
                  </button>
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  <button
                    className="text-white uppercase text-md font-semibold py-2 rounded-lg shadow-sm flex items-left hover:bg-slate-800  bg-slate-800/40  px-2"
                    onClick={() => toggleSort("status")}>
                    Statut {getSortIcon("status")}
                  </button>
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Table
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Service
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  <button
                    className="text-white uppercase text-md font-semibold py-2 rounded-lg shadow-sm flex items-left hover:bg-slate-800  bg-slate-800/40  px-2"
                    onClick={() => toggleSort("text_review")}>
                    Texte {getSortIcon("text_review")}
                  </button>
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Photo
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  <button
                    className="text-white uppercase text-md font-semibold py-2 rounded-lg shadow-sm flex items-left hover:bg-slate-800  bg-slate-800/40  px-2"
                    onClick={() => toggleSort("date_added")}>
                    Date {getSortIcon("date_added")}
                  </button>
                </th>
                <th className="text-center py-2 px-2 uppercase font-semibold text-xs"></th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  } hover:bg-blue-100`}>
                  <td className="text-left py-2 px-4 uppercase font-semibold text-sm  text-blue-900">
                    {item.name}
                  </td>
                  <td className="text-left py-2 px-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-left py-2 px-2">
                    <span className="px-2 py-1 text-xs text-blue-500 rounded-lg font-semibold bg-blue-100">
                      {item.ville}
                    </span>
                  </td>
                  <td className=" py-2 px-2">
                    <div className="flex items-center justify-center">
                      <span className="text-xs">
                        {iconMapping[item.status] || null}
                        {/* {item.status} */}
                      </span>
                    </div>
                  </td>
                  <td className="text-left py-2 px-2  items-center">
                    <div className="flex">
                      {renderForks(getForks(item.table_service))}
                    </div>
                  </td>
                  <td className="text-left py-2 px-2">
                    <div className="flex">
                      {renderStars(getStars(item.table_grade))}
                    </div>
                  </td>
                  <td className="text-left py-2 px-2">
                    {item.text_review && item.text_review.length > 0 ? (
                      <FaCheck className="w-6 h-6 text-green-500" />
                    ) : (
                      <HiXCircle className="w-6 h-6 text-red-500" />
                    )}
                  </td>
                  <td className="py-2 px-2">
                    {item.imagesUrl && item.imagesUrl.length > 0 ? (
                      <FaCheck className="w-6 h-6 text-green-500" />
                    ) : (
                      <HiXCircle className="w-6 h-6 text-red-500" />
                    )}
                  </td>
                  <td className="text-left text-xs py-2 px-2">
                    {format(new Date(item.date_added), "dd/MM/yy")}
                  </td>
                  <td className="flex justify-center py-2 px-2">
                    <button
                      onClick={() => navigate(`/restaurants/${item.id}`)}
                      className="uppercase flex items-center font-semibold rounded-lg border border-solid cursor-pointer text-white bg-blue-400 border-blue-500 hover:bg-blue-600 px-4 py-2 text-sm disabled:cursor-auto disabled:border-blue-100 disabled:bg-blue-200">
                      <FaArrowRight className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination {...{ onPageChange, totalPages, currentPage }} />
        {/* <div>
          <p className="slate-700 text-xs my-8">
            Nombre de fiches: {data.length}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
