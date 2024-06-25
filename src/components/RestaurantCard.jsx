import React from "react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{restaurant.name}</div>
        <p className="text-gray-700 text-base">
          {restaurant.address}, {restaurant.ville}
        </p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">Phone: {restaurant.phone}</p>
        <p className="text-gray-700 text-base">
          <a
            href={restaurant.website}
            className="text-blue-500 hover:underline">
            {restaurant.website}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
