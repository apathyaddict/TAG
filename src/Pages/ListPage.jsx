import React, { useEffect, useState } from "react";
import RestaurantList from "../components/RestaurantList.jsx";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { FaSpinner } from "react-icons/fa";

const ListPage = ({ setIsEditing, setIsnew, editFunc }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [moreLoading, setMoreLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const first = query(
          collection(db, "fiches"),
          orderBy("date_added", "desc"),
          limit(4)
        );

        const documentSnapshots = await getDocs(first);

        const lastVisibleDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lastVisibleDoc);

        const restaurants = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const fetchMoreRestaurants = async () => {
    if (!lastVisible) return;

    setMoreLoading(true);
    try {
      const next = query(
        collection(db, "fiches"),
        orderBy("date_added", "desc"),

        startAfter(lastVisible),
        limit(8)
      );

      const documentSnapshots = await getDocs(next);

      if (documentSnapshots.docs.length === 0) {
        setLastVisible(null); // No more documents
        return;
      }

      const lastVisibleDoc =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      const moreRestaurants = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        ...moreRestaurants,
      ]);
    } catch (error) {
      console.error("Error fetching more documents: ", error);
    } finally {
      setMoreLoading(false);
    }
  };

  if (loading) {
    return (
      <div className=" flex justify-center align-middle mx-auto mr-10 p-10">
        <FaSpinner className="animate-spin h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mx-auto flex flex-col px-10">
        <h1 className="my-5 text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl ">
          Banque de données
        </h1>
        <RestaurantList
          restaurants={allRestaurants}
          {...{ setIsEditing, setIsnew, editFunc }}
        />

        <div className="text-center my-10 capitalize">
          <button
            onClick={fetchMoreRestaurants}
            className="px-10 py-2 hover:bg-white text-slate-600 transition-all  border-slate-200 
            hover:text-slate-900 rounded-lg focus:text-gray-800 font-bold border uppercase disabled:text-slate-300 hover:cursor-pointer"
            disabled={moreLoading || !lastVisible}>
            {moreLoading ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
