import React, { useEffect, useState } from "react";
import RestaurantList from "../components/RestaurantList.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListPage = ({ editSelectedRestaurant }) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "fiches"));
        const restaurants = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRestaurants(restaurants);
        setLoading(false); // Set loading to false after data is fetched
        console.log("Fetched restaurants:", restaurants); // Log fetched data
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="max-w-full mr-10 p-10">
        <Skeleton height={100} className="my-2" count={3} />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <RestaurantList
        restaurants={allRestaurants}
        {...{ editSelectedRestaurant }}
      />
    </div>
  );
};

export default ListPage;
