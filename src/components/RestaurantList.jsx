import React from "react";
import RestaurantCard from "./RestaurantCard"; // Assuming RestaurantCard component is in a separate file
/* eslint-disable react/prop-types */

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="max-w-full  my-4 p-8 sm:mx-10">
      <h1 className="text-2xl font-bold mb-6 text-stone-600">
        Liste des Restaurants
      </h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full"> */}
      <div className="flex  flex-col sm:flex-row gap-2 justify-between align-top max-w-full">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
