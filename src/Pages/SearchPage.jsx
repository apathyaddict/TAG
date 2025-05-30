import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EmptyState from "../components/EmptyState.jsx";
import RestaurantList from "../components/RestaurantList.jsx";
import SidebarSearch from "../components/SidebarSearch.jsx";
import { db } from "../firebase.js";
import useDebounce from "../hooks/useDebounce.jsx";

const RESTAURANTS_PER_PAGE = 9;

const SearchPage = ({ setIsEditing, setIsnew, editFunc }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setcitySearchTerm] = useState("");
  const [managerSearchTerm, setManagerSearchTerm] = useState("");
  const [categorySearch, setCategorySearch] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [lastVisibleCategory, setLastVisibleCategory] = useState(null);
  const [hasMoreCategory, setHasMoreCategory] = useState(true);
  const [lastVisibleCity, setLastVisibleCity] = useState(null);
  const [hasMoreCity, setHasMoreCity] = useState(true);
  const [postalCodeSearchTerm, setPostalCodeSearchTerm] = useState("");
  const [lastVisiblePostalCode, setLastVisiblePostalCode] = useState(null);
  const [hasMorePostalCode, setHasMorePostalCode] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedCitySearchTerm = useDebounce(citySearchTerm, 500);
  const debouncedManagerSearchTerm = useDebounce(managerSearchTerm, 1000);
  const debouncedPostalCodeSearchTerm = useDebounce(postalCodeSearchTerm, 500);

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
      performCitySearch(debouncedCitySearchTerm, true);
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

  useEffect(() => {
    if (debouncedPostalCodeSearchTerm) {
      performPostalCodeSearch(debouncedPostalCodeSearchTerm, true);
    } else {
      setSearchResults([]);
    }
  }, [debouncedPostalCodeSearchTerm]);

  useEffect(() => {
    if (categorySearch.length > 0) {
      performCategorySearch(categorySearch, true);
    } else {
      setSearchResults([]);
    }
  }, [categorySearch]);

  const performSearch = async (field, value) => {
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
          where(field, "==", value),
          where(field, "<=", value + "\uf8ff")
        );
        querySnapshot = await getDocs(qField);
      }

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSearchResults(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Error searching for ${field}: `, error);
    }
  };

  const performCategorySearch = useCallback(
    async (categories, isInitial = false) => {
      setLoading(true);

      try {
        const queries = categories.map((category) =>
          query(
            collection(db, "fiches"),
            where("category", "==", category),
            orderBy("date_added", "desc"),
            isInitial
              ? limit(RESTAURANTS_PER_PAGE)
              : startAfter(lastVisibleCategory),
            limit(RESTAURANTS_PER_PAGE)
          )
        );

        const querySnapshots = await Promise.all(queries.map(getDocs));
        const results = querySnapshots.flatMap((snapshot) =>
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        const lastVisibleDoc =
          querySnapshots[0].docs[querySnapshots[0].docs.length - 1];
        setLastVisibleCategory(lastVisibleDoc || null);
        setHasMoreCategory(
          querySnapshots[0].docs.length === RESTAURANTS_PER_PAGE
        );

        setSearchResults((prev) =>
          isInitial ? results : [...prev, ...results]
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error searching for categories: ", error);
      }
    },
    [lastVisibleCategory, loading, hasMoreCategory]
  );

  const performCitySearch = useCallback(
    async (city, isInitial = false) => {
      setLoading(true);

      try {
        const cityQuery = query(
          collection(db, "fiches"),
          where("ville", "==", city.toLowerCase()),
          orderBy("date_added", "desc"),
          isInitial ? limit(RESTAURANTS_PER_PAGE) : startAfter(lastVisibleCity),
          limit(RESTAURANTS_PER_PAGE)
        );

        const querySnapshot = await getDocs(cityQuery);

        const lastVisibleDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisibleCity(lastVisibleDoc || null);
        setHasMoreCity(querySnapshot.docs.length === RESTAURANTS_PER_PAGE);

        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSearchResults((prev) =>
          isInitial ? results : [...prev, ...results]
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error searching for city: ", error);
      }
    },
    [lastVisibleCity, loading, hasMoreCity]
  );

  const performPostalCodeSearch = useCallback(
    async (postalCode, isInitial = false) => {
      setLoading(true);

      console.log("postalCode", postalCode);

      try {
        const postalQuery = query(
          collection(db, "fiches"),
          where("code_postal", "==", String(postalCode)),
          orderBy("date_added", "desc"),
          isInitial
            ? limit(RESTAURANTS_PER_PAGE)
            : startAfter(lastVisiblePostalCode),
          limit(RESTAURANTS_PER_PAGE)
        );

        const querySnapshot = await getDocs(postalQuery);

        const lastVisibleDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisiblePostalCode(lastVisibleDoc || null);
        setHasMorePostalCode(
          querySnapshot.docs.length === RESTAURANTS_PER_PAGE
        );

        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("results", results);

        setSearchResults((prev) =>
          isInitial ? results : [...prev, ...results]
        );
      } catch (error) {
        console.error("Error searching by postal code: ", error);
      } finally {
        setLoading(false);
      }
    },
    [lastVisiblePostalCode, loading, hasMorePostalCode]
  );

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
            setCategorySearch,
            categorySearch,
            setPostalCodeSearchTerm,
            postalCodeSearchTerm,
          }}
        />
      </div>

      <section className="flex-grow">
        <div className="mx-auto flex flex-col mb-16 ">
          <h1 className="my-10 text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl px-10 ">
            Banque de données
          </h1>

          {loading && allRestaurants.length === 0 ? (
            <div className="max-w-full mr-10 p-10">
              <Skeleton height={20} className="my-2 w-[200px]" count={3} />{" "}
              <Skeleton height={20} className="my-2 w-[300px]" count={3} />
              <Skeleton height={20} className="my-2" count={3} />
            </div>
          ) : (
            <div className="w-full pl-6 pr-2">
              {searchTerm ||
              citySearchTerm ||
              managerSearchTerm ||
              postalCodeSearchTerm ||
              categorySearch.length > 0 ? (
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
              {(hasMore || hasMoreCategory || hasMoreCity) && (
                <div className="text-center my-10 uppercase">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (citySearchTerm) {
                        performCitySearch(citySearchTerm, false);
                      } else if (categorySearch.length > 0) {
                        performCategorySearch(categorySearch, false);
                      } else {
                        fetchRestaurants(false);
                      }
                    }}
                    type="button"
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

export default SearchPage;
