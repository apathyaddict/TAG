import React from "react";
import RestaurantCard from "./RestaurantCard"; // Assuming RestaurantCard component is in a separate file
/* eslint-disable react/prop-types */

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="min-h-screen max-w-full flex-1 px-10">
      <h1 className="mt-10 text-2xl font-bold mb-6 text-stone-600">
        Liste des Restaurants
      </h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full"> */}
      <div className="flex flex-row gap-5 justify-evenly wrap max-w-full">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
