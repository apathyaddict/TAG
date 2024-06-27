import React from "react";
import RestaurantCard from "./RestaurantCard"; // Assuming RestaurantCard component is in a separate file

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="max-w-4xl mx-auto my-4 p-8">
      <h1 className="text-2xl font-bold mb-6 text-stone-600">
        Liste des Restaurants
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
