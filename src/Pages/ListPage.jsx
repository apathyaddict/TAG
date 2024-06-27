import React, { useEffect, useState } from "react";
import RestaurantList from "../components/RestaurantList.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

const ListPage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "fiches"));
        const restaurants = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRestaurants(restaurants);
        console.log("allRestaurants", allRestaurants);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className=" max-h-full max-w-full">
      <RestaurantList restaurants={allRestaurants} />
    </div>
  );
};

export default ListPage;
