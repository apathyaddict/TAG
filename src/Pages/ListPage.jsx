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
import SidebarSearch from "../components/SidebarSearch.jsx";
import EmptyState from "../components/EmptyState.jsx";
import useDebounce from "../hooks/useDebounce.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RESTAURANTS_PER_PAGE = 9;

const ListPage = ({ setIsEditing, setIsnew, editFunc }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setcitySearchTerm] = useState("");
  const [managerSearchTerm, setManagerSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedCitySearchTerm = useDebounce(citySearchTerm, 1000);
  const debouncedManagerSearchTerm = useDebounce(managerSearchTerm, 1000);

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

        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false);
      }
    },
    [lastVisible, loading, hasMore]
  );

  useEffect(() => {
    fetchRestaurants(true);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch("nameSubstrings", debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedCitySearchTerm) {
      performSearch("ville", debouncedCitySearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedCitySearchTerm]);

  useEffect(() => {
    if (debouncedManagerSearchTerm) {
      performSearch("manager_name", debouncedManagerSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedManagerSearchTerm]);

  const performSearch = async (field, value) => {
    setSearchResults([]);
    setLoading(true);
    try {
      let querySnapshot;

      if (field === "nameSubstrings") {
        const lowercaseSearchTerm = value.toLowerCase();

        const qSubstrings = query(
          collection(db, "fiches"),
          where(field, "array-contains", lowercaseSearchTerm)
        );
        querySnapshot = await getDocs(qSubstrings);
      } else {
        const qField = query(
          collection(db, "fiches"),
          where(field, "==", value)
        );
        querySnapshot = await getDocs(qField);
      }

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("results", results);
      setSearchResults(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Error searching for ${field}: `, error);
    }
  };

  return (
    <div className="mx-auto flex flex-col sm:flex-row justify-normal">
      <div className="w-full sm:w-64 sm:flex-shrink-0">
        <SidebarSearch
          {...{
            setSearchTerm,
            searchTerm,
            citySearchTerm,
            setcitySearchTerm,
            managerSearchTerm,
            setManagerSearchTerm,
          }}
        />
      </div>

      <section className="flex-grow">
        <div className="mx-auto flex flex-col px-10">
          <h1 className="my-5 text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl">
            Banque de données
          </h1>

          {loading ? (
            <div className="max-w-full mr-10 p-10">
              <Skeleton height={20} className="my-2 w-[200px]" count={3} />{" "}
              <Skeleton height={20} className="my-2 w-[300px]" count={3} />
              <Skeleton height={20} className="my-2" count={3} />
            </div>
          ) : (
            <div>
              {searchTerm || citySearchTerm || managerSearchTerm ? (
                searchResults.length > 0 ? (
                  <RestaurantList
                    restaurants={searchResults}
                    {...{ setIsEditing, setIsnew, editFunc }}
                  />
                ) : (
                  <EmptyState
                    title="Erreur. Essayez d'autres critères de recherche"
                    search={true}
                  />
                )
              ) : (
                <RestaurantList
                  restaurants={allRestaurants}
                  {...{ setIsEditing, setIsnew, editFunc }}
                />
              )}
              {hasMore && !loading && (
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
          )}
        </div>
      </section>
    </div>
  );
};

export default ListPage;
