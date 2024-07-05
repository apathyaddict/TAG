import React, { useEffect, useState, useCallback } from "react";
import RestaurantList from "../components/RestaurantList.jsx";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { FaSpinner } from "react-icons/fa";
import SidebarSearch from "../components/SidebarSearch.jsx";
import { useDebounce } from "use-debounce";

const RESTAURANTS_PER_PAGE = 9;

const ListPage = ({ setIsEditing, setIsnew, editFunc }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setcitySearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedText] = useDebounce(searchTerm, 1000);

  const fetchRestaurants = useCallback(
    async (isInitial = false) => {
      if (loading || (!isInitial && !hasMore)) return;

      setLoading(true);
      try {
        const restaurantsQuery = query(
          collection(db, "fiches"),
          orderBy("date_added", "desc"),
          isInitial ? limit(RESTAURANTS_PER_PAGE) : startAfter(lastVisible),
          limit(RESTAURANTS_PER_PAGE)
        );

        const documentSnapshots = await getDocs(restaurantsQuery);
        const lastVisibleDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        setLastVisible(lastVisibleDoc || null);
        setHasMore(documentSnapshots.docs.length === RESTAURANTS_PER_PAGE);

        const newRestaurants = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllRestaurants((prev) =>
          isInitial ? newRestaurants : [...prev, ...newRestaurants]
        );
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    },
    [lastVisible, loading, hasMore]
  );

  useEffect(() => {
    fetchRestaurants(true);

    if (searchTerm) {
      searchData();
    } else {
      setSearchResults([]);
    }

    if (citySearchTerm) {
      getCity();
    }
  }, [searchTerm, citySearchTerm]);

  if (loading && allRestaurants.length === 0) {
    return (
      <div className="flex justify-center align-middle mx-auto mr-10 p-10">
        <FaSpinner className="animate-spin h-16 w-16" />
      </div>
    );
  }

  // search functionality

  const searchData = async () => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    const qSubstrings = query(
      collection(db, "fiches"),
      where("nameSubstrings", "array-contains", lowercaseSearchTerm)
    );

    try {
      const querySnapshot = await getDocs(qSubstrings);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(results);

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for restaurants: ", error);
    }
  };

  const getCity = async () => {
    console.log(citySearchTerm);
    try {
      const qCity = query(
        collection(db, "fiches"),
        where("name", "array-contains", citySearchTerm)
        // where("ville", "<=", citySearchTerm + "\uf8ff")
      );

      console.log(qCity);

      const querySnapshotCity = await getDocs(qCity);

      const results = querySnapshotCity.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(results);

      setSearchResults(results);
      console.log("inseide", searchResults);
    } catch (error) {
      console.error("Error searching for restaurants: ", error);
    }
  };

  return (
    <div className="mx-auto flex flex-col sm:flex-row justify-normal">
      <div className="w-full sm:w-64 sm:flex-shrink-0">
        <SidebarSearch
          {...{ setSearchTerm, searchTerm, citySearchTerm, setcitySearchTerm }}
        />
      </div>
      <section className="flex-grow">
        <div className="mx-auto flex flex-col px-10">
          <h1 className="my-5 text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl">
            Banque de données
          </h1>
          {searchTerm || (citySearchTerm && searchResults) ? (
            <RestaurantList
              restaurants={searchResults}
              {...{ setIsEditing, setIsnew, editFunc }}
            />
          ) : (
            <RestaurantList
              restaurants={allRestaurants}
              {...{ setIsEditing, setIsnew, editFunc }}
            />
          )}
          {hasMore && (
            <div className="text-center my-10 capitalize">
              <button
                onClick={() => fetchRestaurants(false)}
                className="px-10 py-2 hover:bg-white text-slate-600 transition-all border-slate-200 
                hover:text-slate-900 rounded-lg focus:text-gray-800 font-bold border uppercase disabled:text-slate-300 hover:cursor-pointer"
                disabled={loading}>
                {loading ? "Chargement..." : "Charger plus"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ListPage;
