import React, { useState, useEffect } from "react";
import { FaArrowRight, FaCheck, FaSortAmountDown } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { format } from "date-fns";
import { MdTableRestaurant } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date_added");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [sortBy]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const restaurantsQuery = query(
        collection(db, "fiches"),
        orderBy(sortBy, "desc")
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

  const sortByName = () => {
    if (sortBy === "name") {
      setSortBy("-name"); // Toggle descending order
    } else {
      setSortBy("name"); // Ascending order by name
    }
  };

  const sortByCategory = () => {
    if (sortBy === "category") {
      setSortBy("-category"); // Toggle descending order
    } else {
      setSortBy("category"); // Ascending order by category
    }
  };

  if (loading) {
    return (
      <div className="max-w-full mr-10 p-10">
        <Skeleton height={30} className="my-2" count={3} />
      </div>
    );
  }

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
        <MdTableRestaurant
          key={index}
          className=" inline-block h-5 w-5 text-slate-600"
        />
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

  const renderForks = (numForks) => {
    return (
      <>
        {Array(numForks)
          .fill(0)
          .map((_, index) => (
            <GiKnifeFork
              key={index}
              className="inline-block h-4 w-4 text-slate-600"
            />
          ))}
      </>
    );
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 mt-10">
      <div className="py-4">
        <div className="flex justify-end mb-4">
          <div>
            <button
              className="bg-white hover:bg-slate-100 uppercase text-sm  text-slate-700 font-normal py-2 px-4 rounded-lg shadow-sm"
              onClick={sortByName}>
              Trier: Nom
            </button>
            <button
              className="bg-white hover:bg-slate-100 uppercase text-sm  text-slate-700 font-normal py-2 px-4 rounded-lg shadow-sm"
              onClick={sortByCategory}>
              Trier: catégory
            </button>
          </div>
        </div>
        <div className="shadow overflow-hidden rounded-lg border-b border-slate-200">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-600 text-white">
              <tr>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Nom
                </th>

                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  <button
                    className=" text-white uppercase text-md  font-semibold py-2 rounded-lg shadow-sm flex items-left hover:bg-slate-800/60 px-2"
                    onClick={sortByCategory}>
                    Catégorie
                    <FaSortAmountDown className="text-white text-lg ml-2" />
                  </button>
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Table
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Service
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Texte
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Photo
                </th>
                <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                  Date
                </th>
                <th className="text-center py-2 px-2 uppercase font-semibold text-xs"></th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                  <td className="text-left py-2 px-2 uppercase text-bold text-sm text-slate-900">
                    {item.name}
                  </td>
                  <td className="text-left py-2 px-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-left py-2 px-2">
                    {" "}
                    {renderForks(getForks(item.table_service))}
                  </td>
                  <td className="text-left py-2 px-2">
                    {" "}
                    {renderStars(getStars(item.table_grade))}
                  </td>
                  <td className="text-left  py-2 px-2">
                    {item.text_review && item.text_review.length > 0 ? (
                      <FaCheck className="w-6 h-6 text-green-500" />
                    ) : (
                      <HiXCircle className="w-6 h-6 text-red-500" />
                    )}
                  </td>
                  <td className=" py-2  px-2">
                    {item.imagesUrl && item.imagesUrl.length > 0 ? (
                      <FaCheck className="w-6 h-6 text-green-500" />
                    ) : (
                      <HiXCircle className="w-6 h-6 text-red-500" />
                    )}
                  </td>
                  <td className="text-left text-xs py-2 px-2 ">
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
        <p className="slate-700 text-xs my-4 ">
          Nombre de fiches: {data.length}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
